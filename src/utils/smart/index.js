import React, { Component } from 'react'
import {getDevices,getScenes,getRooms} from '@utils/http/api'



//设备、场景、房间数据的请求和设置基本数据
class SmartRequest {
   constructor() {
      this.typeList = {
         '1000': ['1000', '1001', '1002'],
         '1010': ['1010', '1011', '1012'],
         '1020': ['1020', '1021', '1022'],
         '1030': ['1030', '1031', '1032', '1033'],
         '1040': ['1040', '1041', '1042', '1043'],
         '1050': ['1050', '1051', '1052', '1053'],
         '1080': ['1080', '1081'],
      }
      this.classifyList = [
         {
            type: ['1000', '1001', '1002'],
            classify: '1000',
            flag: 'typeDevice',
            num: '1000',
            text: '灯',
            icon: 'icon-lamp',
         },
         {
            type: ['1010', '1011', '1012'],
            classify: '1010',
            flag: 'typeDevice',
            num: '1010',
            text: '调光灯',
            icon: 'icon-lamp',
         },
         {
            type: ['1020', '1021', '1022'],
            classify: '1020',
            flag: 'typeDevice',
            num: '1020',
            text: '地暖',
            icon: 'icon-heat',
         },
         {
            type: ['1030', '1031', '1032', '1033'],
            classify: '1030',
            flag: 'typeDevice',
            num: '1030',
            text: '空调',
            icon: 'icon-air',
         },
         {
            type: ['1040', '1041', '1042', '1043'],
            classify: '1040',
            flag: 'typeDevice',
            num: '1040',
            text: '新风',
            icon: 'icon-wind',
         },
         {
            type: ['1050', '1051', '1052', '1053'],
            classify: '1050',
            flag: 'typeDevice',
            num: '1050',
            text: '窗帘',
            icon: 'icon-curtain',
         },
         {
            type: ['1080', '1081'],
            classify: '1080',
            flag: 'typeDevice',
            num: '1080',
            text: '背景音乐',
            icon: 'icon-music',
         },
         {
            type: ['2222'],
            classify: '2222',
            flag: 'typeDevice',
            num: '2222',
            text: '未定义设备',
            icon: 'icon-lamp',
         },
      ]
   }
   deviceClassify(arr) {     //先把所以类型都去除，去重，返回相对应的数据classify
      let newArr = Array.from(new Set(arr.map(item => item.classify)))
      return newArr.map(item => this.classifyList.filter(option => option.classify == item)[0])
   }
   async getDeviceList() {
      let res = await getDevices()
      if (!res.result) return
      let data = res.data.map(item => {
         let { classify } = this.classifyList.filter(option => option.type.includes(item.leixing))[0]
         return {
            num: item.bianhao,
            rnum: item.fangjianbianhao,
            text: item.mingcheng,
            status: item.zhuangtai,
            type: item.leixing,
            classify: classify || '2222',
            flag: 'device'
         }
      })
      return Promise.resolve(this.setDeviceStatus(data))
   }
   async getBigDeviceList() {
      let arr = await this.getDeviceList()
      return Promise.resolve(this.deviceClassify(arr))
   }
   async getRoomList() {
      let res = await getRooms()
      if (!res.result) return
      let data = res.data.map(item => {
         return {
            num: item.bianhao,
            text: item.mingcheng,
            icon: 'icon-room',
            imgPath: item.cityicon,
            flag: 'room'
         }
      })
      return Promise.resolve(data)
   }
   async getSceneList() {
      let res = await getScenes()
      if (!res.result) return
      let data = res.data.map(item => {
         return {
            num: item.bianhao,
            text: item.mingcheng,
            rnum: item.fangjianbianhao,
            iconPath: item.img[0],
            icon: 'icon-coffee',
            devices: item.caozuo,
            plan: item.jihua,
            delayed: item.yanshi,
            flag: 'scene'
         }
      })
      return Promise.resolve(data)
   }
   async getHouseList() {
      let res = await getUser()
      if (!res.result) return
      let arr = this.housesHandler(res.data.fangwu)
      return Promise.resolve(arr)
   }
   setDeviceStatus(arr) {
      return arr.map(item => {
         switch (item.classify) {
            case '1000':
               return this.setLampStatus(item)
            case '1010':
               return this.setLightStatus(item)
            case '1020':
               return this.setFloorStatus(item)
            case '1030':
               return this.setAirStatus(item)
            case '1040':
               return this.setWindStatus(item)
            case '1050':
               return this.setCurtainStatus(item)
            case '1080':
               return this.setMusicStatus(item)
            default:
               return item
         }
      })
   }
   setLampStatus(item) {
      if (item.status) {
         let { zhi } = item.status
         item.value = zhi
         if (zhi == 0) {
            item.icon = 'icon-lamp'
         } else {
            item.icon = 'icon-lamp-active'
         }
         item.status = null
      }
      return item
   }
   setLightStatus(item) {
      if (item.status) {
         let { zhi } = item.status
         item.value = zhi
         item.status = null
      }
      return item
   }
   setFloorStatus(item) {
      if (typeof item.status === 'string') {
         item.mode = 1
         item.usable = 0
         item.temp = 26
         item.status = null
      } else if (!item.status) {

      } else {
         var { kaiguan, moshi, wendu } = item.status
         item.mode = moshi
         item.temp = wendu
         item.usable = kaiguan
         item.status = null
      }

      return item
   }
   setAirStatus(item) {
      if (typeof item.status === 'string') {
         item.status = {
            kaiguan: 0,
            moshi: 1,
            fengsu: 2,
            fengxiang: 0,
            wendu: 26,
         }
         item.usable = 0
         item.mode = 1
         item.speed = 2
         item.point = 0
         item.temp = 26
         item.choose = false
         item.status = null
      } else if (!item.status) {

      } else {
         let { kaiguan, moshi, fengsu, fengxiang, wendu } = item.status
         item.usable = kaiguan
         item.mode = moshi
         item.speed = fengsu == 1 ? 0 : --item.status.fengsu
         item.point = fengxiang || 0
         item.temp = wendu
         item.choose = false
         item.status = null
      }
      return item
   }
   setWindStatus(item) {
      if (typeof item.status === 'string') {
         if (item.type == '1040' || item.type == '1041') {
            item.mode = null
         } else {
            item.mode = 0
         }
         item.usable = 0
         item.speed = 0
         item.status = null
      } else if (!item.status) {

      } else {
         let { moshi = null, fengsu = 2, kaiguan } = item.status
         if (item.type != '1043') {
            item.speed = fengsu == 1 ? 0 : --item.status.fengsu
         } else if (item.type == '1042') {
            item.mode = moshi
         }
         item.usable = kaiguan
         item.status = null
      }
      return item
   }
   setCurtainStatus(item) {
      if (item.open == undefined) {
         item.open = 0
         item.close = 0
      }
      item.status = null
      return item
   }
   setMusicStatus(item) {
      if (item.status) {
         item.value = 0
         item.status = null
      }
      return item
   }
   //-----------------------房屋数据处理-----------------------------------
   housesHandler(arr) {
      return arr.map(item => {
         return {
            num: item.bianhao,
            text: item.fangwumingcheng,
            current: item.flag == 1 ? true : false,
            imgPath: item.img[0],
            safeStatus: item.anfangzhuangtai,
            lampCount: item.yunxingshebei,
            admin: {
               num: item.fangzhu[0],
               rname: item.fangzhu[1],
               tel: item.fangzhu[2]
            },
         }
      })
   }
}

//设备、场景、房屋、房间相关的数据与动作函数
class SmartAction extends SmartRequest {
   constructor() {
      super()
   }
   lampStatus(item) {
      item.value = item.value > 0 ? 0 : 100
      item.icon = item.value > 0 ? 'icon-lamp-active' : 'icon-lamp'
      return item
   }
   lightSwitch({ item, value }) {
      item.value = value ? 100 : 0
      return item
   }
   lightSlider({ item, value }) {
      item.value = value
      return item
   }
   floorSlider({ item, value }) {
      item.usable = 1
      item.temp = value
      return item
   }
   floorBtn({ item, value }) {
      switch (value.id) {
         case 0:
            item.mode = value.val == 0 ? 1 : 0
            item.usable = 1
            break;
         case 1:
            item.usable = value.val == 0 ? 1 : 0
            break;
      }
      return item
   }
   airBtn({ item, value }) {
      switch (value.id) {
         case 0:
            item.mode = value.val == 0 ? 1 : 0
            item.usable = 1
            break;
         case 1:
            item.speed = value.val == 0 ? 1 : (value.val == 1 ? 2 : 0)
            item.usable = 1
            break;
         case 2:
            item.point = value.val == 0 ? 1 : 0
            item.usable = 1
            break;
         case 3:
            item.usable = value.val == 0 ? 1 : 0
            break;
      }
      return item
   }
   airSlider({ item, value }) {
      item.temp = value
      item.usable = 1
      return item
   }
   windSwitch({ item, value }) {
      item.usable = value ? 1 : 0
      return item
   }
   windBtn({ item, value }) {
      switch (value.id) {
         case 0:
            item.mode = value.val == 0 ? 1 : 0
            item.usable = 1
            break;
         case 1:
            item.speed = value.val == 0 ? 1 : (value.val == 1 ? 2 : 0)
            item.usable = 1
            break;
         case 2:
            item.usable = value.val == 0 ? 1 : 0
            break;
      }
      return item
   }
   curtainBtn({ item, value }) {
      switch (value.id) {
         case 0:
            item.close = 0
            item.open = value.val == 0 ? 1 : 0
            item.usable = 1
            break;
         case 1:
            item.open = 0
            item.close = value.val == 0 ? 1 : 0
            item.usable = 1
            break;
      }
      return item
   }
   musicStatus(item) {
      item.value = item.value == 0 ? 1 : 0
      return item
   }
}



class Smart extends SmartAction {
   constructor() {
      super()
   }
   getRoomIco(item) {
      this._setRoomIco(item)
      if (item.icoPath) {
         item.ico.splice(0, item.ico.length)
         Taro.request({ url: item.icoPath })
            .then(res => {
               if (res.result === '0') {
                  item.icon = res.data
               } else {
                  this._setRoomIco(item)
               }
            }).catch(() => {
               this._setRoomIco(item)
            })
      }
   }
   _setRoomIco(item) {
      item.icon = Room
   }
   getRoomDeviceData() {
      return new Promise(resolve => {
         Promise.all([this.getDeviceList(), this.getRoomList()])
            .then(([room, device]) => {
               resolve(this.roomDeviceHandler(room, device))
            })
      })
   }
   roomDeviceHandler(room, device) {
      return room.map(item => {
         item.list = [];
         item.ckecked = true
         device.forEach(option => {
            if (item.num == option.rnum) {
               option.choose = true
               item.list.push(option)
            }
         })
         return item
      }).filter(item => item.list.length > 0)
   }
   fetchHouse() {
      return $db.readAll('houses')
   }
   changeHouse(num) {
      return $axiosV3.changeHouse(num)
         .then(res => {
            if (res.result) {
               localStorage.fangwubianhao = num;
               localStorage.removeItem("xuliebianhao");
               localStorage.removeItem("xuliedizhi");
               localStorage.removeItem("xuliemingcheng");
               localStorage.firstLogin = 1;
               $db.delDatabase().then(() => {
                  $na.closeAllForm({ url: 'views/Home/default.html' })
               })
            } else {
               $dialog.toast(res.des);
            }
         })
         .catch(() => {
            $dialog.toast('切换房屋出错，请稍后重试');
         })
   }
}

const $smart = new Smart()


export default $smart