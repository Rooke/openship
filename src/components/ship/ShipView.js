import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Home from './Home';
import AcceptOrder from './AcceptOrder';
import TransferItem from './TransferItem';
import { withRouter } from 'react-router';
import withProps from '../../utils/withProps';

class ShipView extends Component {
  render() {
    return (
      <div>
        <Route exact path={`${this.props.match.url}`} component={withProps(Home, { itemInstances: this.props.itemInstances })} />
        <Route path={`${this.props.match.url}/order/:itemIndex`} component={withProps(AcceptOrder, { itemInstances: this.props.itemInstances })} />
        <Route path={`${this.props.match.url}/item/:itemIndex`} component={withProps(TransferItem, { itemInstances: this.props.itemInstances })} />
      </div>
    );
  }
}

export default withRouter(connect(
  () => ({}),
  {  }
)(ShipView));
