import {getAction,postAction} from '../request'
// 新增房间类型信息
const  addRoomTypeApi=(params) => postAction("/hotel/roomtype/add",params)
//获取房间类型列表
const  getRoomTypeListApi=(params) => getAction("/hotel/roomtype/list",params)
// 删除房间类型
const  delRoomTypeApi=(params) => postAction("/hotel/roomtype/delete",params)
// 获取房间类型详情接口
const  addRoomTypeInfoApi=(params) => getAction("/hotel/roomtype/info",params)

// 新增楼层接口
const addFloorApi=(params)=>postAction('/hotel/floor/add',params);
//楼层信息详情接口
const getFloorApi=(params)=>getAction('/hotel/floor/info',params);
// 楼层信息列表
const getFloorListApi=(params)=>getAction('/hotel/floor/list',params);
// 删除楼层信息
const delFloorApi=(params)=>postAction('/hotel/floor/delete',params)

export {
    addRoomTypeApi,getRoomTypeListApi,delRoomTypeApi,addRoomTypeInfoApi,
    addFloorApi,getFloorApi,getFloorListApi,delFloorApi

}