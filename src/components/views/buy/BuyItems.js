import { connect } from 'react-redux';

import BuyItemsComponent from './BuyItemsComponent';

const mapStateToProps = (state) => ({
  items: state.items.items,
});

export default connect(mapStateToProps,null)(BuyItemsComponent);
