<template>
  <div class="asideBar">
    
    <!-- 侧边导航栏 -->
    <el-menu
      :default-active = activePath
      class="el-menu-vertical-demo"
      router
     >
      <el-menu-item :index="item.path" v-for="(item) in asiderBarList" :key="item.path" class="menu-item" >
        <i class="iconfont" :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
      <!-- 创建的歌单和收藏的歌单 -->
      <!-- 创建的歌单 -->
      <el-menu-item-group>
        <template slot="title" class="groupTitle">创建的歌单</template>
        <el-menu-item  v-for="item in createdMusicList" :key="item.id" :index="'/songSheetDetail/' + item.id">
         <i class="iconfont icon-gedan"></i>{{item.name}}
        </el-menu-item>
      </el-menu-item-group>

      <!--收藏的歌单  -->
      <el-menu-item-group>
        <template slot="title" class="groupTitle">收藏的歌单</template>
        <el-menu-item  v-for="item in collectedMusicList" :key="item.id" :index="'/songSheetDetail/' + item.id">
         <i class="iconfont icon-gedan"></i>{{item.name}}
        </el-menu-item>
         
      </el-menu-item-group>

    </el-menu>
  </div>
</template>

<script>
import {getMusicSheetList} from 'network/api.js'
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
      // 用户信息
      userInfo:{},
      // 创建的歌单
      createdMusicList:[],
      // 收藏的歌单
      collectedMusicList:[]
    }
  },
  created() {
    
    // 取路由中的首地址 用于侧边栏的导航active
    this.activePath = "/" + this.$route.path.split("/")[1];
    console.log(this.$route.path.split("/")[1]);

    // this.activePath =  window.sessionStorage.getItem('activePath') || '/discover'

    // 顶部栏读取登陆状态需要一定时间，所以延时500ms后执行
    setTimeout(()=>{
      this.getMusicList()
    },500)
  },
  methods: {
    // 换页
   /*  toPageByIndex(path){
      // console.log("heiheihei",path);
      window.sessionStorage.setItem('activePath', path)
      this.activePath = path
    }, */
    // 根据用户信息获取收藏的歌单和创建的歌单 二次封装api
    getMusicList(){
      // 先判断是否登录   this.$store.state.isLogin
      if(this.$store.state.isLogin != true){
         this.$message.error("请先进行登录操作");
          return
      }else{
        // 暂时不不知道干什么用的  估计跟音乐播放计时有关  
        //Date.parse()  返回当前时间的毫秒数
        let timestamp = Date.parse(new Date());
        this.userInfo = window.localStorage.getItem('userInfo')  && JSON.parse(window.localStorage.getItem('userInfo'))
        console.log(this.userInfo);
        getMusicSheetList(this.userInfo.userId).then(res=>{
          // console.log(res);
          // 对数据进行分类
          let playList =res.data.playlist;
          // console.log(playList);
          let index = playList.findIndex(item=>item.subscribed==true)
          this.createdMusicList = playList.slice(0,index)
          this.collectedMusicList = playList.slice(index)
          // 将收藏和创建的歌单上传至vuex
          this.$store.commit('updateCollectMusicList',this.collectedMusicList)
          this.$store.commit('updateCreatedMusicList',this.createdMusicList)
        })
      }
    }
  },
}
</script>

<style scoped>
/* .el-menu{
  height: 100vh;
} */
.el-menu-item{
  text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.el-menu-item:hover {
  background-color: #f5f5f6 !important;
}
</style>