/*
* 列表的公共部分
* */
import {reactive, toRefs} from 'vue'
import {getRoomTypeListApi} from "@/api/hotel/hotelApi";
import {getAction,postAction} from "@/api/request";
import {ElMessage} from "element-plus";
   const tabState=reactive({
       // 数据请求的url
        url:{},
        // 搜索表单内容
        searchParams: {},
        // 表格数据内容
        tableData: [],
        // 总条数
        total: 0,
        // 每页显示行数
        pageSize: 10,
        // 当前页码
        pageNo: 1,
        // 数据加载
        loading:false,
    })
// 刷新
    const refresh = ()=> {
        // 搜索表单内容
        tabState.searchParams ={}
        // 更新数据
        loadData(tabState)
    }
// 切换页码执行事件 val 当前页码
    const changePage=(val:number )=>{
        tabState.pageNo=val
        loadData(tabState)
    }
   const sizeChange=(val:number)=>{
        tabState.pageSize=val
        loadData(tabState)
}
// 处理序号
    const Nindex = (index:number)=> {
        const page = tabState.pageNo // 当前的页面
        const pageSize = tabState.pageSize // 每页条数
        return index+1+(page-1)*pageSize
    }
    const loadData = async (state:any)=> {
       if(!state.url){
           console.log('url为空')
           return
        }
        state.loading = true
        // 先清空数据
        state.tableData = []
        const params = {
            'pageNo': state.pageNo,
            'pageSize': state.pageSize,
            ...state.searchParams
        }
        const { data } = await getAction(state.url.list,params)
        state.tableData = data.result.records
        state.total = data.result.total
        state.loading = false
    }
    // 搜索
    const search = ()=> {
       // 搜索要素不为空时
        let flag = !Object.values(tabState.searchParams).every(item => (item == null || item==''));
        if(flag){
            loadData(tabState)
        }
    }
    // 行删除
    const deleteRow=async (id:any)=>{
       if(!id){
           return
       }
        const { data }= await postAction(tabState.url.delete,{id:id})
        if(data.code==200){
            refresh()
            ElMessage.success('删除成功')
        }else{
            ElMessage.error('删除失败')
        }
    }


export default {
    tabState,refresh,changePage,Nindex,loadData,search,sizeChange,deleteRow
}

