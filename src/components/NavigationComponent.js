import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 50px;
  background: #007ae5;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NavLink = styled(Link)`
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

export default () =>
  <Wrapper>
      <NavLink to='/buy'>Buy</NavLink>
      <NavLink to='/ship'>Ship</NavLink>
  </Wrapper>;