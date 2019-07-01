import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { basicStyle } from '@utils/basicStyle'
import Icon from "react-native-vector-icons/Ionicons"
import Iconfont from '@components/common/iconfont/Iconfont'



export default class Upper extends Component {
   render() {
      return (
         <View style={styles.upper}>
            <View style={
               { height: 40 }
            }></View>
            <Text> </Text>
            <Icon name='md-pricetag' size={16} color='#cccccc'></Icon>
            <Iconfont name="air" color="red" size={60} />
         </View>
      )
   }
}

const styles = StyleSheet.create({
   upper: {
      height: 300,
      overflow: 'hidden',
   },
   stretch: {
      width: 375,
      height: 300,
      resizeMode: 'cover',
   }
});
