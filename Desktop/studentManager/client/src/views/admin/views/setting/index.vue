<template>
  <div>
    {{a}}
  </div>
</template>

<script>
export default {
  mounted() {},
  computed: {
    a() {
      // return this.b.filter(v => {
      // a.age == 123;
      // });
    }
  },
  data() {
    return {
      b: [
        { age: 123, name: "ee" },
        { age: 12 },
        { age: 32 },
        { age: 111 },
        { age: 14 }
      ]
    };
  },
  created() {}
};
</script>

<style lang='stylus' scoped></style>