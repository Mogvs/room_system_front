import {getAction,postAction} from '../request'
// 新增房间类型信息
const  addRoomTypeApi=(data) => postAction("/hotel/roomtype/add",data)
export {
    addRoomTypeApi

}