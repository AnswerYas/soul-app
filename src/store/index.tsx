import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import global from './reducers/global'

const middlewares = [thunk.withExtraArgument({ history })]
const rootReducer = combineReducers({
    global,
})
const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store
