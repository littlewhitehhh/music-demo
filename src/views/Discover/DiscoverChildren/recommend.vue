/**         
  @data 2021-8-23

  未完成：
        点击歌单 跳转到歌单详情页面
 */


<template>
  <div class="recommend">
    

    <!-- 轮播图 -->
    <div class="banner">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item,index) in bannerList" :key="index">
          <img class="medium" :src="item.imageUrl">
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 推荐歌单模块 -->
    <div class="musicSheet">
      <h3>推荐歌单<i class="iconfont icon-arrow-right-bold"></i></h3>
      <!-- 列表卡片   再次用来呈现歌单-->
    <div class="list">
      <list-card :songSheetList="songSheetList" @clickListCardItem="clickListCardItem"></list-card>
    </div>
    </div>

    
  </div>
</template>

<script>
// 引入api
import {getBannerData,getRecommendMusic} from 'network/api.js'

//引入组件
import listCard from 'components/listCard/listCard.vue'
export default {
  name:'recommend',
  components:{
    listCard
  },
  created() {
    // 获取轮播图
    getBannerData().then(res=>{
      // console.log(res);
      this.bannerList = res.data.banners
    })
    //获取歌单数据
    getRecommendMusic().then(res=>{
      // console.log(res);
      this.songSheetList = res.data.result
    })
  },
  data() {
    return {
      // 轮播图数据
      bannerList:[],
      // 歌单数据
      songSheetList:[],
    }
  },
  methods: {
    clickListCardItem(id){
      console.log(id);
      // 跳转到各单项请页面
      // this.$router.push()
    }
  },
}
</script>

<style scoped>
/* .recommend{ */
  /* background-color: pink; */
  /* min-width: 1200px; */
/* } */
.banner {
  /* max-width: 1200px; */
  margin: 0 auto;
}
.el-carousel{
  margin: auto;
  width: 1000px;
}
.el-carousel__item img {
    /* color: #475669; */
    /* font-size: 14px; */
    width: 100%;
    height: 100%;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}
  
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
    border-radius:10px ;
}
  
.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
    border-radius:10px ;

}
.musicSheet{
  padding: 0 20px;
  /* background-color: pink; */
}
.list{
  margin-top: 10px;
  /* width: 1000px; */
  

}

</style>