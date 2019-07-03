import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtForm, AtSwitch, AtSlider, AtButton, AtList, AtListItem } from 'taro-ui'

import './music.scss'

export default class Music extends Component {

   constructor(props) {
      super(props);
      this.state = {
         list: [
            {
               text: '音乐1',
               num: '123456',
               status: 0,
               btnList:[]
            }
         ],
         btnList: [
            {
               id: 0,
               val: 0,
               icon: 'icon-music-minus',
            },
            {
               id: 1,
               val: 0,
               icon: 'icon-music-next',
            },
            {
               id: 2,
               val: 0,
               icon: null,
            },
            {
               id: 3,
               val: 0,
               icon: 'icon-music-pre',
            },
            {
               id: 4,
               val: 0,
               icon: 'icon-music-plus',
            },
         ]
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
      let { btnList } = this.state
      let list = data.map(item => {
         item.btnList = btnList.map(option => {
            if (option.id == 2) {
               option.icon = item.value == 0 ? 'icon-music-play' : 'icon-music-pause'
            }
            return option
         })
         return item
      })
      this.setState({ list })
   }         //每次更新props必定调用

   componentWillUpdate(nextProps, nextState) { }      //在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用

   componentDidUpdate(prevProps, prevState) { }     //在组件完成更新后立即调用。在初始化时不会被调用。

   componentWillUnmount() { }    //组件从 DOM 中移除之前立刻被调用

   musicControl = (item, option) => {
      if (typeof this.props.triggerMusic === "function") this.props.triggerMusic({ item, ...option })
   }

   render() {
      let { list } = this.state
      return (
         <View className="device-container">
            {
               list.map(item => {
                  let { btnList } = item
                  return <View key={item.num} className="device-control">
                     <AtList className="list-tap">
                        <AtListItem
                           title={item.text}
                           hasBorder={false}
                        />
                     </AtList>
                     <View className="list-flex-around control-btn">
                        {
                           btnList.map(option => {
                              return <View
                                 className={`iconfont ${option.icon}`}
                                 key={option.id}
                                 onClick={e => this.musicControl(item, option)}
                              ></View>
                           })
                        }
                     </View>
                  </View>
               })
            }
         </View>
      )
   }
}