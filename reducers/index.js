import { combineReducers } from 'redux'
import mainPage from './mainPage'
import sideMenuReducer from './sideMenuReducer'

export default combineReducers({
  mainPage,
  sideMenuReducer,
})
