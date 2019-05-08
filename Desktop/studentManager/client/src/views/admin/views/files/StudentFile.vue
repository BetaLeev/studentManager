<template>
  <div>
    <h2>学生档案</h2>
    <template>
      <elx-editable ref="editable"
        :data.sync='tableData'
        @blur-active="blurActiveEvent"
        :edit-config="{trigger: 'dblclick', mode: 'cell', }"
        :edit-rules="{name: [{required: true, message: 'Please enter a name.', trigger: 'blur'}]}">
        <elx-editable-column width="155"
          label="民族">
          <template slot-scope="scope">
            <i class="el-icon-info"></i>
            <span style="margin-left: 10px">{{ scope.row.racial }}</span>
          </template>
        </elx-editable-column>

        <elx-editable-column width="155"
          label="籍贯">
          <template slot-scope="scope">
            <i class="el-icon-star-off"></i>
            <span style="margin-left: 10px">{{ scope.row.origin }}</span>
          </template>
        </elx-editable-column>

        <elx-editable-column prop="address"
          width="400"
          label="家庭住址"
          :edit-render="{name: 'ElInput'}"></elx-editable-column>

        <elx-editable-column width="155"
          label="姓名">
          <template slot-scope="scope">
            <div slot="reference"
              class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
            </el-popover>
          </template>
        </elx-editable-column>
        <elx-editable-column label="操作"
          width="200">
          <template v-slot="scope">
            <el-button size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </elx-editable-column>
      </elx-editable>

    </template>
  </div>
</template>
<script>
export default {
  mounted() {},
  data() {
    return {
      tableData: [
        {
          racial: "汉族",
          origin: "陕西省",
          name: "王沪宁",
          sex: "女",
          birthday: "1995-3-2",
          address: "上海市普陀区金沙江路 1518 弄"
        },

        {
          racial: "汉族",
          origin: "辽宁省",
          name: "栗战书",
          sex: "女",
          birthday: "1996-5-1",
          address: "大连市普陀区金沙江路 15 弄"
        },
        {
          racial: "回族",
          origin: "湖北省",
          name: "张德江",
          sex: "男",
          birthday: "1999-1-22",
          address: "武昌市普陀区金沙江路 1518 弄"
        },
        {
          racial: "蒙族",
          origin: "陕西省",
          name: "张高丽",
          sex: "女",
          birthday: "1998-2-2",
          address: "宁夏市普陀区金沙江路 1518 弄"
        },
        {
          racial: "朝鲜族",
          origin: "四川省",
          name: "李克强",
          sex: "男",
          birthday: "1995-8-22",
          address: "重庆市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    getAllFile() {
      this.$axios.get("/api/file").then(res => {
        this.tableData = res.data;
        console.log(res);
      });
    },
    handleDelete(index) {
      let _id = index._id;

      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete("/api/file", { data: { _id: _id } }).then(res => {
            console.log(res);
            this.getAllFile();
            this.$notify({
              title: "成功",
              message: "成功删除一条学生档案信息",
              type: "success"
            });
          });
        })

        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    blurActiveEvent(row, column) {
      this.saveRowEvent(row);
      console.log(row);
    },
    saveRowEvent(row) {
      this.$axios.put("/api/file", { data: row }).then(res => {
        console.log(res);
      });
      this.$notify({
        title: "成功",
        message: "档案信息已经修改",
        offset: 100,
        type: "success"
      });
    }
  },
  created() {
    this.getAllFile();
  }
};
</script>

<style lang='stylus' scoped></style>
<style>
.cell {
  text-align: center;
}
</style>
