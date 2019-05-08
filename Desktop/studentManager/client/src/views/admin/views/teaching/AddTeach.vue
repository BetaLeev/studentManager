<template>
  <div class="add">
    <h2>添加教学课程安排</h2>
    <el-form ref="form"
      class="form"
      :model="form"
      label-width="80px">
      <el-form-item label="课程编号">
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="课程名称">
        <el-input v-model="form.course"></el-input>
      </el-form-item>
      <el-form-item label="授课教师">
        <el-select v-model="form.teacher"
          placeholder="请选择教师">
          <el-option label="舒庆春"
            value="舒庆春"></el-option>
          <el-option label="杨绛"
            value="杨绛"></el-option>
          <el-option label="曾庆红"
            value="曾庆红"></el-option>
          <el-option label="贾雨村"
            value="贾雨村"></el-option>
          <el-option label="韩正"
            value="韩正"></el-option>
          <el-option label="吴邦国"
            value="吴邦国"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课时">
        <el-input-number v-model="form.count"
          :min="16"
          :max="48"
          label="课时选择"></el-input-number>
      </el-form-item>

      <el-form-item label="上课时间">
        <el-col :span="11">
          <el-date-picker type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            v-model="form.date"
            style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
          @click="onSubmit">添加课程</el-button>
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
        number: 0,
        course: "",
        count: 0,
        date: "",
        teacher: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$axios.post("/api/teach", this.form).then(res => {
        console.log(res.data);
        this.$notify({
          title: "成功",
          message: "成功添加一条教学安排信息",
          type: "success"
        });
        this.form = {};
        this.$router.push({ path: "/admin/teaching/show-teach" });
        console.log("submit!");
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.form {
  margin: 0 auto;
  width: 400px;
}</style>
<style>
.form .el-select,
.el-input-number {
  float: left;
}
</style>


