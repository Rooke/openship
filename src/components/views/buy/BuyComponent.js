import React from 'react';
import { Route } from 'react-router-dom';
import withProps from '../../../utils/withProps';
import Home from './Home';
import BuyItems from './BuyItems';

const BuyComponent = ({match, itemInstances, refresh}) => {
  return (<div>
    <Route path={`${match.url}/:itemIndex`} component={withProps(BuyItems, { itemInstances, refresh })} />
    <Route exact path={`${match.url}`} component={withProps(Home, { itemInstances, refresh })} />
  </div>);
}

export default BuyComponent;
