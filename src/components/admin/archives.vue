<template>
<div>
    <el-row :gutter="12">
        <el-col :span="8">
    <el-card shadow="hover" @click.native="goversion()">
      平台设备：<span class="state" id="version">{{ver_num}}</span>
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card shadow="hover" @click.native="gorepair()">
      报修申请：<span class="state" id="repair">{{repair_num}}</span>
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card shadow="hover" @click.native="golend()">
      出借申请：<span class="state" id="lend">{{lend_num}}</span>
    </el-card>
  </el-col>
    </el-row>
    <el-row style="margin-top:50px">
      <el-col :span="12">
        <div v-for="i in impVersion" :key="i.id">
          <el-alert title="紧急维修" type="error" show-icon style="text-align:left;margin-bottom:5px">{{i.ver_name}}</el-alert>
  </div>
        <h4 style="text-align:left">已审核维修设备</h4>
     <el-table :data="tableData" style="width: 100%" >
            <el-table-column label="设备名称" prop="ver_name"> </el-table-column>
            <el-table-column label="设备地点" prop="location"> </el-table-column>
             <el-table-column label="维修说明" prop="remark"> </el-table-column>
             <el-table-column label="状态" prop="state" ></el-table-column>
		</el-table>
      </el-col>
      <el-col :span="12">
    <ve-pie :data="chartData"></ve-pie>
      </el-col>
    </el-row>
</div>
</template>
<style scoped>
.el-card {
    text-align: left;
}
#version {
    color: turquoise
}
#repair {
    color: red
}
#lend {
    color: blue
}
.state {
    font-size: 30px;
}
</style>

<script>
export default {
  data(){
    return{
      ver_num:null,
      repair_num:null,
      lend_num:null,
      tableData: [],
       chartData: {
          columns: ['状态', '数量'],
          rows: [
            { '状态': '可出借', '数量': 11 },
            { '状态': '已借出', '数量': 2 },
            { '状态': '待维修', '数量': 1 },
            { '状态': '维修中', '数量': 2 }
          ]
        },
      impVersion:[]
    }
  },
  mounted(){
    this.axios.get('version')
    .then((response)=>{
      let obj=response.data;
      this.ver_num=obj.data.length;
    })
    this.axios.get('repair')
    .then((response)=>{
      let obj=response.data;
      this.repair_num=obj.data.length;
    })
    this.axios.get('repair/impRepair')
    .then((response)=>{
      let obj=response.data;
      this.impVersion=obj.data;
    })
    this.axios.get('lend')
    .then((response)=>{
      let obj=response.data;
      this.lend_num=obj.data.length;
    })
    this.axios.get('repair/finishRepair')
    .then((response)=>{
      let obj=response.data;
      this.tableData=obj.data;
    })
  },
  methods:{
      goversion() {
          this.$router.push({path: 'version'})
      },
      gorepair() {
          this.$router.push({path: 'repair'})
      },
      golend() {
          this.$router.push({path: 'lend'})
      }
  }
}
</script>
