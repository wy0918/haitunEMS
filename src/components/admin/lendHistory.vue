<template>
<div>
    <el-input placeholder="请输入需要查找的出借申请" v-model="search" class="input-with-select" style="width:30%;float:right;margin-bottom:20px">
  </el-input>
    <el-table :data="tables" :cell-style="cellStyle" :header-cell-style="rowStyle">
			<el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="设备名称" prop="ver_name"></el-table-column>
			<el-table-column label="报修人员" prop="username" ></el-table-column>
            <el-table-column label="存放地点" prop="location"></el-table-column>
            <el-table-column label="维修说明" prop="remark"></el-table-column>
            <el-table-column label="审核结果" prop="result"></el-table-column>
            <el-table-column label="设备状态" prop="state"></el-table-column>
		</el-table>
</div>
</template>
<style scoped>

</style>
<script>
import axios from "axios";
import qs from 'qs';
export default {
    data(){
        return {
            tableData: [],
            search:'',
        }
    },
    mounted(){
        this.axios.get('lend/finishLend')
        .then((response)=>{
            let obj=response.data;
            this.tableData=obj.data;
        })
    },
    components: {
    },
    computed: {
    tables () {
      const search = this.search
      if (search) {
        console.log('this.tableData', this.tableData)
        return this.tableData.filter(dataNews => {
          return Object.keys(dataNews).some(key => {
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      console.log('this.tableData', this.tableData)
      return this.tableData
    }
    },
    methods:{
        cellStyle({row,column,rowIndex,columnIndex}){
            return "text-align:center"
        },
        rowStyle({row,rowIndex}){
            return "text-align:center"
        }
    }
}
</script>

