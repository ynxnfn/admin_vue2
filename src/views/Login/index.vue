<template>
  <div class="login">
    <div class="custom-form">
      <h2>系统登录</h2>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input placeholder="账号" prefix-icon="el-icon-user-solid" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            v-model="ruleForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="codeImg">
          <el-input placeholder="验证码" maxlength="4" prefix-icon="el-icon-picture" v-model="ruleForm.code"></el-input>
          <img @click="changeSrc()" class="code" :src="code_src">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      let reg = /^[^0-9]\w{5,12}$/;
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else if (!reg.test(value)) {
        callback(new Error("账号格式有误"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      // } else if (value !== this.uuid) {
      //   callback(new Error("验证码错误!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        code: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      },
      code_src: "",
      uuid: "",
      timeer: 0
    };
  },
  created() {
    this.reRenderCode();
    this.timeer = setInterval(() => {
      this.reRenderCode();
    }, 1000 * 60);
  },
  // updated() {
  //   console.log(uuidv4());
  // },
  destroyed() {
    clearInterval(this.timeer);
  },
  methods: {
    reRenderCode() {
      let uuid = uuidv4();
      this.uuid = uuid;
      this.code_src = `https://www.chengzier.cn:8000/api/generateimagecode?uuid=${uuid}`;
    },
    changeSrc() {
      this.reRenderCode();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          // this.$http({ 
          //   url: 'api/supersignin',
          //   method: 'POST',
          //   data: `username=${this.ruleForm.username}&password=${this.ruleForm.password}&uuid=${this.uuid}&text=${this.ruleForm.code}`
          // }).then(res => {
          //   this.$message({
          //     message: res.data.msg,
          //     type: 'success'
          //   });
          // }).catch(error => {

          // })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
.login .el-form-item__content input {
  background-color: transparent;
  height: 47px;
  color: #fff;
  border: none;
}
.login .el-input__prefix,
.login .el-input__suffix {
  color: #889aa4;
}
</style>
<style lang="less" scoped>
.login {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #2d3a4b;
}
.custom-form {
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  box-sizing: border-box;
}
.custom-form h2 {
  color: #eee;
}
.login .el-input {
  padding-left: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  border-radius: 5px;
}
.codeImg .el-input {
  float: left;
  width: 65%;
}
.code {
  display: block;
  height: 47px;
  float: right;
}
</style>