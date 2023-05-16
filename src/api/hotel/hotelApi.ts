import {getAction,postAction} from '../request'
// 房间类型保存信息接口
const  saveRoomTypeApi=(params) => postAction("/hotel/roomtype/save",params)
//获取房间类型列表
const  getRoomTypeListApi=(params) => getAction("/hotel/roomtype/list",params)
// 删除房间类型
const  delRoomTypeApi=(params) => postAction("/hotel/roomtype/delete",params)
// 获取房间类型详情接口
const  roomTypeInfoApi=(params) => getAction("/hotel/roomtype/info",params)

// 楼层保存接口
const saveFloorApi=(params)=>postAction('/hotel/floor/save',params);
//楼层信息详情接口
const getFloorApi=(params)=>getAction('/hotel/floor/info',params);
// 楼层信息列表
const getFloorListApi=(params)=>getAction('/hotel/floor/list',params);
// 删除楼层信息
const delFloorApi=(params)=>postAction('/hotel/floor/delete',params)

export {
    saveRoomTypeApi,getRoomTypeListApi,delRoomTypeApi,roomTypeInfoApi,
    saveFloorApi,getFloorApi,getFloorListApi,delFloorApi

}