import React, { Component } from 'react';
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

const Label = styled.label`
  font-weight: 800;
`

class ItemDetail extends Component {
  render() {
    let { item, showShippingPrice, showShippingTime } = this.props;
    return(
      <Wrapper>
      <Image src={item.src} />
      <List>
        <Title>{item.title}</Title>
        {item.price && (
          <div>
            <Label>Price: </Label>
            <span>{item.price}</span>
          </div>
        )}
        {item.deliveryLocation && (
          <div>
            <Label>Delivery Location: </Label>
            <span>{item.deliveryLocation}</span>
          </div>
        )}
        {item.currentLocation && (
          <div>
            <Label>Current Location: </Label>
            <span>{item.currentLocation}</span>
          </div>
        )}
        {showShippingPrice && (item.currentShipPrice ? (
          <div>
            <Label>Shipping Price: </Label>
            <span>{item.currentShipPrice}</span>
          </div>
        ) : null)}
        {showShippingTime && (item.shippingTime ? (
          <div>
            <Label>Shipping Time: </Label>
            <span>{item.shippingTime}</span>
          </div>
        ) : null)}
      </List>
    </Wrapper>
    )
  }
}

export default ItemDetail;
