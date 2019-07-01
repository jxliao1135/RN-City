
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import Smart from '@pages/smart/Smart'
import Room from '@pages/room/Room'
import Home from '@pages/home/Home'
import Near from '@pages/near/Near'
import Find from '@pages/find/Find'
import User from '@pages/user/User'

const MainTab = createBottomTabNavigator(
   {
      Home: Home,
      Near: Near,
      Find: Find,
      User: User,
   },
   {
      initialRouteName: 'Home',
      tabBarOptions: {
         activeTintColor: '#f08519',
      },
      navigationOptions: ({ navigation:{state} }) => {
         let { routes,index } = state
         console.log(routes[index])
         return {
            title: routes[index].routeName,
         }
      }
   }
)

const Navigtion = createStackNavigator(
   {
      MainTab: {
         screen: MainTab
      },
      Home: {
         screen: Home,
      },
      Near: {
         screen: Near,
      },
      Find: {
         screen: Find,
      },
      User: {
         screen: User,
      },
      Smart: {
         screen: Smart
      },
      Room: {
         screen: Room,
      },
   }, {
      defaultNavigationOptions: {
         headerStyle: {
            backgroundColor: '#f08519',
         },
         headerTintColor: '#fff',
      },
   }
)

export const AppContainer = createAppContainer(Navigtion)