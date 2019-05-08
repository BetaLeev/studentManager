<template>
  <div class="add">
    <h2>添加学生档案📃</h2>
    <el-form ref="form"
      class="form"
      :model="form"
      label-width="80px">

      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="种族">
        <el-select v-model="form.racial"
          filterable
          placeholder="请选择种族">
          <el-option v-for="item in racial"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="籍贯">
        <v-distpicker @selected="onSelectedOrigin"
          only-province></v-distpicker>
      </el-form-item>

      <el-form-item label="所在地区">
        <v-distpicker @selected="onSelectedCity"></v-distpicker>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="form.place"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
          @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";

export default {
  data() {
    return {
      racial: [
        "汉族",
        "壮族",
        "满族",
        "回族",
        "苗族",
        "维吾尔族",
        "土家族",
        "彝族",
        "蒙古族",
        "藏族",
        "布依族",
        "侗族",
        "瑶族",
        "朝鲜族",
        "白族",
        "哈尼族",
        "哈萨克族",
        "黎族",
        "傣族",
        "畲族",
        "傈僳族",
        "仡佬族",
        "东乡族",
        "高山族",
        "拉祜族",
        "水族",
        "佤族",
        "纳西族",
        "羌族",
        "土族",
        "仫佬族",
        "锡伯族",
        "柯尔克孜族",
        "达斡尔族",
        "景颇族",
        "毛南族",
        "撒拉族",
        "布朗族",
        "塔吉克族",
        "阿昌族",
        "普米族",
        "鄂温克族",
        "怒族",
        "京族",
        "基诺族",
        "德昂族",
        "保安族",
        "俄罗斯族",
        "裕固族",
        "乌孜别克族",
        "门巴族",
        "鄂伦春族",
        "独龙族",
        "塔塔尔族",
        "赫哲族",
        "珞巴族"
      ],
      form: {
        name: "",
        origin: "",
        place: "",
        city: "",
        racial: ""
      }
    };
  },
  components: {
    VDistpicker
  },
  methods: {
    onSelectedOrigin(data) {
      this.form.origin = data.province.value;
    },
    onSelectedCity(data) {
      this.form.city = data.province.value + data.city.value + data.area.value;
    },

    onSubmit() {
      console.log(this.form);
      console.log("submit!");
      this.$axios.post("/api/file", this.form).then(res => {
        console.log(res);
      });
      this.$notify({
        title: "成功",
        message: "成功添加一条学生档案信息",
        type: "success"
      });
      this.$router.push({ path: "/admin/files/student-file" });
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
}
</style>

<style>
.el-input-number,
.el-select,
.distpicker-address-wrapper {
  float: left;
}
</style>
