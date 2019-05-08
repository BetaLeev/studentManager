<template>

  <div class="add">
    <h2>添加考试安排📃</h2>
    <el-form ref="form"
      class="form"
      :model="form"
      label-width="80px">
      <el-form-item label="课程名称">
        <el-input v-model="form.course"></el-input>
      </el-form-item>

      <el-form-item label="考试时间">
        <el-col :span="11">
          <el-date-picker type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            v-model="form.date1"
            style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line"
          :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="fixed-time"
            placeholder="选择时间"
            value-format="HH:mm"
            v-model="form.date2"
            style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="考试类型">
        <el-select v-model="form.type"
          placeholder="请选类型">
          <el-option label="闭卷"
            value='0'></el-option>
          <el-option label="开卷"
            value='1'></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="考试地点">
        <el-input v-model="form.place"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
          @click="onSubmit">添加考试</el-button>
        <el-button>取消</el-button>
      </el-form-item>

    </el-form>
  </div>

</template>

<script>
export default {
  data() {
    return {
      form: {
        date1: "",
        date2: "",
        course: "",
        type: "",
        place: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      this.$axios.post("/api/exam", this.form).then(res => {
        console.log(res);
      });
      this.$router.push({ path: "/admin/exam/student-exam" });
      this.$notify({
        title: "成功",
        message: "成功添加一条考试信息",
        type: "success"
      });
    },
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>
<style lang="stylus" scoped>
.add {
  margin-bottom: 10px;
}

.form {
  padding: 30px;
  margin: 0 auto;
  width: 560px;

  & {
    .el-input-number, .el-select {
      float: left;
    }
  }
}
</style>
