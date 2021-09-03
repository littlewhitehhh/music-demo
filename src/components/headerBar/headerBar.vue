

/*
  data: 2021-08-21 
  未完成：
        搜索功能未完成   popover弹出框显示存在bug
  存在问题（bug）：
        注册功能可能有bug
        登录/退出 会有抖动

 */


<template>

  <div class="headerBar">
    <!-- logo 左边盒子-->
    <div class="logo">
     <router-link to="/index" class="toIndex" >
      <img src="../../assets/img/logo.png" alt="">
     </router-link>
    </div>
   <!-- 中间盒子 -->
    <div class="center">
     <!-- 前进 后退按钮 -->
      <div class="btns">
        <el-button icon="el-icon-arrow-left" circle size='mini' @click="goBack"></el-button>
        <el-button icon="el-icon-arrow-right" circle size='mini' @click="goForward"></el-button>
      </div>
     
     <!-- 搜索框和搜索弹出框 -->
     <div class="search">
       <!-- 搜索框  应该手动激活 -->
         <el-popover
            ref="popover"
            placement="bottom"
            width="300"
            trigger="focus"
            poper-class="searchPop"
            v-model="isSearchPopShow">  
            <el-input
              size="mini" 
              slot="reference" 
              @input="inputSearch"
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="searchData"
              @keyup.enter.native="onSubmit">   
            </el-input>
             <!-- 搜索历史不想做了，做的话可以将搜索历史存到localstorage中 -->
             <!--热搜榜  -->
            <div class="hotSearch" v-if="!searchSuggestList.songs">
              <div class="hotSearchTitle">热搜榜</div>
              <div class="hotSearchItem" 
                  v-for="(item,index) in hotSearchList"
                  :key="index"
                  @click="clickHotSearchItem(item.searchWord)">
                    <!--热搜索引 -->
                    <div class="hotSearchIndex" :class="index < 3? 'topThree':''">
                      {{index + 1}} 
                    </div> 
                    <div class="hotSearchInfo">
                      <!-- 热搜关键字 -->
                      <div class="hotSearchWord" :class="index<3? 'hotSearchWordTopThree':''">
                          {{item.searchWord}}
                      </div>
                      <!-- 热搜内容 -->
                      <div class="searchContent">{{item.content}}</div>
                    </div>    
              </div>
            </div>
              <!-- 搜索建议 -->
            <div class="searchSuggest" v-if="searchSuggestList.songs">
              <div class="hotSerachTitle">搜索建议</div>
              <!-- 单曲 -->
              <!-- 判断有没有单曲名称 -->
              <div class="searchSuggestItem" v-if="searchSuggestList.songs && searchSuggestList.songs.length !=0">
                  <!-- 单曲标题 -->
                  <div class="searchSuggestItemTitle">
                    <i class="iconfont icon-yinle"></i>单曲
                  </div>
                  <!-- 单曲名称-歌手 -->
                  <div class="suggestItemDetail"
                       v-for="(item,index) in searchSuggestList.songs"
                       :key="index"
                       @click="clickSuggestSong(item.id)"> 
                        {{item.name + '-' + item.artists[0].name}}
                  </div>
              </div>
              <!-- 歌手 -->
              <!-- 判断有没有符合的歌手名称 -->
              <div class="serachSuggestItem" v-if="searchSuggestList.artists && searchSuggestList.artists.length !=0">
                <!-- 歌手标题 -->
                <div class="searchSuggestItemTitle">
                  <i class="iconfont icon-mic"></i>歌手
                </div>
                <!--歌手名称 -->
                <div class="suggestItemDetail"
                     v-for="(item,index) in searchSuggestList.artists" :key="index"
                     @click ="clickSuggestSinger(item.id)">
                      {{item.name}}
                </div>
              </div>
              <!-- 专辑 -->
              <!-- 判断有没有符合的专辑名称 -->
              <div class="serachSuggestItem" v-if="searchSuggestList.albums && searchSuggestList.albums.length !=0">
                <!-- 歌手标题 -->
                <div class="searchSuggestItemTitle">
                  <i class="iconfont icon-more"></i>专辑
                </div>
                <!--歌手名称 -->
                <div class="suggestItemDetail"
                     v-for="(item,index) in searchSuggestList.albums" :key="index"
                     @click ="clickSuggestAlbum(item.id)">
                      {{item.name + "-" + item.artist.name}}
                </div>
              </div>
              <!-- 歌单 -->
              <!-- 判断有没有符合的专歌单名称 -->
              <div class="serachSuggestItem" v-if="searchSuggestList.playlists && searchSuggestList.playlists.length !=0">
                <!-- 歌手标题 -->
                <div class="searchSuggestItemTitle">
                  <i class="iconfont icon-gedan"></i>歌单
                </div>
                <!--歌手名称 -->
                <div class="suggestItemDetail"
                     v-for="(item,index) in searchSuggestList.playlists" :key="index"
                     @click ="clickSuggestMusicList(item.id)">
                      {{item.name}}
                </div>
              </div>
            </div>
          </el-popover>
     </div>
    </div>
   <!-- 右边盒子 -->
    <div class="right">
     <!-- 用户展示分为未登录和已经登录两种 -->
     <div class="user">
       <!-- 头像 -->
        <div class="avatar">
          <!-- 未登录状态 -->
          <el-popover
            placement="bottom"
            width="330"
            trigger="click"
            v-if="!userInfo.avatarUrl"
            >
            <!--登陆表单 -->
            <el-form :model="loginForm" ref="loginFormRef" label-width="100px" :rules="loginFormRules" >
              <el-form-item label="手机号码" prop="phone">
                  <el-input v-model="loginForm.phone" size="mini"></el-input>
              </el-form-item> 

              <el-form-item label="密码" prop="password">
                  <el-input v-model="loginForm.password" type="password" size="mini"></el-input>
               </el-form-item>
                <!-- 登录按钮 -->
                <div class="loginButton">
                  <el-button type="danger" size="mini" @click="login" >登录</el-button>
                </div>
                <div class="regEnter" @click="register">注册</div>   
            </el-form>
            <!-- 登录图标 -->
            <img src="../../assets/img/test.jpg" alt="" slot="reference">
          </el-popover> 
         <!--已登录状态  -->
          <el-popover
            v-else
            placement="bottom"
            width="330"
            trigger="click"
            v-model="isPopoverShow"
          >
            <!-- 用户头像 -->
            <img :src="userInfo.avatarUrl" alt="" slot="reference" >
            <!-- 退出登录按钮 -->
            <div class="loginButton">
              <el-button type="danger" size="mini" @click="logout">退出登录</el-button>
            </div>
          </el-popover>
        </div>
        <!-- 同样两种状态 -->
        <div class="username" v-if="userInfo.nickname">
          {{userInfo.nickname}}
        </div>
        <div class="username" v-else>点击头像登录账号</div>
      </div>
    </div>


   <!-- 注册对话框 -->
    <register :registerDialogVisible='registerDialogVisible' @closeDialog='closeDialog'></register>
  </div>
</template>

<script>
let timer;
//引入api网络请求
import {loginByPhone,getHotSearch,getSearchSuggest}  from 'network/api.js'

// 引入注册对话框组件
import register from 'components/register/register.vue'
export default {
  name:'headerBar',
  components:{
    register 
  },
  data() {
    return {
      // 登录表单数据
      loginForm:{
        phone:'18854890529',
        password:'Web159753'
      },
      // 表单验证规则
      loginFormRules:{
         phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
         
          ],
        password:[
          { required: true, message: '请输入手机号码', trigger: 'blur' },
        ]
      },
      // 用户信息
      userInfo:{},
      // 控制弹出框的显示与隐藏
      isPopoverShow:false,

      // 控制注册对话框的显示和隐藏
      registerDialogVisible:false,



      // 搜索
      // 搜索框绑定数据
      searchData:'',
      // 热搜榜单
      hotSearchList:[],
      // 搜索建议列表
      searchSuggestList:{},
      //  是否显示注册狂
      isSearchPopShow:false
      

    }
  },
  created() {
    // 获取热搜列表
    getHotSearch().then(res=>{
      console.log(res);
      this.hotSearchList = res.data.data
    })
     
    if (window.localStorage.getItem("userInfo")) {
      // 表示已经登陆了，所以更新vuex里面的登陆状态
      this.$store.commit("updataLoginState");
      // 从localStorage中取userinfo
      this.userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    }
  },
  methods: {
    // 向后
    goBack(){
      this.$router.go(-1)
    },
    //向前
    goForward(){
      this.$router.go(1)
    },
    // 手机号码登陆
    login(){
      // 进一步进行表单验证
      this.$refs.loginFormRef.validate( async (valid)=>{
        // 通过
        if(valid){
          // console.log('允许提交');
          const {data:res} = await loginByPhone(this.loginForm)
          // console.log(res);
          // 登陆成功
          if(res.code==200){
            // 将用户信息存储到localstorage
            window.localStorage.setItem('userInfo',JSON.stringify(res.profile))
            this.userInfo = res.profile;
            this.$message.success("登录成功!");
            this.isPopoverShow = false;
            // this.$store.commit("updataLoginState");
            // 刷新页面
            this.$router.go(0)
          }else if (res.code == 400) {
            this.$message.error('手机号错误');
          }else if (res.code == 502) {
            this.$message.error('密码错误');
          }else{
            this.$message.error('登陆失败，请稍后重试');
          }
          // 清空表表单
          this.$refs.loginFormRef.resetFields();
        }else{
          alert('表单验证失败，请输入正确手机号或者密码')
          // 清空表单
          this.$refs.loginFormRef.resetFields();
        }
      })
    },
    // 退出登录
    logout(){
      // console.log('我要退出了');
      this.isPopoverShow = false
      this.userInfo = {};
      window.localStorage.setItem("userInfo",'');
      //在vuex中更新登录状态
      this.$store.commit("updataLoginState");
      this.isPopoverShow = false;
      this.clearAllCookie();
      this.$message.success("退出成功!");
      // 刷新页面
      // this.$router.replace('/index')
      // this.$router.go(0)
    },
    // 注册对话框打开
    register(){
      console.log('我要注册了');
      this.registerDialogVisible = true
    },
    // 注册对话框关闭
    closeDialog(){
      this.registerDialogVisible = false
    },
    //清除所有cookie函数
    clearAllCookie() {
      var date = new Date();
      date.setTime(date.getTime() - 10000);
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      console.log("需要删除的cookie名字：" + keys);
      if (keys) {
        for (var i = keys.length; i--; )
          document.cookie =
            keys[i] + "=0; expire=" + date.toGMTString() + "; path=/";
      }
    },

    


    // 搜索功能
    // 判断input框内是否有内容来显示热搜榜和搜索推荐
    inputSearch(){
      clearTimeout(timer);
      if(!this.searchData.trim()){
        console.log('显示热搜榜');
        // 清空搜索推荐
        this.searchSuggestList = {}
        return
      }else{
        console.log('显示搜索推荐');
        timer = setTimeout(() => {
          getSearchSuggest(this.searchData).then(res=>{
          console.log(res);
          this.searchSuggestList = res.data.result
        })
        }, 500);   
      }
    },
    //在输入框按下回车的回调
    onSubmit(){
      console.log('我要搜索了');
      this.goSearch()
    } ,
    // 携带参数跳转到搜索页面
     goSearch() {
      this.isSearchPopShow = false;
     /*  this.$router.push({ name: "search", params: { id: this.searchInput } }); */
      console.log('跳转到搜索页面');
    },
    // 点击热搜榜item的回调
    clickHotSearchItem(searchWord){
      this.searchData = searchWord
      this.goSearch();
      console.log('热搜榜回调');
    },
    // 点击搜索建议中专辑的回调
     clickSuggestAlbum(id){
       console.log('专辑回调',id);
       this.isSearchPopShow = false;
     },
     // 点击搜索建议中歌手的回调
     clickSuggestSinger(id){
       console.log('歌手回调',id);
       this.isSearchPopShow = false;
     },
     // 点击搜索建议中歌单的回调
     clickSuggestMusicList(id){
       console.log('歌单回调',id);
       this.isSearchPopShow = false;
     },
     // 点击搜索建议中单曲的回调
     clickSuggestSong(id){
        console.log('歌单回调',id);
       this.isSearchPopShow = false;
     }
  },
}
</script>

<style scoped>
@import './navBarElement.css';
  .headerBar {
    position: relative;
    height: 50px;
    background-color: #ec4141;
    display: flex;
    align-items: center;
  }
 
  .logo {
    width: 110px;
    height: 30px;
    line-height: 30px;
    margin: 0 50px 0 10px;
  }
  .toIndex{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .toIndex img {
    width: 100%;
  }
  .center {
    display: flex;
    align-items: center;
  } 
  
  .el-button {  
    background-color: #e13e3e;
    border: 0;
    color: #fff;
    margin-left: 5px;
  }
  .search {
    margin-left: 15px;  
  }

  .right{
    position: absolute;
    display: flex;
    height: 100%;
    right: 50px;
    top: 0;
    line-height: 50px; 
  }
  .user{
    display: flex;
    align-items: center;
  }
  .avatar{
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 7px;
    cursor: pointer;
  }
  .avatar img {
    height: 100%;
  }
  .el-form-item__content  .el-input__inner {
    background-color: #fff !important;
  }
  .loginButton ,.regEnter{
  width: 100%;
  margin-top:10px ;
  text-align: center;
}
.username{
  font-size: 12px;
  color: #fff;
  margin-left: 10px;
}
.hotSearchTitle {
  font-size: 13px;
  margin: 10px 0 5px 20px;
}

.hotSearchItem {
  display: flex;
  align-items: center;
  padding: 6.5px 15px;
  cursor: pointer;
}

.hotSearchItem:hover {
  background-color: #f2f2f2;
}

.hotSearchIndex {
  margin-right: 15px;
  color: #aaa;
}

.topThree {
  color: #e13e3e;
}

.hotSearchWord {
  font-size: 12px;
  color: rgb(51, 51, 51);
}

.hotSearchWordTopThree {
  font-weight: 600;
  color: black;
}

.hotSearchContent {
  font-size: 12px;
  transform: scale(0.9) translateX(-5%);
}

.searchSuggest {
  font-size: 12px;
}

.searchSuggestItemTitle {
  background-color: #f5f5f7;
  padding: 4px 8px;
}

.searchSuggestItemTitle i {
  font-size: 15px;
}

.searchSuggestItem {
  cursor: pointer;
}

.suggestItemDetail {
  padding: 4px 27px;
  font-size: 12px;
}

.suggestItemDetail:hover {
  background-color: #f2f2f2;
}
.regEnter {
  width: 100%;
  text-align: center;
  margin-top: 10px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
}

</style>