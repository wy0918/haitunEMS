<template>
<div>
    <el-button type="success" class="addBtn" @click="dialogAddVisible = true">
         <i class="el-icon-plus"></i>&nbsp;&nbsp;增加备件
    </el-button>
    <el-input placeholder="请输入需要查找的备件名称" v-model="search" class="input-with-select" style="width:30%;float:left;margin-left:20px">
  </el-input>
    <el-table :data="tables" :cell-style="cellStyle" :header-cell-style="rowStyle">
			<el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="设备名" prop="name"></el-table-column>
			<el-table-column label="型号" prop="type" ></el-table-column>
            <el-table-column label="库存" prop="num"></el-table-column>
    <el-table-column label="操作" width="200">
        <template slot-scope="event">
          <div>
            <span>
              <el-button size="small" type="primary" @click="editDialog(event.row)">编辑</el-button>
            </span>
            <span>
              <el-button size="small" type="danger" @click="delSpare(event.row.id)">删除</el-button>
            </span>
          </div>
        </template>
	</el-table-column>
		</el-table>
<!-- add version -->
<el-dialog title="新增备品备件"  :visible.sync="dialogAddVisible">
  <el-form :model="addForm" label-width="80px">
      <el-form-item label="备件ID" prop="id" >
				<el-input v-model.trim="addForm.id" ></el-input>
	  </el-form-item>
	  <el-form-item label="备件名称" prop="name">
				<el-input v-model.trim="addForm.name" ></el-input>
	  </el-form-item>
      <el-form-item label="备件型号" prop="type">
				<el-input v-model.trim="addForm.type" ></el-input>
	  </el-form-item>
      <el-form-item label="数量" prop="num">
				<el-input v-model.trim="addForm.num"></el-input>
	  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogAddVisible = false">取 消</el-button>
    <el-button type="primary" @click="add">提 交</el-button>
  </div>
</el-dialog>
<!-- add version -->
<!-- edit version -->
<el-dialog title="设备信息修改"  :visible.sync="dialogEditVisible" style="width:70%;left:16%">
  <el-form :model="editForm" label-width="80px">
      <el-form-item label="备件ID" prop="id" >
				<el-input v-model.trim="editForm.id" :disabled="true"></el-input>
	  </el-form-item>
	  <el-form-item label="备件名称" prop="name">
				<el-input v-model.trim="editForm.name" ></el-input>
	  </el-form-item>
      <el-form-item label="备件型号" prop="type">
				<el-input v-model.trim="editForm.type" ></el-input>
	  </el-form-item>
      <el-form-item label="备件数量" prop="num">
				<el-input v-model.trim="editForm.num"></el-input>
	  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogEditVisible = false">取 消</el-button>
    <el-button type="primary" @click="edit">提 交</el-button>
  </div>
</el-dialog>
<!-- edit version -->
</div>
</template>
<style scoped>
.addBtn {
    float: left;
    margin-bottom:20px;
}
</style>

<script>
import axios from "axios";
import qs from 'qs';
export default {
    data(){
        return {
            tableData: [],
            dialogAddVisible: false,
            dialogEditVisible: false,
            search:'',
            addForm: {
                name: '',
                id: '',
                num: '',
                type: '',
            },
            editForm: {
                name: '',
                id: '',
                num: '',
                type: '',
            },
        }
    },
    mounted(){
        this.axios.get('spare')
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
        add:function(){
            this.axios.post('spare/addSpare',qs.stringify(this.addForm))
            .then((response)=>{
                this.$message.success('备品备件新增成功！');
                this.dialogAddVisible = false;
                setTimeout(function(){ 
                      location.reload();
                }, 2000);
            })
            .catch(() => {
                 this.$message({
                     type: 'error',
                     message: '备品备件ID请填入数字！'
                 });          
        });
        },
        delSpare:function(eventId){
              this.$confirm('确认删除该备件吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
              this.axios.get('spare/deleteSpare',{params:{id:eventId}})
              .then((response)=>{
                  this.$message.success('备件删除成功！');
                  setTimeout(function(){ 
                      location.reload();
                }, 1000);
              })
              });
        },
        editDialog:function(event){
              this.editId=event.id;
              this.editForm=event;
              this.dialogEditVisible=true;
        },
        edit:function(){
              this.axios.post('spare/updateSpare',qs.stringify(this.editForm))
            .then((response)=>{
                let obj=response.data;
                this.$message.success('备件信息修改完成！');
                this.dialogEditVisible = false;
            })
        }
    }
}
</script>

