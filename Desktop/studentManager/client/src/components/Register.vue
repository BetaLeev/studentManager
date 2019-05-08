<template>
  <el-form :model="ruleForm"
    :rules="rules"
    label-position="left"
    ref="ruleForm"
    label-width="100px">
    <el-form-item label="昵称"
      prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="邮箱"
      prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="密码"
      prop="pwd">
      <el-input v-model="ruleForm.pwd"
        type='password'></el-input>
    </el-form-item>

    <el-form-item label="确认密码"
      prop="repwd">
      <el-input v-model="ruleForm.repwd"
        type='password'></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
        @click="submitForm('ruleForm')">注册</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        email: "",
        pwd: "",
        repwd: ""
      },
      rules: {
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        repwd: [{ required: true, message: "请确认密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/user", this.ruleForm)
            .then(res => {
              let load = { close: false };
              this.$emit("register", load);
            })
            .catch(err => {
              new Error(err);
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

<style lang='stylus' scoped></style>