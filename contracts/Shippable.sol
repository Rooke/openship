
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

    TransportInfo public transportInfo;
 
    struct Shipper {
    	address addr;
    	uint shipPrice;
    }

    uint numShippers;
    mapping (uint => Shipper) shippers;

    function newShipper(address addr, uint shipPrice) returns (uint shipperID) {
    	shipperID = numShippers++;
    	shippers[shipperID] = Shipper(addr, shipPrice);
    }

    // Account addresses
    address public owner;
    address public seller;
    address public buyer;
    address public currentShipper;

    enum SellingState { ForSale, Sold }
    SellingState public sellingState;

    enum ShippingState { Awaiting, Shipping, Delivered}
    ShippingState public shippingState;

    // Contract constructor.
    function Shippable(uint _productValue, string _currentLocation) payable {
    	owner = msg.sender;
    	seller = owner;
    	productValue = _productValue;
    	transportInfo.currentLocation = _currentLocation;
    	sellingState = SellingState.ForSale;
    }   

    // Confirms that the buyer wants to purchase the item at its productValue and ship it at deliveryLocation
    // for shipPrice before _shippingTime seconds. Transfers the productValue and shipPrice on the contract.
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

    // Offer to transfer shipped item from current shipper to new shipper
    function transferItem(uint newShipPrice, string _currentLocation) {
    	if (msg.sender == currentShipper){
    		transportInfo.currentShipPrice = newShipPrice;
    		transportInfo.currentLocation = _currentLocation;
    	}
    }

    // Verifies if the current shipper is responsible for the shipped item
    function isMyItem() returns (bool) {
    	if(msg.sender == currentShipper){
    		return true;
    	}

    	else return false;
    }

    // Confirms that the item was delivered to the owner/buyer
    function delivered() {
    	if (msg.sender == owner){
	    	// Pay all shippers
	    	shippingState = ShippingState.Delivered;	
    	}
    }
    
}
