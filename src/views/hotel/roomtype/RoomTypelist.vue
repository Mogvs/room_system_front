<template>
  <el-card class="box-card">
    <!--头部 start-->
    <template #header>
      <div class="card-header">
        <h3>
          <el-icon style="margin-right: 10px;"><Histogram/></el-icon>房间类型
        </h3>
        <!--搜索区域 start-->
        <div class="card-search">
          <el-row :gutter="24">
            <el-col :span="16">
              <el-input :prefix-icon="Search" v-model="searchParams.typeName" @keyup.enter.native="hooks.search"
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
              <el-icon style="font-size: 20px;color: #b3b6bc" @click="hooks.refresh"><Refresh/></el-icon>
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

        <el-table-column label="序号" width="100" type="index" :index="hooks.Nindex"/>

        <el-table-column label="类型名称">
          <template #default="scope">
            <el-tooltip :content="scope.row.typeName" placement="top" effect="light">
              <span class="highlight">{{scope.row.typeName}}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="类型编号">
          <template #default="scope">
            <el-tooltip :content="scope.row.typeSort+''" placement="top" effect="light">
              <span class="highlight">{{scope.row.typeSort}}</span>
            </el-tooltip>
          </template>
        </el-table-column>


        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="editRoomType(scope.row.id)">编辑</el-button>
            <el-popconfirm width="200px" confirm-button-text="确定" cancel-button-text="取消" :icon="Delete"
                           icon-color="#626AEF" :title="'确定删除类型名称为“'+scope.row.typeName+'”吗？'"
                           @confirm="hooks.deleteRow(scope.row.id)">
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
                     @current-change="hooks.changePage"
                     :page-sizes="[10,20,30,40]"/>
      <!--分页 end-->

    </div>
    <!--表格区域 end-->
    <RoomType ref="roomType"   @onHandle="onHandle" :id="id" :pageTitle="pageTitle"/>
  </el-card>


</template>

<script setup lang="ts">
import { reactive,toRefs, onMounted,watch,ref} from 'vue'
import { getRoomTypeListApi,delRoomTypeApi} from "@/api/hotel/hotelApi"
import { Delete, Search } from "@element-plus/icons-vue";
import { ElMessage } from 'element-plus'
import  RoomType from "./module/RoomType.vue"
import hooks from "@/hooks/tableHooks";
hooks.tabState.url={
  list:'/hotel/roomtype/list',
  delete:'/hotel/roomtype/delete'
}
const state = reactive({
  loading:false,
  pageTitle:'新增',
  id:'', // 数据id
})
const roomType = ref<InstanceType<typeof RoomType>>()   //泛类型   <typeof HelloWorld>的HelloWorld是组件

// 添加房间类型信息
const addroomType = ()=> {
  state.id=''
  state.pageTitle='新增'
  roomType.value.visible=true
}
// 关闭新增用户弹出框
const closeAddRoomTypeForm = () => {
  roomType.value.visible=false
}

// 编辑用户弹出状态
const editRoomTypeDialogFormVisible = ref(false)

// 编辑用户信息
const editRoomType = async (id:number)=> {
  state.pageTitle='编辑'
  state.id=String(id),
  roomType.value.visible=true
}

const onHandle=()=>{
  editRoomTypeDialogFormVisible.value=false
  hooks.refresh()
}
// 挂载后加载数据
onMounted(()=> {
  hooks.loadData(hooks.tabState)
})
const {searchParams,tableData,pageSize,total}=toRefs(hooks.tabState)
const { loading,status,searchValue,pageTitle,id } = toRefs(state)
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
