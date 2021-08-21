<template>
    <div class="register">
      <el-dialog
        :visible.sync="registerDialogVisible"
        width="400px"
        @close="closeRegisterDialog"
        >
        <!-- 我要开始注册咯 qwq -->
        <div class="registerContainer">
          <div class="logo">
            <img src="~assets/img/registered.png" alt="">
          </div>

           <!-- 第一步 :设置手机号和登录密码 -->
          <el-form :model="registerForm" ref="registerFormRef" label-width="100px" v-if="currentStep==0">
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
          <!-- 第二步:获取验证码并填写接收到的验证码 -->
          <el-form class="form" v-else-if="currentStep == 1">
            <el-form-item class="codeInput">
              <el-input
                class="mobile"
                prefix-icon="el-icon-key"
                size="small"
                placeholder="请填写验证码"
                v-model="code">
              </el-input>
                <div class="codeButtonContainer">
                  <div class="codeButton" v-if="!isCountDownShow" @click="getVerifyCode">
                    获取验证码
                  </div>
                  <div class="countDown" v-else>{{ countDown }}<span>s</span></div>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button @click="submitCodes" size="small">下一步</el-button>
              </el-form-item>
          </el-form>

          <!-- 第三步完成注册-->

           <el-form class="form" v-else-if="currentStep == 2">
            <el-form-item>
              <el-input
                class="mobile"
                prefix-icon="el-icon-user"
                size="small"
                placeholder="请填写昵称"
                v-model="registerForm.nickname"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                @click="finishRegistered"
                size="small"
                >完成注册</el-button
              >
            </el-form-item>
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
let timer
// 引入api
import {checkPhone,getCode,submitCode,finishRegister} from 'network/api.js'
export default {
  name:'register',
  props:{
    registerDialogVisible:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      // 注册用户信息
      registerForm:{
        phone:'',
        password:'',
        nickname:''
        
      },
      // 当前第几步
      currentStep:0,
      //验证码
      code:'',
      // 发送验证码倒计时
      countDown:60,
      // 是否显示倒计时
      isCountDownShow:false,

    }
  },
  methods: {
    // 关闭对话框
    closeRegisterDialog(){
      // 重置所有数据
      this.registerForm = {
        mobile: "",
        password: "",
        nickname: "",
      };
      this.currentStep = 0;
      this.code = "";
      this.isCountDownShow = false;
      this.countDown = 60;
      this.$emit('closeDialog')
    },
    //第一步：创建账号
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
          // 发送验证码9
         await this.getVerifyCode();
        //  进入第二部
         this.currentStep = 1;

          
        }
    },
    // 第二步：获取验证码
    async getVerifyCode(){
       let {data:res} = await getCode(this.registerForm.phone)
            //  console.log(res);
            // 发送成功
            if(res.code == 200){
              // 考试倒计时
              this.countDown = 60
              this.isCountDownShow = true
              timer = setInterval(()=>{
                if(this.countDown == 0){
                  clearInterval(timer)
                  this.isCountDownShow = false;
                  return;
                }else{
                  this.countDown--
                }
              },1000)
            }else{
              this.$message.error(res.message);
            }
    },
    //第二步： 提交验证码
    async submitCodes(){
      console.log("验证验证码");
      // 四位数验证码
      if(this.code.length !==4){
        this.$message.error('验证码格式错误!')
        return
      }else{
        let verifyCode = await submitCode(this.registerForm.phone,this.code)
           if (verifyCode.data.data) {
            // 验证通过
            // 进入注册第三个步骤   设置昵称
            this.currentStep = 2;
          } 
      }
      
    },

    // 第三步：完成注册
    async finishRegistered(){
        let res = await finishRegistere(this.registerForm,this.code)
        if (res.data.code == 200) {
          this.$message.success("注册成功!");
          this.$emit("closeDialog");
      } else {
        this.$message.error("注册失败!");
      }
    }
  }
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
  .form {
  width: 100%;
  text-align: center;
}

.form .el-input /deep/ input {
  background-color: white !important;
  border: 1px solid #ccc;
  margin: 10px 0;
  color: rgb(95, 95, 95) !important;
}

.form .el-input /deep/input::-webkit-input-placeholder {
  color: #ccc !important;
  font-size: 12px;
}

.form .el-input /deep/ .el-input__icon {
  color: #aaa;
  width: 14px;
  height: 105%;
}

.form /deep/ .el-form-item {
  margin: 0;
}

.el-button {
  background-color: #ea4848;
  color: white;
  width: 80%;
  border: none;
  height: 33px;
  margin-top: 20px;
  border-radius: 5px;
}

.el-button:hover {
  color: white;
  background-color: #f02e2e;
}

.el-button:focus {
  color: white;
}

.tip {
  font-size: 12px;
  color: #bbb;
  line-height: 10px;
  transform: scale(0.9) translate(-1%, -30%);
}

.codeInput {
  position: relative;
}

.codeButtonContainer {
  position: absolute;
  right: 48px;
  top: 14px;
}

.codeButton {
  background-color: #ea4848;
  color: rgb(245, 245, 245);
  font-size: 12px;
  padding: 5px 12px;
  line-height: 15px;
  border-radius: 5px;
  transform: scale(0.9);
  cursor: pointer;
}

.codeButton:hover {
  background-color: #f02e2e;
}

.countDown {
  color: rgb(134, 134, 134);
  line-height: 25px;
  font-size: 12px;
}

.countDown span {
  margin-left: 1px;
}
</style>