import React from 'react';
import { connect } from 'react-redux';

const ShipView = (props) => {
  return <span>
    {props.itemInstances.length}
    {props.wallet}
  </span>;
}

export default connect(
  (state) => {
    console.log(state);
    return {
      wallet: state.userWallet.userWalletAdress,
    };
  },
  {}
)(ShipView);
