import {
   GET_STATUS,
   STATUS_CHANGE,
   SOCKET_CHANGE,
   DEVICE_CLASSIFY,
   GET_SCENE,
   GET_HOUSE,
   GET_ROOM,
   SVAE_HOUSE,
   SELECT_HOUSE,
   DEL_HOUSE,
   LOADING_VISABLE
} from '@constants/actionType'
import $smart from '@utils/smart/'

//获取设备数据
export function fetchDevices() {
   return dispatch => {
      $smart.getDeviceList()
         .then(res => {
            dispatch({ type: GET_STATUS, payload: res })
            dispatch({ type: DEVICE_CLASSIFY, payload: $smart.deviceClassify(res) })
         })
   }
}
//设备状态改变
export const deviceStatusChange = (item) => {
   return { type: STATUS_CHANGE, payload: item }
}
export const socketStatusChange = (data) => {
   return { type: SOCKET_CHANGE, payload: data }
}
//获取场景
export function fetchScenes() {
   return dispatch => {
      $smart.getSceneList()
         .then(res => {
            dispatch({ type: GET_SCENE, payload: res })
         })
   }
}

//获取房屋
export function fetchHouses() {
   return dispatch => {
      $smart.getHouseList()
         .then(res => {
            dispatch({ type: GET_HOUSE, payload: res })
         })
   }
}
//存储房屋
export const saveHouse = (arr) => {
   return { type: SVAE_HOUSE, payload: arr }
}
//选择房屋
export const selectHouse = (item) => {
   return { type: SELECT_HOUSE, payload: item }
}
//删除房屋
export const delHouse = (item) => {
   return { type: DEL_HOUSE, payload: item }
}

//获取房间
export function fetchRooms() {
   return dispatch => {
      $smart.getRoomList()
         .then(res => {
            dispatch({ type: GET_ROOM, payload: res })
         })
   }
}

//显示或隐藏loading
export const loading = (item) => {
   console.log('提交了actions')
   return { type: LOADING_VISABLE, payload: item }
}