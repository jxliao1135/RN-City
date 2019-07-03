import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'

const middlewares = [
   thunkMiddleware,
   // createLogger() //state改变时的打印
]

export default function configStore() {
   const store = createStore(rootReducer, applyMiddleware(...middlewares))
   return store
}