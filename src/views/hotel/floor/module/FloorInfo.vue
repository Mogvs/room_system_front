<template>
  <el-form  ref="floorForm" :model="form" :rules="rules">
    <el-row :gutter="24">
      <el-col :span="16">
        <el-form-item   label="楼层名称" prop="floorName">
          <el-input v-model="form.floorName" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="楼层编号" prop="floorSort">
          <el-input-number v-model="form.floorSort" :precision="0" :min="1" />
        </el-form-item>
      </el-col>

    </el-row>


  </el-form>
  <div slot="footer" class="dialong__button--wrap">
    <el-button @click="close()">取 消</el-button>
    <el-button color="#083a6d" type="primary" @click="onSubmit(floorForm)" :loading="loading">保 存</el-button>
  </div>
</template>


<script setup lang="ts">
import {reactive,ref,toRefs,toRef} from 'vue'
import _ from 'lodash'
import {ElMessage, FormInstance,FormRules} from "element-plus";
import {saveFloorApi} from '@/api/hotel/hotelApi'
const props=defineProps(['fromData'])
const emit=defineEmits(['onHandle'])
const floorForm = ref<FormInstance>()
const  state=reactive({
  form:{
    id:0,
    floorName:'',
    floorSort:0,
  },
  loading:false,
})
if(props.fromData?.id){
  for(const key in state.form){
    state.form[key]=props.fromData[key]
  }
}
 const rules=reactive<FormRules>({
     floorName:[{required:true,message:'楼层名称不能为空',trigger:'blur'}],
     floorSort:[{required:true,message:'楼层编号不能为空',trigger:'blur'}]

 })

const close=()=>{
  emit('onHandle')
}

const onSubmit=async (formEl:FormInstance | undefined)=>{
  if(!formEl){
    return
  }
  await formEl.validate(async(valid,fields)=>{
    state.loading=true
    if(valid){
     const {data}= await saveFloorApi(state.form)
      if(data.code===200){
        ElMessage.success(data.message)
        emit('onHandle')
      }else{
        ElMessage.error(data.message)
      }
    }else{
      ElMessage.error('提交失败，你还有未填写的项！')
    }
  })
  state.loading=false
}
const {loading,form}=toRefs(state)

</script>

<style scoped>
.dialong__button--wrap {
  text-align: center;
  margin-top: 20px;
}
</style>