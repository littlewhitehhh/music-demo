<template>
  <div class="collectionVideo">
    <!-- 收藏过专辑 -->
    <div v-if="videoList.length !=0">
      <div class="count" >收藏的视频和mv({{count}})</div>
    <!-- <list-card :songSheetList ="singerList" @clickListCardItem="clickListCardItem"></list-card> -->
    <video-list-card :videoList = "videoList" @clickListCardItem="clickListCardItem"  :videoType="'video'"></video-list-card>
    </div>
    <!-- 没有收藏过专辑 -->
    <div v-else class="tip">
      暂无收藏视频
    </div>
  </div>
</template>

<script>
import {getCollectionVideo} from 'network/api'
import videoListCard from 'components/videoListCard/videoListCard.vue'
export default {
  name:'collectionVideo',
  components:{
    videoListCard
  },
  data() {
    return {
      videoList:[],
      count:0,
    }
  },
  created() {
    getCollectionVideo().then(res=>{
      console.log(res);
      this.videoList = res.data.data
      this.count = res.data.count
    })
  },
  methods: {
    clickListCardItem({id,index}){
      console.log('收藏的mv详情',id,index);
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