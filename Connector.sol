pragma solidity ^0.5.7;
pragma experimental ABIEncoderV2;


contract DydxInterface {

    enum ActionType {
        Deposit,   // supply tokens
        Withdraw,  // borrow tokens
        Transfer,  // transfer balance between accounts
        Buy,       // buy an amount of some token (externally)
        Sell,      // sell an amount of some token (externally)
        Trade,     // trade tokens against another account
        Liquidate, // liquidate an undercollateralized or expiring account
        Vaporize,  // use excess tokens to zero-out a completely negative account
        Call       // send arbitrary data to an address
    }
        
        
    enum AssetDenomination {
        Wei, // the amount is denominated in wei
        Par  // the amount is denominated in par
    }

    enum AssetReference {
        Delta, // the amount is given as a delta from the current value
        Target // the amount is given as an exact number to end up at
    }

    struct AssetAmount {
        bool sign; // true if positive
        AssetDenomination denomination;
        AssetReference ref;
        uint256 value;
    }
    
    struct ActionArgs {
        ActionType actionType;
        uint256 accountId;
        AssetAmount amount;
        uint256 primaryMarketId;
        uint256 secondaryMarketId;
        address otherAddress;
        uint256 otherAccountId;
        bytes data;
    }
    
    struct Info {
        address owner;  // The address that owns the account
        uint256 number; // A nonce that allows a single address to control many accounts
    }
    
    
    function operate(Info[] memory accounts, ActionArgs[] memory actions) public;
        
}

contract Helper {
    function getOperation() public pure returns (address operation) {
        operation = 0x4EC3570cADaAEE08Ae384779B0f3A45EF85289DE;
    }
}


contract Connector is Helper, DydxInterface{
    function operate(Info[] memory accounts, ActionArgs[] memory actions) public {
        DydxInterface(getOperation()).operate(accounts, actions);
   }
}

