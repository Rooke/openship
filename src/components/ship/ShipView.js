import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Home from './Home';
import AcceptOrder from './AcceptOrder';
import TransferItem from './TransferItem';
import withProps from '../../utils/withProps';

class ShipView extends Component {
  render() {
    const web3Props = {
      itemInstances: this.props.itemInstances,
      refresh: this.props.refresh,
    }
    return (
      <div>
        <Route exact path={`${this.props.match.url}`} component={withProps(Home, web3Props)} />
        <Route path={`${this.props.match.url}/order/:itemIndex`} component={withProps(AcceptOrder, web3Props)} />
        <Route path={`${this.props.match.url}/item/:itemIndex`} component={withProps(TransferItem, web3Props)} />
      </div>
    );
  }
}

export default connect(
  () => ({}),
  {  }
)(ShipView);
