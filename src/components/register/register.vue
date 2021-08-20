<template>
    <div class="register">
      <el-dialog
        :visible.sync="registerDialogVisible"
        width="40%"
        @close="closeRegisterDialog"
        >
        <!-- 我要开始注册咯 qwq -->
        <div class="registerContainer">
          <div class="logo">
            <img src="~assets/img/registered.png" alt="">
          </div>

           <!-- 第一步 :设置手机号和登录密码 -->
          <el-form :model="registerForm" ref="registerFormRef" label-width="100px">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="registerForm.phone" prefix-icon="el-icon-mobile-phone" placeholder="请输入手机号" size="small">
              </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="registerForm.password" type="password" prefix-icon="el-icon-lock" placeholder="请设置密码" size="small"></el-input>
            </el-form-item>
            <div class="tip">
              密码8~20位，至少包含字母/数组/字符2中组合
            </div>

               <el-button type="primary" @click="onSubmit" class="subBtn">立即创建</el-button>

        </el-form>
        </div>
       
        


        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="closeRegisterDialog">取 消</el-button>
          <el-button type="primary" @click="closeRegisterDialog">确 定</el-button>
        </span> -->
    </el-dialog>
    </div>
</template> 

<script>
// 引入api
import {checkPhone,getCode} from 'network/api.js'
export default {
  name:'register',
  props:['registerDialogVisible'],
  data() {
    return {
      registerForm:{
        phone:'',
        password:'',
        
      }
    }
  },
  methods: {
    // 关闭对话框
    closeRegisterDialog(){
      this.$emit('closeDialog')
    },
    // 创建账号
    async onSubmit(){
      console.log("开始创建账号");
      // 验证手机号和密码是否符合规则
      if(this.registerForm.phone.length !=11 || this.registerForm.password.length < 8 || this.registerForm.password.length >20){
        return this.$message.warning('账号或密码不符合规范')
      }
      // 先验证手机号是否已经被注册过
        let {data:res} = await checkPhone(this.registerForm.phone)
        console.log(res);
        // 如果账号没注册过，发送验证码
        if(res.exist !== 1){
          // 发送验证码
          //  getCode(this.registerForm.phone)
        }
    },
    // 获取验证码
    async 

  },
}
</script>

<style scoped>
  .registeredContainer{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
   .logo {
    width: 50%;   
  }
  .logo img {
    width: 100%;
  }
  .tip{
    height: 20px;
    text-align: center;
    font-size: 12px;
    color: #bbb;
    line-height: 12px;
  }
  .subBtn{
    width: 100%;
  }
</style>