
pragma solidity ^0.4.11;

contract Shippable {  
    
    mapping (address => uint) balances;

    uint productValue;
    uint deposit;

    struct TransportInfo {
	    string deliveryLocation;
	    string currentLocation;
	    uint currentShipPrice;
	    uint shippingTime;
    }

    TransportInfo transportInfo;

    struct Shipper {
    	address addr;
    	uint shipPrice;
    }

    mapping (uint => Shipper) shippers;

    address public owner;
    address public seller;
    address public buyer;
    address public currentShipper;

    enum SellingState { ForSale, Sold }
    SellingState public sellingState;

    enum ShippingState { Awaiting, Shipping, Delivered}
    ShippingState public shippingState;

    function Shippable(uint _productValue, string _currentLocation) payable {
    	owner = msg.sender;
    	seller = owner;
    	productValue = _productValue;
    	sellingState = SellingState.ForSale;
    }   

    function buy(string _deliveryLocation, uint shipPrice, uint _shippingTime) payable {
    	if ((msg.value == productValue + shipPrice) && sellingState == SellingState.ForSale){
        	transportInfo.deliveryLocation = _deliveryLocation;
    	    transportInfo.currentShipPrice = shipPrice;
    	    transportInfo.shippingTime = _shippingTime;
        	buyer = msg.sender;
        	transferOwnership(buyer);
        	sellingState = SellingState.Sold;
    	}
	}

	function transferOwnership(address newOwner){
		require(newOwner != address(0));
		owner = newOwner;
	}    
	

    function acceptTransfer() payable {
		if(shippingState == ShippingState.Awaiting){
			if (msg.value == deposit){
				currentShipper = msg.sender;
				shippingState = ShippingState.Shipping;				
			}
		}
		else if (shippingState == ShippingState.Shipping){
			if (msg.value == deposit){
		        currentShipper.transfer(deposit);
		        currentShipper = msg.sender;							
			}
		}
    }

    function transferItem(uint newShipPrice, string _currentLocation) {
    	if (msg.sender == currentShipper){
    		transportInfo.currentShipPrice = newShipPrice;
    		transportInfo.currentLocation = _currentLocation;
    	}
    }

    function getTransportInfo() returns (TransportInfo) {
        return transportInfo;
    }

    function isMyItem() returns (bool) {
    	if(msg.sender == currentShipper){
    		return true;
    	}

    	else return false;
    }

    function delivered() {
    	if (msg.sender == owner){
	    	// Pay all shippers
	    	shippingState = ShippingState.Delivered;	
    	}
    }
    
}