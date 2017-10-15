import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Item from '../views/buy/Item';

const Home = (props) => {
  // split item instances between my items and orders
  const orders = [];
  const myItems = [];

  this.props.itemInstances.forEach((instance, index) => {
    if (instance.isMyItem.call({from: this.props.user})) {
      myItems.push({ index, data: this.props.itemObjs[index] });
    } else {
      orders.push({ index, data: this.props.itemObjs[index] });
    }
  });

  return (
    <div>
      <h4>Available Orders</h4>
      {orders.length ?
        orders.map((itemObj) => (
          <Link to={`${this.props.match.url}/order/${itemObj.index}`}>
            <Item item={itemObj.data} />
          </Link>
        )) :
        <p>No orders available...</p>
      }

      <h4>My Items</h4>
      {myItems.length ?
        myItems.map((itemObj) => (
          <Link to={`${this.props.match.url}/item/${itemObj.index}`}>
            <Item item={itemObj.data} />
          </Link>
        )) :
        <p>No items being transported...</p>
      }
    </div>
  );
}

export default connect(
  (state) => ({
    itemObjs: state.items.items,
  }),
  {  }
)(Home);
