import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Button, InputItem, List } from '@ant-design/react-native';
import { basicStyle } from '@utils/basicStyle'

export default class Register extends Component {
   constructor(props) {
      super(props)
      this.state = {

      }
   }

   render() {
      return (
         <View style={styles.login}>
            <List>
               <InputItem
                  type='phone'
                  placeholder='手机号码'
               >手机号</InputItem>
               <InputItem
                  type='password'
                  placeholder='验证码'
               >验证码</InputItem>
            </List>
            <Button
               type='primary'
               style={styles.loginBtn}
            >登录</Button>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   login: {
      textAlign: "center",
   },
   loginBtn: {
      backgroundColor: basicStyle.themeColor,
      color: basicStyle.white,
      borderColor: basicStyle.themeColor,
      marginVertical: basicStyle.vertical * 6,
   }
})
