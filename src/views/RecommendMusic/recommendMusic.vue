<template>
  <div class="recommendMusic">
    <!-- 三级路由占位符 -->
    <!-- 头部导航组件 -->
    推荐歌单
    <!-- recommendMuic 直接显示歌单，所以不需要路由-->
    <!-- <router-view></router-view> -->
   
      <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <li v-for="i in count" class="infinite-list-item" :key="i">{{ i }}</li>
      </ul>
  </div>
</template>

<script>

export default {
  name:'recommendMusic',
  components:{
   
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    load () {
      console.log('我要起飞了');
        // this.count += 2
      }
  },
}
</script>

<style scoped>

</style>