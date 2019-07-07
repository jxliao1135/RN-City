import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, Modal, SafeAreaView } from 'react-native'
import { Carousel, Tabs } from '@ant-design/react-native';
import { basicStyle } from '@utils/basicStyle'

export default class Entry extends Component {
   constructor(props) {
      super(props)
      this.state = {
         visible: false,
         floatBtnList: [
            {
               id: 0,
               title: '登录'
            },
            {
               id: 1,
               title: '注册'
            }
         ],
         status: 0,
      }
   }
   componentDidMount() {

   }
   floatBtnCilck = (item) => {
      let { visible, status } = this.state
      this.setState({
         visible: !visible,
         status: item.id
      })
   }

   render() {
      let { visible, floatBtnList, status } = this.state
      console.log(visible)
      return (
         <View style={styles.container}>
            <Carousel
               style={styles.wrapper}
               dots={false}
               selectedIndex={2}
               autoplay
               infinite
               afterChange={this.onHorizontalSelectedIndexChange}
            >
               <View
                  style={[styles.containerHorizontal, { backgroundColor: 'red' }]}
               >
                  <Text>Carousel 1</Text>
               </View>
               <View
                  style={[styles.containerHorizontal, { backgroundColor: 'blue' }]}
               >
                  <Text>Carousel 2</Text>
               </View>
               <View
                  style={[
                     styles.containerHorizontal,
                     { backgroundColor: 'fuchsia' },
                  ]}
               >
                  <Text>Carousel 5</Text>
               </View>
            </Carousel>
            <View style={styles.floatBtn}>
               {
                  floatBtnList.map(item => {
                     return <Button key={item.id} onPress={e => this.floatBtnCilck(item)} color="#ffffff" title={item.title} />
                  })
               }
            </View>
            <Modal
               animationType="silde"
               transparent
               visible={visible}
            >
               <View style={[styles.container, { 'marginTop': 60 }]}>
                  <Tabs
                     tabs={floatBtnList}
                     page={status}
                     tabBarUnderlineStyle={{ 'backgroundColor':'#f08519','height':1,}}
                     tabBarActiveTextColor="#f08519"

                  >
                     <View>
                        <Text>login</Text>
                     </View>
                     <View>
                        <Text>register</Text>
                     </View>
                  </Tabs>
               </View>
            </Modal>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: basicStyle.bgColor,
      position: 'relative'
   },
   wrapper: {
      backgroundColor: 'red',
   },
   containerHorizontal: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
   },
   floatBtn: {
      position: 'absolute',
      bottom: 60,
      width: 375,
      flexDirection: 'row',
      justifyContent: 'space-around',
   },
   tabContent: {
      flex: 1,
   },
})
