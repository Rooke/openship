import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 20%;
`;

const Title = styled.h2`

`;

const Image = styled.img`
  max-width: 400px;
  max-height: 400px;
`

const Description = styled.div`
  max-width: 400px;
`

export default ({item, showShippingPrice, showShippingTime}) =>
  <Wrapper>
    <Title>{item.title}</Title>
    <Image src={item.src} />
    <Description>{item.description}</Description>
    {item.price && (
      <div>
        <label>Price: </label>
        <span>{item.price}</span>
      </div>
    )}
    {item.deliveryLocation && (
      <div>
        <label>Delivery Location: </label>
        <span>{item.deliveryLocation}</span>
      </div>
    )}
    {item.currentLocation && (
      <div>
        <label>Current Location: </label>
        <span>{item.currentLocation}</span>
      </div>
    )}
    {item.currentShipPrice && showShippingPrice (
      <div>
        <label>Shipping Price: </label>
        <span>{item.currentShipPrice}</span>
      </div>
    )}
    {item.shippingTime && showShippingTime (
      <div>
        <label>Shipping Time: </label>
        <span>{item.shippingTime}</span>
      </div>
    )}
  </Wrapper>
