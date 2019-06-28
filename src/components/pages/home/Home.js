import React, { Component } from 'react'
import { StatusBar,SafeAreaView, Text, StyleSheet, View } from 'react-native'
import { WingBlank, Button } from '@ant-design/react-native'

export default class Home extends Component {

   static navigationOptions = {
      title: 'Home',
   };

 
   render() {
      console.log(this.props)
      let { navigation } = this.props
      return (
         <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
               <Text > home </Text>
               <WingBlank>
                  <Button onPress={() => {
                     navigation.navigate('Room')
                  }}>room</Button>
               </WingBlank>
            </View>
         </SafeAreaView>
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
