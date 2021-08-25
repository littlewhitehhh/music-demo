/**
    名称： listCard  卡片视图
    无限滚动有bug
    作用：用来将歌单，歌手 .视频 mv等数据以卡片形式呈现所封装的组件
   */
<template>
  <div class="listCard" 
      v-infinite-scroll="load" 
      :infinite-scroll-distance="300" 
      :infinite-scroll-immediate="false" 
      :infinite-scroll-disabled="disabled" style="overflow:auto">
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
      default:[],
    },
    // 是否使用上拉触底事件
    isLoad: {
      type: Boolean,
      default :false
    },
  },
  data() {
    return {
      // 无限滚动是否可用
      disabled: true,
    }
  },
  methods: {
    // 点击卡片触发点击事件
    clickListCardItem(id){
      // 向父组件传递点击事件
       this.$emit("clickListCardItem", id);
    },
    load(){
      // console.log('qifei')
      this.$emit('bottomLoad')
      // 触发load后加载数据，期间不允许再次触发load事件
      // this.disabled = true;
    }
  },
 /*  watch: {
    //   数据更新后，再次运行触发load事件
    songSheetList() {
      if (this.isLoad == true) {
        if (this.songSheetList.length != 0) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      }
    },
  }, */
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