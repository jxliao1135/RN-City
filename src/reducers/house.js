import { GET_HOUSE, SELECT_HOUSE, DEL_HOUSE, SVAE_HOUSE } from '@constants/actionType'


const INITIAL_STATE = []

export default function counter(state = INITIAL_STATE, action) {
   let { type, payload } = action
   switch (type) {
      case GET_HOUSE:
         return payload
      case SELECT_HOUSE:
         return state = state.map(item => {
            item.current = false
            if (item.num == payload.num) item.current = true
            return item
         })
      case DEL_HOUSE:
         return state = state.filter(item => item.num != payload.num)
      case SVAE_HOUSE:
         return payload
      default:
         return state
   }
}