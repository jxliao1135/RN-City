import { GET_STATUS, STATUS_CHANGE } from '../constants/action_type'


const INITIAL_STATE = []

export default function counter(state = INITIAL_STATE, action) {
   let { type, payload } = action
   switch (type) {
      case GET_STATUS:
         return payload
      case STATUS_CHANGE:
         return state = state.map(item => {
            if (item.num == payload) item = Object({}, item, payload)
            return item
         })
      default:
         return state
   }
}