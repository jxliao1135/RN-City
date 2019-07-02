import React, { Component } from 'react'
import { FlatList, ScrollView, Platform, StatusBar, Text, StyleSheet, View } from 'react-native'
import { Button, Flex, WhiteSpace, WingBlank, ListView } from '@ant-design/react-native';
import Iconfont from '@components/common/iconfont/Iconfont'
import { basicStyle } from '@utils/basicStyle'
import Upper from './Upper'
import http from '@utils/http'
import { connect } from 'react-redux'
import { fetchDevices, fetchScenes, fetchRooms, saveHouse } from '../../../actions/'


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
               icon: 'dengpao_xianxing'
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
         downStatus: false
      }
   }
   componentDidMount() {
      StatusBar.setBarStyle('light-content')
      http.get('YongHu.aspx?op=1')
         .then(res => {
            console.log(res)
         })
   }

   componentWillUnmount() {

   }

   sepa() {
      return (<View style={styles.line}></View>)
   }

   render() {
      console.log('this.props',this.props)

      let { navigation } = this.props
      let { tabList, menu, downStatus } = this.state
      return (
         <View style={styles.container}>
            <View style={styles.tabList}>
               <Flex justify="between" style={styles.tabIcon}>
                  {
                     tabList.map(item => {
                        return <View key={item.id}>
                           <Iconfont name={item.icon} color="#fff" size={30} />
                        </View>
                     })
                  }
               </Flex>
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
   }
});


export default connect(
   state => {
      console.log(state)
      return state
   },
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