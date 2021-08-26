<template>
  <div class="mvList">
    <div class="firstbox">
      <div class="title">地区：</div>
      <second-navbar :SecondNavBarData="areaList" class="secondNavBar" @clickSecondBarItem="areaItem" :itemWidth="50"></second-navbar>
    </div>
    <div class="secondbox">
      <div class="title">类型：</div>
      <second-navbar :SecondNavBarData=" typeList" class="secondNavBar" @clickSecondBarItem="typeItem" :itemWidth="50"></second-navbar> 
    </div>
    <div class="thirdbox">
      <div class="title">排序：</div>
      <second-navbar :SecondNavBarData=" orderList" class="secondNavBar" @clickSecondBarItem="orderItem" :itemWidth="50"></second-navbar>
      <!-- <div>lalal </div> -->
    </div>
    <video-list-card :videoList="mvList" :videoType="'mv'" @clickListCardItem="goToMvDetail"></video-list-card>
  </div>
</template>

<script>
// 引入api
import {getMvList} from 'network/api.js'
//引入组件
import videoListCard from 'components/videoListCard/videoListCard.vue'
import secondNavbar from 'components/secondNavbar/secondNavbar.vue'
export default {  
  name:'mvList',
  components:{
    secondNavbar,
    videoListCard
  },
  data() {
    return {
      areaList: [
        { name: "全部", path: "" },
        { name: "内地", path: "内地" },
        { name: "港台", path: "港台" },
        { name: "欧美", path: "欧美" },
        { name: "日本", path: "日本" },
        { name: "韩国", path: "韩国" },
      ],
      // mv 类型
      typeList: [
        { name: "全部", path: "" },
        { name: "官方版", path: "官方版" },
        { name: "原生", path: "原生" },
        { name: "现场版", path: "现场版" },
        { name: "网易出品", path: "网易出品" },
      ],
      // 排序
      orderList: [
        { name: "上升最快", path: "" },
        { name: "最热", path: "最热" },
        { name: "最新", path: "最新" },
      ],
      // 当前地区
      area: "",
      // 当前类型
      type: "",
      // 当前排序
      order: "",
      // 当前视频页数
      mvPage: 1,
      // 是否还有更多视频数据
      hasMore: false,
      // 视频列表数据
      mvList: [],
      currentPage:1,
      pageSize:30,
    }
  },
  created() {
    this.getMv()
  },
  methods: {
    //二次封装获取mv列表
    getMv(){
      getMvList(this.type,this.area,this.order,(this.currentPage - 1 ) *this.pageSize).then(res=>{
        console.log(res);
        // 先清空
        this.mvList = [],
        this.mvList.push(...res.data.data)
        this.hasMore = res.data.hasMore
      })
    },
    areaItem(index){
      // console.log('啦啦啦',index);
      this.area = this.areaList[index].path
      this.getMv()
    },
    typeItem(index){
      this.type = this.typeList[index].path
      this.getMv()

      // console.log('lelele',index);
    },
    orderItem(index){
      this.order = this.orderList[index].path
      this.getMv()

      // console.log('heiheihei',index);
    },
    goToMvDetail(id){
      console.log('lalal',id);
    }
  },
}
</script>

<style scoped>
.firstbox, .secondbox, .thirdbox{
  display: flex;
}
.title{
   margin-left: 20px;
  font-size: 12px;
  width: 40px;
  line-height: 33px;
}
.secondNavbar{
  width: calc(100%-60px);
}
</style>