<template>
  <div class="collectionAlbum">
    <!-- 收藏过专辑 -->
    <div v-if="count !=0">
      <div class="count" >收藏的专辑（{{count}})</div>
    <list-card :songSheetList ="AblumList" @clickListCardItem="clickListCardItem"></list-card>
    </div>
    <!-- 没有收藏过专辑 -->
    <div v-else class="tip">
      暂无收藏专辑
    </div>
  </div>
</template>

<script>
// 引入api
import {getCollectionAlbum} from 'network/api.js'

// 引入listCard组件
import listCard from 'components/listCard/listCard'
export default {
  name:'collectionAlbum',
  components:{
    listCard
  },
  data() {
    return {
      // 专辑列表
      AblumList:[],
      // 专辑数量
      count:0
    }
  },
  created() {
    getCollectionAlbum().then(res=>{
      // console.log(res);
      this.AblumList = res.data.data
      this.count = res.data.count
    })
  },
  methods: {
    // 点击卡片触发事件
    clickListCardItem(id){
      console.log('这是专辑详情的id',id);
    }
  },
}
</script>

<style scoped>
.count{
  font-size: 12px;
}
.tip {
  text-align: center;
}
</style>