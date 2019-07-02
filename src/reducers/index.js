import { combineReducers } from 'redux'
import devices from './device_status'
import classify from './device_classify'
import scenes from './scene'
import houses from './house'
import rooms from './room'


export default combineReducers({
   devices,
   classify,
   scenes,
   houses,
   rooms
})
