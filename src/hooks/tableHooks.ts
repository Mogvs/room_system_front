/*
* 列表的公共部分
* */
import {reactive} from 'vue'
import {getRoomTypeListApi} from "@/api/hotel/hotelApi";
import {getAction} from "@/api/request";
   const tabState=reactive({
       // 数据请求的url
        url:'',
        // 搜索表单内容
        searchParams: {},
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
    })
// 刷新
    const refresh = ()=> {
        // 搜索表单内容
        tabState.searchValue ={}
        // 更新数据
        loadData(tabState)
    }
// 切换页码执行事件 val 当前页码
    const changePage = (val:number)=> {
        tabState.pageIndex = val
        loadData(tabState)
    }
// 处理序号
    const Nindex = (index:number)=> {
        const page = tabState.pageIndex // 当前的页面
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
            'pageNo': state.pageIndex,
            'pageSize': state.pageSize,
            'typeName': state.searchValue
        }
        const { data } = await getAction(state.url,params)
        state.tableData = data.result.records
        state.total = data.result.total
        state.loading = false
    }
    const dataUrl=(url)=>{
         tabState.url = url
    }
export {
    tabState,refresh,changePage,Nindex,loadData,dataUrl
}

