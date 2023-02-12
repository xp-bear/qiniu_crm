<template>
  <div class="LoginView">
    <div class="login-container">
      <transition name="el-zoom-in-center">
        <div v-if="rgState == 0" class="login">
          <div class="avatar">
            <img src="../assets/logo.png" alt="" />
            <span>账号登录</span>
            <img class="deg" src="../assets/deg.png" alt="" />
          </div>
          <!-- 登录表单 -->
          <div class="lg-form">
            <el-form ref="lgForm" :rules="rules" :model="form" style="position: relative">
              <el-form-item prop="username">
                <i style="position: absolute; bottom: 0; z-index: 2; font-size: 24px; line-height: 40px; color: #c5c7cb; padding: 0 5px" class="el-icon-user"></i>
                <el-input v-model="form.username" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <i style="position: absolute; bottom: 0; z-index: 2; font-size: 24px; line-height: 40px; color: #c5c7cb; padding: 0 5px" class="el-icon-key"></i>
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  style="width: 100%; background: #fa5061; color: #fff; font-size: 16px; border: 0; letter-spacing: 1em; box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1); margin-top: 10px"
                  @click="submitForm('lgForm')"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <div class="login-footer">
            <div>
              <span>忘记密码</span>
              <span @click="toRegister">立即注册</span>
            </div>
            <span style="float: right; color: #9b9b9b; cursor: pointer">帮助手册</span>
          </div>
        </div>
      </transition>
      <transition name="el-zoom-in-center">
        <div v-if="rgState == 1" class="register">
          <div class="top">
            <img style="height: 100%" src="../assets/logo.png" alt="" />
            <span @click="backLogin">返回登录</span>
          </div>
          <!-- 注册表单 -->
          <div class="rg-form">
            <el-form ref="rgForm" :model="rgForm" :rules="rgRules" style="position: relative">
              <el-form-item prop="email">
                <i style="position: absolute; bottom: 0; z-index: 2; font-size: 24px; line-height: 40px; color: #c5c7cb; padding: 0 5px" class="el-icon-message"></i>
                <el-input v-model="rgForm.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item prop="nickname">
                <i style="position: absolute; bottom: 0; z-index: 2; font-size: 24px; line-height: 40px; color: #c5c7cb; padding: 0 5px" class="el-icon-help"></i>
                <el-input v-model="rgForm.nickname" placeholder="请输入昵称"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <i style="position: absolute; bottom: 0; z-index: 2; font-size: 24px; line-height: 40px; color: #c5c7cb; padding: 0 5px" class="el-icon-key"></i>
                <el-input type="password" v-model="rgForm.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item prop="repassword">
                <i style="position: absolute; bottom: 0; z-index: 2; font-size: 24px; line-height: 40px; color: #c5c7cb; padding: 0 5px" class="el-icon-key"></i>
                <el-input type="password" v-model="rgForm.repassword" placeholder="请确认密码"></el-input>
              </el-form-item>
              <el-form-item prop="keycode" style="position: relative">
                <i style="position: absolute; bottom: 0; z-index: 2; font-size: 24px; line-height: 40px; color: #c5c7cb; padding: 0 5px" class="el-icon-postcard"></i>
                <el-input v-model="rgForm.keycode" placeholder="请输入邮箱验证码"></el-input>
                <el-button type="text" :disabled="!Boolean(codeInfo == '获取验证码')" :style="codeInfo == '获取验证码' ? { color: '#fd4c5d' } : { color: '#ccc' }" class="reg" @click="getKeyCode"
                  >{{ codeInfo }}
                </el-button>
              </el-form-item>

              <el-form-item>
                <el-button
                  class="rgBtn"
                  :disabled="!(rgForm.email && rgForm.nickname && rgForm.password && rgForm.repassword && rgForm.keycode)"
                  :class="rgForm.email && rgForm.nickname && rgForm.password && rgForm.repassword && rgForm.keycode ? 'active' : ''"
                  @click="submitrGForm('rgForm')"
                  >注册</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <!-- 协议选择 -->
          <div class="protocol">
            <el-checkbox fill="red" v-model="rGchecked">我已经认真阅读并同意熊仔图床的</el-checkbox><span style="color: #409bef; font-size: 14px; cursor: pointer">《使用协议》</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { createUserApi, sameEmailApi, sendMailApi, userLoginApi } from "@/api/index";
export default {
  name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.rgForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      let emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (value === "") {
        callback(new Error("邮箱不可以为空！"));
      } else if (!emailRegExp.test(value)) {
        callback(new Error("请输入正确的邮箱格式！"));
      } else {
        callback();
      }
    };
    return {
      rgState: 0, //0-登录 1-注册
      codeInfo: "获取验证码", //获取验证码
      rGchecked: false, //注册协议的选择。
      form: {
        username: "", //用户名
        password: "", //密码
      },
      rules: {
        username: [{ required: true, message: "用户名不可以为空！", trigger: "change" }],
        password: [
          { required: true, message: "密码不可以为空！", trigger: "change" },
          { min: 6, max: 32, message: "密码长度应为6至32个字符之间！", trigger: "change" },
        ],
      },
      // 注册表单校验
      rgForm: {
        email: "", //邮箱
        nickname: "", //昵称
        password: "", //密码
        repassword: "", //确认密码
        keycode: "", //验证码
      },
      //邮箱的验证码
      VerificationCode: "",

      rgRules: {
        email: [{ validator: validateEmail, trigger: "change" }],
        nickname: [{ required: true, message: "昵称不可以为空！", trigger: "change" }],
        password: [
          { validator: validatePass, trigger: "change" },
          { min: 6, max: 32, message: "密码长度应为6至32个字符之间！", trigger: "change" },
        ],
        repassword: [
          { validator: validatePass2, trigger: "change" },
          { min: 6, max: 32, message: "密码长度应为6至32个字符之间！", trigger: "change" },
        ],
        keycode: [{ required: true, message: "验证码不可以为空！", trigger: "change" }],
      },
    };
  },

  methods: {
    // 跳转注册页面。
    toRegister() {
      this.rgState = 1;
      this.$refs.lgForm.resetFields();
    },
    // 登录页面。
    backLogin() {
      this.rgState = 0;
      this.$refs.rgForm.resetFields();
      this.rGchecked = false;
    },
    //登录按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          // 进行登录判断
          let data = {
            email: this.form.username,
            password: this.form.password,
          };
          userLoginApi(data).then((res) => {
            if (res.code == 400) {
              return this.$message({
                message: res.message,
                type: "error",
                duration: 2000,
              });
            } else {
              // 保存token到localstorage
              window.localStorage.setItem("token", res.token);
              window.localStorage.setItem("user", JSON.stringify(res.userObj));
              setTimeout(() => {
                this.$router.push({
                  path: "/",
                });
              }, 1000);
              return this.$message({
                message: res.message,
                type: "success",
                duration: 1000,
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 注册按钮
    submitrGForm(formName) {
      // 判断有没有勾选协议。
      if (!this.rGchecked) {
        return this.$message({
          message: "请先勾选使用协议！",
          type: "error",
          duration: 2000,
        });
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 表单校验通过。
          // 1.邮箱唯一判断
          sameEmailApi({ email: this.rgForm.email }).then((result) => {
            // console.log(result); //0-新用户注册 1-老用户应该登录
            if (result.message[0].SameEmail == 0) {
              // 邮箱验证码判断
              if (this.rgForm.keycode == this.VerificationCode) {
                // 新用户注册
                let data = {
                  username: this.rgForm.nickname, //用户名
                  password: this.rgForm.password, //密码
                  email: this.rgForm.email, //邮箱
                  sex: 2,
                  sign: "该用户很懒，暂时没有签名。",
                  age: 0,
                  phone: "",
                  avatar: "http://cdn.xxoutman.cn/default_avatar.png",
                  create_time: new Date(),
                };
                createUserApi(data).then((res) => {
                  // console.log(res);
                  // 清空注册表单
                  this.$refs[formName].resetFields();
                  this.rGchecked = false;
                  setTimeout(() => {
                    this.rgState = 0;
                  }, 1000);
                  return this.$message({
                    message: "注册成功",
                    type: "success",
                    duration: 1000,
                  });
                });
              } else {
                // 验证码失败。
                return this.$message({
                  message: "验证码错误请重新获取。",
                  type: "error",
                  duration: 2000,
                });
              }
            } else {
              return this.$message({
                message: "该邮箱已经注册过，请登录。",
                type: "error",
                duration: 2000,
              });
            }
          });

          // 在这里发起请求,往数据库添加数据
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取验证码
    getKeyCode() {
      if (!this.rgForm.email) {
        return this.$message({
          message: "请先输入邮箱地址！",
          type: "error",
          duration: 2000,
        });
      }
      // 发送邮箱验证码
      sendMailApi({ useremail: this.rgForm.email }).then((resObj) => {
        // 2.验证码判断
        this.VerificationCode = resObj.VerificationCode;
        this.$message({
          message: "验证码已发送到您的邮箱，请注意查收！",
          type: "success",
          duration: 2000,
        });
      });

      if (this.codeInfo == "获取验证码") {
        let time = 60;
        let count_down = setInterval(() => {
          time--;
          // this.$refs.codeInfos ? (this.$refs.codeInfos.style.color = "#ccc") : "";
          this.codeInfo = `重新发送(${time})`;
          if (time <= 0) {
            this.codeInfo = "获取验证码";
            // this.$refs.codeInfos.style.color = "#fd4c5d";
            clearInterval(count_down);
          }
        }, 1000);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.LoginView {
  /deep/.el-input__inner {
    padding-left: 34px;
    height: 40px;
  }
  /deep/.el-input__inner {
    line-height: 16px;
  }
  /deep/.el-form-item__error {
    display: flex;
    align-items: center;
    height: 18px;
    color: #fd4c5b;
    font-size: 14px;
  }
  /deep/.el-form-item__error::before {
    content: "";
    display: inline-block;
    width: 13px;
    height: 13px;
    box-sizing: border-box;
    margin-right: 4px;
    background: url("../assets/err.png") no-repeat;
    background-size: cover;
  }
  .active {
    background: #f84d5d !important;
  }

  width: 100%;
  height: 100vh;
  background-image: url(http://cdn.xxoutman.cn/qiniu_bg-1676171779647.png?1676171780442);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-container {
    width: 1280px;
    height: 618px;
    position: relative;
    .login {
      position: absolute;
      width: 430px;
      height: 408px;
      background: #fff;
      margin-top: 100px;
      box-sizing: border-box;
      opacity: 0.95;
      padding: 25px;
      border-radius: 3px;
      .avatar {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        position: relative;
        img {
          height: 100%;
        }
        span {
          font-size: 16px;
          color: #333;
          line-height: 38px;
          padding-left: 5px;
          font-weight: normal;
        }
        .deg {
          position: absolute;
          width: 54px;
          height: 54px;
          right: -20px;
          top: -20px;
        }
      }
      .lg-form {
        width: 100%;
        height: 289px;
        padding-top: 55px;
        box-sizing: border-box;
        // background-color: rebeccapurple;
      }
      .login-footer {
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        span {
          margin-left: 10px;
          font: 14px PingFangSC-Semibold;
          color: #333;
          cursor: pointer;
          &:hover {
            color: #f84d5d;
          }
        }
      }
    }
    .register {
      position: absolute;
      width: 430px;
      height: 552px;
      margin-top: 35px;
      background: #fff;
      box-sizing: border-box;
      padding: 25px;
      border-radius: 3px;
      overflow: hidden;
      .top {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          vertical-align: bottom;
          font-size: 14px;
          line-height: 24px;
          height: 24px;
          color: #409bef;
          cursor: pointer;
        }
      }
      .rg-form {
        /deep/.el-input__inner {
          border-top: transparent;
          border-left: transparent;
          border-right: transparent;
          border-radius: 0;
        }
        margin-top: 25px;
        box-sizing: border-box;
        .reg {
          position: absolute;
          right: 15px;
          cursor: pointer;
          border: 0;
        }
        .rgBtn {
          width: 100%;
          border: 0;
          background: #cccccc;
          color: #fff;
        }
      }
      .protocol {
        /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background-color: #fd4c5d;
          border-color: #fd4c5d;
        }
        /deep/.el-checkbox__input.is-checked + .el-checkbox__label {
          color: #606266;
        }
        /deep/.el-checkbox__inner {
          &:hover {
            border-color: #fd4c5d !important;
          }
        }
      }
    }
  }
}
</style>
