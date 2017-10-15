
pragma solidity ^0.4.11;

contract Shippable {

    mapping (address => uint) balances;

    function () payable {}

    uint public productValue;
    uint public deposit;
    uint public initialShipPrice;

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
    	productValue = _productValue*(10**18);
    	transportInfo.currentLocation = _currentLocation;
    	sellingState = SellingState.ForSale;
    }

    // Confirms that the buyer wants to purchase the item at its productValue and ship it at deliveryLocation
    // for shipPrice before _shippingTime seconds. Transfers the productValue and shipPrice on the contract.
    function buy(string _deliveryLocation, uint shipPrice, uint _deadline) public payable {
    	if ((msg.value >= productValue + shipPrice*(10**18)) && sellingState == SellingState.ForSale){
        	transportInfo.deliveryLocation = _deliveryLocation;
        	initialShipPrice = shipPrice*(10**18);
    	    transportInfo.currentShipPrice = initialShipPrice;
    	    transportInfo.deadline = _deadline;
        	buyer = msg.sender;
        	this.transfer(productValue + shipPrice);
        	transferOwnership(buyer);
        	sellingState = SellingState.Sold;
        	deposit = productValue;
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
				seller.transfer(productValue);
				newShipper(msg.sender, transportInfo.currentShipPrice);
				currentShipper = msg.sender;
				shippingState = ShippingState.Shipping;
			}
		}
		else if (shippingState == ShippingState.Shipping){
			if (msg.value >= deposit){
		        currentShipper.transfer(productValue);
		        newShipper(msg.sender, transportInfo.currentShipPrice);
		        currentShipper = msg.sender;
			}
		}
    }

    // Offer to transfer shipped item from current shipper to new shipper
    function transferItem(uint newShipPrice, string _currentLocation) public {
    	if (msg.sender == currentShipper){
    		transportInfo.currentShipPrice = newShipPrice*(10**18);
    		transportInfo.currentLocation = _currentLocation;
    	}
    }

    function getValue() public returns (uint) {
      return productValue;
    }

    // Verifies if the current shipper is responsible for the shipped item
    function isMyShipment() public returns (bool) {
    	if(msg.sender == currentShipper){
    		return true;
    	}

    	else return false;
    }
    
    // Verifies if the msg.sender is owner of the shipped item
    function isMyItem() public returns (bool) {
    	if(msg.sender == owner){
    		return true;
    	}

    	else return false;
    }

    function isSold() public returns (bool) {
    	if (sellingState == SellingState.Sold){
    		return true;
    	}

    	else
    		return false;
    }

    // Confirms that the item was delivered to the owner/buyer
    function delivered() payable public {
    	if (msg.sender == owner){
	    	// Pay shipping price to all shippers
	    	uint shipperID = numShippers-1;
	    	address shipper = shippers[shipperID].addr;
	    	uint shipFee = shippers[shipperID].shipPrice + deposit;
	    	shipper.transfer(shipFee);
	    	shipperID=0;
    	    shipper = shippers[shipperID].addr;
    	    shipFee = shippers[shipperID].shipPrice - shippers[shipperID+1].shipPrice;
    	    shipper.transfer(shipFee);
	    	shippingState = ShippingState.Delivered;
    	}
    }

    // Refund owner if deadline is past
    function checkDeadline() payable public {
    	if (now > transportInfo.deadline){
			owner.transfer(deposit + initialShipPrice);
			sellingState = SellingState.ForSale;
			shippingState = ShippingState.Awaiting;
    	}
    }
}
