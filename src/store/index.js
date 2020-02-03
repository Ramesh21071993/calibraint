import wheather from './wheather/reducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    wheather,
})

export default rootReducer