# OpenShip

_OpenShip_ is a smart contract for tracking the shipment of physical goods, allowing for peer-to-peer shipment networks. The contract `Shippable.sol` is located [here](./contracts/Shippable.sol)

## Inspiration
Moving physical things around the world is a fundamental activity that humans do. The complexity and risk of allowing random people deliver packages has typically restricted most commercial deliveries to be done by large organizations. Perhaps with the right incentives it can be possible to allow anyone to be paid for moving goods.

Imagine a universal routing protocol for physical packets.

## What it does

This repository is a small website that demos how the smart contract works. A seller can elect to ship a product after a buyer agrees to buy the object and pay a shipping fee. The seller then "sells" the contract to a shipper, who has a time reward for shipping the item, but must offer a deposit while delivering the object. The contract enforces the time deadline by allowing the buyer to force the shipper to forfeit the deposit after the time limit is reached. This allows the seller to wait longer than they contracted to, or to allow an outside arbitrator to decide how the deposit is distributed.

## Accomplishments that we're proud of
Coming up with a "Mechanism Design" that actually seemed reasonable at incentivising shippers to ship products in time. It also potentially provides an audit trail for later arbitration and insurance claims.

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


