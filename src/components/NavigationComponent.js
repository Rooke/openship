import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 50px;
  background: #007ae5;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NLink = styled(NavLink)`
  height: 50px;
  width: 80px;
  text-align: center;
  line-height: 42px;
  background: #007ae5;
  border-radius: none;
  color: white;
  text-decoration: none;
  margin-right: 20px;
  font-size: 25px;
  :hover {
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.75);
  }
  :active, :focus {
    outline: none;
  }
`;

const activeStyle = {
  color: 'black',
};

export default () =>
  <Wrapper>
      <NLink activeStyle={activeStyle} to='/buy'>Buy</NLink>
      <NLink activeStyle={activeStyle} to='/ship'>Ship</NLink>
      <NLink activeStyle={activeStyle} to='/sell'>Sell</NLink>
  </Wrapper>;
