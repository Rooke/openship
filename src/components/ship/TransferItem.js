import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemDetail from '../views/buy/ItemDetail';
import Form from 'react-jsonschema-form';
import { withRouter } from 'react-router';


class TransferItem extends Component {
  render() {
    const itemIndex = this.props.match.params.itemIndex;
    const itemDetails = this.props.itemObjs[itemIndex];
    return (
      <div>
        <ItemDetail item={itemDetails} />
        <Form
          schema={{
            type: 'object',
            properties: {
              'address': {
                type: 'string',
                title: 'Current Address'
              },
              'price': {
                type: 'number',
                minimum: 0,
                exclusiveMinimum: true,
                title: 'Shipping Price',
                description: 'cannot be more than original shipping price'
              },
            },
            required: ['price', 'address']
          }}
          uiSchema={{
            'ui:order': ['address', 'price']
          }}
          onSubmit={({ formData }) => {
            this.props.itemInstances[itemIndex]
              .transferItem(formData.price, formData.address)
              .then(() => {
                this.props.history.push('/ship');
              })
          }}
        />
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
)(TransferItem));
