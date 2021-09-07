<template>
  <div class="videolist">
    <!-- 视频导航栏列表 -->
    <div class="videoListNavBar">
      <!-- 左侧弹出框 -->
      <div class="left">
        
        <el-popover
          placement="bottom-start"
          width="400"
          v-model="isPopoverShow"
          popper-class="sortPop"
          trigger="click">
          <div class="sortBox" slot="reference">
            {{currentTag.name}}<i class="iconfont icon-arrow-right-bold"></i>
          </div>
          <div class=" videoCategory">
            <div class="videoCategoryItem" v-for="(item,index) in videoCategory" :key="index" @click="videoCategoryItem(index)"
            :class="{videoCategoryActive: videoCategoryIndex == index?true:false}">
              {{item.name}}
            </div>
          </div>
        </el-popover>
      </div>
      <!-- 右侧navbar -->
      <div class="right">
        <!-- <div class="tagNavBar" v-for="(item,index) in  videoTag" :key="item.id" @click="clickTagNavBar(item,index)" :class="{active:tagNavBarIndex==index?true:false}">
          {{item.name}}
        </div> -->
        <second-navbar :SecondNavBarData = 'videoTag' :itemWidth="60" :currentTag = currentTag @clickSecondBarItem="clickSecondBarItem"></second-navbar>
      </div>  
    </div>

    <!-- video视频 -->
    <video-list-card
      :videoList="videoList"
      :isLoad="true"
      :videoType="'video'"
      class="cardList"
      @clickListCardItem="goToVideoDetail"
      @bottomLoad="bottomLoad"
    >
    </video-list-card>
  </div>
</template>

<script>
// 引入api
import {getVideoCategory,getVideoTag,getVideoList} from 'network/api.js'
// 引入组件
import navBar from 'components/navBar/navBar.vue'
import secondNavbar from 'components/secondNavbar/secondNavbar.vue'
import videoListCard from 'components/videoListCard/videoListCard.vue'

export default {
  name:'videolist',
  components:{
    navBar,
    videoListCard,
    secondNavbar
  },
  data() {
    return {
      // 全部列表
      videoCategory:[],
      // 热门标签
      videoTag:[],
      // 当前选中的标签
      currentTag:{},
      // 控制弹出框的显示和隐藏 
      isPopoverShow:false,
      // 左侧当前选中的index
      videoCategoryIndex:0,
      // 右侧当前选择的index
      tagNavBarIndex:0,
      // 当前页
      videoPage:1,
      // video列表
      videoList:[],
      hasMore :false
      
    }
  },
  created() {
    // 获取所有分类
    getVideoCategory().then(res=>{
      // console.log(res);
      this.videoCategory = res.data.data 
    })
    // 获取热门分类
    getVideoTag().then(res=>{
      // console.log(res);
      this.videoTag = res.data.data
      this.currentTag = res.data.data[0]   //现场
      this.getVideos()  
    })
    // this.getVideo()
    
  },
  mounted() {
  },
  methods: {
    // 二次封装获取视频列表
    getVideos(){
      getVideoList(this.currentTag.id, 8 * (this.videoPage - 1)).then(res=>{
        console.log(res);
        this.videoList.push(...res.data.datas)
        this.hasMore = res.data.hasmore
      })
    },
    // 选择左侧标签触发点击事件
    videoCategoryItem(index){
      this.isPopoverShow = false
      this.videoCategoryIndex = index
      this.currentTag = this.videoCategory[index]
      this.videoList = [],
      this.videoPage = 1,
      this.getVideos()
      // console.log(item);
    },
    //选择右侧secondNavbar标签触发事件
    clickSecondBarItem(index){
      console.log(index);
      // this.tagNavBarIndex =index
      this.currentTag = this.videoTag[index]
      // console.log(item);
      this.videoList = [],
      this.videoPage = 1,
      this.getVideos()
    },
    goToVideoDetail(id, index, type){
      console.log(id, index, type);
    },
    // 下拉加载更多
    bottomLoad(){
      // console.log('1111');
      this.videoPage += 1
      if(this.hasMore){
        let _this = this
        setTimeout(() => {
          _this.getVideos()
        }, 3000);
      }
    }
      
  },
}
</script>

<style scoped>
.videoListNavBar{
  margin-bottom: 10px;
  display: flex;
}
.left{
  margin-left: 10px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 12px;
  cursor: pointer;
}
.right{
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
.tagNavBar{
  margin-right: 20px;
  font-size: 12px;
  padding: 0 10px;
  cursor: pointer;
  line-height: 33px;
}

.videoCategory{
    display: flex;
    flex-wrap: wrap;
  }
  .videoCategoryItem{
    width: 25%;
    text-align: center;
    padding: 5px 0;
    margin-top: 15px;
    font-size: 12px;
    color: rgb(85, 85, 85);;
    /* border: 1px solid black; */
  }

.videoCategoryActive{
    background-color: #fdf5f5;
    color: #ec4747;
    border-radius: 11px;
  }
.active{
  background-color: #fdf5f5;
  color: #ec4747;
  border-radius: 11px;
}
.content{
  margin-top: 20px;
}
.cardList{
  
  overflow-y: scroll;
  height: calc(100vh - 202px);

}
</style>