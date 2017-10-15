import React from 'react';
import Item from './Item';

export default ({items}) =>
  <div>
    {items && items.map(item => <Item key={items.indexOf(item)} index={items.indexOf(item)} {...item} />)}
  </div>

