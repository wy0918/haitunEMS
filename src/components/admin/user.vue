<template>
<div>    
<div>
    <el-button type="success" class="addBtn" @click="dialogAddVisible = true">
         <i class="el-icon-plus"></i>&nbsp;&nbsp;新增用户
    </el-button>
   <el-input placeholder="请输入用户姓名" v-model="searchVersion" class="input-with-select" style="width:30%;float:left;margin-left:20px">
  </el-input>
</div>
    <el-table :data="tables" :cell-style="cellStyle" :header-cell-style="rowStyle">
			<el-table-column label="用户ID" prop="id"></el-table-column>
            <el-table-column label="用户名" prop="username"></el-table-column>
			<el-table-column label="真实姓名" prop="realname" ></el-table-column>
            <el-table-column label="所属部门" prop="department" ></el-table-column>
			<el-table-column label="操作" >
        <template slot-scope="event">
          <div>
            <span>
              <el-button size="small" type="primary" @click="editDialog(event.row)">编辑</el-button>
            </span>
            <span>
              <el-button size="small" type="danger" @click="delVersion(event.row.id)">删除</el-button>
            </span>
          </div>
        </template>
			</el-table-column>
		</el-table>
<!-- add version -->
<el-dialog title="新增用户"  :visible.sync="dialogAddVisible">
  <el-form :model="addForm" label-width="80px">
      <el-form-item label="用户ID" prop="id" >
				<el-input v-model.trim="addForm.id" ></el-input>
	  </el-form-item>
	  <el-form-item label="用户名称" prop="username">
				<el-input v-model.trim="addForm.username" ></el-input>
	  </el-form-item>
      <el-form-item label="实际姓名" prop="realname">
				<el-input v-model.trim="addForm.realname" ></el-input>
	  </el-form-item>
     <el-form-item label="所属部门" prop="department">
    <el-select v-model.trim="addForm.department" placeholder="请选择用户所属部门">
      <el-option label="船舶部门" value="船舶部门"></el-option>
      <el-option label="计算机部门" value="计算机部门"></el-option>
      <el-option label="力学系" value="力学系"></el-option>
      <el-option label="算法部门" value="算法部门"></el-option>
      <el-option label="海事部门" value="海事部门"></el-option>
      <el-option label="航空航天部门" value="航空航天部门"></el-option>
    </el-select>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogAddVisible = false">取 消</el-button>
    <el-button type="primary" @click="add">提 交</el-button>
  </div>
</el-dialog>
<!-- add version -->
<!-- edit version -->
<el-dialog title="用户信息修改"  :visible.sync="dialogEditVisible" style="width:60%;margin-left:320px">
  <el-form :model="editForm" label-width="80px">
      <el-form-item label="用户ID" prop="id" >
				<el-input v-model.trim="editForm.id" :disabled="true"></el-input>
	  </el-form-item>
	  <el-form-item label="用户名称" prop="username">
				<el-input v-model.trim="editForm.username" ></el-input>
	  </el-form-item>
      <el-form-item label="实际姓名" prop="realname">
				<el-input v-model.trim="editForm.realname" ></el-input>
	  </el-form-item>
     <el-form-item label="所属部门" prop="department">
    <el-select v-model.trim="editForm.department" placeholder="请选择用户所属部门">
      <el-option label="船舶部门" value="船舶部门"></el-option>
      <el-option label="计算机部门" value="计算机部门"></el-option>
      <el-option label="力学系" value="力学系"></el-option>
      <el-option label="算法部门" value="算法部门"></el-option>
      <el-option label="海事部门" value="海事部门"></el-option>
      <el-option label="航空航天部门" value="航空航天部门"></el-option>
    </el-select>
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
            searchVersion:'',
            addForm: {
                username: '',
                id: '',
                department: '',
                realname: '',
            },
            editForm: {
                username: '',
                id: '',
                department: '',
                realname: '',
            },
        }
    },
    mounted(){
        this.axios.get('user')
        .then((response)=>{
            let obj=response.data;
            this.tableData=obj.data;
        })
    },
    components: {
    },
    computed: {
    tables () {
      const search = this.searchVersion
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
            this.axios.post('user/addUser',qs.stringify(this.addForm))
            .then((response)=>{
                this.$message.success('用户添加成功！');
                this.dialogAddVisible = false;
                setTimeout(function(){ 
                      location.reload();
                }, 2000);
            })
            .catch(() => {
                 this.$message({
                     type: 'error',
                     message: '用户ID请填入数字！'
                 });          
        });
        },
        delVersion:function(eventId){
              this.$confirm('确认删除该用户吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
              this.axios.get('user/deleteUser',{params:{id:eventId}})
              .then((response)=>{
                  this.$message.success('用户删除成功！');
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
              this.axios.post('user/updateUser',qs.stringify(this.editForm))
            .then((response)=>{
                let obj=response.data;
                this.$message.success('用户信息修改完成！');
                this.dialogEditVisible = false;
            })
        },
    }
}
</script>

