<template>
  <div class="songSheetDetail">
    <div class="songSheetDetailInfo">
      <div class="title">
        <div class="image">
          <img :src="detailInfo.coverImgUrl" alt="">
        </div>
        <div class="titeInfo">
          <div class="top">
             {{detailInfo.name}}
          </div>
          <!-- 歌单创建者信息 -->
          <!-- <div class="creatorInfo"> -->
            <!-- 歌单创建者头像 -->
            <!-- <div class="avatar"> -->
              <!-- <img :src="detailInfo.creator.avatarUrl" alt=""> -->
            <!-- </div> -->
            <!-- 名字 -->
            <!-- <div class="name">{{detailInfo.creator.nickname}}</div> -->
            <!-- 创建时间 -->
            <!-- <div class="createTime">{{detailInfo.createTime | dateHandle}}创建</div>
          </div> -->
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
          <div class="tagInfo">
            <div class="tag">
              标签：<span v-for="(item,index) in detailInfo.tags" :key="index">{{item}}</span>
            </div>
            <div class="songs">
              <span>歌曲：{{detailInfo.trackCount}}</span>
              <span>播放：{{detailInfo.playCount | handleNum}}</span>
            </div>
            <div class="description">简介：{{detailInfo.description}}</div>
          </div>
        </div>
      </div>
      
      
    </div>

    <!-- 歌单列表-->
    <div class="Tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="first">
          <!-- 歌曲列表 -->
            <el-table
              :data=" detailInfo.tracks"
              stripe
              size="mini"
              style="width: 100%">
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
              <el-table-column label="时长">
                <template slot-scope="scope">
                  {{scope.row.dt | handleMusicTime}}
                </template>
              </el-table-column>

            </el-table> 
        </el-tab-pane>
        <el-tab-pane label="评论" name="second">
          <!-- 精彩评论列表 -->
          <comment :commentsList="hotcommentsList">
            <!-- 使用插槽 -->
            <div slot="title">精品评论</div>
          </comment>
          <comment :commentsList="commentsList">
            <!-- 使用插槽 -->
            <div slot="title">全部评论</div>
          </comment>
        </el-tab-pane>
        <el-tab-pane label="收藏者" name="third">不想做了嘻嘻嘻</el-tab-pane>
        
      </el-tabs>
    </div>
    

  </div>
</template>

<script> 
import{getSongSheetDetail,getMusicListComment} from 'network/api.js'
import { formatDate,handleNum,handleMusicTime} from 'plugins/utils.js'
import Comment from 'components/comment/comment'

export default {
  name:'songSheetDetail',
  components:{
    Comment
  },
  data() {
    return {
      activeName:'first',
      detailInfo:{},
      // 是否是用户自己创建的歌单
      isCreated:false,
      // 用户是否收藏了当前歌单
      isSub: false,
      // 当前页
      currentPage:1,
      //热门评论
      commentsList:[],
      //精彩评论
      hotcommentsList:[],
    }
  },
  created() {
    // console.log(this.$route.params);
    getSongSheetDetail(this.$route.params.id).then(res=>{
      // console.log(res);
      this.detailInfo = res.data.playlist
    })
    this.getSheetComment()
  },
  methods: {
    // 播放全部
    playAll(){
      console.log('播放全部');
    },
    // 个单列表前索引
    indexMethod(index){
      if(index<10){
        return '0' + index
      }else{
        return index
      }
    },
    // 二次封装获取歌单评论api
    getSheetComment(){
       getMusicListComment(this.$route.params.id,(this.currentPage-1)*50).then(res=>{
      console.log(res);
      this.commentsList =res.data.comments
      this.hotcommentsList = res.data.hotComments
    })
    },
    // 收藏歌单
    collectionSheet(){
      console.log('...我要开始收藏咯');
      //1、改变页面的样式
      this.isSub =  !this.isSub
      // 2、传送到服务器
      
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
  }
}
</script>

<style scoped>
.songSheetDetail{
  padding: 0 20px ;
}
.songSheetDetailInfo{
  padding: 20px 0;
}
.title {
    display: flex;
}
.image{
    width: 150px;
    height: 150px;
    
}
.image img{
    width: 100%;
    border-radius:10px ;
}
.titeInfo{
  margin-left:10px ;
  padding: 10px 0;
}

.top {
  font-weight: 700;
  font-size: 18px;
  color: #000;
}
.creatorInfo{
  margin-top: 10px;
  display: flex;
}
.avatar{
  width: 25px;
  height: 25px;
}
.avatar img {
  width: 100%;
}
.creatorInfo .name {
  margin-left: 15px;
  color: skyblue;
  font-size: 12px;
  height: 25px;
  line-height:25px ;
}
.creatorInfo .createTime {
  margin-left: 15px;
  /* color: skyblue; */
  font-size: 12px;
  height: 25px;
  line-height:25px ;
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
.tagInfo{
  margin-top: 10px;
} 
.tag{
  /* margin-top: 5px; */
  font-size: 12px;
}
.tag span {
  color: skyblue;
  margin-left: 5px;
}
.songs{
  margin-top: 5px;
  font-size: 12px;
}
.description{
  
  font-size: 12px;
  
}




.red {
  color: #ec4141;
}
</style>