<template>
  <div>
    <h2>教学安排</h2>
    <template>
      <el-table :data="table.filter(data => !search || data.course.toLowerCase().includes(search.toLowerCase()))">
        <el-table-column label="编号"
          width="200"
          prop="number">
        </el-table-column>

        <el-table-column label="课程"
          width="200"
          prop="course">
        </el-table-column>

        <el-table-column label="开课时间"
          width="200"
          prop="date">
        </el-table-column>

        <el-table-column label="授课教师"
          width="200"
          prop="teacher">
        </el-table-column>

        <el-table-column label="课时"
          width="50"
          prop="count">
        </el-table-column>

        <el-table-column align="right">
          <template slot="header"
            slot-scope="scope">
            <el-input v-model="search"
              size="mini"
              placeholder="课程关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row.number)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-pagination layout="prev, pager, next,total"
        :total="tableData.length"
        :current-page="currentPage"
        :page-size='pagesize'
        @current-change="current_change">
      </el-pagination>
    </template>

    <el-dialog title="提示"
      :visible.sync="dialogVisibleEdit"
      width="30%">
      <ModifyTeach :props_form='props_form'
        @dialogClose="closeDialog" />
      <span slot="footer"
        class="dialog-footer">
      </span>
    </el-dialog>

  </div>
</template>

<script>
import ModifyTeach from "@/views/admin/views/teaching/ModifyTeach";

export default {
  computed: {
    table: function() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    }
  },
  components: {
    ModifyTeach
  },
  data() {
    return {
      props_form: {},
      pagesize: 5,
      currentPage: 1,
      dialogVisibleEdit: false,
      tableData: [
        {
          _id: 321,
          number: 1,
          course: "微机原理与接口技术",
          count: 16,
          date: "2019-04-02",
          teacher: "谭浩强"
        },
        {
          _id: 321,
          number: 2,
          course: "微机原理与接口技术",
          count: 16,
          date: "2019-04-02",
          teacher: "谭浩强"
        }
      ],
      search: ""
    };
  },
  methods: {
    closeDialog(v) {
      this.dialogVisibleEdit = v;
    },
    handleEdit(index, row) {
      this.props_form = row;
      this.dialogVisibleEdit = true;
      console.log(index, row);
    },
    getTeach() {
      let that = this;
      this.$axios.get("/api/teach").then(res => {
        that.tableData = res.data.data;
      });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete("/api/teach", { data: { number: row } })
            .then(res => {
              console.log(res);
              console.log(row);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            });
          this.getTeach();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    current_change: function(currentPage) {
      console.log(currentPage);
      this.currentPage = currentPage;
    }
  },
  created() {
    this.getTeach();
  }
};
</script>
