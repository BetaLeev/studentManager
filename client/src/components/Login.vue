<template>
  <el-form :model="ruleForm"
    :rules="rules"
    label-position="left"
    ref="ruleForm"
    label-width="100px">
    <el-form-item label="邮箱"
      prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="密码"
      prop="pwd">
      <el-input type="password"
        v-model="ruleForm.pwd"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
        @click="submitForm('ruleForm')">登录</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        email: "",
        pwd: ""
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/login", this.ruleForm)
            .then(res => {
              console.log(res.data);
              let load = { name: res.data.data.name, close: false };
              this.$emit("login", load);
            })
            .catch(err => {
              this.$message({
                type: "success",
                message: `登录失败!`
              });
            });
        } else {
          console.log("error submit!!");
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
