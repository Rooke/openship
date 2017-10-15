import { combineReducers } from 'redux';
import webThreeReducer from './webThreeReducer';
import userWallet from './userWallet';
import contracts from './contracts'; 

export default combineReducers({
  webThreeReducer,
  userWallet,
  contracts,
});