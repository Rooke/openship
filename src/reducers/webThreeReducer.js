import React from 'react';

const intialState = {
  web3: null,
};

function webThreeReducer (state = intialState, action) {
  switch(action.type) {
    case 'SET_WEB_3':
      return { ...state, web3: action.web3 };
    default:
      return state;
  }
}

export default webThreeReducer;