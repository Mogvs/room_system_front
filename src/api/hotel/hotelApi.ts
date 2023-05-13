import {getAction,postAction} from '../request'
// 新增房间类型信息
const  addRoomTypeApi=(data) => postAction("/hotel/roomtype/add",data)
//获取房间类型列表
const  getRoomTypeListApi=(data) => getAction("/hotel/roomtype/list",data)
// 删除房间类型
const  delRoomTypeApi=(data) => postAction("/hotel/roomtype/delete",data)
// 获取房间类型详情接口
const  addRoomTypeInfoApi=(data) => getAction("/hotel/roomtype/info",data)

export {
    addRoomTypeApi,getRoomTypeListApi,delRoomTypeApi,addRoomTypeInfoApi

}