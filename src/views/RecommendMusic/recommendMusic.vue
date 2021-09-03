<template>
  <div class="recommendMusic">
    <!-- 三级路由占位符 -->
    <!-- 头部导航组件 -->
    <!-- recommendMuic 直接显示歌单，所以不需要路由-->
    <!-- <router-view></router-view> -->
    <!-- 头部信息 -->
    <div class="recommendMusicInfo">
      <div class="title">
        <div class="image">
          <img src="~assets/img/recommendMusic.png" alt="">
        </div>
        <div class="titeInfo">
          <div class="top">
            每日歌曲推荐
          </div>
          <div class="bottom">根据你的口味音乐，每天6:00更新</div>
        </div>
      </div>
      <div class="btns">
        <div>
          <el-button class="btn iconfont icon-bofang" size="mini"  @click="playAll">播放全部</el-button>
          <el-button class="btn iconfont icon-xihuan" size="mini">收藏全部</el-button>
        </div>
      </div>
    </div>
    <!-- 歌单列表-->
    <el-table
    :data="dailySongs"
    stripe
    size="mini"
    style="width: 100%">
    <!--自定义索引-->
    <el-table-column type="index" :index="indexMethod"></el-table-column>
    <!-- 下载按钮 -->
    <el-table-column width="50">
      <template slot-scope="scope">
        <i class="el-icon-download" @click="download(scope.row.id)"></i>
      </template>
    </el-table-column>

    <el-table-column prop="name" label="音乐标题"></el-table-column>
    <el-table-column prop="ar[0].name" label="歌手"></el-table-column>
    <el-table-column prop="al.name" label="专辑"></el-table-column>
    <el-table-column label="时长">
      <template slot-scope="scope">
        {{scope.row.dt | handleMusicTime}}
      </template>
    </el-table-column>

    </el-table>
  </div>
</template>

<script>
import {getMusicRecommend} from 'network/api.js'
import { handleMusicTime } from "plugins/utils";
export default {
  name:'recommendMusic',
  components:{
   
  },
  data() {
    return {
      // 推荐歌曲列表
      dailySongs:[]
    }
  },
  created() {
    /* if (!this.$store.state.isLogin) {
      this.$message.error("只有登录后才能进入每日推荐页面哦!");
      this.$router.replace("/index");
    } */
    getMusicRecommend().then(res=>{
      console.log(res);
    this.dailySongs = res.data.data.dailySongs
    })
  },
  filters:{
    handleMusicTime,
  },
  methods: {
    // 播放全部
    playAll(){
      console.log('嘟嘟嘟，我要播放全部咯');
    },
    // 自定义索引
    indexMethod(index){
      if(index<10){
        return '0' + index
      }else{
        return index
      }
    },
    // 现在歌曲
    download(id){
      console.log('嘟嘟嘟，我姚下载了',id);
    }
  },
}
</script>

<style scoped>
.recommendMusic{
  padding: 0 20px ;
}
.recommendMusicInfo{
  padding: 20px 0;
}
.title {
    display: flex;
}
.image{
    width: 90px;
    height: 90px;
}
.image img{
    width: 100%;
}
.titeInfo{
  margin-left:10px ;
  padding: 10px 0;
}
.top {
  font-weight: 700;
  font-size: 18px;
  color: #000;
}
.bottom{
  margin-top: 10px;
  font-size: 12px;
}
.btns{
  margin-left: 10px;
}
.btn {
  border-radius: 20px;
  /* padding-left:2px ; */
}
.btn:first-child{
  background-color: #ec4141;
  color: white;
} 
</style>