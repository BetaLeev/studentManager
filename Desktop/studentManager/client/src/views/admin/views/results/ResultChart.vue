<template>
  <div class="chart">
    <h2>成绩分析</h2>
    <result-chart :data="chartData"
      height='400px'>
    </result-chart>
  </div>
</template>
<script>
import resultChart from "v-charts/lib/histogram.common";
export default {
  data() {
    return {
      chartData: {
        columns: ["name", "c", "java", "math1", "math2", "struct", "test"],
        rows: []
      }
    };
  },
  components: {
    resultChart
  },
  methods: {
    getData() {
      this.$axios
        .get("/api/result")
        .then(res => {
          this.chartData.rows = res.data.data;
        })
        .catch(err => {
          new Error(err);
        });
    }
  },
  created() {
    this.getData();
  },
  computed: {}
};
</script>


 <style lang="stylus" scoped>
 .chart {
   padding: 20px;
   border: 2px solid gray;
   background: white;
 }
</style>
