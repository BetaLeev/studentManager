<template>

  <el-row :gutter="20">
    <el-col :span="3">

      <a href="/"><img src="/img/logo.svg"
          style="height:40px;margin-top:10px;float:right"
          alt=""></a>

    </el-col>
    <el-col :span="5">
      <h2 style="line-height:30px;float:left">后台管理</h2>
    </el-col>

    <el-col :span="14"
      style="text-align:right">
      <div class="grid-content">
        <div class="grid-content ">
          <el-dropdown>
            <span class="el-dropdown-link">
              管理员<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-circle-check-outline"><a href="/">退出</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-col>
  </el-row>

</template>


<style lang='stylus' scoped>
.el-col {
  line-height: 60px;
}

.logo {
  font-size: 2rem;
}

.el-dropdown-link {
  cursor: pointer;
  color: white;
}

a {
  text-decoration: none;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
<style>
</style>
