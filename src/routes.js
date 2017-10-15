import React from 'react';
import Route from 'react-router';
import ItemDetail from './components/views/buy/ItemDetail';

export default () =>
  <div>
    <Route path={`/buy/:itemIndex`} component={ItemDetail} />
  </div>;