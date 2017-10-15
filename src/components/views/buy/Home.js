import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Item from './Item';
import { withRouter } from 'react-router';   

const WrapLink = styled(Link)`
  flex-basis: 500px;
  max-width: 500px;
  padding: 0 10px 0 10px;
  text-decoration: none;
  color: #333;
`;

const Home = ({ itemInstances, items, match }) => (
  <div>
    {itemInstances.map((instance, index) => {
      if (items[index] && (!items[index].isSold)) {
        return (
          <WrapLink key={index} to={`${match.url}/${index}`}>
            <Item key={index} item={items[index]} />
          </WrapLink>
        );
      }
      return null;
    })}
  </div>
);

const mapStateToProps = (state) => ({
  items: state.items.items,
});

export default withRouter(connect(mapStateToProps,null)(Home));
