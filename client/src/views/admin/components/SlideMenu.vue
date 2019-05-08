<template>

  <nav>
    <el-radio-group v-model="isCollapse"
      style="margin-bottom: 20px;">

    </el-radio-group>
    <el-menu default-active="1"
      unique-opened
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :router='true'>
      <el-menu-item index="/admin">
        <i class="el-icon-menu"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>

      <el-submenu index='2'>
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span slot="title">教学安排</span>
        </template>
        <el-menu-item-group>
          <span slot="title">教学安排</span>
          <el-menu-item index="/admin/teaching/show-teach">课程显示</el-menu-item>
          <el-menu-item index="/admin/teaching/add-teach">新增课程</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-printer"></i>
          <span slot="title">学生成绩</span>
        </template>
        <el-menu-item-group>
          <span slot="title">成绩管理</span>
          <el-menu-item index="/admin/results/student-result">成绩显示</el-menu-item>
          <el-menu-item index='/admin/results/add-result'>添加学生成绩</el-menu-item>
          <el-menu-item index='/admin/results/student-result-chart'>学生成绩分析</el-menu-item>

        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">学生档案</span>
        </template>
        <el-menu-item-group>
          <span slot="title">档案管理</span>
          <el-menu-item index="/admin/files/student-file">所有档案</el-menu-item>
          <el-menu-item index="/admin/files/add-file">新增档案</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">考试安排</span>
        </template>
        <el-menu-item-group>
          <span slot="title">安排考试管理</span>
          <el-menu-item index="/admin/exam/student-exam">考试安排表</el-menu-item>
          <el-menu-item index="/admin/exam/add-exam">新增考试</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="6"
        disabled>
        <i class="el-icon-document"></i>
        <span slot="title">其他</span>
      </el-menu-item>

      <el-menu-item index="/admin/setting">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>

  </nav>
</template>

  <script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang='stylus' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}</style>
<style>
.aside {
  box-shadow: 3px 3px 3px gainsboro !important;
  background: linear-gradient(to left, #7a88ff, #7affaf);
}
</style>
