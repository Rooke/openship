import React from 'react';
import { connect } from 'react-redux';
import ItemDetailComponent from './ItemDetailComponent';

const mapStateToProps = (state, withProps) => ({
  title: state.items.items[withProps.match.params.itemIndex].title,
  src: state.items.items[withProps.match.params.itemIndex].src,
  price: state.items.items[withProps.match.params.itemIndex].price,
  deliveryLocation: state.items.items[withProps.match.params.itemIndex].deliveryLocation,
  currentLocation: state.items.items[withProps.match.params.itemIndex].currentLocation,
  currentShipPrice: state.items.items[withProps.match.params.itemIndex].currentShipPrice,
  shippingTime: state.items.items[withProps.match.params.itemIndex].shippingTime,
});

const mapDispatchToProps = (dispatch) => ({
  buyItem: () => {},
});

export default connect(mapStateToProps, null)(ItemDetailComponent);
