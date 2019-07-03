import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { Button, Flex, WhiteSpace } from '@ant-design/react-native';
import Iconfont from '@components/common/iconfont/'
import { basicStyle } from '@utils/basicStyle'

export default class Upper extends Component {
   constructor(props) {
      super(props)
      this.state = {
         evnTips: [
            {
               id: 0,
               text: '环境状态良好'
            },
            {
               id: 1,
               text: '安防状态正常'
            }
         ]
      }
   }
   render() {
      let { evnTips } = this.state
      return (
         <View style={styles.upper}>
            <Image
               style={styles.stretch}
               source={require('../../../assets/images/bg/house-bg.jpg')}
            />
            <View style={styles.tipsBox}>
               <Flex justify="start">
                  <View>
                     <Text style={[styles.temp,styles.white]}>30</Text>
                  </View>
                  <View>
                     <Text style={[styles.weather, styles.c, styles.white]}>℃</Text>
                  </View>
                  <View>
                     <Iconfont name="zhenyu" color="#fff" size={40} />
                  </View>
               </Flex>
               <Flex justify="start">
                  <View>
                     <Iconfont name="addres_fill" color="#f08519" size={20} />
                  </View>
                  <View>
                     <Text style={[styles.addres, styles.white]}>501</Text>
                  </View>
               </Flex>
               <WhiteSpace size="lg" />
               <View >
                  {
                     evnTips.map(item => {
                        return <Flex key={item.id} justify="start" style={{marginBottom:5}}>
                           <View style={styles.cicle}></View>
                           <Text style={styles.white}>{item.text}</Text>
                        </Flex>
                     })
                  }
               </View>
            </View>

         </View>
      )
   }
}



const styles = StyleSheet.create({
   upper: {
      height: 300,
      overflow: 'hidden',
      position: 'relative'
   },
   stretch: {
      width: 375,
      height: 300,
      resizeMode: 'cover',
      position: 'relative',
      top: 0,
      left: 0
   },
   tipsBox: {
      paddingHorizontal: 20,
      position: 'absolute',
      top: 120,
      left: 0,
   },
   weather: {
      height: 60,
      lineHeight: 60,
   },
   temp: {
      fontSize: 50
   },
   c: {
      fontSize: 20,
      marginTop: 15,
      marginRight: 20,
      textAlignVertical: 'bottom'
   },
   addres: {
      fontSize: 20,
      marginLeft: 5,
   },
   cicle:{
      borderRadius: 3,
      backgroundColor: '#66cc33',
      width: 6,
      height: 6,
      marginRight: 5,
   },
   white:{
      color: '#ffffff',
   }
});
