import React from 'react';
import { connect } from 'react-redux';
import { setItemInfo } from '../../../actions';
import ItemDetailComponent from './ItemDetailComponent';


const mapStateToProps = (state, withProps) => ({
  index: [withProps.match.params.itemIndex],
  title: state.items.items[withProps.match.params.itemIndex].title,
  src: state.items.items[withProps.match.params.itemIndex].src,
  price: state.items.items[withProps.match.params.itemIndex].price,
  deliveryLocation: state.items.items[withProps.match.params.itemIndex].deliveryLocation,
  currentLocation: state.items.items[withProps.match.params.itemIndex].currentLocation,
  currentShipPrice: state.items.items[withProps.match.params.itemIndex].currentShipPrice,
  shippingTime: state.items.items[withProps.match.params.itemIndex].shippingTime,
  instance: withProps.web3Props.instances[withProps.match.params.itemIndex],
});

const mapDispatchToProps = (dispatch) => ({
  setBought: (index) => dispatch(setItemInfo(index, { isMyItem: true })),
});

export default connect(mapStateToProps, null)(ItemDetailComponent);
