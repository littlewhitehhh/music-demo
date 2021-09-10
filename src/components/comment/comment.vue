<template>
  <div class="hotComments">
    <!-- 个人评论 -->
    <div class="comments" 
         v-if="commentType !='' && commentType != 'music' &&isHotComment" >
      <!-- 评论输入框 -->
      <el-input type="textarea" 
                class="commentArea" 
                maxlength="140" 
                show-word-limit   
                v-model="commentInput" 
                placeholder="请留下你的评论"
                @input = inputComment > 
      </el-input>
      <!-- 提交你所输入的内容 -->
      <div class="submitCommentButton">
        <el-button round 
                   size="mini" 
                   class="submitBtn"
                   @click="commentMode ? submitComment():submitFloorComment() ">评论</el-button>
      </div>
    </div>
    <!-- 音乐单曲评论 -->
    <div class="musicComment" v-else-if="commentType !='' && commentType =='music'" >
      <el-button class="commentCardSwitch" size="mini" round @click='openDialog'>
         <i class="iconfont icon-ziyuan"></i>发表我的音乐评论
      </el-button>
        <el-dialog  
                  :visible="isCommentDialogShow"
                  width="400px"
                  @close="closeCommentDialog"
                  append-to-body
                  class="commentDialog">
            <div class="musicTitle">歌曲：{{musicTitle}}</div>
            <el-input 
                  type="textarea"
                  class="commentArea musicCommentArea"
                  maxlength="140"
                  show-word-limit
                  v-model="commentInput"
                  @input="inputComment"
                  placeholder="留下你的评论"></el-input>
            <!-- 提交评论 -->
            <div class="submitCommentButton">
              <el-button size="mini" round 
                         @click="commentMode? submitComment():submitFloorComment()"
                         class="submitComment musciSubmitComment">评论</el-button>
            </div>
        </el-dialog>
    </div>
       <!-- 评论标题  -->
      <div class="commentHeader">
        <!-- 定义插槽 -->
        <slot name="title"></slot>
      </div>
      <!-- 评论列表-->
      <div class="commentItem" v-for="(item,index) in commentsList" :key="index">
        <!-- 头像 -->
        <div class="commentCreatorAvatar">
          <img :src="item.user.avatarUrl" alt="" />
        </div>
        <!-- 评论内容 -->
        <div class="commentMain">
          <div class="commentContent">
            <span class="commentUserNickName">
              {{item.user.nickname}}:&nbsp;
            </span>
            <span>{{item.content}}</span>
          </div>
          <!-- 评论里面是回复别人-->
          <div class="replied">
            <div class="repliedItem" v-for="(item1,index1) in item.beReplied" :key="index1">
              <span class="repliedUser"> @{{item1.user.nickname}}</span>
              <span class="repliedCoent">{{item1.content}}</span>
            </div>
          </div>
          <!-- 回复时间，点赞分享回复等等 -->
          <div class="commentBottom">
            <!-- 回复时间 -->
            <div class="commentCreatedTiem">
              {{ item.time | showDate }}
            </div>
            <div class="commentButtons">
              <!-- 点赞 -->
              <div class="like" @click="likeCurrentComment(item.liked, item.commentId)">
                <i class="iconfont icon-good"></i>{{item.likeCount}}
              </div>
              <!-- 转发，分享 -->
              <div><i class="iconfont icon-zhuanfa"></i></div>
              <!-- 评论、回复 -->
              <div @click="floorComment(item.commentId,item.user.nickname)">
                <i class="iconfont icon-pinglun"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  </div>
</template>

<script>
import {sendCommentLike,sendComment} from 'network/api.js'
import { formatDate} from 'plugins/utils.js'
export default {
  name:'Comment',
  props:{
    // 评论数据
    commentsList:{
       type:Array,
        default(){
          return []
      }
    },
    // 评论的类型
    commentType:{
      type:String,
      default(){
        return ""
      },
      // 
    },
    //评论对象的id
    commentId:{
      type:String,
      default(){
        return ""
      },
    },
    //歌曲评论需要歌曲名称
    musicTitle:{
      type:String,
      default(){
        return "";
      }
    },
    //是否是热门评论
    isHotComment:{
      type:Boolean,
      default(){
        return true;
      }
    }
  },
  data() {
    return {
      // 评论的内容
      commentInput:'',
      //评论模式 true是常规评论 false是楼层评论
      commentMode: true,
      // 是否显示评论dialog
      isCommentDialogShow:false,
      // 楼层回复前几个字的长度
      floorCommentInputLength:0,
      // 用于暂存楼层评论的ID
      floorCommentId:'',
    }
  },
  methods: {
    // 监听键盘事件
    inputComment(){
      // 如果是楼层回复
      if(this.commentMode == false){
        if(this.commentInput.length <this.floorCommentInputLength){
          // 当前长度小于当前楼层前面默认的字时
          this.commentMode = true
          console.log('修改mode');
        }
      }
    },
    // 提交常规评论的回调
    submitComment(){
      if(!this.$store.state.isLogin){
        this.$message.warining('只有登陆后参能评论')
        return
      }
      // 先判断评论内容是否为空
      if(this.commentType.trim() == ''){
        this.$message.warining('评论内容不能为空哦！')
        return
      }
      //判断评论类型
      let type;
      switch(this.commentType){
        case 'album': type=3; break     //专辑
        case 'musicList': type=2; break  //歌单
        case 'music': type=1; break  //音乐
        case 'mv': type=0; break   //mv
        case 'video': type=5; break  //视频
      }
      // 发送评论
      /* console.log(type);
      console.log(this.commentId);
      console.log(this.commentType); */
      sendComment(1,this.commentId,type, this.commentInput).then(res=>{
        console.log(res);
        if(res.data.code==200){
          // 清空文本框
          //如果是单曲卡片评论，还需要关闭卡片
          if(this.commentType == 'music'){
            this.isCommentDialogShow = false
          }
          this.commentInput = ""
          // 像父元素传递事件 刷新（更新）评论 --- 根据id重新在获取一次评论
          this.$emit('getComment');
        }else{
           this.$message.error("评论失败,请稍后重试!");
        }
      }).catch((err) => {
        // console.log(err.response.data.msg);
        this.$message.error(err.response.data.msg);
      });
    },
    //提交楼层评论
    //commentId 是评论的id  nickname是评论作者
    submitFloorComment(){
      console.log('提交楼层评论');
      // 判断是否登录
      if(!this.$store.state.isLogin){
        this.$message.warning('只有登录才能评论哦！');
        return
      }
      // 判断内容是否为空
      if(this.commentInput.length == this.floorCommentInputLength){
        this.$message.error('评论不能为空哦~')
        return
      }
      // 判断评论类型
      let type
      switch (this.commentType) {
        case 'album': type=3; break ;    //专辑
        case 'musicList': type=2; break ; //歌单
        case 'music': type=1; break  //音乐
        case 'mv': type=0; break;   //mv
        case 'video': type=5; break; //视频
      }
      // 发送评论
      sendComment(1,this.commentId,type,this.commentType).then(res=>{
        if(res.data.code==200){
          // 清空文本框
          //如果是单曲卡片评论，还需要关闭卡片
          if(this.commentType == 'music'){
            this.isCommentDialogShow = false
          }
          this.commentInput = ""
          this.commentMode=true;
          this.floorCommentInputLength = 0;
          this.floorCommentId = "";
          this.isCommentDialogShow = false
           // 像父元素传递事件 刷新（更新）评论 --- 根据id重新在获取一次评论
          this.$emit('getComment');
        }else{
           this.$message.error("评论失败,请稍后重试!");
        }
      }).catch((err) => {
        // console.log(err.response.data.msg);
        this.$message.error(err.response.data.msg);
      });
    },
    // 打开发表评论对话框musicCommentDialog
    openDialog(){
      this.isCommentDialogShow = !this.isCommentDialogShow
      // dialog在第一次出现前是不渲染的，所以用nextTick
      this.$nextTick(()=>{
        // 让评论框获得焦点
        let input = document.querySelector('.musicCommentArea');
        input.children[0].focus()
          console.log(input);
        
      })

    },
    // 关闭评论对话框
    closeCommentDialog(){
      this.isCommentDialogShow = false;
      this.commentInput="";
      this.floorCommentId="";
      this.commentMode = true;
      this.floorCommentInputLength = 0;
    },
    // 点赞该评论的回调  flag ：是否已经点赞 
    likeCurrentComment(flag,cid){
      console.log(flag,cid);
      flag = flag? 0:1
      //判断是否登录
      if (!this.$store.state.isLogin) {
        this.$message.warning("只有登陆后才能点赞哦!");
        return;
      }
      // 获取事件戳
      var timestamp = Date.parse(new Date())
      // 判断类型
      let type
      switch (this.commentType) {
        case 'album': type=3; break ;    //专辑
        case '"musicList': type=2; break ; //歌单
        case 'music': type=1; break  //音乐
        case 'mv': type=0; break;   //mv
        case 'video': type=5; break; //视频
      }
      // 给评论点赞
      sendCommentLike(this.$route.params.id,cid,flag,type).then(res=>{
        console.log(res);
        if(res.data.code == 200){
          this.$emit("getComment");
        } else {
          this.$message.error("点赞失败,请稍后重试!");
        }
      })
    },
    // 点击楼层评论的回调 
    floorComment(commentId,nickname){
      console.log(commentId,nickname);
      // isHotComment为false。说明没有文本框  转到精彩评论comment组件的文本框中
     /*  if(this.isHotComment == false){
        // 将其转给hotComment处理
        this.$emit('transToHotComment',{commentId,nickname})
      }
        if(this.commentType != 'music'){
          // 让父元素滚动到评论框
          this.$emit('scrollToComment')
          // 让评论框获取焦点
          let input = document.querySelector('.commentArea')
          console.log(input);
          // 阻止focus定位
          input.children[0].foucs({ preventScroll: true})
        }else{
          this.openDialog();
        }
      this.commentInput = "回复" + nickname + ":"
      this.floorCommentInputLength = this.commentInput.length;
      // 将评论模式改为楼层回复
      this.commentMode = false;
      this.floorCommentId = commentId */
    } 
  },
  filters:{
     showDate(value) {
      // 1、先将时间戳转成Date对象
      const date = new Date(value);

      // 2、将date进行格式化
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  watch:{
    // 评论数据发生变化时，重置所有发表评论的数据
    commentsList(current){
      this.commentInput = "";
      this.isCommentDialogShow = false;
      this.commentMode = true;
      this.floorCommentInputLength = 0;
      this.floorCommentId = ""
    }
  }
}
</script>

<style scoped>

.submitCommentButton{
  margin-top: 20px;
}
.submitBtn{
  width: 80px;
}

.commentLIst {
  margin-bottom: 20px;
  width: 100%;
}

.commentHeader {
  margin-top: 10px;
  font-size: 16px;
  color: rgb(26, 26, 26);
  font-weight: 600;
  padding: 10px 0;
}
.commentItem {
  display: flex;
  margin: 5px 0;
  padding: 10px 0 20px;
  border-bottom: 1px solid #eee;
  font-size: 12px;
}

.commentCreatorAvatar {
  width: 35px;
  height: 35px;
  margin: 0px 10px 0 0;
}

.commentCreatorAvatar img {
  width: 100%;
  border-radius: 50%;
}

.commentMain {
  width: calc(100% - 50px);
}
.commentUserNickName {
  color: #5a8ab9;
}

.commentBottom {
  margin-top: 2px;
  color: rgb(172, 172, 172);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.commentButtons {
  display: flex;
  align-items: center;
}
.commentButtons div {
  margin-top: -3px;
  padding: 0 8px;
  transform: scale(0.85);
}

.commentButtons div:nth-child(1) {
  font-size: 14px;
}

.replied {
  background-color: #f4f4f4;
  margin: 7px 0;
  border-radius: 5px;
}

.repliedItem {
  padding: 7px 10px;
  line-height: 20px;
}

.repliedUser {
  color: #5a8ab9;
}
.el-textarea /deep/ .el-textarea__inner {
  height: 65px !important;
  font-size: 12px;
  resize: none;
}

.el-textarea /deep/ .el-textarea__inner:focus {
  border-color: #aaa;
}

.el-textarea /deep/ .el-input__count {
  transform: scale(0.9);
}
.submitCommentButton {
  width: 100%;
  text-align: right;
  margin: 10px 0;
}

.el-button:hover {
  background-color: #f2f2f2;
}

.el-button {
  transform: scale(0.9) translateX(5%);
}

.submitComment:focus {
  background-color: #fff;
} 
</style>