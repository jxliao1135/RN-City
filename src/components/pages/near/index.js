import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { WingBlank, Button } from '@ant-design/react-native'

export default class Near extends Component {
   render() {
      let { navigation} = this.props
      return (
         <View style={styles.container}>
            <Text > near </Text>
            <WingBlank>
               <Button onPress={()=>{
                  navigation.navigate('Smart')
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
