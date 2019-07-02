import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { basicStyle } from '@utils/basicStyle'
import Iconfont from '@components/common/iconfont/Iconfont'
import { Button, Flex, WhiteSpace, WingBlank } from '@ant-design/react-native';



export default class Upper extends Component {
   constructor(props) {
      super(props)
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
         ]
      }
   }
   render() {
      let { tabList } = this.state
      return (
         <View style={styles.upper}>
            <Image
               style={styles.stretch}
               source={require('../../../assets/images/bg/house-bg.jpg')}
            />
            {/* <View style={styles.tabList}>
               <Flex justify="between" style={styles.tabIcon}>
                  {
                     tabList.map(item => {
                        return <View key={item.id}>
                           <Iconfont name={item.icon} color="#fff" size={30} />
                        </View>
                     })
                  }
               </Flex>
            </View> */}
            <View>
               <Text>30</Text><Text>℃</Text>
            </View>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   upper: {
      height: 300,
      // overflow: 'hidden',
      position: 'relative'
   },
   stretch: {
      width: 375,
      height: 300,
      resizeMode: 'cover',
   },
   tabList: {
      width: 375,
      paddingHorizontal: 20,
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
   tabIcon:{
      marginTop: basicStyle.navStatusBarHeight,
      marginBottom:5,
   }
});
