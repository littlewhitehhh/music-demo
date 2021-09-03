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
        { name: "专辑", path: "/collection/collectionAlbum" },
        { name: "歌手", path: "/collection/collectionSinger" },
        { name: "视频", path: "/collection/collectionVideo" },
      ]
    }
  },
  created() {
    // 判断是否是登陆状态
    // console.log(this.$store.state.isLogin);
    /* if (!this.$store.state.isLogin) {
      this.$message.error("只有登录后才能进入每日推荐页面哦!");
      this.$router.replace("/index");
    } */
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