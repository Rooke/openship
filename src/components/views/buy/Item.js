import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const WrapLink = styled(Link)`
  flex-basis: 500px;
  max-width: 500px;
  padding: 0 10px 0 10px;
  text-decoration: none;
  color: #333;
`;

const Item = styled.div`
  padding: 10px;
  box-shadow: 2px 3px 4px 0px rgba(0,0,0,0.75);
  background: #f9f9f9;
  margin: 7px 0 7px 0;
`;

const Image = styled.img`
  width: 100%;  
`;

const Title = styled.div`
  font-size: 25px;
  color: #333333;
`;

const List = styled.div`
  padding-top: 10px;
  width: 100%;
  font-family: 20px;
  font-family: Montserrat;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  tex-decoration: none;
`;

export default ({index, title, src, price, deliveryLocation, currentLocation, showShippingPrice, currentShipPrice, shippingTime, showShippingTime}) =>
  <WrapLink to={`/buy/${index}`}>
    <Item>
      <Image src={src}/>
        <List>
          <Title>{title}</Title>
          {price && (
            <div>
              <label>Price: </label>
              <span>{price}</span>
            </div>
          )}
          {deliveryLocation && (
            <div>
              <label>Delivery Location: </label>
              <span>{deliveryLocation}</span>
            </div>
          )}
          {currentLocation && (
            <div>
              <label>Current Location: </label>
              <span>{currentLocation}</span>
            </div>
          )}
          {currentShipPrice && showShippingPrice && (
            <div>
              <label>Shipping Price: </label>
              <span>{currentShipPrice}</span>
            </div>
          )}
          {shippingTime && showShippingTime && (
            <div>
              <label>Shipping Time: </label>
              <span>{shippingTime}</span>
            </div>
          )}
      </List>
    </Item>
  </WrapLink>
;