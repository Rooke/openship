import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemDetail from '../views/buy/ItemDetail';
import { withRouter } from 'react-router';


class AcceptOrder extends Component {
  render() {
    const itemIndex = this.props.match.params.itemIndex;
    const itemDetails = this.props.itemObjs[itemIndex];
    return (
      <div>
        <ItemDetail item={itemDetails} />
        <button
          onClick={() => {
            this.props.itemInstances[itemIndex]
              .acceptTransfer({from: this.props.user})
              .then(() => {
                this.props.history.push('/ship');
              })
          }}
        >
          Accept
        </button>
      </div>
    )
  }
}

export default withRouter(connect(
  (state) => ({
    itemObjs: state.items.items,
    user: state.userWallet.userWalletAdress,
  }),
  {  }
)(AcceptOrder));
