<template>
  <div>

    <h2>考试安排</h2>

    <template>
      <div class="custom-table3-oper">
        <el-button type="success"
          size="mini"
          @click="exportCsvEvent">导出</el-button>
      </div>
      <elx-editable ref="elxEditable"
        :data.sync='tableData'
        :edit-config="{trigger: 'manual', mode: 'row'}"
        :edit-rules="{name: [{required: true, message: 'Please enter a name.', trigger: 'blur'}]}">
        <elx-editable-column prop="time"
          width='300'
          label="考试时间"
          :edit-render="{name: 'ElDatePicker', attrs: {type: 'datetime', format: 'yyyy-MM-dd hh:mm'}}"></elx-editable-column>

        <elx-editable-column prop="course"
          label="考试课程"
          width='200'
          show-overflow-tooltip
          :edit-render="{name: 'ElInput'}"></elx-editable-column>

        <elx-editable-column prop="open"
          label="是否开卷"
          width='120'
          :formatter="formatterOpen"
          :edit-render="{name: 'ElSwitch'}"></elx-editable-column>

        <elx-editable-column prop="place"
          label="考场地点"
          show-overflow-tooltip
          :edit-render="{name: 'ElInput'}"></elx-editable-column>
        <elx-editable-column label="操作"
          width="150">
          <template v-slot="scope">
            <template v-if="$refs.elxEditable.hasActiveRow(scope.row)">
              <el-button size="mini"
                type="success"
                @click="saveRowEvent(scope.row)">保存</el-button>
              <el-button size="mini"
                type="warning"
                @click="cancelRowEvent(scope.row)">取消</el-button>
            </template>
            <template v-else>
              <el-button size="mini"
                type="primary"
                @click="openActiveRowEvent(scope.row)">编辑</el-button>
              <el-button size="mini"
                type="danger"
                @click="removeEvent(scope.row)">删除</el-button>
            </template>
          </template>
        </elx-editable-column>
      </elx-editable>

    </template>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02 8:30",
          course: "数论",
          open: "否",
          place: "德育楼3层8教室"
        },
        {
          date: "2016-05-02 10:30",
          course: "毛泽东思想概论",
          type: "是",
          place: "德育楼4层1教室"
        },
        {
          date: "2016-05-03 14:30",
          course: "微机原理",
          type: "否",
          place: "明德楼2层1教室"
        },
        {
          date: "2016-05-03 15:30",
          course: "应用文写作概论",
          type: "是",
          place: "德育楼6层10教室"
        },
        {
          date: "2016-05-04 8:30",
          course: "Java程序设计",
          type: "否",
          place: "信息楼3层2教室"
        }
      ]
    };
  },
  methods: {
    exportCsvEvent() {
      this.$refs.elxEditable.exportCsv();
    },
    formatterOpen(row, column, cellValue, index) {
      return cellValue ? "开卷" : "闭卷";
    },
    // 编辑处理
    openActiveRowEvent(row) {
      this.$nextTick(() => {
        let activeInfo = this.$refs.elxEditable.getActiveRow();
        if (activeInfo && activeInfo.isUpdate) {
          this.isClearActiveFlag = false;
          MessageBox.confirm("检测到未保存的内容，请确认操作?", "温馨提示", {
            distinguishCancelAndClose: true,
            confirmButtonText: "保存数据",
            cancelButtonText: "取消修改",
            type: "warning"
          })
            .then(() => {
              this.$refs.elxEditable.setActiveRow(row);
              this.saveRowEvent(activeInfo.row);
            })
            .catch(action => {
              if (action === "cancel") {
                this.$refs.elxEditable.revert(activeInfo.row);
                this.$refs.elxEditable.setActiveRow(row);
              }
            })
            .then(() => {
              this.isClearActiveFlag = true;
            });
        } else {
          this.$refs.elxEditable.setActiveRow(row);
        }
      });
    },
    cancelRowEvent(row) {
      if (!row.id) {
        this.isClearActiveFlag = false;
        MessageBox.confirm("该数据未保存，是否移除?", "温馨提示", {
          distinguishCancelAndClose: true,
          confirmButtonText: "移除数据",
          cancelButtonText: "返回继续",
          type: "warning"
        })
          .then(action => {
            if (action === "confirm") {
              this.$refs.elxEditable.remove(row);
            }
          })
          .catch(e => e)
          .then(() => {
            this.isClearActiveFlag = true;
          });
      } else if (this.$refs.elxEditable.hasRowChange(row)) {
        this.isClearActiveFlag = false;
        MessageBox.confirm("检测到未保存的内容，是否取消修改?", "温馨提示", {
          distinguishCancelAndClose: true,
          confirmButtonText: "取消修改",
          cancelButtonText: "返回继续",
          type: "warning"
        })
          .then(action => {
            this.$refs.elxEditable.clearActive();
            this.$refs.elxEditable.revert(row);
          })
          .catch(action => {
            if (action === "cancel") {
              this.$refs.elxEditable.setActiveRow(row);
            }
          })
          .then(() => {
            this.isClearActiveFlag = true;
          });
      } else {
        this.$refs.elxEditable.clearActive();
      }
    },
    removeEvent(row) {
      let _id = row._id;
      if (_id) {
        this.isClearActiveFlag = false;
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$axios.delete("/api/exam", { data: { _id: _id } }).then(res => {
            console.log(res);
            this.getAllData();
            this.$notify({
              title: "成功",
              message: "成功删除一条考试信息",
              type: "success"
            });
          });
        });
      }
    },

    saveRowEvent(row) {
      this.$axios.put("/api/exam", { data: row }).then(res => {
        console.log(res);
      });
      this.$notify({
        title: "成功",
        message: "考试信息已经修改",
        offset: 100,
        type: "success"
      });
      this.getAllData();
    },
    getAllData() {
      this.$axios.get("/api/exam").then(res => {
        this.tableData = res.data;
        console.log(res.data);
      });
    }
  },
  created() {
    this.getAllData();
  }
};
</script>

<style lang='stylus' scoped></style>