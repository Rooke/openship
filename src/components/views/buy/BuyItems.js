import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import BuyItemsComponent from './BuyItemsComponent';

const mapStateToProps = (state) => ({
  items: state.items.items,
});

export default connect(mapStateToProps,null)(BuyItemsComponent);