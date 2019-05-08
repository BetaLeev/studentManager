<template>
  <div class="add">
    <h2>添加学生成绩</h2>
    <el-form ref="form"
      class="form"
      :model="form"
      label-width="80px">

      <el-form-item label="学号">
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-select v-model="form.sex"
          placeholder="请选择性别">
          <el-option label="男"
            value="男"></el-option>
          <el-option label="女"
            value="女"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="学期">
        <el-select v-model="form.term"
          placeholder="请选学期">
          <el-option label="第一学期"
            value="1"></el-option>
          <el-option label="第二学期"
            value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="班级">
        <el-select v-model="form.clas"
          placeholder="请选班级">
          <el-option label="一班"
            value="1"></el-option>
          <el-option label="二班"
            value="2"></el-option>
        </el-select>
      </el-form-item>
      </el-row>

      <el-row :gutter="1">
        <el-col :span='12'>
          <el-form-item label="c语言课程">
            <el-input-number v-model="form.c"
              @change="handleChange"
              :min="10"
              :max="100"
              label="分数选择"></el-input-number>
          </el-form-item>
        </el-col>

        <el-col :span='12'>
          <el-form-item label="java课程">
            <el-input-number v-model="form.java"
              @change="handleChange"
              :min="10"
              :max="100"
              label="分数选择"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="1">
        <el-col :span='12'>
          <el-form-item label="数据结构">
            <el-input-number v-model="form.struct"
              @change="handleChange"
              :min="10"
              :max="100"
              label="分数选择"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="微机原理">
            <el-input-number v-model="form.pc"
              @change="handleChange"
              :min="10"
              :max="100"
              label="分数选择"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="1">
        <el-col :span='12'>
          <el-form-item label="软件测试">
            <el-input-number v-model="form.test"
              @change="handleChange"
              :min="10"
              :max="100"
              label="分数选择"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="高等数学">
            <el-input-number v-model="form.math1"
              @change="handleChange"
              :min="10"
              :max="100"
              label="分数选择"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="离散数学">
        <el-input-number v-model="form.math2"
          @change="handleChange"
          :min="10"
          :max="100"
          label="分数选择"></el-input-number>
      </el-form-item>

      <el-form-item label="成绩评分">
        <el-select v-model="form.tag"
          placeholder="请选评分">
          <el-option label="优秀"
            value="A"></el-option>
          <el-option label="良好"
            value="B"></el-option>
          <el-option label="一般"
            value="C"></el-option>
        </el-select>
      </el-form-item>
      </el-row>

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
        number: "",
        name: "",
        sex: "",
        term: "",
        clas: "",
        c: 0,
        java: 0,
        struct: 0,
        pc: 0,
        test: 0,
        math1: 0,
        math2: 0,
        tag: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$axios.post("/api/result", this.form).then(res => {
        console.log(res);
      });
      this.$message({
        message: "成功添加一名学生成绩！",
        type: "success"
      });
      this.$router.push("/admin/results/student-result");
    },
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>
<style lang="stylus" scoped>
.form {
  padding: 30px;
  margin: 0 auto;
  width: 560px;

  & {
    .el-input-number, .el-select {
      float: left;
      margin-left: 4px;
    }
  }
}
</style>

<style>
</style>
