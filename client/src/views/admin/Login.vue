<template>
  <div class="login">
    <el-row>
      <el-col :sm='12'
        :xs='24'>

        <a href="/"><img class="img"
            src="/img/login.svg"
            alt=""></a>
      </el-col>

      <el-col :sm='12'
        :xs='24'>
        <el-form :model="ruleForm"
          :rules="rules"
          class="form"
          label-position="left"
          ref="ruleForm"
          label-width="100px">
          <el-form-item label="用户名"
            prop="name">
            <el-input v-model="ruleForm.name"
              placeholder="用户为：admin"></el-input>
          </el-form-item>

          <el-form-item label="密码"
            prop="pwd">
            <el-input v-model="ruleForm.pwd"
              type="password"
              placeholder="密码为：admin"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary"
              @click="submitForm('ruleForm')">登录</el-button>
            <el-button type="primary"
              @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      ruleForm: {
        name: "",
        pwd: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.$localStorage.set("admin", "admin");
      window.location.href = "/admin";
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang='stylus' scoped>
.login {
  height: 100%;
  position: fixed;
  width: 100vw;
  background: rgba(191, 123, 213, 0.3);
}

.form {
  width: 360px;
  margin: 0 auto;
  margin-top: 200px;
  height: 500px;
}

.img {
  width: 400px;
  height: 500px;
}
</style>
<style>
.login .el-form-item__label {
  font-size: 20px;
  color: #18109a;
}
</style>
