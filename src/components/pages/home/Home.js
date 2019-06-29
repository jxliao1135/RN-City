import React, { Component } from 'react'
import { Platform, StatusBar, SafeAreaView, Text, StyleSheet, View } from 'react-native'
import { WingBlank, Button } from '@ant-design/react-native'

export default class Home extends Component {

   constructor() {
      super()
      this.state = {}
   }
   componentDidMount() {

   }

   componentWillUnmount() {

   }

   render() {
      let { navigation } = this.props
      return (
         <View style={styles.container}>
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
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
   },
});
