import {combineReducers} from 'redux'
import authReducer from './authReducer'
import alertReducer from './alertReducer'
import taskReducer from './taskReducer'
import selectTaskReducer from './selectTaskReducer'

export default  combineReducers({
    auth: authReducer,
    alert: alertReducer,
    task: taskReducer,
    taskSelected: selectTaskReducer
})