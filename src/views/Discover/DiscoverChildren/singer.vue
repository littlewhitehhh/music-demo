<template>
  <div class="singer">
    <div class="firstbox">
      <div class="title">语种：</div>
      <second-navbar :SecondNavBarData="languageSort" class="secondNavBar" @clickSecondBarItem="areaItem"></second-navbar>
    </div>
    <div class="secondbox">
      <div class="title">分类：</div>
      <second-navbar :SecondNavBarData=" typeSort" class="secondNavBar" @clickSecondBarItem="typeItem"></second-navbar>
      

    </div>
    <div class="thirdbox">
      <div class="title">筛选：</div>
      <second-navbar :SecondNavBarData=" initialSort" class="secondNavBar" @clickSecondBarItem="initialItem"></second-navbar>
      <!-- <div>lalal </div> -->
        


    </div>
    <list-card :songSheetList="singerList" @clickListCardItem="clickSingerItem"></list-card>
  </div>
</template>

<script>
//引入api
import {getSingerList} from 'network/api.js'
//引入组件
import secondNavbar from 'components/secondNavbar/secondNavbar.vue'
import listCard from 'components/listCard/listCard.vue'
export default {
  name:'singer',
  components:{
    secondNavbar,
    listCard
  },
  data() {
    return {
      // 语种
      languageSort: [
        { area: -1, name: "全部" },
        { area: 7, name: "华语" },
        { area: 96, name: "欧美" },
        { area: 8, name: "日本" },
        { area: 16, name: "韩国" },
        { area: 0, name: "其它" },
      ],
      // 类型
      typeSort: [
        { type: -1, name: "全部" },
        { type: 1, name: "男歌手" },
        { type: 2, name: "女歌手" },
        { type: 3, name: "乐队" },
      ],
      // 首字母
      initialSort: [
        { initial: -1, name: "热门" },
        { initial: "a", name: "A" },
        { initial: "b", name: "B" },
        { initial: "c", name: "C" },
        { initial: "d", name: "D" },
        { initial: "e", name: "E" },
        { initial: "f", name: "F" },
        { initial: "g", name: "G" },
        { initial: "h", name: "H" },
        { initial: "i", name: "I" },
        { initial: "j", name: "J" },
        { initial: "k", name: "K" },
        { initial: "l", name: "L" },
        { initial: "m", name: "M" },
        { initial: "n", name: "N" },
        { initial: "o", name: "O" },
        { initial: "p", name: "P" },
        { initial: "q", name: "Q" },
        { initial: "r", name: "R" },
        { initial: "s", name: "S" },
        { initial: "t", name: "T" },
        { initial: "u", name: "U" },
        { initial: "v", name: "V" },
        { initial: "w", name: "W" },
        { initial: "x", name: "X" },
        { initial: "y", name: "Y" },
        { initial: "z", name: "Z" },
        { initial: 0, name: "#" },
      ],
      area: -1,
      type: -1,
      initial: -1,
      // 当前所在页数
      currentPage: 1,
      pageSize:30,
      // 歌手列表
      singerList:[],
      isMore:false
    }
  },
  created(){
    this.getSingers()
  },
  methods: {
    // 二次封装请求
    getSingers(){
      getSingerList(this.type,this.area,this.initial,(this.currentPage - 1 ) *this.pageSize).then(res=>{
        // console.log(res);
        // 先清空
        this.singerList = [],
        this.singerList.push(...res.data.artists)
        this.isMore = res.data.more
      })
    },
    
    areaItem(index){
      // console.log(index);
      this.area = this.languageSort[index].area
      this.getSingers()
    },
    typeItem(index){
      // console.log(index);
      this.type = this.typeSort[index].type
      this.getSingers()

    },
    initialItem(index){
      // console.log(index);
      this.initial = this.initialSort[index].initial
      this.getSingers()

    },
    bottomLoad(){
      console.log('嘿嘿嘿');
      // 如果还有更多，则继续加载
       if (this.isMore == true) {
        this.currentPage += 1;
        this.getSingers();
      }
    },
    // 点击歌手康详情
    clickSingerItem(id){
      console.log("我要进去咯",id);
    }
  },
  
}
</script>

<style scoped>
.firstbox,.secondbox,.thirdbox{
  display: flex;
  margin-bottom: 20px;
}
.title{
  margin-left: 20px;
  font-size: 12px;
  width: 40px;
  line-height: 33px;
}
.secondNavBar {
  width: calc(100% - 60px);
}

</style>