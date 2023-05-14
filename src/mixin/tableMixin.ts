/*
* 列表的公共部分
* */
export default {
    data(){
        return {
            tabState:{
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
                loading: false,
            }

        }
    },
    methods:{
        // 刷新
        refresh(){
            // 搜索表单内容
            this.tabState.searchParams ={}
            // 更新数据
            this.loadData();
        },
        // 切换页码执行事件 val 当前页码
         changePage(val:number) {
            this.tabState.pageIndex = val
            this.loadData()
        },
        // 处理序号
         Nindex(index:number) {
            const page = this.tabState.pageIndex // 当前的页面
            const pageSize = this.tabState.pageSize // 每页条数
            return index+1+(page-1)*pageSize
        },
         loadData(){ // 空转方法，界面引入后在界面调用具体的接口执行
            alert(30003)
        }
    }
}






