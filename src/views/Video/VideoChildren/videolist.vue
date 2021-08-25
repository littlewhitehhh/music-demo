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
            <div class="videoCategoryItem" v-for="(item,index) in videoCategory" :key="index" @click="videoCategoryItem(item,index)"
            :class="{videoCategoryActive: videoCategoryIndex == index?true:false}">
              {{item.name}}
            </div>
          </div>
        </el-popover>
      </div>
      <!-- 右侧navbar -->
      <div class="right">
        <div class="tagNavBar" v-for="(item,index) in  videoTag" :key="item.id" @click="clickTagNavBar(item,index)" :class="{active:tagNavBarIndex==index?true:false}">
          {{item.name}}
        </div>
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
import videoListCard from 'components/videoListCard/videoListCard.vue'

export default {
  name:'videolist',
  components:{
    navBar,
    videoListCard
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
      videoList:[]
      
    }
  },
  created() {
    getVideoCategory().then(res=>{
      // console.log(res);
      this.videoCategory = res.data.data 
    })
    getVideoTag().then(res=>{
      // console.log(res);
      this.videoTag = res.data.data
      this.currentTag = res.data.data[0]
    })
    // this.getVideo()
    
  },
  mounted() {
    getVideoList(this.currentTag.id, 8 * (this.videoPage - 1)).then(res=>{
      console.log(res)
    })
  },
  methods: {
    // 选择左侧标签触发点击事件
    videoCategoryItem(item,index){
      this.isPopoverShow = false
      this.videoCategoryIndex = index
      this.currentTag = this.videoCategory[index]
       getVideoList(item.id).then(res=>{
        console.log(res);
        // 清空video列表
        this.videoList = []
        this.videoList.push(...res.data.datas)
      })
      // console.log(item);
    },
    //选择右侧navbar标签触发事件
    clickTagNavBar(item,index){
      this.tagNavBarIndex =index
      this.currentTag = this.videoTag[index]
      // console.log(item);
      getVideoList(item.id).then(res=>{
        // console.log(res)
        // 清空video列表
        this.videoList = []
        this.videoList.push(...res.data.datas)
      })  
    },
    // 获取video
      getVideo(){
        getVideoList(this.currentTag.id,(this.videoPage - 1)* 8).then(res=>{
          // console.log(res)
          this.videoList = []
        this.videoList.push(...res.data.datas)
        })
      },
    goToVideoDetail(id, index, type){
      console.log(id, index, type);
    },
    bottomLoad(){
      console.log('1111');
    }
  },
}
</script>

<style scoped>
.videoListNavBar{
  display: flex;
}
.left{
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
</style>