<template>
<div>
    <el-input placeholder="请输入需要查找的维修单" v-model="search" class="input-with-select" style="width:30%;float:right;margin-bottom:20px">
  </el-input>
    <el-table :data="tables" :cell-style="cellStyle" :header-cell-style="rowStyle">
			<el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="设备id" prop="ver_id"></el-table-column>
			<el-table-column label="报修人员" prop="username" ></el-table-column>
            <el-table-column label="存放地点" prop="location"></el-table-column>
            <el-table-column label="维修说明" prop="remark"></el-table-column>
    <el-table-column label="操作" width="200">
        <template slot-scope="event">
          <div>
            <span>
              <el-button size="small" type="primary" @click="pass(event.row)">同意</el-button>
            </span>
            <span>
              <el-button size="small" type="danger" @click="reject(event.row.id)">驳回</el-button>
            </span>
          </div>
        </template>
	</el-table-column>
		</el-table>
<!-- reject -->
<el-dialog title="维修申请驳回"  :visible.sync="dialogEditVisible" style="width:70%;left:16%">
  <el-form :model="rejectForm" label-width="80px">
      <el-form-item label="驳回理由" prop="result">
				<el-input v-model.trim="rejectForm.result"></el-input>
	  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogEditVisible = false">取 消</el-button>
    <el-button type="primary" @click="edit">提 交</el-button>
  </div>
</el-dialog>
<!-- reject -->
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
            dialogEditVisible: false,
            search:'',
            rejectForm: {
                id:'',
                result:'',
                state:'驳回',
                flag:'',
            },
            passForm: {
                id:'',
                result:'同意维修',
                state:'维修中',
                flag:'',
            },
            changeForm:{
                id:'',
                state:'维修中'
            }
        }
    },
    mounted(){
        this.axios.get('repair')
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
        },
        pass:function(event){
            this.$confirm('确认维修设备吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
            this.passForm.id=event.id;
            this.changeForm.id=event.ver_id;
            this.passForm.flag=1;
            this.axios.post('version/updateVersion',qs.stringify(this.changeForm))
            .then((response)=>{
                console.log(response.data);
            });
            this.axios.post('repair/updateRepair',qs.stringify(this.passForm))
            .then((response)=>{
                this.$message.success('设备已进入维修状态！');
                // setTimeout(function(){ 
                //       location.reload();
                // }, 1000);
            })
            })
        },
        reject:function(eventId){
              this.rejectForm.id=eventId;
              this.dialogEditVisible=true;
        },
        edit:function(){
            this.rejectForm.flag=1;
              this.axios.post('repair/updateRepair',qs.stringify(this.rejectForm))
            .then((response)=>{
                this.$message.success('维修申请已驳回！');
                this.dialogEditVisible = false;
                setTimeout(function(){ 
                      location.reload();
                }, 1000);
            })
        }
    }
}
</script>

