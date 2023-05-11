<template>

  <el-dialog title="房间类型"  v-model="visible" >
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
      <el-button @click="visible = false">取 消</el-button>
      <el-button color="#083a6d" type="primary" @click="onSubmit(roomtype)">确 定</el-button>
    </div>
  </el-dialog>

</template>

<script  lang="ts">
import {ref,reactive} from 'vue'
import { ElMessage,FormInstance,FormRules } from 'element-plus'
import {addRoomTypeApi} from "@/api/hotel/hotelApi";
import {addUserApi} from "@/api/system/user/user";
export default {
  name:'RoomType',
  setup(){
     let visible = ref(false);
     let form=reactive({
       typeName:'', //房间类型
        typeSort:'', //房间序号
     })
    const loading = ref(false)
    const roomtype = ref<FormInstance>()
    const rules=reactive <FormRules>({
      typeName:[{required:true,message:'类型名称不能为空',trigger:'blur'}],
      typeSort:[
          {required:true,message:'类型序号不能为空',trigger:'blur'},
         // {type:"number",message:'类型序号只能数字',trigger:'blur'}
      ]
    })

    // 新增房间类型信息
    const onSubmit=async (formEl: FormInstance | undefined)=>{
       if(!formEl){
         return
       }
       await formEl.validate(async (valid,fields)=>{
         loading.value = true
         if(valid){
           const { data }= await addRoomTypeApi(form)
           if(data.success){
             ElMessage.success(data.message)
              visible.value=false
             //  emit('success')
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





    return {
       visible,
       form,
       rules,
       onSubmit,
      roomtype
     }
  }
}

</script>

<style scoped>
.dialong__button--wrap {
  text-align: center;
  margin-top: 20px;
}
</style>