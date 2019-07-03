import Taro, { Component } from '../control_btn/node_modules/@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtForm, AtSwitch, AtSlider, AtButton, AtList, AtListItem } from 'taro-ui'
import ControlBtn from '@/components/control_btn/ControlBtn'


export default class Curtain extends Component {

   constructor(props) {
      super(props);
      this.state = {
         list: [
            {
               num: '123456',
               text: '窗帘',
               open: 0,
               close: 0,
               btnList: [
                  {
                     id: 0,
                     text: '暂停',
                     val: 0,
                     icon: 'icon-curtain'
                  },
                  {
                     id: 1,
                     text: '暂停',
                     val: 0,
                     icon: 'icon-curtain'
                  },
               ]
            }
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
      let list = data.map(option => {
         option.btnList = [
            {
               id: 0,
               text: option.open == 0 ? '暂停' : '开',
               val: option.open,
               icon: option.open == 0 ? 'icon-curtain' : 'icon-curtain-open'
            },
            {
               id: 1,
               text: option.close == 0 ? '暂停' : '关',
               val: option.close,
               icon: option.close == 0 ? 'icon-curtain' : 'icon-curtain-close'
            },
         ]
         return option
      })
      this.setState({ list })
   }         //每次更新props必定调用

   componentWillUpdate(nextProps, nextState) { }      //在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用

   componentDidUpdate(prevProps, prevState) { }     //在组件完成更新后立即调用。在初始化时不会被调用。

   componentWillUnmount() { }    //组件从 DOM 中移除之前立刻被调用

   btnTap = ({ item, value }) => {
      if (typeof this.props.triggerBtn === "function") this.props.triggerBtn({ item, value })
   }

   render() {
      let { list } = this.state
      return (
         <View className="device-container">
            {
               list.map(item => {
                  let { btnList, close, open } = item
                  let usable = (close == 0 && open == 0) ? 0 : 1
                  return <View key={item.num} className="device-control">
                     <AtList className="list-tap">
                        <AtListItem
                           title={item.text}
                           hasBorder={false}
                        />
                     </AtList>
                     <ControlBtn
                        triggerBtn={value => this.btnTap({ value, item })}
                        data={btnList}
                        status={usable}
                     />
                  </View>
               })
            }
         </View>
      )
   }
}