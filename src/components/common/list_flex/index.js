import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './list_flex.scss'
import loading from '@/assets/images/common/loading.png'

export default class ListFlex extends Component {

   constructor(props) {
      super(props)
      this.state = {
         list: [
            {
               text: '加载中',
               icon: 'icon-loading'
            },
            {
               text: '加载中',
               icon: 'icon-loading'
            },
            {
               text: '加载中',
               icon: 'icon-loading'
            },
            {
               text: '加载中',
               icon: 'icon-loading'
            }
         ],
         iconfont: true,
         title: null
      };
   }
   static options = {
      addGlobalClass: true
   }
   componentWillMount() {
      
   }
   componentDidMount() {
      let { data } = this.props
      if (data) {
         this.setState({ list: data })
      }
    }    //组件渲染完成

   componentWillReceiveProps(nextProps) {
      let { data ,iconfont } = nextProps
      this.setState({
         list: data,
         iconfont: iconfont
      })
   }

   itemTap = (item) => {
      if (typeof this.props.triggerClick === "function") this.props.triggerClick(item)
   }

   render() {
      let { list, iconfont } = this.state
      return (
         <View class="list-warp">
            <View className="list-flex-start list">
               {
                  list.map((item, index) => {
                     return <View className="list-item" key={item.num}>
                        {
                           iconfont ? <View
                              onClick={e => this.itemTap(item)}
                              className={`iconfont ${item.icon}`}
                           ></View>
                              : <Image
                                 onClick={e => this.itemTap(item)}
                                 style={{
                                    flex: 1,
                                    width: '100%',
                                    height: '30px',
                                 }}
                                 mode="aspectFit"
                                 src={item.img ? item.img : loading}
                              ></Image>
                        }
                        <View className="list-item-text">{item.text}</View>
                     </View>
                  })
               }
            </View>
         </View>

      )
   }
}