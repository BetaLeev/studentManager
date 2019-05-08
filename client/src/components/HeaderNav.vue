<template>
  <el-row :gutter="10">
    <el-menu :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color="#fc794e"
      text-color="#fff"
      active-text-color="#6524fa">
      <el-col :sm='7'
        :xs='24'>
        <a href="/admin">
          <img src="/img/logo.svg"
            alt=""
            style="height:50px;margin-top:3px"></a>
      </el-col>
      <el-col :sm='2'
        :xs='24'>
        <el-menu-item index="1">
          首页
        </el-menu-item>
      </el-col>
      <el-col :sm='2'
        :xs='24'>
        <el-menu-item index="2">
          成绩 </el-menu-item>
      </el-col>
      <el-col :sm='2'
        :xs='24'>
        <el-menu-item index="3">教学安排</el-menu-item>
      </el-col>
      <el-col :sm='2'
        :xs='24'>
        <el-menu-item index="4">档案</el-menu-item>
      </el-col>
      <el-col :sm='2'
        :xs='24'>
        <el-menu-item index="5">考试安排</el-menu-item>
      </el-col>
      <el-col :sm='2'
        :xs='24'>
        <el-menu-item index="6">其他</el-menu-item>
      </el-col>
      <template v-if="!hasLogin">
        <el-col :sm='1'
          :xs='24'>&nbsp</el-col>
        <el-col :sm='2'
          :xs='24'>
          <el-button class="user"
            type="success"
            @click='dialogVisibleRegister = true'>注册</el-button>
        </el-col>
        <el-col :sm='2'
          :xs='24'>
          <el-button class="user"
            type="primary"
            @click='dialogVisibleLogin = true'>登录</el-button>
        </el-col>
      </template>

      <template v-else>
        <el-col :sm='4'
          :xs='24'>
          <el-submenu index="7"
            class="right">
            <template slot="title">{{user}}</template>
            <!-- <el-menu-item index="7-1">个人资料</el-menu-item> -->
            <el-menu-item index="7-2"
              @click='quit'>退出</el-menu-item>
          </el-submenu>
        </el-col>
      </template>
      </el-col>
    </el-menu>

    <el-dialog title="用户注册"
      :visible.sync="dialogVisibleRegister"
      width="30%"
      :before-close="handleClose">
      <span></span>
      <Register @register='register' />

    </el-dialog>

    <el-dialog title="用户登录"
      :visible.sync="dialogVisibleLogin"
      width="30%"
      :before-close="handleClose">
      <span></span>
      <Login @login='login' />
    </el-dialog>
  </el-row>

</template>

<script>
import Register from "@/components/Register";
import Login from "@/components/Login";

export default {
  mounted() {
    if (this.$localStorage.get("name")) {
      console.log(this.$localStorage.get("name"));
      this.user = this.$localStorage.get("name");
      this.hasLogin = true;
    } else {
      this.hasLogin = false;
    }
  },
  components: {
    Register,
    Login
  },
  data() {
    return {
      load: {},
      user: "",
      activeIndex: "1",
      hasLogin: false,
      dialogVisibleRegister: false,
      dialogVisibleLogin: false
    };
  },
  methods: {
    login(load) {
      if (load.name) {
        this.hasLogin = true;
        this.load.name = load.name;
        this.user = this.load.name;
        this.$localStorage.set("name", this.user);
        this.$session.start();
        this.$session.set("user", this.user);
      }
      this.dialogVisibleLogin = this.load.close;
      console.log("load" + load.name);
      this.$message({
        type: "success",
        message: `登录成功,欢迎您：${this.user}`
      });
    },
    register(load) {
      this.dialogVisibleRegister = this.load.close;
      this.dialogVisibleLogin = this.load.close;
      this.$message({
        type: "success",
        message: `注册成功成功,欢迎您`
      });
    },
    quit() {
      this.hasLogin = false;
      this.$localStorage.remove("name");
      this.$session.destroy();
      this.$router.push("/");
      this.$message({
        type: "success",
        offset: "300",
        message: "退出登录成功"
      });
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  created() {}
};
</script>
<style lang='stylus' scoped>
.user {
  margin-top: 10px;
}
</style>