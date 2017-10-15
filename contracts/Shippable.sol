
pragma solidity ^0.4.11;

contract Shippable {  
    
    mapping (address => uint) balances;

    uint productValue;
    uint deposit;
    uint initialShipPrice;

    struct TransportInfo {
	    string deliveryLocation;
	    string currentLocation;
	    uint currentShipPrice;
	    uint deadline;
    }

    TransportInfo public transportInfo;
 
    struct Shipper {
    	address addr;
    	uint shipPrice;
    }

    uint numShippers;
    mapping (uint => Shipper) shippers;

    function newShipper(address addr, uint shipPrice) private returns (uint shipperID) {
    	shipperID = numShippers;
    	shippers[shipperID] = Shipper(addr, shipPrice);
    	numShippers++;
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
    function Shippable(uint _productValue, string _currentLocation) public payable {
    	owner = msg.sender;
    	seller = owner;
    	productValue = _productValue;
    	transportInfo.currentLocation = _currentLocation;
    	sellingState = SellingState.ForSale;
    }   

    // Confirms that the buyer wants to purchase the item at its productValue and ship it at deliveryLocation
    // for shipPrice before _shippingTime seconds. Transfers the productValue and shipPrice on the contract.
    function buy(string _deliveryLocation, uint shipPrice, uint _deadline) public payable {
    	if ((msg.value >= productValue + shipPrice) && sellingState == SellingState.ForSale){
        	transportInfo.deliveryLocation = _deliveryLocation;
        	initialShipPrice = shipPrice;
    	    transportInfo.currentShipPrice = initialShipPrice;
    	    transportInfo.deadline = _deadline;
        	buyer = msg.sender;
        	transferOwnership(buyer);
        	sellingState = SellingState.Sold;
    	}
	}

	function transferOwnership(address newOwner) private {
		require(newOwner != address(0));
		owner = newOwner;
	}    
	
	// Accept to take responsibility of the shipped item
    function acceptTransfer() public payable {
		if(shippingState == ShippingState.Awaiting){
			if (msg.value >= deposit){
				newShipper(msg.sender, transportInfo.currentShipPrice);
				currentShipper = msg.sender;
				shippingState = ShippingState.Shipping;				
			}
		}
		else if (shippingState == ShippingState.Shipping){
			if (msg.value >= deposit){
		        currentShipper.transfer(deposit);
		        newShipper(msg.sender, transportInfo.currentShipPrice);
		        currentShipper = msg.sender;							
			}
		}
    }

    // Offer to transfer shipped item from current shipper to new shipper
    function transferItem(uint newShipPrice, string _currentLocation) public {
    	if (msg.sender == currentShipper || msg.sender == seller){
    		transportInfo.currentShipPrice = newShipPrice;
    		transportInfo.currentLocation = _currentLocation;
    	}
    }

    // Verifies if the current shipper is responsible for the shipped item
    function isMyItem() public returns (bool) {
    	if(msg.sender == currentShipper){
    		return true;
    	}

    	else return false;
    }

    // Confirms that the item was delivered to the owner/buyer
    function delivered() public {
    	if (msg.sender == owner){
	    	// Pay shipping price to all shippers
	    	uint shipperID = numShippers-1;
	    	shippers[shipperID].addr.transfer(shippers[shipperID].shipPrice);
	    	for (shipperID=numShippers-1; shipperID>=0; shipperID--){
	    		shippers[shipperID].addr.transfer(shippers[shipperID].shipPrice - shippers[shipperID+1].shipPrice);
	    	}
	    	shippingState = ShippingState.Delivered;	
    	}
    }

    // Refund owner if deadline is past
    function checkDeadline() public {
    	if (now > transportInfo.deadline){
			owner.transfer(deposit + initialShipPrice);
    	}
    }
    
		function getContractState() public {
			return (owner, seller, productValue, transportInfo.currentLocation, sellingState); 
		}
}
