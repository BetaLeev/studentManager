<template>
  <div class="add">
    <h2>修改教学课程安排</h2>
    <el-form ref="form"
      class="form"
      :model="props_form"
      label-width="80px">
      <el-form-item label="课程编号">
        <el-input v-model="props_form.number"></el-input>
      </el-form-item>
      <el-form-item label="课程名称">
        <el-input v-model="props_form.course"></el-input>
      </el-form-item>
      <el-form-item label="授课教师">
        <el-select v-model="props_form.teacher"
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
        <el-input-number v-model="props_form.count"
          :min="16"
          :max="48"
          :step='8'
          label="课时选择"></el-input-number>
      </el-form-item>

      <el-form-item label="上课时间">
        <el-col :span="11">
          <el-date-picker type="date"
            placeholder="时间"
            value-format="yyyy-MM-dd"
            v-model="props_form.date"
            style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
          @click="onSubmit">确认修改</el-button>
        <el-button @click='handleCancle'>取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  props: ["props_form"],
  data() {
    return {
      cancle: false
    };
  },

  methods: {
    onSubmit() {
      this.$axios
        .put("/api/teach", {
          form: {
            _id: this.props_form._id,
            number: this.props_form.number,
            course: this.props_form.course,
            count: this.props_form.count,
            date: this.props_form.date,
            teacher: this.props_form.teacher
          }
        })
        .then(res => {
          this.$notify({
            title: "成功",
            message: `成功修改教学信息`,
            type: "success"
          });
          this.handleCancle();
        });
    },
    handleCancle() {
      this.$emit("dialogClose", false);
    }
  }
};
</script>
<style lang="stylus" scoped>
.form {
  padding: 30px;
  margin: 0 auto;
  width: 310px;

  & {
    .el-input {
      width: 95%;
    }

    .el-input-number, .el-select, .el-input__inner {
      float: left;
      margin-left: 5px;
    }

    .el-col {
      width: 160px;
    }
  }
}
</style>

<style>
</style>
