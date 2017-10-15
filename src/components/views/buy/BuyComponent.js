import React from 'react';
import Item from './Item';

export default ({items}) =>
  <div>
    {items && items.map(item => <Item item={item} />)}
  </div>