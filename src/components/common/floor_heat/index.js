import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtForm, AtSwitch, AtSlider, AtButton, AtList, AtListItem } from 'taro-ui'
import ControlBtn from '@/components/control_btn/ControlBtn'


export default class Floor extends Component {

   constructor(props) {
      super(props);
      this.state = {
         list: [
            {
               num: '123456',
               text: '地暖',
               switch: 0,
               btnList: [
                  {
                     id: 0,
                     text: '模式',
                     icon: 'icon-snow'
                  },
                  {
                     id: 1,
                     text: '开关',
                     icon: 'icon-switch'
                  },
               ],
            }
         ],
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
         option.pointIcon = option.point == 0 ? 'icon-wind-ud' : 'icon-wind-lr'
         option.modeIcon = option.mode == 0 ? 'icon-night' : 'icon-sunny'
         option.btnList = [
            {
               id: 0,
               text: '模式',
               val: option.mode,
               icon: option.modeIcon
            },
            {
               id: 1,
               text: '开关',
               val: option.usable,
               icon: 'icon-switch'
            },
         ]
         return option
      })
      this.setState({ list })
   }         //每次更新props必定调用

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
      let { list } = this.state
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
                        />
                     </AtList>
                     <View className="device-slider">
                        <AtSlider
                           step={1}
                           min={16}
                           max={34}
                           value={item.temp}
                           activeColor='#f08519'
                           backgroundColor='#BDBDBD'
                           blockColor='#f08519'
                           blockSize={24}
                           showValue={true}
                           onChange={value => this.handlerSlider({ item, value })}
                        ></AtSlider>
                     </View>
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