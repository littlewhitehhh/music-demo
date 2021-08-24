<template>
  <div class="discover">
    <!-- 三级路由占位符 -->
    <!-- 头部导航组件 -->
    <nav-bar :navBarItem='navBarItem' @clickBarItem="clickBarItem"></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
// 引入navbar头部导航组件
import navBar from 'components/navBar/navBar.vue'

export default {
  name:'discover',
  components:{
    navBar
  },
  data() {
    return {
       navBarItem:[
        { name: "个性推荐", path: "/discover/recommend" },
        { name: "歌单", path: "/discover/musiclist" },
        { name: "排行榜", path: "/discover/ranking" },
        { name: "歌手", path: "/discover/singer" },
      ]
    }
  },
  created() {
    // this.$router.push(window.sessionStorage.getItem('path'))
  },
  methods: {
    clickBarItem(path){
      // console.log(path);
    this.$router.push(path)
    
    }
  },
}
</script>

<style scoped>

</style>