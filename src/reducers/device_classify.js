import { DEVICE_CLASSIFY } from '@constants/actionType'


const INITIAL_STATE = []

export default function counter(state = INITIAL_STATE, action) {
   let { type, payload } = action
   switch (type) {
      case DEVICE_CLASSIFY:
         return payload
      default:
         return state
   }
}