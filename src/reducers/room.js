import { GET_ROOM } from '../constants/action_type'


const INITIAL_STATE = []

export default function counter(state = INITIAL_STATE, action) {
   let { type, payload } = action
   switch (type) {
      case GET_ROOM:
         return payload
      default:
         return state
   }
}