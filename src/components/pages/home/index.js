import React, { Component } from 'react'
import { FlatList, ScrollView, Platform, StatusBar, Text, StyleSheet, View } from 'react-native'
import Iconfont from '@components/common/iconfont/'
import { basicStyle } from '@utils/basicStyle'
import Upper from './Upper'
import http from '@utils/http'
import { connect } from 'react-redux'
import { fetchDevices, fetchScenes, fetchRooms, saveHouse } from '@actions/'
import Toast from 'react-native-root-toast'


class Home extends Component {

   constructor() {
      super()
      this.state = {
         tabList: [
            {
               id: 0,
               icon: 'scan2'
            },
            {
               id: 1,
               icon: 'caffe'
            },
            {
               id: 2,
               icon: 'lamp'
            },
            {
               id: 3,
               icon: 'email'
            }
         ],
         menu: [
            {
               id: 0,
               text: '加载中...',
               icon: 'loading'
            },
            {
               id: 1,
               text: '加载中...',
               icon: 'loading'
            },
            {
               id: 2,
               text: '加载中...',
               icon: 'loading'
            },
            {
               id: 3,
               text: '加载中...',
               icon: 'loading'
            },
            {
               id: 4,
               text: '加载中...',
               icon: 'loading'
            },
            {
               id: 5,
               text: '加载中...',
               icon: 'loading'
            },
            {
               id: 6,
               text: '加载中...',
               icon: 'loading'
            },
            {
               id: 7,
               text: '加载中...',
               icon: 'loading'
            },
         ],
         downStatus: false,
         visible: false
      }
   }
   componentDidMount() {
      StatusBar.setBarStyle('light-content')
      http.get('YongHu.aspx?op=1')
         .then(res => {
            if (res.result) {
               this.userInfoHandler(res.data.base)
               // this.housesHandler(res.data.fangwu)
               // this.menuHandler(res.data.gongneng)
               // this.infoHandler(res.data.message)
            } else {
               Toast.show(res.des, { position: 0 })
            }
         })
         .catch(err => {
            Toast.show('这是一条提示信息', { position: 0 })
         })
   }

   componentWillUnmount() {

   }


   menuHandler(data) {
      let arr = data.filter(item => {
         return [1, 2, 101, 103, 104, 105, 106, 107, 1000, 1010, 1020, 1030, 1040, 1050, 1080].includes(item.leixing) && !['云门禁', '云对讲'].includes(item.mingcheng)
      })
      var iconList = [
         {
            type: '101',
            icon: 'door-key',
            route: 'door_key'
         },
         {
            type: '103',
            icon: 'smart',
            route: 'smart'
         },
         {
            type: '104',
            icon: 'safety2',
            route: 'safety'
         },
         {
            type: '105',
            icon: 'environment',
            route: 'environment'
         },
         {
            type: '106',
            icon: 'wuyeguanli',
            route: 'property'
         },
         {
            type: '107',
            icon: 'email-open',
            route: 'record'
         },
         {
            type: '1',
            icon: 'scene',
            route: ''
         },
         {
            type: '2',
            icon: 'room',
            route: 'room'
         }
      ]
      var list = arr.map(item => {
         let { icon, route } = iconList.filter(option => option.type == item.leixing)[0]
         return {
            num: item.key,
            text: item.mingcheng,
            type: item.leixing,
            sort: item.paixu,
            icon,
            route,
            key: item.key
         }
      })
      this.setState({ menu: list })
   }
   userInfoHandler(data) {
      let userInfo = {
         name: data.xingming,
         tel: data.shouji,
         imgPath: data.touxiang,
         bgPath: data.beijingtupian,
         sign: data.qianming
      }
      console.log(userInfo)
      // Promise.all([$http.fetch({ url: data.touxiang }), $http.fetch({ url: data.beijingtupian })])
      //    .then(([avatar, avatarBg]) => {
      //       avatar = avatar.data
      //       avatarBg = avatarBg.data
      //       userInfo = Object.assign({}, userInfo, { avatar, avatarBg })
      //       $storage.save('userInfo', userInfo)
      //    })
      //    .catch(() => {
      //       $storage.save('userInfo', userInfo)
      //    })
   }
   housesHandler(data) {    //处理房屋数据
      let { saveHouse } = this.props
      let houses = $smart.housesHandler(data)
      saveHouse(houses)
      let curr = houses.filter(item => item.current)[0]
      this.setState({
         house: curr
      })
      $storage.save('house', curr)
      if (curr.imgPath == '') return
      Taro.request({ url: curr.imgPath })
         .then(res => {
            if (res.result != 0) return
            this.setState({
               houseBg: res.data
            })
         })
         .catch(err => {
            throw new Error(err)
         })
   }
   infoHandler(data) {
      //TODO:首页信息处理
      return
      this.setState({
         infoLists: $property.infoList(data)
      })
   }


   sepa() {
      return (<View style={styles.line}></View>)
   }

   render() {

      let { navigation } = this.props
      let { tabList, menu, downStatus } = this.state
      return (
         <View style={styles.container}>
            <View style={styles.tabList}>
               <View style={styles.tabIcon}>
                  {
                     tabList.map(item => {
                        return <View key={item.id}>
                           <Iconfont name={item.icon} color="#fff" size={30} />
                        </View>
                     })
                  }
               </View>
            </View>
            <View style={{ zIndex: -100, flex: 1 }} >
               <ScrollView
                  style={{ flex: 1 }}
                  alwaysBounceVertical={false}
               >
                  <Upper />
                  <View style={{ backgroundColor: '#ffffff' }}>
                     <FlatList
                        alwaysBounceVertical={false}
                        data={menu}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={4}
                        contentContainerStyle={{ flex: 1 }}
                        ItemSeparatorComponent={this.sepa}
                        renderItem={({ item }) => {
                           return <View style={styles.gridItem}>
                              <Iconfont style={styles.gridItemIcon} name={item.icon} color="#f08519" size={30} />
                              <Text style={styles.gridItemText}>{item.text}</Text>
                           </View>
                        }}
                     />
                  </View>
               </ScrollView>
            </View>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: basicStyle.bgColor,
      position: 'relative'
   },
   tabList: {
      width: 375,
      paddingHorizontal: 20,
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: basicStyle.tab
   },
   tabIcon: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: basicStyle.navStatusBarHeight,
      marginBottom: 5,
   },
   gridItem: {
      flex: 1,
      paddingVertical: 20,
   },
   gridItemIcon: {
      textAlign: 'center',
      marginVertical: 10,
   },
   gridItemText: {
      textAlign: 'center',
      height: 20,
      overflow: 'hidden',
   },
   line: {
      width: 355,
      height: 1,
      marginHorizontal: 10,
      backgroundColor: '#f4f4f4'
   },
   topTab: {
      flexDirection: 'row'
   }
});


export default connect(
   state => state,
   dispatch => ({
      getDevices() {
         dispatch(fetchDevices())
      },
      getScenes() {
         dispatch(fetchScenes())
      },
      getRooms() {
         dispatch(fetchRooms())
      },
      saveHouse(arr) {
         dispatch(saveHouse(arr))
      }
   })
)(Home)