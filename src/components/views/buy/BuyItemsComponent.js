import React from 'react';
import Item from './Item';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
`

export default ({items}) =>
  <Wrapper>
    {items && items.map(item => <Item key={items.indexOf(item)} index={items.indexOf(item)} {...item} />)}
  </Wrapper>
