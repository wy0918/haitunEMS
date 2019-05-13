<template>
  <div class="login-container">
  <div class="login-box">
    <el-form :model="form" :rules="form.rules2" ref="form" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">
      <h3 class="title">海囤设备管理系统</h3>
      <el-form-item>
        <el-input type="text" v-model="form.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="form.checked" style="margin:0px 0px 35px 0px;float:left">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>
<style scoped>
.login-container {
    width: 100%;
    height: 792px;
    background-image: url("../../../static/login-bg.jpg");
    background-repeat: no-repeat;
}
.login-box {
    padding: 200px 550px 200px 550px;
}
.card-box {
	padding: 20px;
	/*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
	-webkit-border-radius: 5px;
	border-radius: 5px;
	-moz-border-radius: 5px;
	background-clip: padding-box;
	background-color: #fff;
	width: 400px;
	border: 2px solid #fff;
}

.title {
	margin: 0px auto 40px auto;
	text-align: center;
	color: #505458;
}

.loginform {
	width: 350px;
	padding: 35px 35px 15px 35px;
}
</style>
<script>
import axios from "axios";
export default {
    data(){
      return{
        form:{
          username: '',
          password: '',
          rules2: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        checked: false
        },    
    }},
    methods:{
        login(){
            //this.$router.push({name: 'archives'});
            var that=this;
            this.axios.get(`user/searchUser/`,{params:{name:this.form.username}})
            .then((response)=>{
                let obj=response.data;
                console.log(obj.data.password);
                if(this.form.password==obj.data.password){
                    this.$message({
                    message: '恭喜登陆成功',
                    type: 'success'
                    });
                    setTimeout(function(){ 
                      that.$router.push({name: 'archives'})
                     }, 2000);
                }else
                this.$message.error('密码输入错误');
            }).catch(err=>{
               this.$message.error('账号不存在');
            });
        }
    }
}
</script>
