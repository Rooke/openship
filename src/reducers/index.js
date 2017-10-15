import { combineReducers } from 'redux';
import webThreeReducer from './webThreeReducer';
import userWallet from './userWallet';
import contracts from './contracts'; 
import items from './items';

export default combineReducers({
  webThreeReducer,
  userWallet,
  contracts,
  items,
});