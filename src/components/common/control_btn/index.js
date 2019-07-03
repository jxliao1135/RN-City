import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './control_btn.scss'

export default class ControlBtn extends Component {

   constructor(props) {
      super(props);
      this.state = {
         color: 0,
         list: [
            {
               id: 0,
               text: '模式',
               val: 0,
               icon: 'icon-snow'
            },
            {
               id: 1,
               text: '风速',
               val: 0,
               icon: 'icon-wind-min'
            },
            {
               id: 2,
               text: '扫风',
               val: 0,
               icon: 'icon-wind-ud'
            },
            {
               id: 3,
               text: '开关',
               val: 0,
               icon: 'icon-switch'
            },
         ]
      };
   }

   static options = {
      addGlobalClass: true
   }
   componentDidMount() {
      let { data, status } = this.props
      this.setState({ list: data, color: status })
   }
   componentWillReceiveProps(nextProps) {
      let { data, status } = nextProps
      if (nextProps.data) this.setState({ list: data, color: status })
   }

   hanlerTap = item => {
      if (typeof this.props.triggerBtn === "function") this.props.triggerBtn(item)
   }

   render() {
      let { list, color } = this.state
      return (
         <View className="list-flex-around control-btn">
            {
               list.map(item => {
                  return <View onClick={e => this.hanlerTap(item)} key="item.id">
                     <View className={`iconfont ${item.icon} ${color == 0 ? 'off' : 'on'}`}></View>
                     <Text>{item.text}</Text>
                  </View>
               })
            }
         </View>
      )
   }
}
