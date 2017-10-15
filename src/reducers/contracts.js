const initialState = {
  contracts: [],
};

function contracts(state = initialState, action) {
  switch(action.type) {
    //  add Item through contract
    case 'ADD_CONTRACT':
      return { ...state, contracts: [...contracts, action.contract] };
    default: 
      return state
  }
};

export default contracts;