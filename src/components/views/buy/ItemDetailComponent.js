import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Image = styled.img`
  flex-base: 50%;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.div`
  font-size: 35px;
  font-weight: 400;
  color: #333333;
  margin-bottom: 20px;
`;

const List = styled.div`
  flex-base: 50%;
  padding: 10px;
  font-family: 20px;
  font-family: Montserrat;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  font-weight: 400;

  & > div {
    margin: 5px 0 5px 0;
  }
`;

const Button = styled.button`
  background: #007ae5;
  border: none;
  border-radius: 3px;
  height: 30px;
  width: 70px;
  color: white;
  display: block;
  margin-top: 10px;
`

const Label = styled.label`
  font-weight: 800;
`

export default ({ title, src, price, deliveryLocation, currentLocation, currentShipPrice, shippingTime }) =>
  <Wrapper>
    <Image src={src} />
    <List>
      <Title>{title}</Title>
      {price && (
        <div>
          <Label>Price: </Label>
          <span>{price}</span>
        </div>
      )}
      {deliveryLocation && (
        <div>
          <Label>Delivery Location: </Label>
          <span>{deliveryLocation}</span>
        </div>
      )}
      {currentLocation && (
        <div>
          <Label>Current Location: </Label>
          <span>{currentLocation}</span>
        </div>
      )}
      {currentShipPrice && (
        <div>
          <Label>Shipping Price: </Label>
          <span>{currentShipPrice}</span>
        </div>
      )}
      {shippingTime && (
        <div>
          <Label>Shipping Time: </Label>
          <span>{shippingTime}</span>
        </div>
      )}
      <Button>
        Buy
      </Button>
    </List>
  </Wrapper>
