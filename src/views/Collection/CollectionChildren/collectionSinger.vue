<template>
  <div class="collectionSinger">
    <!-- 收藏过专辑 -->
    <div v-if="count !=0">
      <div class="count" >收藏的歌手（{{count}})</div>
    <list-card class="list-card" :songSheetList ="singerList" @clickListCardItem="clickListCardItem"></list-card>
    </div>
    <!-- 没有收藏过专辑 -->
    <div v-else class="tip">
      暂无收藏歌手
    </div>
  </div>
</template>

<script>
import {getCollectionSinger} from 'network/api'
import listCard from 'components/listCard/listCard'
export default {
  name:'collectionSinger',
  components:{
    listCard
  },
  data() {
    return {
      singerList:[],
      count:0
    }
  },
  created() {
    getCollectionSinger().then(res=>{
      console.log(res);
      this.singerList = res.data.data
      this.count = res.data.count
    })
  },
  methods: {
    clickListCardItem(id){
      console.log("我要进入收藏歌手的详情了",id);
    }
  },

}
</script>

<style scoped>
.count{
  font-size: 12px;
  margin-left:10px;
  margin-bottom: 10px;
}
.tip {
  text-align: center;
}
.list-card{
  margin-left: 10px;
}
</style>