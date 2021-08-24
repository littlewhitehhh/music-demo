<template>
  <div class="musicList">
    <!-- 高质量歌单 -->
    <div class="highquality">
      <!-- 背景 -->
      <img :src="TheFirstOfHighqualityData.coverImgUrl" alt="" class="backgroundImg">
      <!--左侧头像 -->
      <div class="cover">
        <img :src="TheFirstOfHighqualityData.coverImgUrl" alt="">
      </div>
      <!-- 右侧内容 -->
      <div class="title">
        <div class="tag"><i class="iconfont icon-good"></i> 精品歌单</div>
        <div class="name">{{ TheFirstOfHighqualityData.name }}</div>
        <div class="desc">{{ TheFirstOfHighqualityData.copywriter }}</div>
      </div>
    </div>
    <!-- 歌单导航栏列表 -->
    <div class="musicListNavBar">
      <!-- 左侧弹出框 -->
      <div class="left">
        <!-- 华语 <i class="iconfont icon-arrow-right-bold"></i> -->
        <el-popover
          placement="bottom-start"
          width="400"
          v-model="isPopoverShow"
          popper-class="sortPop"
          trigger="click">
          <div class="sortBox" slot="reference">
            {{currentTag.name}}<i class="iconfont icon-arrow-right-bold"></i>
          </div>
          <div class="sortList">
            <div class="sortItem" v-for="(item,index) in gedanCatList" :key="index" @click="clickSortItme(item,index)"
            :class="{sortActive:sortItemIndex == index?true:false}">
              {{item.name}}
            </div>
          </div>
        </el-popover>
      </div>
      <!-- 右侧navbar -->
      <div class="right">
        <div class="tagNavBar" v-for="(item,index) in HotTagList" :key="item.id" @click="clickTagNavBar(item,index)" :class="{active:tagNavBarIndex==index?true:false}">
          {{item.name}}
        </div>
      </div>    
    </div>
    <!-- 歌单列表 -->
    <div class="playList">
      <list-card :songSheetList="songSheetList" @clickListCardItem="clickListCardItem"></list-card>
    </div>

    <!-- 分页功能 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      class="fenye"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
// 引入api
import {getTheFirstOfHighquality,getHotTag ,getMusicList, getMusicListDetail} from 'network/api.js'
// 引入组件
import listCard from 'components/listCard/listCard.vue'
export default {
  name:'musicList',
  components:{
    listCard 
  },
  data() {
    return {
      // 高质量歌单
      TheFirstOfHighqualityData:{},
      // 全部歌单分类
      gedanCatList:[],
      // 歌单分类index
      sortItemIndex:0,
      // 当前选中分类
      currentTag:{},
      // 控制popover的显示和隐藏
      isPopoverShow:false,
      // 热门标签
      HotTagList:[],
      // tagNavBar的当前选中的index
      tagNavBarIndex:0,

      // 总数
      total:0,
      // 当前页码
      currentPage:1,
      // 当前页面列表个数
      pageSize:20,

      // 歌单卡片列表
      songSheetList:[]
    }
  },
  created() {
    getTheFirstOfHighquality().then(res=>{
      // console.log(res);
      this.TheFirstOfHighqualityData = res.data.playlists[0]
    })
    getHotTag().then(res=>{
      // console.log(res);
      // 默认为热门第一个
      this.currentTag = res.data.tags[0]
      this.HotTagList = res.data.tags
    })
    getMusicList().then(res=>{
      // console.log(res.data);
      this.gedanCatList = res.data.sub
    })
    getMusicListDetail().then(res=>{
      console.log(res);
      this.songSheetList = res.data.playlists
      this.total =res.data.total
    })
    this.tagNavBarIndex=-1
  },
  methods: {
    // 点击sortItem 触发事件
    clickSortItme(item,index){
      // console.log(index);
      this.sortItemIndex = index
      this.currentTag = item;
      this.isPopoverShow = false
      // 获取歌单
       getMusicListDetail(item.name,this.pageSize * (this.currentPage - 1),this.pageSize).then(res=>{
           console.log(res);
           this.songSheetList = res.data.playlists
        })
    },
    // 点击TagNavBar 触发事件
    clickTagNavBar(item,index){  
        this.tagNavBarIndex = index
        this.currentTag = this.HotTagList[index]
        // 还得传入name  获取歌单
        // console.log(item);

        getMusicListDetail(item.name,this.pageSize * (this.currentPage - 1),this.pageSize).then(res=>{
           console.log(res);
           this.songSheetList = res.data.playlists
           this.total =res.data.total
        })
    },
    // 点击个单列表卡片传递过来的事件
    clickListCardItem(id){
        console.log('我点击了歌单，快给我康详情',id);

    },
    // 改变条数
    handleSizeChange(val){
       console.log(`每页 ${val} 条`);
       this.pageSize = val
        getMusicListDetail(this.currentTag.name,this.pageSize * (this.currentPage - 1),this.pageSize).then(res=>{
           console.log(res);
           this.songSheetList = res.data.playlists
           this.total =res.data.total
        })
    },
    // 改变页面
    handleCurrentChange(val){
      console.log(`当前页: ${val}`);
      this.currentPage = val
      getMusicListDetail(this.currentTag.name,this.pageSize * (this.currentPage - 1),this.pageSize).then(res=>{
          console.log(res);
          this.songSheetList = res.data.playlists
          this.total =res.data.total
      })
    }
  },
  watch:{
    //监听 currentTag
    /* currentTag(newVal){
      console.log(newVal);
      this.tagNavBarIndex = this.HotTagList.findIndex(item=>{
        item.name == newVal.name
      }) */
      // console.log(this.tagNavBarIndex);
    // }
  }
}
</script>

<style scoped>
.highquality{
  position: relative;
  width: 100%;
  height: 175px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
}
.backgroundImg {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  transform: translateY(-80px);
  /* 滤镜 */
  filter: blur(30px) brightness(70%);
}
.cover {
  width: 150px;
  height: 150px;
  margin: 10px;
}

.cover img {
  border-radius: 10px;
  width: 100%;
}
.title {
  margin: 10px 0 0 10px;
}
.tag {
  border: 1px solid #d59e54;
  color: #d59e54;
   width: 100px;
   text-align: center;
   border-radius: 5px;
   padding: 5px;
  font-size: 12px;
}
.name {
  color: white;
  font-size: 20px;
  margin: 20px 0;
}

.desc {
  color: rgba(255, 255, 255, 0.5);
  font-size: 15px;
  transform: scale(0.9, 0.9);
}
.musicListNavBar{
  margin: 15px 0;
  display: flex;
  font-size: 12px;
}

.musicListNavBar .left {
  /* width: 60px; */
  cursor: pointer;
  text-align: center;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 15px;
}
.musicListNavBar .left i {
  font-size: 12px;
}
/* .sortPop{
  height: 40% !important;
  overflow-y:scroll  !important;
} */
/* #el-popover-9725{
   height: 40% !important;
  overflow-y:scroll  !important;
} */
.sortList{

  display: flex;
  flex-wrap: wrap;
}
.sortItem{
  font-size: 12px;
  width: 25%;
  text-align: center;
  color: rgb(85, 85, 85);
  padding: 5px 0;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 30px;
  transform: scale(0.9);
}
.sortActive{
  background-color: #fdf5f5;
  color: #ec4747;
}
.musicListNavBar .right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
.tagNavBar{
  line-height: 25px;
  margin-right: 20px;
  cursor: pointer;
}
.active {
  background-color: #fdf5f5;
  color: #ec4747;
  border-radius: 11px;
}
.fenye {
  margin: 10px auto;
  text-align: center;
}
</style>