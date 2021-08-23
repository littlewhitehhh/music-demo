<template>
  <div id="app">
   <!-- index路由占位符（一级）-->
   <router-view></router-view>
  </div>
</template>

<style>
body{
  overflow-x: hidden;
}
/* 歌单tag标签 */
.sortPop{
  height: 40% !important;
  overflow-y:scroll  !important;
}
</style>
