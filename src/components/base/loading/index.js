import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator, TouchableHighlight, Modal } from 'react-native'

export default class Loading extends Component {
   constructor(props) {
      super(props)
      this.state = {
         visable: false
      }
   }

   componentDidMount() {
      let { visable } = this.props
      if (visable) this.setState({ visable })
   }

   componentWillReceiveProps({ visable }) {
      console.log('componentWillReceiveProps', visable)
      if (visable) this.setState({ visable })
   }

   render() {
      let { visable } = this.state
      console.log('visable', visable)
      return (
         <Modal
            animationType="fade"
            transparent
            visible={visable}
         >
            <View style={styles.container}>
               <ActivityIndicator size="large" color="#000" />
            </View>
         </Modal>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
});
