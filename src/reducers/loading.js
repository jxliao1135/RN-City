import { LOADING_VISABLE } from '@constants/actionType'


const INITIAL_STATE = false

export default function counter(state = INITIAL_STATE, action) {
   let { type, payload } = action
   switch (type) {
      case LOADING_VISABLE:
         return payload
      default:
         return state
   }
}