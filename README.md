# OpenShip

_OpenShip_ is a smart contract for tracking the shipment of physical goods, allowing for peer-to-peer shipment networks. The contract `Shippable.sol` is located [here](contracts/Shippable.sol)

### Tech

This repository is a small website that demos how the smart contract works. A seller can elect to ship a product after a buyer agrees to buy the object. The seller then "sells" the contract to a shipper, who has a time reward for shipping the item 

### Installation

OpenShip requires [Node.js](https://nodejs.org/) v4+ to run, and specifically uses truffle for interacting with ethereum.

Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/Rooke/openship
$ cd openship
$ npm install -d
$ node start run
```
Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:3000
```

OpenShip requires a local ethereum node to run with an open RPC interface. It is recommended that you use `ethereumjs-testrpc`, mostly because we're not even sure the contract works properly.
```sh
$ npm install -g ethereumjs-testrpc
$ testrpc
```

**This software was created for the 2017 EthWaterloo Hackathon**
