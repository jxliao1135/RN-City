import { GET_SCENE, ADD_SCENE, EDIT_SCENE, DEL_SCENE } from '@constants/actionType'

const INITIAL_STATE = []

export default function counter(state = INITIAL_STATE, action) {
   let { type, payload } = action
   switch (type) {
      case GET_SCENE:
         return payload
      case ADD_SCENE:
         return state
      case EDIT_SCENE:
         return state
      case DEL_SCENE:
         return state
      default:
         return state
   }
}