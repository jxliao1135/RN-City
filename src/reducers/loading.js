import { LOADING_VISABLE } from '@constants/actionType'


const INITIAL_STATE = false

export default function counter(state = INITIAL_STATE, action) {
   let { type, payload } = action
   console.log('触发loading')
   switch (type) {
      case LOADING_VISABLE:
         console.log('触发了',payload)
         return state = payload
      default:
         return state
   }
}