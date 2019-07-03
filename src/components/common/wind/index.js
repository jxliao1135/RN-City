import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtForm, AtSwitch, AtSlider, AtButton, AtList, AtListItem } from 'taro-ui'
import ControlBtn from '@/components/control_btn/ControlBtn'


export default class Custom extends Component {

   constructor(props) {
      super(props);
      this.state = {
         list: [
            {
               num: '123456',
               text: '新风',
               type: '1040',
               classify: '1040',
               mode: 0,
               speed: 0,
               switch: 1,
               pointIcon: 'icon-wind-lr',
               modeIcon: 'icon-sunny',
               speedIcon: 'icon-wind-max',
               btnList: [
                  {
                     id: 0,
                     text: '模式',
                     icon: 'icon-sunny'
                  },
                  {
                     id: 1,
                     text: '风速',
                     icon: 'icon-wind-min'
                  },
                  {
                     id: 2,
                     text: '开关',
                     icon: 'icon-switch'
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
         option.speedIcon = option.speed == 0 ? 'icon-wind-max' : (option.speed == 1 ? 'icon-wind-med' : 'icon-wind-min')
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
               text: '风速',
               val: option.speed,
               icon: option.speedIcon
            },
            {
               id: 2,
               text: '开关',
               val: option.usable,
               icon: 'icon-switch'
            },
         ]
         if (['1040', '1041'].includes(option.type)) option.btnList = option.btnList.filter(item => item.id != 0)
         return option
      })
      this.setState({ list })
   }         //每次更新props必定调用

   handleSwitch = ({ item, detail: { value } }) => {
      if (typeof this.props.triggerSwitch === "function") this.props.triggerSwitch({ item, value })
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
                  let { btnList, usable} = item
                  return <View key={item.num} className="device-control">
                     <AtList className="list-tap">
                        <AtListItem
                           title={item.type}
                           hasBorder={false}
                           isSwitch={item.type == '1043'}
                           switchIsCheck={item.usable == 0 ? false : true}
                           switchColor='#f08519'
                           onSwitchChange={e => this.handleSwitch({ item, ...e })}
                        />
                     </AtList>
                     {
                        item.type != 1043 && <ControlBtn status={usable} triggerBtn={value => this.btnTap({ value, item })} data={btnList} />
                     }
                  </View>
               })
            }
         </View>
      )
   }
}