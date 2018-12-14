<template>
  <div>
    <template v-if="thirdLogin">
      <div class="loading-box">
				<div class="loading-icon">
					<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
				</div>
        <p class="loading-tips">登录中，请耐心等待...</p>
      </div>
    </template>
    <template v-else>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px"
              class="demo-ruleForm login-container">
        <h3 class="title">后台管理系统</h3>
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录
          </el-button>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script>
import Utils from "../js/utils";

export default {
  name: "login",
  data() {
    return {
      logining: false,
      thirdLogin: false,
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true
    };
  },
  methods: {
    handleReset: function() {
      this.$refs.ruleForm.resetFields();
    },
    handleSubmit: function(ev) {
      /*this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            var self = this;
            this.logining = true;
            var url = "/api/user/login";
            var params = {
              username: this.ruleForm.username,
              password: this.ruleForm.password
            };
            Utils.ajaxReq(url, params, function (res) {
              self.logining = false;
              if (res.code > 0) {
                window.localStorage.setItem('checked', self.checked);
                window.localStorage.setItem('user', JSON.stringify(res.data[0]));
                window.localStorage.setItem('loginTime', new Date().getTime());
		            self.handleMenus();
                //window.location.href = '/index';
              } else {
                self.$message({
                  message: res.msg,
                  type: 'warning'
                })
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });*/
      this.handleAuth();
    },
    handleAuth: function(ev) {
      /*var self = this;
            this.logining = true;
            var url = "/api/user/authMenus";
            var params = {
              username: this.ruleForm.username,
              password: this.ruleForm.password
            };
            Utils.ajaxReq(url, params, function (res) {
              self.logining = false;
              if (res.code > 0) {
                window.localStorage.setItem('apps', JSON.stringify(res.data));
                window.location.href = '/index';
              } else {
                self.$message({
                  message: res.msg,
                  type: 'warning'
                })
              }
          });*/

      window.location.href = "/index";
    }
  },
  mounted: function() {
    if(this.thirdLogin){
      this.handleAuth();
    }
  }
};
</script>

<style scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login-container .title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.login-container .remember {
  margin: 0px 0px 35px 0px;
}
</style>
