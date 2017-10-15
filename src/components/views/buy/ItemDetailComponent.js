import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 10px;
`;

const Title = styled.div`
  font-size: 25px;
  color: #333333;
`;

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: block;
`

const Description = styled.div`
  max-width: 400px;
`

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

const Button = styled.button`
  background: #007ae5;
  border: none;
  border-radius: 3px;
  height: 30px;
  width: 70px;
  color: white;
  display: block;
  margin: 10px auto;
`

export default ({ title, src, price, deliveryLocation, currentLocation, currentShipPrice, shippingTime }) =>
  <Wrapper>
    <Image src={src} />
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
      {currentShipPrice && (
        <div>
          <label>Shipping Price: </label>
          <span>{currentShipPrice}</span>
        </div>
      )}
      {shippingTime && (
        <div>
          <label>Shipping Time: </label>
          <span>{shippingTime}</span>
        </div>
      )}
    </List>
    <Button>
      Buy
    </Button>
  </Wrapper>
