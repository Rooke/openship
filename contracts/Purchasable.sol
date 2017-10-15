pragma solidity ^0.4.11;

contract Purchasable {
    
    mapping (address => uint) balances;

    address public owner;

    uint price;
    bool forSale;

    enum SellingState { ForSale, Sold }
    SellingState public sellingState;

    address public seller;
    address public buyer;
    
    bool sellerApprove;
    bool buyerApprove;

    function Purchasable(uint _price) payable {
    	owner = msg.sender;
    	seller = owner;
    	price = _price;
    	sellingState = SellingState.ForSale;
    }   

    function buy(){
    	buyer = msg.sender;
    	approve();
    }

    function approve(){
	    if(msg.sender == buyer) buyerApprove = true;
	    else if(msg.sender == seller) sellerApprove = true;
	    if(sellerApprove &&  ){
	    	pay();
	    	transferOwnership(buyer)
	    	};
	}

	function pay(){
		.transfer(price);
	}

	function transferOwnership(address newOwner){
		require(newOwner != address(0));
		owner = newOwner;
	}    
	
}