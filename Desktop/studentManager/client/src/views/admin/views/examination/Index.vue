<template>
  <transition name="el-fade-in-linear"
    mode='out-in'>
    <router-view></router-view>
  </transition>
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

<style lang='stylus' scoped></style>