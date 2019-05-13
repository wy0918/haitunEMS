<template>
<el-container>
  <el-header>
    <img src="../../static/logo.png" class="logo">
    <span class="logo-title">海囤设备管理系统</span>
    <span class="logout" @click="logout">退出</span>
  </el-header>
  <el-container>
    <el-aside width="200px">
			<leftMenu></leftMenu>
		</el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<style scoped>
@import '../assets/css/home.css';
</style>
<script>
import axios from "axios";
import leftMenu from './common/leftMenu.vue'
export default {
    data() {
      return {

      }
    },
    mounted(){
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
			},
			logout:function(){
				this.$router.push({ path:'/' })
			}
    },
    components: {
      leftMenu
    }
  }
</script>


