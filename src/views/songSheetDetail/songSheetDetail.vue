<template>
  <div class="musicListDetail" v-if="musicListDetail">
    <!-- 歌单信息 -->
    <div class="listInfo">
        <!-- 歌单封面 -->
        <div class="listAvatar">
          <img :src="musicListDetail.coverImgUrl" alt="">
        </div>
        <!-- 名称 -->
        <div class="right">
          <!-- 标题 -->
          <div class="tite">
            <!-- <div class="titleTag">歌单</div> -->
            <div class="titleContent">{{musicListDetail.name}}</div>
          </div>
        
          <!-- 歌单创建者信息 -->
          <!-- <div class="uesr"> -->
            <!-- 歌单创建者头像 -->
            <!-- <div class="userAvatar"> -->
              <!-- <img :src="musicListDetail.creator.avatarUrl" alt=""> -->
            <!-- </div> -->
            <!-- 名字 -->
            <!-- <div class="userName">{{musicListDetail.creator.nickname}}</div> -->
            <!-- 创建时间 -->
            <!-- <div class="createTime">{{musicListDetail.createTime | dateHandle}}创建</div>
          </div> -->
          <!-- 操作按钮 -->
          <div class="buttons">
            <div class="buttonItem playAll" @click="playAll">
              <i class="iconfont icon-bofang playAll"></i>
              <span>播放全部</span>
            </div>
            <div class="buttonItem" v-if="!isCreated" @click="collectionSheet">
              <i class="iconfont icon-xihuan" :class="isSub ? 'red' : ''"></i>
              <span>{{ isSub ? "已收藏" : "收藏" }}</span>
            </div>
            <div class="buttonItem">
              <i class="iconfont icon-zhuanfa"></i>
              <span>分享</span>
            </div>
          </div>

          <!-- 标签 -->
          <div class="tags">
            <div class="tagItem">
              标签：<span v-for="(item,index) in musicListDetail.tags" :key="index">{{item}}</span>
            </div>
          </div>
          <!-- 歌曲列表的歌曲数量和播放量 -->
           <div class="otherInfo">
             <!-- 歌曲数量 -->
             <div class="musicNum">
               <span>歌曲：{{musicListDetail.trackCount}}</span>
             </div>
             <!-- 播放量 -->
              <div class="playCount">
                 <span>播放：{{musicListDetail.playCount | handleNum}}</span>
              </div>
            </div>
          
          <!-- 简介 -->
          <div class="desc">简介：{{musicListDetail.description}}</div>
        </div>
    </div>

    <!-- 歌单列表-->
    <div class="musicList" >
      <el-tabs v-model="activeName" @tab-click="clickTab">
        <el-tab-pane label="歌曲列表" name="first">
          <!-- 歌曲列表 -->
            <el-table
              :data=" musicListDetail.tracks"
              stripe lazy highlight-current-row
              size="mini"
              style="width: 100%"
              :row-key="
                (row) => {
                  return row.id;
                }
              "
              v-infinite-scroll="this.$store.state.isLogin ? loadMore : ''"
              :infinite-scroll-disabled="scrollLoadDisabled"
              :infinite-scroll-distance="1500"
              :infinite-scroll-immediate="false">
              <!--自定义索引-->
              <el-table-column type="index" :index="indexMethod"></el-table-column>
              <!-- 下载按钮 -->
              <el-table-column width="50">
                <template slot-scope="scope">
                  <i class="el-icon-download" @click="download(scope.row.id)"></i>
                </template>
              </el-table-column> 
              <el-table-column prop="name" label="音乐标题"></el-table-column>
              <el-table-column prop="ar[0].name" label="歌手"></el-table-column>
              <el-table-column prop="al.name" label="专辑"></el-table-column>
              <el-table-column prop="dt" label="时长"></el-table-column>

            </el-table> 
            <div class="loadMore" v-if="isMore && !this.$store.state.isLogin">
              登陆后查看更多
            </div>
            <div class="placeholder" v-else></div>
        </el-tab-pane>
        <el-tab-pane label="评论" name="second">
          <!-- 精彩评论列表 -->
          <div class="commentList" v-if="comments.comments" v-loading="isCommentLoading">
            <!-- 精彩评论 -->
             <comment 
                      :commentType ="'musicList'"
                      :commentsList="comments.hotComments"
                      :commentId="musicListDetail.id + ''"
                      @getComment="getSheetComment"
                      @scrollToComment="scrollToComment"
                      v-if="comments.hotComments"
                      ref="hotComments">
                  <!-- 使用插槽 -->
                  <div slot="title">精品评论</div>
             </comment>
               <!--最新评论  -->
              <comment  
                      :commentType ="'musicList'"
                      :commentsList="comments.comments"
                      :commentId ="musicListDetail.id + ''"
                      :isHotComment ="comments.hotComments? false:true"
                      @getComment="getSheetComment"
                      @scrollToComment="scrollToComment"
                      @transToHotComment="(info)=>$refs.hotComments.floorComment(info.commentId,info.nickname)"
                      >
                  <!-- 使用插槽 -->
                  <div slot="title">热门评论</div>
              </comment>
          </div>

              <!-- 分页 -->
            <div class="page" v-show="comments.comments && comments.comments.length !=0">

            
              <el-pagination
                background layout="prev,pager,next"
                :total="comments.total"
                small
                :page-size="50"
                :current-page="currentCommentPage"
                @current-change="commentPageChange">

              </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="收藏者" name="third">不想做了嘻嘻嘻</el-tab-pane>
        
      </el-tabs>
    </div>
    

  </div>
</template>

<script> 
import{getSongSheetDetail,getMusicListComment, collectSongSheet, getMusicSheetList, getsongsDetail} from 'network/api.js'
import { formatDate,handleNum,handleMusicTime} from 'plugins/utils.js'
import Comment from 'components/comment/comment'

export default {
  name:'songSheetDetail',
  components:{
    Comment
  },
  data() {
    return {
      //歌单中歌曲列表
      musicListDetail:{},
      // 评论对象
      comments:{},
       activeName:'first',
      //当前评论页数
      currentCommentPage:1,
      //是否还有更多音乐
      isMore:false,

      // detailInfo:{},
      // 是否是用户自己创建的歌单
      isCreated:false,
      // 用户是否收藏了当前歌单
      isSub: false,
      // 评论是否在加载
      isCommentLoading:false,
      // 是否禁止滚动加载
      scrollLoadDisabled:false
    }
  },
  created() {
    // console.log(this.$route.params);
    /* getSongSheetDetail(this.$route.params.id).then(res=>{
      console.log(res);
      this.musicListDetail = res.data.playlist
    }) */
    // 获取歌单
    console.log(this.$refs);
    this.getMusicListById()
    // 获取评论
    // this.getSheetComment()
   
  },
  mounted() {
    this.getIsSub()
  },


  methods: {

     // 二次封装根据传递过来的id查询歌单
    getMusicListById(){
      let timestamp = Date.parse(new Date());
      getSongSheetDetail(this.$route.params.id,timestamp).then(res=>{
        // console.log(res.data.playlist.trackIds);
        this.musicListDetail = res.data.playlist
        
      
        // 判断是否还有更多音乐
        // console.log(this.musicListDetail.tracks);
        if(this.musicListDetail.tracks.length != this.musicListDetail.trackIds.length){
          this.isMore = true
        }
        // 处理时间  变成xx：xx
        this.musicListDetail.tracks.forEach((item,index) => {
          this.musicListDetail.tracks[index].dt = handleMusicTime(item.dt)
        });
      })
    },

     // 二次封装获取歌单评论api
    getSheetComment(type){
      // 获取时间戳
      let timestamp = Date.parse(new Date());
      this.isCommentLoading = true;
      if(type == 'changePage'){

        this.scrollToComment();
      }
      // 获取歌单评论
      getMusicListComment(this.$route.params.id,(this. currentCommentPage-1)*50,timestamp).then(res=>{
      console.log(res);
      if(res.data.code !== 200){
        this.$message.error('获取评论失败，请稍后重试！')
      }
      this.comments = res.data;
      this.isCommentLoading = false;
      console.log('重新歌单获取评论');
      })
    },

    // 
    scrollToComment(){
      let musicListDetail = document.querySelector('.musicListDetail');
      let listInfo = document.querySelector('.listInfo')
      console.log('执行了这里，滚动到精彩评论');
      musicListDetail.scrollTo({   //文档滚动到某个位置
        behavior:'smooth',  // 滚动方式
        top:listInfo.clientHeight - 20, // 纵轴坐标     还一个横轴坐标

      })
    },

    // 二次封装获取更多歌曲详情
    getMusicDetail(ids){
      if(this.isMore == false) return
      this.scrollLoadDisabled = true
       getsongsDetail(ids).then(res=>{
        //  console.log(res);
         let result = res
        //  console.log(result);
        //  处理时间
        result.data.songs.forEach((item,index)=>{
          result.data.songs[index].dt = handleMusicTime(item.dt)
        })
        this.musicListDetail.tracks.push(...result.data.songs);
        // 判断是否还有更多音乐
        if( this.musicListDetail.tracks.length < this.musicListDetail.trackIds.length){
          this.isMore = true
          this.scrollLoadDisabled = false
        }else{
          this.isMore = false;
        }
       })
    },

    // 请求用户歌单
    getUserSongSheet(){
     /*  let timestamp = Date.parse(new Date())   //date.parse() 返回日期对象的毫秒数
      // 先从localStorage里面读取用户信息  如果登录成功是有存的
      let userInfo=window.localStorage.getItem("userInfo") && JSON.parse(window.localStorage.getItem("userInfo"));
      // console.log(userInfo.userId);
      getMusicSheetList(userInfo.userId,timestamp).then(res=>{
        console.log(res);
        let resList = res.data.playlist
        let index = resList.findIndex(item=>item.subscribed == true)
        let collectedMusicList = resList.slice(index)
        console.log(collectedMusicList);
        //  将收藏的歌单上传至vuex
        this.$store.commit("updateCollectMusicList",collectedMusicList)
      }) */
    },

     // 歌单单列表前索引
    indexMethod(index){
      if(index<10){
        return '0' + (index +1) 
      }else{
        return index +1
      }
    },

    //双击table的row回调
    clickRow(row){
      console.log(row);
    },
    // 播放全部
    playAll(){
      console.log('播放全部');
    },

    // 评论点击翻页的回调
    commentPageChange(page){
      this.currentCommentPage = page
      this.getSheetComment('changePage')
    },

    // c处理Dom
    handleDom(current,last){
     /*  console.log(current,last);
      if(document.querySelector('.musicListDetail')){
        let tableRows = document.querySelector('.musicListDetail')
                                .querySelectorAll('.el=table_row');
        console.log(tableRows);
        let index = this.musicListDetail.tracks.findIndex(item=>{
          item.id = current
        })
        if(index != -1){
          // 直接修改dom样式的颜色无效  可能是因为第三方组件的原故
          // 通过引入全局样式解决
          // 将正在播放的音乐前面的索引换成小喇叭
          tableRows[index].children[0],querySelector('.cell').innerHTML=`<div><i class="iconfont icon-yinliang"></i></div>`
           tableRows[index].children[0]
            .querySelector(".iconfont")
            .classList.add("currentRow");
          tableRows[index].children[2]
            .querySelector(".cell")
            .classList.add("currentRow");
        }
        // 清楚上一首的样式
        if(last != -1){
         
          let lastIndex = this.musicListDetail.tracks.findIndex(
            (item) => item.id == last
          );
          if(lastIndex != -1){
            // 将上一个播放的dom的小喇叭换回索引
             tableRows[lastIndex].children[0].querySelector(
              ".cell"
            ).innerHTML = `<div>${
              lastIndex + 1 < 10 ? "0" + (lastIndex + 1) : lastIndex + 1
            }</div>`;
            // 将上一首的类名删掉  小喇叭的html已经被替换了，不需要再还原
            tableRows[lastIndex].children[2]
              .querySelector(".cell")
              .classList.remove("currentRow");
          }
        }
      } */
    },

    // 点击el-tab-pane的回调 点击评论按钮后开始获取评论
    clickTab(e){
      console.log(e.index);
      if(e.index == 1 && !this.comments.comments){
        this.getSheetComment();
        console.log(this.$refs.hotComments);
      }
    },
    // 加载所有音乐的回调
    loadMore() {
      console.log("加载更多");
      if (!this.$store.state.isLogin) {
        this.$message.error("请先进行登录操作!");
        return;
      }
      // console.log("加载所有音乐");
      // this.isMore = false;

      let arr = this.musicListDetail.trackIds.slice(
        this.musicListDetail.tracks.length
      );
      /* console.log(this.musicListDetail.trackIds);
      console.log(this.musicListDetail.tracks);
      console.log(arr); */
      if (arr.length > 100) {
        arr = arr.slice(0, 100);
      }
      console.log(arr.length);
      let ids = "";
      arr.forEach((item) => {
        ids += item.id + ",";
        
      });
      // console.log(ids);
      ids = ids.substr(0, ids.length - 1);
      // console.log(ids);
      // console.log(ids);
      this.getMusicDetail(ids);
    },
   //判断用户是否收藏了当前歌单
    getIsSub(){
      this.isSub = this.$store.state.collectedMusicList.find(
        (item) => item.id == this.$route.params.id
      );
    },
    //判断是否是用户创建的歌单
    getIsCreated(){
      this.isCreated = this.$store.state.createdMusicList.find(
        (item) => item.id == this.$route.params.id
      );
    },
    
    // 收藏歌单
    collectionSheet(){
      /* console.log('...我要开始收藏咯或者取消收藏');
      //判断是否已经登录
      if (!this.$store.state.isLogin) {
        this.$message.error("请先进行登录操作!");
        return;
      }
      //1、改变页面的样式
      this.isSub =  !this.isSub
      // 2、传送到服务器并保存刚刚收藏的歌单
      let timestamp = Date.parse(new Date())   //date.parse() 根据本时区
      // console.log(this.$route.params);
      let type = this.isSub? 1:2
      console.log(type);
      collectSongSheet(this.$route.params.id,type,timestamp).then(res=>{
        console.log(res);
      })
      // 重新渲染收藏的歌单
       this.getUserSongSheet() */
    },
    // 下载
    clickCell(){
      console.log('我要开始i下载了');
    }
  },
  filters:{
    dateHandle(value){
      // 先将时间戳转成Date对象
      let date = new Date(value)
      return formatDate(date,"yyyy-MM-dd")
    },
    handleNum,
    handleMusicTime
  },
  watch:{
    '$store.collectedMusicList'(current,last){
      // 如果收藏页面刷新，收藏列表还没有获取到，但是收藏按钮已经渲染，所以在第一次获取到数据时，再渲染一次
       // 如果是刚刷新，last则为空
       if(last.length !=0){
         this.getIsSub()
       }
    },
    "$store.state.musicId"(current, last) {
      this.handleDOM(current, last);
    },
  }
}
</script>

<style scoped>
.musicListDetail {
  overflow-y: scroll;
}

.listInfo {
  display: flex;
  padding: 25px 15px;
  align-items: center;
}

.listAvatar {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 10px;
  margin-right: 15px;
}

.listAvatar img {
  width: 100%;
}

.right {
  width: calc(100% - 200px);
}

.title {
  display: flex;
  align-items: center;
}

.titleTag {
  font-size: 12px;
  color: #ec4141;
  border: 1px solid #ec4141;
  padding: 1px 2px;
  border-radius: 2px;
  margin-right: 5px;
  transform: scale(0.8);
}

.titleContent {
  font-size: 20px;
  font-weight: 600;
  color: #373737;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 90%;
}

.user {
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-size: 12px;
}

.userAvatar {
  height: 25px;
  width: 25px;
  margin-right: 8px;
}

.userAvatar img {
  width: 100%;
  border-radius: 50%;
}

.userName {
  color: #6191c2;
  margin-right: 8px;
}

.createTime {
  transform: scale(0.9);
}

.buttons {
  margin: 8px 0 0 -5px;
  display: flex;
}

.buttonItem {
  font-size: 12px;
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  transform: scale(0.9);
}

.buttonItem i {
  font-size: 12px;
  margin-right: 3px;
  transform: scale(0.9);
}

.playAll {
  background-color: #ec4141;
  color: white;
}

.tags {
  margin: 8px 0 0 -30px;
  display: flex;
  font-size: 12px;
  transform: scale(0.9);
}

.tagItem {
  color: #6191c2;
  margin-right: 5px;
}

.otherInfo {
  margin: 5px 0 0 -30px;
  display: flex;
  font-size: 12px;
  transform: scale(0.9);
}

.musicNum {
  margin-right: 13px;
}

.desc {
  margin: 5px 0 0 -30px;
  font-size: 12px;
  transform: scale(0.9);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.musicList {
  margin: -15px 15px 0;
}

.page {
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
}

.placeholder {
  width: 100%;
  height: 50px;
}

.loadMore {
  width: 100%;
  height: 50px;
  font-size: 12px;
  color: #aaa;
  text-align: center;
  line-height: 50px;
  transform: scale(0.9);
}

.red {
  color: #ec4141;
}

.commentList /deep/ .el-loading-spinner {
  top: 40px;
}
</style>
