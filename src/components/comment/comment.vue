<template>
  <div class="hotComments">
    <!-- 个人评论 -->
    <div class="comments" >
      <!-- 评论输入框 -->
      <el-input type="textarea" 
                class="commentArea" 
                maxlength="140" 
                show-word-limit   
                v-model="commentInput" placeholder="请留下你的评论" > 
      </el-input>
      <!-- 提交你所输入的内容 -->
      <div class="submitCommentButton">
        <el-button round size="mini" class="submitBtn">评论</el-button>
      </div>
    </div>
    <!-- 已有评论列表 -->
    <div class="commentLIst">
      <div class="commentHeader">
        <!-- 定义插槽 -->
        <slot name="title"></slot>
      </div>
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
              <div class="like">
                <i class="iconfont icon-good"></i>{{item.likeCount}}
              </div>
              <!-- 转发，分享 -->
              <div><i class="iconfont icon-zhuanfa"></i></div>
              <!-- 评论、回复 -->
              <div>
                <i class="iconfont icon-pinglun"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getMusicListComment} from 'network/api/js'
import { formatDate} from 'plugins/utils.js'
export default {
  name:'Comment',
  props:{
    commentsList:{
       type:Array,
      default:{}
    }
  },
  data() {
    return {
      // 评论的内容
      commentInput:''
    }
  },
  filters:{
     showDate(value) {
      // 1、先将时间戳转成Date对象
      const date = new Date(value);

      // 2、将date进行格式化
      return formatDate(date, "yyyy-MM-dd");
    },
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