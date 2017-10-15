import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import BuyComponent from './BuyComponent';

const mapStateToProps = (state) => ({
  items: state.items.items,
});

export default withRouter(connect(mapStateToProps,null)(BuyComponent));
