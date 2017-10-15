import { React } from 'react';
import styled from 'styled-components';
import Item from './Item';

export default ({items}) =>
  <div>
    {items.map(item => <Item item={item} />)}
  </div>