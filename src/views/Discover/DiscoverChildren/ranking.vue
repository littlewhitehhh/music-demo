<template>
  <div class="ranking">
    <div class="firstBox">
      <!-- 标题 -->
      <div class="title">官方榜</div>
      <!-- 内容 -->
      <!-- <div>嘿嘿嘿</div> -->
      <!-- 出现大问题，暂时先用card显示出来 -->
      <!-- <list-table :sheetObject="item" v-for="(item) in officialList" :key="item.id"></list-table> -->
      <list-card :songSheetList="officialList" @clickListCardItem="clickListCardItem"></list-card>

    </div>.
    <div class="secondBox">
      <!-- 标题 -->
      <div class="title">全球榜</div>
      <!-- 内容 -->
      <!-- <div>哈哈哈哈哈哈哈哈哈哈哈哈</div> -->
      <list-card :songSheetList="worldList" @clickListCardItem="clickListCardItem"></list-card>
    </div>
  </div>
</template>

<script>
// 引入apis
import {getAllRankings} from 'network/api.js'

// 引入组件
import listCard from 'components/listCard/listCard.vue'
import listTable from 'components/listTable/listTable.vue'
export default {
  name:'ranking',
  components:{
    listCard,
    listTable 
  },
  data() {
    return {
      // 官方榜
      officialList:[],
      // 全球帮
      worldList:[]
    }
  },
  created() {
    getAllRankings().then(res=>{
      console.log(res);
      this.officialList = res.data.list.slice(0,4)
      this.worldList = res.data.list.slice(4)
    })
  },
  methods: {
    // 点击listIem传递过来的触发事件
    clickListCardItem(id){
      console.log('我是从listCard传递过来的', id);
    }
  },
}
</script>

<style scoped>
.title{
  font-weight: 700;
  margin-bottom: 20px;
  font-size: 20px;
}
</style>