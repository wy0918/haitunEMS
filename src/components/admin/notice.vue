<template>
<div>    
<div>
    <el-button type="success" class="addBtn" @click="dialogAddVisible = true">
         <i class="el-icon-plus"></i>&nbsp;&nbsp;发布公告
    </el-button>
   <el-input placeholder="请输入公告标题" v-model="searchVersion" class="input-with-select" style="width:30%;float:left;margin-left:20px">
  </el-input>
</div>
    <el-table :data="tables" :cell-style="cellStyle" :header-cell-style="rowStyle">
			<el-table-column label="公告ID" prop="id"></el-table-column>
            <el-table-column label="公告标题" prop="title"></el-table-column>
			<el-table-column label="公告内容" prop="content" ></el-table-column>
            <el-table-column label="发布者" prop="publisher" ></el-table-column>
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
      <el-form-item label="公告ID" prop="id" >
				<el-input v-model.trim="addForm.id" ></el-input>
	  </el-form-item>
	  <el-form-item label="公告题目" prop="title">
				<el-input v-model.trim="addForm.title" ></el-input>
	  </el-form-item>
  <el-form-item label="公告内容" prop="content">
    <el-input type="textarea" v-model.trim="addForm.content"></el-input>
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
      <el-form-item label="公告ID" prop="id" >
				<el-input v-model.trim="editForm.id" :disabled="true"></el-input>
	  </el-form-item>
	  <el-form-item label="公告题目" prop="title">
				<el-input v-model.trim="editForm.title" ></el-input>
	  </el-form-item>
      <el-form-item label="实际姓名" prop="content">
				<el-input type="textarea" v-model.trim="editForm.content" ></el-input>
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
                title: '',
                id: '',
                content: '',
                publisher: 'admin',
            },
            editForm: {
                title: '',
                id: '',
                content: '',
                publisher: 'admin',
            },
        }
    },
    mounted(){
        this.axios.get('notice')
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
            this.axios.post('notice/addNotice',qs.stringify(this.addForm))
            .then((response)=>{
                this.$message.success('公告发布成功！');
                this.dialogAddVisible = false;
                setTimeout(function(){ 
                      location.reload();
                }, 2000);
            })
            .catch(() => {
                 this.$message({
                     type: 'error',
                     message: '公告ID请填入数字！'
                 });          
        });
        },
        delVersion:function(eventId){
              this.$confirm('确认删除该公告吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
              this.axios.get('notice/deleteNotice',{params:{id:eventId}})
              .then((response)=>{
                  this.$message.success('公告删除成功！');
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
              this.axios.post('notice/updateNotice',qs.stringify(this.editForm))
            .then((response)=>{
                let obj=response.data;
                this.$message.success('公告修改完成！');
                this.dialogEditVisible = false;
            })
        },
    }
}
</script>

