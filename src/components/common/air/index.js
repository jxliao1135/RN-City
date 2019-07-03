import React, { Component } from 'react'
import { View, Text, Button } from '@tarojs/components'
import ControlBtn from '@/components/control_btn/ControlBtn'
import { AtForm, AtSwitch, AtSlider, AtButton, AtList, AtListItem } from 'taro-ui'
import './air.scss'

export default class Air extends Component {

   constructor(props) {
      super(props);
      this.state = {
         list: [
            {
               num: '123456',
               text: '空调1',
               modle: 0,
               speed: 2,
               temp: 26,
               switch: 1,
               pointIcon: 'icon-wind-lr',
               modeIcon: 'icon-sunny',
               speedIcon: 'icon-wind-max',
               btnList: [
                  {
                     id: 0,
                     text: '模式',
                     icon: 'icon-snow'
                  },
                  {
                     id: 1,
                     text: '风速',
                     icon: 'icon-wind-min'
                  },
                  {
                     id: 2,
                     text: '扫风',
                     icon: 'icon-wind-ud'
                  },
                  {
                     id: 3,
                     text: '开关',
                     icon: 'icon-switch'
                  },
               ],
            },
         ],
         min: 16,
         max: 34,
      };
   }

   static options = {
      addGlobalClass: true
   }

   componentWillMount() { }   //组件将要挂载

   componentDidMount() { }    //组件渲染完成

   shouldComponentUpdate(nextProps, nextState) { }     //返回bool值，用于判断是否更新组件

   componentWillReceiveProps(nextProps) {
      let { data } = nextProps
      let list = data.map(option => {
         option.speedIcon = option.speed == 0 ? 'icon-wind-max' : (option.speed == 1 ? 'icon-wind-med' : 'icon-wind-min')
         option.pointIcon = option.point == 0 ? 'icon-wind-ud' : 'icon-wind-lr'
         option.modeIcon = option.mode == 0 ? 'icon-snow' : 'icon-sunny'
         option.btnList = [
            {
               id: 0,
               text: '模式',
               val: option.mode,
               icon: option.modeIcon
            },
            {
               id: 1,
               text: '风速',
               val: option.speed,
               icon: option.speedIcon
            },
            {
               id: 2,
               text: '扫风',
               val: option.point,
               icon: option.pointIcon
            },
            {
               id: 3,
               text: '开关',
               val: option.usable,
               icon: 'icon-switch'
            },
         ]
         return option
      })
      this.setState({ list })
   }    //每次更新props必定调用

   componentWillUpdate(nextProps, nextState) { }      //在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用

   componentDidUpdate(prevProps, prevState) { }     //在组件完成更新后立即调用。在初始化时不会被调用。

   componentWillUnmount() { }    //组件从 DOM 中移除之前立刻被调用

   handleSwitch = ({ item, value }) => {
      if (typeof this.props.triggerSwitch === "function") this.props.triggerSwitch({ item, value })
   }
   handlerSlider = ({ item, value: { value } }) => {
      if (typeof this.props.triggerSlider === "function") this.props.triggerSlider({ item, value })
   }
   btnTap = ({ item, value }) => {
      if (typeof this.props.triggerBtn === "function") this.props.triggerBtn({ item, value })
   }
   render() {
      let { list, min, max } = this.state
      return (
         <View className="device-container">
            {
               list.map(item => {
                  let { btnList, usable } = item
                  return <View key={item.num} className="device-control">
                     <AtList className="list-tap">
                        <AtListItem
                           title={item.text}
                           hasBorder={false}
                        // isSwitch
                        // switchIsCheck={item.usable == 0 ? false : true}
                        // switchColor='#f08519'
                        // onSwitchChange={this.handleChange}
                        />
                     </AtList>
                     <View className={`air-temp ${item.mode == 0 ? 'cold' : 'warm'}`}>
                        <View><Text className="device-temp">{item.temp}</Text><Text>℃</Text></View>
                        <View className="list-flex-center air-tips-icon">
                           <View className={`iconfont ${item.modeIcon}`}></View>
                           <View className="iconfont icon-wind-ud"></View>
                           <View className={`iconfont icon-wind-lr`}></View>
                           <View className={`iconfont ${item.speedIcon}`}></View>
                        </View>
                     </View>
                     <View className="device-slider">
                        <AtSlider
                           min={item.mode == 0 ? 16 : 20}
                           max={item.mode == 0 ? 32 : 36}
                           value={item.temp}
                           activeColor='#f08519'
                           backgroundColor='#BDBDBD'
                           blockColor='#f08519'
                           blockSize={24}
                           onChange={value => this.handlerSlider({ item, value })}
                        ></AtSlider>
                     </View>
                     <ControlBtn status={usable} triggerBtn={value => this.btnTap({ value, item })} data={btnList} />
                  </View>
               })
            }
         </View>
      )
   }
}