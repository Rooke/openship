import React from 'react';
import styled from 'styled-components';

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

export default ({showShippingPrice, item, showShippingTime}) =>

    <Item>
      <Image src={item.src}/>
        <List>
          <Title>{item.title}</Title>
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
          {(item.currentShipPrice && showShippingPrice) && (
            <div>
              <label>Shipping Price: </label>
              <span>{item.currentShipPrice}</span>
            </div>
          )}
          {(item.shippingTime && showShippingTime) && (
            <div>
              <label>Shipping Time: </label>
              <span>{item.shippingTime}</span>
            </div>
          )}
      </List>
    </Item>
;
