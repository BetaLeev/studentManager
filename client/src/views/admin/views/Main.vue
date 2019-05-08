<template>
  <transition :name="transitionName">
    <router-view></router-view>
  </transition>
</template>
<script>
export default {
  mounted() {},
  data() {
    return {};
  },
  created() {},
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      console.log(toDepth);
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    }
  }
};
</script>

<style lang='stylus' scoped></style>