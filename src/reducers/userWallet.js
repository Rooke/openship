const initialState = {
  userWalletAdress: null,
};

function userWallet(state = initialState, action) {
  switch(action.type) {
    case 'SET_USER_WALLET_ADRESS':
      return { ...state, userWalletAdress: action.walletAdress};
    default: 
      return state
  }
};

export default userWallet;