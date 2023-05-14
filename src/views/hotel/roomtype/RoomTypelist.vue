<template>
  <el-card class="box-card">
    <!--头部 start-->
    <template #header>
      <div class="card-header">
        <h3>
          <el-icon style="margin-right: 10px;"><RoomTypeFilled/></el-icon>房间类型
        </h3>
        <!--搜索区域 start-->
        <div class="card-search">
          <el-row :gutter="24">
            <el-col :span="16">
              <el-input :prefix-icon="Search" v-model="searchValue" @keyup.enter.native="search"
                        placeholder="房间类型搜索（回车）"/>
            </el-col>
<!--            <el-col :span="8">-->
<!--              <el-select v-model="status" placeholder="请选择状态">-->
<!--                <el-option label="全部" value="-1"/>-->
<!--                <el-option label="封禁" value="0"/>-->
<!--                <el-option label="正常" value="1"/>-->
<!--              </el-select>-->
<!--            </el-col>-->
            <el-col :span="2" style="display: inline-flex;justify-content: center;align-items: center;cursor: pointer">
              <el-icon style="font-size: 20px;color: #b3b6bc" @click="refresh"><Refresh/></el-icon>
            </el-col>
            <el-col :span="6">
              <div class="my-button">
                <el-button plain style="width: 100%;" color="#2fa7b9" @click="addroomType">添加类型</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <!--搜索区域 end-->
      </div>
    </template>
    <!--头部 end-->

    <!--表格区域 start-->
    <div class="table-box">
      <el-table element-loading-text="数据加载中..." v-loading="loading" :data="tableData"
                style="width: 100%;text-align: center" :cell-style="{textAlign: 'center'}"
                :header-cell-style="{fontSize: '15px', background: '#083a6d',color: 'white',textAlign: 'center'}">

        <el-table-column label="序号" width="100" type="index" :index="Nindex"/>

        <el-table-column label="类型名称">
          <template #default="scope">
            <el-tooltip :content="scope.row.typeName" placement="top" effect="light">
              <span class="highlight">{{scope.row.typeName}}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="类型编号">
          <template #default="scope">
            <el-tooltip :content="scope.row.typeSort" placement="top" effect="light">
              <span class="highlight">{{scope.row.typeSort}}</span>
            </el-tooltip>
          </template>
        </el-table-column>


        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="editRoomType(scope.row.id)">编辑</el-button>
            <el-popconfirm width="200px" confirm-button-text="确定" cancel-button-text="取消" :icon="Delete"
                           icon-color="#626AEF" :title="'确定删除类型名称为“'+scope.row.typeName+'”吗？'"
                           @confirm="delRoomType(scope.row.id)">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!--分页 start-->
      <el-pagination background layout="total,sizes,prev,pager,next,jumper" :total="total"
                     v-model:page-size="pageSize"
                     @current-change="changePage"
                     :page-sizes="[10,20,30,40]"/>
      <!--分页 end-->

    </div>
    <!--表格区域 end-->
    <RoomType ref="roomType"   @success="success" :id="id" :pageTitle="pageTitle"/>
  </el-card>


</template>

<script setup lang="ts">
import { reactive,toRefs, onMounted,watch,ref} from 'vue'
import { getRoomTypeListApi,delRoomTypeApi} from "@/api/hotel/hotelApi"

import { formatTime } from "../../../utils/date"
import { ElMessage } from 'element-plus'
import {exportExcel} from "../../../utils/exportExcel";
import  RoomType from "./module/RoomType.vue"
const state = reactive({
  // 搜索表单内容
  searchValue: "",
  // 表格数据内容
  tableData: [],
  // 总条数
  total: 0,
  // 每页显示行数
  pageSize: 10,
  // 当前页码
  pageIndex: 1,
  // 数据加载
  loading:false,
  pageTitle:'新增',
  id:'', // 数据id
})
const roomType = ref<InstanceType<typeof RoomType>>()   //泛类型   <typeof HelloWorld>的HelloWorld是组件
// 获取用户列表数据
const loadData = async (state:any)=> {
  state.loading = true
  // 先清空数据
  state.tableData = []
  const params = {
    'pageNo': state.pageIndex,
    'pageSize': state.pageSize,
    'typeName': state.searchValue
  }

  const { data } = await getRoomTypeListApi(params)
  state.tableData = data.result.records
  state.total = data.result.total
  state.loading = false

}

// 刷新
const refresh = ()=> {
  // 搜索表单内容
  state.searchValue = ""
  // 更新数据
  loadData(state)
}

// 搜索
const search = ()=> {
  if(state.searchValue !==null){
    ElMessage({
      type: 'success',
      message: `关键字“${state.searchValue}”搜索内容如下`
    })
    loadData(state)
  }
}


// 切换页码执行事件 val 当前页码
const changePage = (val:number)=> {
  state.pageIndex = val
  loadData(state)
}

// 处理序号
const Nindex = (index:number)=> {
  const page = state.pageIndex // 当前的页面
  const pageSize = state.pageSize // 每页条数
  return index+1+(page-1)*pageSize
}
// 添加用户
const addroomType = ()=> {
  state.id=''
  state.pageTitle='新增'
  roomType.value.visible=true
}
// 关闭新增用户弹出框
const closeAddRoomTypeForm = () => {
  roomType.value.visible=false
}

// 提交表单回调函数
const success = ()=> {
  loadData(state)
  closeAddRoomTypeForm()
 // closeEditRoomTypeForm()
}

// 编辑用户弹出状态
const editRoomTypeDialogFormVisible = ref(false)

// 编辑用户信息
const editRoomType = async (id:number)=> {
  state.pageTitle='编辑'
  state.id=String(id),
  roomType.value.visible=true
  // const { data } = await getRoomTypeApi(id)
  // userInfo.value = data.result
  // editRoomTypeDialogFormVisible.value = true
}
// 关闭编辑用户弹出框
const closeEditRoomTypeForm = ()=> {
  editRoomTypeDialogFormVisible.value = false
}

// 删除用户信息
const delRoomType = async (id:number)=> {
  if (id == null) return
  let params={id:id}
  const { data } = await delRoomTypeApi(params)
  if (data.code===200){
    ElMessage.success('删除成功')
    await loadData(state)
  }else {
    ElMessage.error('删除失败')
  }
}

// 定义需要导出的列名对象
const column = [
  {name: 'username',label: '类型名称'},
  {name: 'realname',label: '类型序号'},
  {name: 'status',label: '状态'},
]

// 导出excel函数
const exportExcelAction = ()=> {
  exportExcel({
    column,
    data: state.tableData,
    filename: '房间类型信息数据',
    format: 'xlsx',
    autowidth: true
  })
}

// 挂载后加载数据
onMounted(()=> {
  loadData(state)
})

const { tableData,pageIndex,pageSize,loading,total,status,searchValue,pageTitle,id } = toRefs(state)
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

:deep(.el-card__header){
  border-bottom: 1px solid rgb(238 238 238);
  color: #083a6d;
}

.el-card{
  border-radius: 0px;
  border: none;
}


/*分页样式*/
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #083a6d;
}

.el-pagination {
  margin-top: 20px;
  justify-content: center;
}

/*新增用户弹出框自定义头部样式*/
.my-header {
  display: flex;
  justify-content: flex-start;
}


/*修改v-loading样式*/
:deep(.el-loading-spinner .el-loading-text){
  color: #083a6d;
}
:deep(.el-loading-spinner .path){
  stroke: #083a6d;
}

/*自定义按钮样式*/
.my-button {
  display: flex;
  justify-content: space-between;
}

</style>
