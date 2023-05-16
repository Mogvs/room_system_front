<template>

  <el-dialog :title="pageTitle+'房间类型'"  v-model="visible" >
    <el-form  ref="roomtype" :model="form" :rules="rules" :loading="loading" >
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="类型名称" prop="typeName">
            <el-input v-model="form.typeName" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="类型序号" prop="typeSort" >
            <el-input v-model="form.typeSort" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialong__button--wrap">
      <el-button @click="colse">取 消</el-button>
      <el-button color="#083a6d" type="primary" @click="onSubmit(roomtype)">保 存</el-button>
    </div>
  </el-dialog>

</template>

<script  lang="ts">
import {ref, reactive, toRefs, watch} from 'vue'
import { ElMessage,FormInstance,FormRules } from 'element-plus'
import {saveRoomTypeApi,roomTypeInfoApi,} from "@/api/hotel/hotelApi";
import {addUserApi} from "@/api/system/user/user";
export default {
  name:'RoomType',
  props:['pageTitle','id'],
  setup(props,content){
     let state=reactive({
       form:{
         id:0,
         typeName:'', //房间类型
         typeSort:'', //房间序号
       },
       visible:false
     })
    const loading = ref(false)
    const roomtype = ref<FormInstance>()
    const rules=reactive <FormRules>({
      typeName:[{required:true,message:'类型名称不能为空',trigger:'blur'}],
      typeSort:[
          {required:true,message:'类型序号不能为空',trigger:'blur'},
          {pattern: /^[0-9]\d*$/, message: '类型序号只能是整数', trigger: 'blur'}
      ]
    })
   // const emit = defineEmits(['closeAddUserForm','success'])

    // 新增房间类型信息
    const onSubmit=async (formEl: FormInstance | undefined)=>{
       if(!formEl){
         return
       }
       await formEl.validate(async (valid,fields)=>{

         loading.value = true
         if(valid){
           const { data }= await saveRoomTypeApi(state.form)
           if(data.success){
             ElMessage.success(data.message)
              state.visible=false
              content.emit('onHandle')
           }else {
             ElMessage.error(data.message)
           }
         }else {
           ElMessage.error('提交失败，你还有未填写的项！')
           console.log('error submit!',fields)
         }
         loading.value = false
         })
    }
    // 房间类型详情
    const roomTypeInfo=async (prams)=>{
      const {data}=await roomTypeInfoApi(prams)
      if(data.code===200){
        state.form =data.result
        console.log('form--',state.form)
      }else{
        ElMessage.error('获取详情失败')
      }
    }
    watch(()=>props.id,(val)=>{
      if(val){ // 获取到id时，开始查询接口
        roomTypeInfo({id:val})
      }else{
        state.form={
              id:0,
              typeName:'', //房间类型
              typeSort:'', //房间序号
        }
      }
    })

  const colse=_=>{
    //表单关闭,初始化验证
    roomtype.value?.clearValidate()
    state.visible=false
  }
    return {
       ...toRefs(state),
       rules,
       onSubmit,
       colse,
       loading,
       roomtype,
     }
  },

}

</script>

<style scoped>
.dialong__button--wrap {
  text-align: center;
  margin-top: 20px;
}
</style>