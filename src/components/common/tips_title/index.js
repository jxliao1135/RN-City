import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'


export default class TipsTit extends Component {

   constructor(props) {
      super(props);
      this.state = {
         show: true,
         tips: props.title
      };
   }
   static options = {
      addGlobalClass: true
   }
   componentWillMount() {

   }   //组件将要挂载

   componentDidMount() { }    //组件渲染完成

   componentWillReceiveProps(nextProps) {
      let { show, tips } = nextProps
      this.setState({ show, tips })
   }         //每次更新props必定调用

   render() {
      let { show, tips } = this.state
      return show ? <View className="list-title">{tips}</View> : null

   }
}
