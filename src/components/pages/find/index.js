import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { loadingVisable } from '@actions/'

class Find extends Component {
   constructor() {
      super()
      this.state = {
         visable: false
      }
   }

   componentDidMount() {

   }
   componentWillUpdate() {
      
   }
   btn = () => {
      let { loadingVisable } = this.props
      loadingVisable(true)
   }

   render() {
      return (
         <View style={styles.container}>
            <Text> Find </Text>
            <Button title="点击" onPress={this.btn} />
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

export default connect(
   state => state,
   dispatch => ({
      loadingVisable(item) {
         dispatch(loadingVisable(item))
      }
   })
)(Find)