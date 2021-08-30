

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
            width="250"
            trigger="focus"
            >  
            <el-input
              size="mini"  slot="reference" @input="inputSearch"
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="searchData"> 
              
            </el-input>
             
          <div class="hotSearchList" v-if="!suggestSearchLists.songs">
            这里是热搜榜
          </div>

          <div class="searchSuggest" v-if="suggestSearchLists.songs">
            这里是搜索建议
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
            <el-form :model="loginForm" ref="loginFormRef" label-width="100px" :rules="loginFormRules">
              <el-form-item label="手机号码" prop="phone">
                  <el-input v-model="loginForm.phone" size="small"></el-input>
                </el-form-item> 
                <el-form-item label="密码" prop="password">
                  <el-input v-model="loginForm.password" type="password" size="small"></el-input>
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
      hotSearchLists:[],
      // 搜索建议列表
      suggestSearchLists:[],
      

    }
  },
  created() {
    getHotSearch().then(res=>{
      // console.log(res);
      this.hotSearchLists = res.data.data
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
      // this.clearAllCookie();
      this.$message.success("退出成功!");
      // 刷新页面
      this.$router.go(0)
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



    // 搜索功能
    // 
    inputSearch(){
      console.log();
      if(!this.searchData.trim()){
        console.log('显示热搜榜');
        this.suggestSearchLists = []
      }else{
        console.log('显示搜索推荐');
        getSearchSuggest(this.searchData).then(res=>{
          console.log(res);
          this.suggestSearchLists = res.data.result
        })
      }
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

</style>