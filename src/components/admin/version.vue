<template>
<div>    
<div >
    <el-button type="success" class="addBtn" @click="dialogAddVisible = true">
         <i class="el-icon-plus"></i>&nbsp;&nbsp;新设备入库
    </el-button>
   <el-input placeholder="请输入需要查找的设备名称" v-model="searchVersion" class="input-with-select" style="width:30%;float:left;margin-left:20px">
  </el-input>
</div>
    <el-table :data="tables" :cell-style="cellStyle" :header-cell-style="rowStyle">
			<el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="设备名" prop="name"></el-table-column>
			<el-table-column label="型号" prop="type" ></el-table-column>
            <el-table-column label="生产厂商" prop="producer" ></el-table-column>
            <el-table-column label="入库日期" prop="in_date" ></el-table-column>
            <el-table-column label="存放地点" prop="location" ></el-table-column>
            <el-table-column label="设备状态" prop="state" ></el-table-column>
            <el-table-column label="图片" prop="url" >
                <template slot-scope="img">            
                    <img :src="img.row.url"  min-width="70" height="70" />
                 </template>
            </el-table-column>
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
<el-dialog title="新设备入库"  :visible.sync="dialogAddVisible">
  <el-form :model="addForm" label-width="80px">
      <el-row>
          <el-col :span="12">
      <el-form-item label="设备ID" prop="id" >
				<el-input v-model.trim="addForm.id" ></el-input>
	  </el-form-item>
          </el-col>
          <el-col :span="12">
	  <el-form-item label="设备名称" prop="name">
				<el-input v-model.trim="addForm.name" ></el-input>
	  </el-form-item>
          </el-col>
      </el-row>
      <el-form-item label="设备型号" prop="type">
				<el-input v-model.trim="addForm.type" ></el-input>
	  </el-form-item>
      <el-form-item label="生产厂商" prop="producer">
				<el-input v-model.trim="addForm.producer"></el-input>
	  </el-form-item>
      <el-row>
          <el-col :span="12">
      <el-form-item label="入库时间" prop="in_date">
      <el-date-picker type="date" placeholder="选择日期" v-model.trim="addForm.in_date"></el-date-picker>
      </el-form-item>
          </el-col>
          <el-col :span="12">
     <el-form-item label="所属部门" prop="depart">
    <el-select v-model.trim="addForm.depart" placeholder="请选择设备所属部门">
      <el-option label="船舶部门" value="船舶部门"></el-option>
      <el-option label="计算机部门" value="计算机部门"></el-option>
      <el-option label="力学系" value="力学系"></el-option>
      <el-option label="算法部门" value="算法部门"></el-option>
      <el-option label="海事部门" value="海事部门"></el-option>
      <el-option label="航空航天部门" value="航空航天部门"></el-option>
    </el-select>
  </el-form-item>
          </el-col>
      </el-row>
       <el-form-item label="存放地址" prop="location">
				<el-input v-model.trim="addForm.location"></el-input>
	  </el-form-item>
   <el-form-item label="设备详情" prop="intro">
    <el-input type="textarea" v-model.trim="addForm.intro"></el-input>
  </el-form-item>    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogAddVisible = false">取 消</el-button>
    <el-button type="primary" @click="add">提 交</el-button>
  </div>
</el-dialog>
<!-- add version -->
<!-- edit version -->
<el-dialog title="设备信息修改"  :visible.sync="dialogEditVisible">
  <el-form :model="editForm" label-width="80px">
      <el-row>
          <el-col :span="12">
      <el-form-item label="设备ID" prop="id" >
				<el-input v-model.trim="editForm.id" :disabled="true"></el-input>
	  </el-form-item>
          </el-col>
          <el-col :span="12">
	  <el-form-item label="设备名称" prop="name">
				<el-input v-model.trim="editForm.name" ></el-input>
	  </el-form-item>
          </el-col>
      </el-row>
      <el-form-item label="设备型号" prop="type">
				<el-input v-model.trim="editForm.type" ></el-input>
	  </el-form-item>
      <el-form-item label="生产厂商" prop="producer">
				<el-input v-model.trim="editForm.producer"></el-input>
	  </el-form-item>
      <el-row>
          <el-col :span="12">
      <el-form-item label="入库时间" prop="in_date">
               <el-input v-model.trim="editForm.in_date"></el-input>
      </el-form-item>
          </el-col>
          <el-col :span="12">
     <el-form-item label="所属部门" prop="depart">
    <el-select v-model.trim="editForm.depart" placeholder="请选择设备所属部门">
      <el-option label="船舶部门" value="船舶部门"></el-option>
      <el-option label="计算机部门" value="计算机部门"></el-option>
      <el-option label="力学系" value="力学系"></el-option>
      <el-option label="算法部门" value="算法部门"></el-option>
      <el-option label="海事部门" value="海事部门"></el-option>
      <el-option label="航空航天部门" value="航空航天部门"></el-option>
    </el-select>
  </el-form-item>
          </el-col>
      </el-row>
       <el-form-item label="存放地址" prop="location">
				<el-input v-model.trim="editForm.location"></el-input>
	  </el-form-item>
   <el-form-item label="设备详情" prop="intro">
    <el-input type="textarea" v-model.trim="editForm.intro"></el-input>
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
                name: '',
                id: '',
                producer: '',
                in_date: '',
                type: '',
                depart:'',
                location:'',
                intro:'',
                state:'可出借'
            },
            editForm: {
                name: '',
                id: '',
                producer: '',
                in_date: '',
                type: '',
                depart:'',
                location:'',
                intro:'',
                state:'可出借'
            },
        }
    },
    mounted(){
        this.axios.get('version')
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
            this.axios.post('version/addVersion',qs.stringify(this.addForm))
            .then((response)=>{
                let obj=response.data;
                //alert(obj.data);
                this.$message.success('设备添加成功！');
                this.dialogAddVisible = false;
                setTimeout(function(){ 
                      location.reload();
                }, 2000);
            })
            .catch(() => {
                 this.$message({
                     type: 'error',
                     message: '设备ID请填入数字！'
                 });          
        });
        },
        delVersion:function(eventId){
              this.$confirm('确认删除该设备吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
              this.axios.get('version/deleteVersion',{params:{id:eventId}})
              .then((response)=>{
                  this.$message.success('设备删除成功！');
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
              this.axios.post('version/updateVersion',qs.stringify(this.editForm))
            .then((response)=>{
                let obj=response.data;
                this.$message.success('设备修改完成！');
                this.dialogEditVisible = false;
            })
        },
    }
}
</script>

