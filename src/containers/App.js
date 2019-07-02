import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { AppContainer } from './Router'
import { Provider } from 'react-redux'
import configStore from '../store/'

console.log('configStore',configStore)

const store = configStore()


export default class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <AppContainer />
         </Provider>
      )
   }
}