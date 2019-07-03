import React, { Component } from 'react'
import { Text, StyleSheet, View} from 'react-native'
import { Button, Flex, WhiteSpace, WingBlank, Modal, Toast } from '@ant-design/react-native';

export default class User extends Component {

   btn(){
      Toast.loading('提示内容', 1, () => { }, true)
   }

   render() {
      return (
         <View style={styles.container}>
            <Button onPress={this.btn} >点我</Button>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
   },
});
