<template>
<div>
<el-menu default-active="archives" background-color="#5e87b0" text-color="#fff" active-text-color="#ffd04b" class="el-menu-vertical-demo" router>
      <el-menu-item index="archives">
        <i class="el-icon-menu"></i>
        <span >设备资产管理</span>
      </el-menu-item>
      <el-menu-item index="version">
        <i class="el-icon-menu"></i>
        <span >设备档案管理</span>
      </el-menu-item>
      <el-menu-item index="spareparts">
        <i class="el-icon-document"></i>
        <span >备品备件管理</span>
      </el-menu-item>
      <el-submenu index="2">
           <span slot="title"><i class="el-icon-menu"></i>设备维修管理</span>
          <el-menu-item index="repair">维修审核</el-menu-item>
          <el-menu-item index="repairHistory">维修记录</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
           <span slot="title"><i class="el-icon-menu"></i>设备借还管理</span>
          <el-menu-item index="lend">出借审核</el-menu-item>
          <el-menu-item index="lendHistory">出借记录</el-menu-item>
      </el-submenu>
      <el-menu-item index="notice">
        <i class="el-icon-setting"></i>
        <span >公告管理</span>
      </el-menu-item>
      <el-menu-item index="user">
        <i class="el-icon-setting"></i>
        <span >用户管理</span>
      </el-menu-item>
    </el-menu>
</div>
</template>
<style scoped>
.el-menu-vertical-demo {
    border-right: none
}
</style>



