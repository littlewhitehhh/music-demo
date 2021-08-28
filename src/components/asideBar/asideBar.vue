<template>
  <div class="asideBar">
    
    <!-- 侧边导航栏 -->
    <el-menu
      :default-active = activePath
      class="el-menu-vertical-demo"
      router
     >

      <el-menu-item :index="item.path" v-for="(item) in asiderBarList" :key="item.path" class="menu-item" @click="toPageByIndex(item.path)">
        <i class="iconfont" :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
      <!-- 创建的歌单和收藏的歌单 -->
    </el-menu>
  </div>
</template>

<script>
export default {
  name:'asideBar',
  data() {
    return {
      
      asiderBarList:[
        {
          title:'发现音乐',
          icon:'icon-yinle',
          path:'/discover'
        },
        {
          title:'视频',
          icon:'icon-shipin',
          path:'/video'
        },{
          title:'收藏',
          icon:'icon-more',
          path:'/collection'
        },{
          title:'每日推荐',
          icon:'icon-good',
          path:'/recommendMusic'
        }
      ],
      // 当前激活的menu-item
      activePath:'',
    }
  },
  created() {
    this.activePath =  window.sessionStorage.getItem('activePath') || '/discover'
    // 取路由中的首地址 用于侧边栏的导航active
    // this.activePath = "/" + this.$route.path.split("/")[1];
  },
  methods: {
    toPageByIndex(path){
      console.log("heiheihei",path);
      window.sessionStorage.setItem('activePath', path)
      this.activePath = path
    }
  },
}
</script>

<style scoped>
/* .el-menu{
  height: 100vh;
} */
.el-menu-item:hover {
  background-color: #f5f5f6 !important;
}
</style>