
import React, { Component } from 'react'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import Smart from '@pages/smart/'
import Room from '@pages/room/'
import Home from '@pages/home/'
import Near from '@pages/near/'
import Find from '@pages/find/'
import User from '@pages/user/'
import Scenes from '@pages/scenes/'
import Run from '@pages/run/'
import Iconfont from '@components/common/iconfont/'

const MainTab = createBottomTabNavigator(
   {
      Home: {
         screen: Home,
         navigationOptions: () => {
            return {
               tabBarLabel: '首页',
               tabBarIcon: ({ focused, tintColor }) => {
                  return <Iconfont name={focused ? 'home_fill' : 'home'} color={focused ? '#f08519' : '#333'} size={24} />
               }
            }
         }
      },
      Near: {
         screen: Near,
         navigationOptions: ({ navigation }) => {
            return {
               tabBarLabel: '邻里',
               headerRight: '',
               tabBarIcon: ({ focused, tintColor }) => {
                  return <Iconfont name={focused ? 'category_fill' : 'category'} color={focused ? '#f08519' : '#333'} size={24} />
               }
            }
         }
      },
      Find: {
         screen: Find,
         navigationOptions: ({ navigation }) => {
            return {
               tabBarLabel: '发现',
               tabBarIcon: ({ focused, tintColor }) => {
                  return <Iconfont name={focused ? 'find_fill' : 'find'} color={focused ? '#f08519' : '#333'} size={24} />
               }
            }
         }
      },
      User: {
         screen: User,
         navigationOptions: ({ navigation }) => {
            return {
               tabBarLabel: '我的',
               tabBarIcon: ({ focused, tintColor }) => {
                  return <Iconfont name={focused ? 'me_fill' : 'me'} color={focused ? '#f08519' : '#333'} size={24} />
               }
            }
         }
      },
   },
   {
      initialRouteName: 'Home',
      tabBarOptions: {
         activeTintColor: '#f08519',
         inactiveTintColor: '#333333',
         showIcon: true
      },
      navigationOptions: ({ navigation: { state } }) => {
         let { routes, index } = state
         return {
            title: routes[index].routeName == 'Near' && '邻里',
            header: routes[index].routeName != 'Near' && null,  //隐藏顶部导航栏
         }
      },
   }
)

const Navigtion = createStackNavigator(
   {
      MainTab: {
         screen: MainTab
      },
      Smart: {
         screen: Smart
      },
      Room: {
         screen: Room,
      },
      Scenes: {
         screen: Scenes
      },
      Run: {
         screen: Run
      }
   }, {
      initialRouteName: 'MainTab',
      defaultNavigationOptions: {
         headerTintColor: '#000',
      },
      navigationOptions: (navigation) => {
         return {
            title: navigation.state.routeName,
         }
      },
   }
)

export const AppContainer = createAppContainer(Navigtion)