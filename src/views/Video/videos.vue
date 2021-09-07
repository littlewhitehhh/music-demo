<template>
  <div class="videos">
    <!-- 三级路由占位符 -->
    <!-- 头部导航组件 -->
    <nav-bar :navBarItem='navBarItem' @clickBarItem="clickBarItem"></nav-bar>
    <router-view class="videosList"></router-view>
  </div>
</template>

<script>
// 引入navbar头部导航组件
import navBar from 'components/navBar/navBar.vue'

export default {
  name:'videos',
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
  created() {
    /* if (!this.$store.state.isLogin) {
      this.$message.error("只有登录后才能进入视频页面哦!");
      this.$router.push("/index");
    } */
  },
  methods: {
    clickBarItem(path){
      this.$router.push(path)
    }
  },
}
</script>

<style scoped>
  /* .videoList { */
   /* max-width: 1000px; */
    /* margin: auto;
    overflow-y: scroll;
    height: calc(100vh - 162px);
    padding: 0 0px;
    padding-left:10px ; */
  /* } */
</style>