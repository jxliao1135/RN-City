import React, { Component } from 'react'
import { Platform, StatusBar, SafeAreaView, Text, StyleSheet, View } from 'react-native'
import { WingBlank, Button } from '@ant-design/react-native'
import { basicStyle } from '@utils/basicStyle'
import Upper from './Upper'


export default class Home extends Component {

   constructor() {
      super()
      this.state = {
         tabLists: ['icon-scan', 'icon-coffee', 'icon-lamp', 'icon-info'],
      }
   }
   componentDidMount() {
      StatusBar.setBarStyle('light-content')
   }

   componentWillUnmount() {

   }


   render() {
      let { navigation } = this.props
      return (
         <View style={styles.container}>
            <Upper />
            <Text > home </Text>
            <WingBlank>
               <Button onPress={() => {
                  navigation.navigate('Room')
               }}>room</Button>
            </WingBlank>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: basicStyle.bgColor,
   },
});
