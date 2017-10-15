import React from 'react';
import { Route } from 'react-router-dom';
import withProps from '../../../utils/withProps';
import Home from './Home';
import BuyItems from './BuyItems';
import { withRouter } from 'react-router';

const BuyComponent = ({match, itemInstances}) => {
  console.log(match);
  return (<div>
    <Route path={`${match.url}/:itemIndex`} component={withProps(BuyItems, { itemInstances })} />
    <Route exact path={`${match.url}`} component={withProps(Home, { itemInstances })} />
  </div>);
}

export default withRouter(BuyComponent);
