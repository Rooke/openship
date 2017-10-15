import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Item from '../views/buy/Item';

const Home = (props) => {
  // split item instances between my items and orders
  const orders = [];
  const myItems = [];

  props.itemInstances.forEach((instance, index) => {
    if (props.itemObjs[index].isMyItem === true) {
      myItems.push({ index, data: props.itemObjs[index] });
    } else if (props.itemObjs[index].isMyItem === false) {
      orders.push({ index, data: props.itemObjs[index] });
    }
  });

  return (
    <div>
      <h4>Available Orders</h4>
      {orders.length ?
        orders.map((itemObj) => (
          <Link key={itemObj.index} to={`${props.match.url}/order/${itemObj.index}`}>
            <Item item={itemObj.data} />
          </Link>
        )) :
        <p>No orders available...</p>
      }

      <h4>My Items</h4>
      {myItems.length ?
        myItems.map((itemObj) => (
          <Link key={itemObj.index} to={`${props.match.url}/item/${itemObj.index}`}>
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
