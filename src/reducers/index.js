import { combineReducers } from 'redux';
import userWallet from './userWallet';
import items from './items';

export default combineReducers({
  userWallet,
  items,
});
