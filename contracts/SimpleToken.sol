pragma solidity ^0.5.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";

import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Detailed.sol";

/**
 * @title SimpleToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the sender.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` functions.
 */
contract SimpleToken is Initializable, ERC20, ERC20Detailed {

    /**
     * @dev initialize that gives msg.sender all of existing tokens.
     */
    function initialize(address sender) public initializer {
        ERC20Detailed.initialize("Token", "TKN", 18);
        _mint(sender, 1000000 * (10 ** uint256(decimals())));
    }
}