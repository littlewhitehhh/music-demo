<template>
<!-- 页面框架 页面布局 -->
  <el-container>
    <!-- 头部 -->
    <el-header>
        <!--  使用头部导航栏组件-->
        <header-bar></header-bar>
    </el-header>
    <el-container>
      <!-- 左侧侧边栏 -->
      <el-aside width="200px">
        <!-- 使用左侧导航栏 -->
        <aside-bar></aside-bar>
      </el-aside>
      <!-- 右侧主体部分 -->
      <el-main>
        <!-- 二级路由占位符  discover video collection recommendmusic等-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  
</template>

<script>
// 引入结构组件
import headerBar from 'components/headerBar/headerBar.vue'          //头部导航栏组件
import asideBar from 'components/asideBar/asideBar.vue'

export default {
  name:'home',
  components:{
    headerBar,
    asideBar
  }
}
</script>

<style>
  .el-header {
    height: 50px!important;
    line-height: 50px !important;
    padding: 0;
    margin: 0;
  }
  .el-main {
    padding: 10px;
  }
</style>