import { combineReducers } from 'redux'
import user from './userReducer';
import hist from './historyReducer';

export default combineReducers({ //总state的
    user ,//用户信息
    hist //路由信息
})