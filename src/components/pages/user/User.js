import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class User extends Component {
   render() {
      return (
         <View style={styles.container}>
            <Text> USER </Text>
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
