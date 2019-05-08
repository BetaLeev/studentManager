<template>
  <div class="about"></div>
</template>
<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$message.error("找不到咯，页面将在2秒内返回首页");
    }, 100);
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }
};
</script>

<style lang="stylus" scoped>
.about {
  min-height: 600px;
  min-width: 600px;
  background: url('/img/404.svg') no-repeat fixed center;
}
</style>


