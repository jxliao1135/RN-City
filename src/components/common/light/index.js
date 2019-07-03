import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtForm, AtSwitch, AtSlider, AtButton, AtList, AtListItem } from 'taro-ui'


export default class Light extends Component {

   constructor(props) {
      super(props);
      this.state = {
         list: [
            {
               num: '123456',
               text: '调光灯1',
               status: 100,
            },
            {
               num: '987654',
               text: '调光灯2',
               status: 100,
            }
         ],
      };
   }

   static options = {
      addGlobalClass: true
   }

   componentWillMount() { }   //组件将要挂载

   componentDidMount() { }    //组件渲染完成

   componentWillReceiveProps(nextProps) {
      let { data } = nextProps
      this.setState({
         list: data,
      })
   }


   handleSwitch = ({ item, detail: { value } }) => {
      if (typeof this.props.triggerSwitch === "function") this.props.triggerSwitch({ item, value })
   }
   handlerSlider = ({ item, e: { value } }) => {
      if (typeof this.props.triggerSlider === "function") this.props.triggerSlider({ item, value })
   }

   render() {
      let { list } = this.state
      return (
         <View className="device-container">
            {
               list.map(item => {
                  let { value } = item
                  return <View key={item.num} className="device-control">
                     <AtList className="list-tap">
                        <AtListItem
                           isSwitch
                           hasBorder={false}
                           switchIsCheck={value > 0 ? true : false}
                           switchColor='#f08519'
                           onSwitchChange={e => this.handleSwitch({ item, ...e })}
                           title={item.text}
                        />
                     </AtList>
                     {
                        value > 0 ? <View className="device-slider">
                           <AtSlider
                              step={1}
                              min={0}
                              max={100}
                              value={value}
                              activeColor='#f08519'
                              backgroundColor='#BDBDBD'
                              blockColor='#f08519'
                              blockSize={24}
                              showValue={true}
                              onChange={e => this.handlerSlider({ item, e })}
                           ></AtSlider>
                        </View> : ''
                     }
                  </View>
               })
            }
         </View>
      )
   }
}

