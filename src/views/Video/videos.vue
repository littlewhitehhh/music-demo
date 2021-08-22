<template>
  <div class="video">
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
  name:'video',
  components:{
    navBar
  },
  data() {
    return {
       navBarItem:[
        { name: "视频", path: "/video/videolist" },
        { name: "MV", path: "/video/mvlist" },
      ]
    }
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