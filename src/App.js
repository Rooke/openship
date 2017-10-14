import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { 
  setWeb3,
  addContract,
  setUserWalletAdress
 } from './actions';
 
import NavigationComponent from './components/NavigationComponent';
import { BuyView, ShipView } from './components';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
 componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.props.setWeb3(results.web3);

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */
    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.props.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.props.web3.eth.getAccounts((error, accounts) => {
      console.log(accounts);
      this.props.setUserWalletAdress(accounts[0]);
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance
        this.props.addContract(simpleStorageInstance);
        // Stores a given value, 5 by default.
        //return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        //return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
      })
    })
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <NavigationComponent />
            <div>
              <Route path='/buy' component={BuyView} />
              <Route path='/ship' component={BuyView} />
            </div>
          </div>
        </Router>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  web3: state.webThreeReducer.web3,
})

const mapDispatchToProps = dispatch => ({
  setWeb3: (web3) => dispatch(setWeb3(web3)),
  addContract: (contract) => dispatch(addContract(contract)),
  setUserWalletAdress: (adress) => dispatch(setUserWalletAdress(adress)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
