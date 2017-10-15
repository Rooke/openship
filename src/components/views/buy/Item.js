import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 10px 0 10px;
`;

const Item = styled.div`
  color: blue;
  padding: 10px;
  max-width: 100%;
  @media screen (min-width: 450) {
    max-width: 250px;
  }
  box-shadow: 2px 3px 4px 0px rgba(0,0,0,0.75);
  background: #f9f9f9;
  margin: 7px 0 7px 0;
`;

const Image = styled.img`
  max-width: inherit;
`;

const Description = styled.div`
  padding-top: 10px;
  width: 100%;
  height: 30px;
  font-family: Montserrat;
  font-weight: 700;
`;

const Title = styled.div`
  font-size: 25px;
  color: #333333;
  float: left;
`;

const Price = styled.div`
  font-size: 25px;
  color: #333333;
  float: right;
`;

export default ({item, showShippingPrice, showShippingTime}) =>
  <Wrapper>
    <Item>
      <Image src={item.src}/>
      <Description>
        <Title>{item.title}</Title>
        {item.price && (
          <div>
            <label>Price: </label>
            <Price>{item.price}</Price>
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
      </Description>
    </Item>
  </Wrapper>
;