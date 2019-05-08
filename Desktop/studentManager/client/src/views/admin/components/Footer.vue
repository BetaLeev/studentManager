<template>
  <el-row class="footer">
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <h2>校务管理办</h2>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {};
  },
  created() {}
};
</script>

<style lang='stylus' scoped>
.footer {
  display: block;
  clear: both;
  position: relative;
  bottom: 0;
  width: 100%;
}
</style>
<style>
.footer .el-col {
  background: #dee6f2;
  color: red;
  width: 100%;
}
</style>
