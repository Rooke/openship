const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors())
const Shippable = require('../build/contracts/Shippable.json');
const Web3 = require("web3");


var provider = new Web3.providers.HttpProvider("http://localhost:8545");
var web3 = new Web3(provider);
var contract = require("truffle-contract");

var itemContract = contract(Shippable);
itemContract.setProvider(provider);
itemContract.defaults({
  from: web3.eth.accounts[1],
  gas: 4712388,
  gasPrice: 100000000000,
});

var bodyParser = require('body-parser')
app.use( bodyParser.json() );

app.post('/new-instance', function (req, res) {
  const price = req.body.price;
  const address = req.body.address;

  itemContract.new(price, address).then((instance) => {
    res.send(instance.address);
  }).catch((e) => {console.log(e)});
})

app.post('/buy', function (req, res) {
  const instanceAddr = req.body.instanceAddr;
  const deliveryAddr = req.body.address;
  const shipPrice = req.body.shipPrice;
  const shipTime = req.body.shipTime;

  itemContract.at(instanceAddr).then((instance) => {
    instance.buy(deliveryAddr, shipPrice, shipTime).then(() => {
      res.send('Success');
    });
  }).catch((e) => {console.log(e)});
})

app.listen(3010, function () {
  console.log('app listening on port 3010!')
})
