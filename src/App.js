import React, { Component } from 'react'
import Shippable from '../build/contracts/Shippable.json'
import getWeb3 from './utils/getWeb3'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { setItemInfo } from './actions/items';
import styled from 'styled-components';
import withProps from './utils/withProps';
import instanceAddresses from './utils/instances.json';
import Welcome from './components/Welcome';
import BuyView from './components/views/buy/BuyView';
import SellView from './components/sell/SellView';

const StyleWrapper = styled.div`
  font-family: Montserrat;
  font-size: 1em;
  @font-face {
    font-family: Montserrat;
    src: url('https://fonts.googleapis.com/css?family=Montserrat');
  }
`;

import {
  setUserWalletAdress
 } from './actions';

import NavigationComponent from './components/NavigationComponent';
import ShipView from './components/ship/ShipView';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.instantiateContract = this.instantiateContract.bind(this);
    this.loadItemInstances = this.loadItemInstances.bind(this);
    this.state = {
      web3: null,
      itemInstances: [],
      itemContract: null,
    };
    this.addInstance = this.addInstance.bind(this);
    this.fetchItemsData = this.fetchItemsData.bind(this);
  }

  fetchItemsData() {
    this.state.itemInstances.forEach((instance, index) => {
      instance.transportInfo.call({from: this.props.user}).then((data) => {
        this.props.setItemInfo(index, {
          deliveryLocation: data[0],
          currentLocation: data[1],
          currentShipPrice: data[2].toNumber(),
          shippingTime: data[3].toNumber()
        });
      });
      instance.getValue.call({from: this.props.user}).then((data) => {
        this.props.setItemInfo(index, { price: data.toNumber() });
      });
      instance.isMyItem.call({from: this.props.user}).then((data) => {
        this.props.setItemInfo(index, { isMyItem: data });
      });
      instance.isSold.call({from: this.props.user}).then((data) => {
        this.props.setItemInfo(index, { isSold: data });
      });
    });
  }

  addInstance(newInstance) {
    this.setState({ itemInstances: [ ...this.state.itemInstances, newInstance ] }, () => {
      this.fetchItemsData();
    });
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3
    .then(results => {
      this.setState({ web3: results.web3 }, () => {
        // Get account
        if (window.location.href.indexOf("ethship.mikerooke.net") !== -1) {
          this.props.setUserWalletAdress('35a20fb66a2dd8c6ae8efeb93f19b268e4f303fe12e9d199b2083f6f91828742');
        } else {
          this.state.web3.eth.getAccounts((error, accounts) => {
            this.props.setUserWalletAdress(accounts[1]);
          });
        }

        // Instantiate contract once web3 provided.
        this.instantiateContract();
      });
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const itemContract = contract(Shippable)
    itemContract.setProvider(this.state.web3.currentProvider);
    itemContract.defaults({
      from: this.props.user,
      gas: 4712388,
      gasPrice: 100000000000,
    });

    this.setState({ itemContract }, () => {
      this.loadItemInstances(instanceAddresses.instances);
    });
  }

  loadItemInstances(items) {
    if (items.length === 0) {
      this.fetchItemsData();
      return;
    }

    const item = items.shift();
    const remainingItems = [ ...items ];

    this.state.itemContract.at(item).then((instance) => {
      this.setState({ itemInstances: [ ...this.state.itemInstances, instance ] }, () => {
        this.loadItemInstances(remainingItems);
      });
    });
  }

  render() {
    const web3Props = {
      web3: this.state.web3,
      itemContract: this.state.itemContract,
      itemInstances: this.state.itemInstances,
      addInstance: this.addInstance,
      refresh: this.fetchItemsData,
    };
    return (
      <div>
        <Router>
          <StyleWrapper>
            <NavigationComponent />
            <div>
              <Route path='/buy' component={withProps(BuyView, web3Props)} />
              <Route exact path='/' component={Welcome}/>
              <Route path='/ship' component={withProps(ShipView, web3Props)} />
              <Route path='/sell' component={withProps(SellView, web3Props)} />
            </div>
          </StyleWrapper>
        </Router>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userWallet.userWalletAdress,
});

const mapDispatchToProps = dispatch => ({
  setUserWalletAdress: (adress) => dispatch(setUserWalletAdress(adress)),
  setItemInfo: (index, itemInfo) => dispatch(setItemInfo(index, itemInfo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
