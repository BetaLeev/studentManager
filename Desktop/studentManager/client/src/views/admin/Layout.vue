<template>
  <div>
    <el-container>
      <el-header>
        <Header />
      </el-header>
    </el-container>

    <el-container class="middle"
      style="padding-top:20px">
      <el-aside class="aside"
        width="200px">
        <SlideMenu />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>
    <Footer />

  </div>

</template>

<script>
import Header from "@/views/admin/components/Header";
import SlideMenu from "@/views/admin/components/SlideMenu";
import Footer from "@/views/admin/components/Footer";

export default {
  components: {
    SlideMenu,
    Header,
    Footer
  },
  watch: {
    $router(to, form) {
      const toDepth = to.path.split("/").length;
      console.log("路由信息");
      console.log(toDepth);
    }
  }
};
</script>

<style lang='stylus' scoped>
.el-header {
  background: linear-gradient(to left, #7A88FF, #7AFFAF);
  box-shadow: 3px 3px 3px gray;
}

.middle {
  background: #dee6f2;
  padding-bottom: 250px;

  & {
    .aside {
      margin-left: 20px;
    }
  }
}
</style>