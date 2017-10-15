import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import { connect } from 'react-redux'
import Item from '../views/buy/Item';

class SellView extends Component {
  render() {
    return (
      <div>
        <h4>Open Orders</h4>
        <div>
          {this.props.itemInstances.map((instance, index) => {
            if (!this.props.itemObjs[index].isSold) {
              return <Item key={index} item={this.props.itemObjs[index]} />
            }
            return null;
          })}
        </div>
        <h4>Sell a new item using ETHShip</h4>
        <Form
          schema={{
            type: 'object',
            properties: {
              'address': {
                type: 'string',
                title: 'Current Location'
              },
              'price': {
                type: 'number',
                minimum: 0,
                title: 'Selling Price',
              },
            },
            required: ['price', 'address']
          }}
          uiSchema={{
            'ui:order': ['address', 'price']
          }}
          onSubmit={({ formData }) => {
            this.props.itemContract.new(formData.price, formData.address)
              .then((newInstance) => {
                this.props.addInstance(newInstance);
              })
          }}
        />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    itemObjs: state.items.items,
    user: state.userWallet.userWalletAdress,
  }),
  {  }
)(SellView);
