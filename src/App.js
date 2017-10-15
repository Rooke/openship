import React, { Component } from 'react'
import SimpleStorage from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyleWrapper = styled.div`
  font-family: Montserrat;
  font-size: 1em;
  @font-face {
    font-family: Montserrat;
    src: url('https://fonts.googleapis.com/css?family=Montserrat');
  }
`;

const ITEMS = [
  '17a6a85d69081cd44755cb4dfc93e675ff5b2d4d',
]

import {
  setUserWalletAdress
 } from './actions';

import NavigationComponent from './components/NavigationComponent';
import ShipView from './components/ShipView';
import BuyView from './components/views/buy/BuyView';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

// hoc to inject web3 props
const withWeb3 = (WrappedComponent, web3Props) => {
  // ...and returns another component...
  return class extends Component {
    render() {
      return <WrappedComponent
        {...web3Props}
        {...this.props}
      />;
    }
  };
}

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
  }
  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3
    .then(results => {
      this.setState({ web3: results.web3 }, () => {
        // Instantiate contract once web3 provided.
        this.instantiateContract();

        // Get account
        if (window.location.href.indexOf("ethship.mikerooke.net") !== -1) {
          this.props.setUserWalletAdress('35a20fb66a2dd8c6ae8efeb93f19b268e4f303fe12e9d199b2083f6f91828742');
        } else {
          this.state.web3.eth.getAccounts((error, accounts) => {
            this.props.setUserWalletAdress(accounts[0]);
          });
        }
      });
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const itemContract = contract(SimpleStorage)
    itemContract.setProvider(this.state.web3.currentProvider);

    this.setState({ itemContract }, () => {
      this.loadItemInstances(ITEMS);
    });
  }

  loadItemInstances(items) {
    if (items.length === 0) { return; }

    const item = items.shift();
    const remainingItems = [ ...items ];

    // this.state.itemContract.at(item).then((instance) => {
    this.state.itemContract.deployed().then((instance) => {
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
    };
    return (
      <div>
        <Router>
          <StyleWrapper>
            <NavigationComponent />
            <div>
              <Route path='/buy' component={withWeb3(BuyView, web3Props)} />
              <Route path='/ship' component={withWeb3(ShipView, web3Props)} />
            </div>
          </StyleWrapper>
        </Router>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = dispatch => ({
  setUserWalletAdress: (adress) => dispatch(setUserWalletAdress(adress)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
