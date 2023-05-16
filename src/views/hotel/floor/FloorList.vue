<template>
    <el-card class="box-card">
      <!--头部 start-->
      <template #header>
        <div class="card-header">
          <h3>
            <el-icon style="margin-right: 10px;"><Histogram/></el-icon>楼层信息
          </h3>
          <!--搜索区域 start-->
          <div class="card-search">
            <el-row :gutter="24">
              <el-col :span="16">
                <el-input :prefix-icon="Search" v-model="searchParams.floorName" @keyup.enter.native="hooks.search"
                          placeholder="楼层名称搜索（回车）"/>

              </el-col>
              <el-col :span="2" style="display: inline-flex;justify-content: center;align-items: center;cursor: pointer">
                <el-icon style="font-size: 20px;color: #b3b6bc" @click="hooks.refresh"><Refresh/></el-icon>
              </el-col>
              <el-col :span="6">
                <div class="my-button">
                  <el-button plain style="width: 100%;" color="#2fa7b9" @click="addFloor">添加楼层</el-button>
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

          <el-table-column label="楼层名称">
            <template #default="scope">
              <el-tooltip :content="scope.row.floorName" placement="top" effect="light">
                <span class="highlight">{{scope.row.floorName}}</span>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column label="楼层编号">
            <template #default="scope">
              <el-tooltip :content="scope.row.floorSort+''" placement="top" effect="light">
                <span class="highlight">{{scope.row.floorSort}}</span>
              </el-tooltip>
            </template>
          </el-table-column>


          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-popconfirm width="200px" confirm-button-text="确定" cancel-button-text="取消" :icon="Delete"
                             icon-color="#083a6d" :title="'确定删除楼层名称为“'+scope.row.floorName+'”吗？'"
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
                       @size-change="hooks.sizeChange"
                       @current-change="hooks.changePage"
                       :page-sizes="[10,20,30,40]"/>
        <!--分页 end-->

      </div>
      <!--表格区域 end-->

      <el-dialog :title="title" v-model="visible">
        <FloorInfo :fromData="rowData" v-if="visible" @onHandle="onHandle"/>
      </el-dialog>


    </el-card>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, toRef, toRefs} from "vue";
import  FloorInfo from "./module/FloorInfo.vue"
// 一个用户图像+密码锁图标
import { Delete, Search } from "@element-plus/icons-vue";
import hooks from "@/hooks/tableHooks"
hooks.tabState.url={
  list:'/hotel/floor/list',
  delete:'/hotel/floor/delete'
}
const state= reactive({
  rowData:{},
  title:"",
  visible:false,
})
const addFloor=()=>{
  state.rowData={}
  state.visible=true
  state.title="新增楼层信息"
}
onMounted(()=>{
  hooks.loadData(hooks.tabState)
})
const onHandle=()=>{
  state.visible=false
  hooks.refresh()
}
const handleEdit=(row:any)=>{
  state.visible=true
  state.title="编辑楼层信息"
  state.rowData=row
}

const {searchParams,tableData,pageSize,total}=toRefs(hooks.tabState)
const {rowData,title,visible,loading}=toRefs(state);


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
