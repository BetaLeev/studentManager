<template>
  <div>
    <h2>学生成绩分数</h2>
    <template>
      <elx-editable ref="editable"
        :data.sync='tableData'
        @blur-active="blurActiveEvent"
        :edit-config="{trigger: 'dblclick', mode: 'cell', }"
        :edit-rules="{name: [{required: true, message: 'Please enter a name.', trigger: 'blur'}]}">
        <elx-editable-column prop="number"
          width="155"
          label="学号"
          :edit-render="{name: 'ElInput'}"></elx-editable-column>

        <elx-editable-column prop="name"
          width="100"
          label="姓名"
          fixed
          :edit-render="{name: 'ElInput'}"></elx-editable-column>

        <elx-editable-column prop="sex"
          width="100"
          label="性别"
          :edit-render="{name: 'ElSelect', options:[{
          'label': '男',
          'value': '男'
        },
        {
          'label': '女',
          'value': '女'
        }]}"></elx-editable-column>

        <elx-editable-column prop="term"
          label="学期"
          width="100"
          :edit-render="{name: 'ElSelect', options:[{
          'label': '第一学期',
          'value': '1'
        },
        {
          'label': '第二学期',
          'value': '2'
        }]}"></elx-editable-column>

        <elx-editable-column prop="clas"
          label="班级"
          width="100"
          :edit-render="{name: 'ElSelect', options:[{
          'label': '一班',
          'value': '1'
        },
        {
          'label': '二班',
          'value': '2'
        }]}"></elx-editable-column>

        <el-table-column prop="grade"
          label="成绩"
          width="900">
          <el-table-column prop="it"
            label="专业课"
            width="450">
            <elx-editable-column prop="c"
              label="C语言"
              width='150'
              :edit-render="{name: 'ElInputNumber'}"></elx-editable-column>

            <elx-editable-column prop="java"
              label="Java程序"
              width='150'
              :edit-render="{name: 'ElInputNumber'}"></elx-editable-column>

            <elx-editable-column prop="struct"
              label="数据结构"
              width='150'
              :edit-render="{name: 'ElInputNumber'}"></elx-editable-column>

            <elx-editable-column prop="pc"
              label="组成原理"
              width='150'
              :edit-render="{name: 'ElInputNumber'}"></elx-editable-column>

            <elx-editable-column prop="test"
              label="软件测试"
              width='150'
              :edit-render="{name: 'ElInputNumber'}"></elx-editable-column>
          </el-table-column>
          <el-table-column prop="other"
            label="其他课"
            width="300">
            <elx-editable-column prop="math1"
              label="高等数学"
              width='150'
              :edit-render="{name: 'ElInputNumber'}"></elx-editable-column>

            <elx-editable-column prop="math2"
              label="离散数学"
              width='150'
              :edit-render="{name: 'ElInputNumber'}"></elx-editable-column>

            <elx-editable-column label="评分"
              width='100'>
              <template slot-scope='scope'>
                <el-tag>
                  {{scope.row.tag}}
                </el-tag>
              </template></elx-editable-column>
          </el-table-column>
        </el-table-column>
      </elx-editable>

    </template>
  </div>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      form: {},
      tableData: [
        {
          number: "2015060801",
          name: "赵紫阳",
          sex: "女",
          term: 1,
          clas: 2,
          c: 80,
          java: 90,
          struct: 98,
          pc: 99,
          test: 100,
          math1: 97,
          math2: 98,
          tag: "A"
        }
        // {
        //   number: "2015060802",
        //   name: "林彪",
        //   sex: "女",
        //   term: 1,
        //   class: 1,
        //   c: 60,
        //   java: 60,
        //   dataStruct: 68,
        //   pc: 79,
        //   test: 70,
        //   math1: 87,
        //   math2: 78,
        //   tag: "B"
        // },
        // {
        //   number: "20150608013",
        //   name: "张作霖",
        //   sex: "女",
        //   term: 1,
        //   class: 1,
        //   c: 20,
        //   java: 70,
        //   dataStruct: 98,
        //   pc: 49,
        //   test: 50,
        //   math1: 37,
        //   math2: 68,
        //   tag: "C"
        // },
        // {
        //   number: "20150608012",
        //   name: "刘晓波",
        //   sex: "男",
        //   term: 1,
        //   class: 2,
        //   c: 78,
        //   java: 49,
        //   dataStruct: 69,
        //   pc: 80,
        //   test: 70,
        //   math1: 37,
        //   math2: 48,
        //   tag: "C"
        // }
      ]
    };
  },
  methods: {
    getResult() {
      this.$axios
        .get("/api/result")
        .then(res => {
          this.tableData = res.data.data;
        })
        .catch(err => {
          new Error();
        });
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    blurActiveEvent(row, column) {
      this.saveRowEvent(row);
      console.log(row);
    },
    saveRowEvent(row) {
      this.$axios.put("/api/result", { data: row }).then(res => {
        console.log(res);
      });
      this.$notify({
        title: "成功",
        message: `成功修改${row.name}的信息`,
        type: "success"
      });
    }
  },
  created() {
    this.getResult();
  }
};
</script>

<style lang='stylus' scoped></style>
<style>
.cell {
  text-align: center;
}
</style>
