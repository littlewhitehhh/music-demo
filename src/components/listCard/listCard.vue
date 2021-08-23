/**
    名称： listCard  卡片视图
    作用：用来将歌单，歌手 .视频 mv等数据以卡片形式呈现所封装的组件
   */
<template>
  <div class="listCard">
    <div class="listCardItem" v-for="item in songSheetList" :key="item.id" @click="clickListCardItem(item.id)">
      <div class="image">
        <img :src="(item.picUrl || item.coverImgUrl)" alt="">
      </div>
      <div class="title">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  naem:'listCard',
  props:{
    songSheetList:{
      type:Array,
      default:{},
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    // 点击卡片触发点击事件
    clickListCardItem(id){
      // 向父组件传递点击事件
       this.$emit("clickListCardItem", id);
    }
  },
}
</script>

<style scoped>
  .listCard{
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0; 
  }
  .listCardItem{
    width: 18%;
    margin: 0 2% 20px 0;
    overflow: hidden;
    cursor: pointer;
    
  }
  .image img{
    width: 100%;
    border-radius: 10px;
  }
  .title{
    margin-top: 5px;
    font-size: 12px;
  }
</style>