import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator, TouchableHighlight, Modal } from 'react-native'
import { connect } from 'react-redux'
import { loadingVisable } from '@actions/'

class Loading extends Component {
   constructor(props) {
      super(props)
      this.state = {
         visable: false
      }
   }

   componentWillReceiveProps(nextProps){
      let { loading, loadingVisable } = nextProps
      if (!loading) return
      setTimeout(() => {
         let {loading} = this.props
         if(loading) loadingVisable(false)
      }, 6000);
   }

   componentDidUpdate(prevProps, prevState) {
      
   }

   render() {
      let { loading } = this.props
      return (
         <Modal
            animationType="fade"
            transparent
            visible={loading}
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


export default connect(
   state => state,
   dispatch => ({
      loadingVisable(item) {
         dispatch(loadingVisable(item))
      }
   })
)(Loading)