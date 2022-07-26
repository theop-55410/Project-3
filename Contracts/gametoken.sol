// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title SimpleToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` functions.
 */
contract gametoken is Context, Ownable, ERC20 {
    /**
     * @dev Constructor that gives _msgSender() all of existing tokens.
     */
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // init circulation
       _mint(msg.sender, 100 * (10**uint256(decimals())));
    }


    // player must approve allowance for escrow/P2EGame contract to use (spender)
    function approve(address spender, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
        address owner = _msgSender();
        amount = 100 * (10**uint256(decimals())); // <-- 100 by default which is max supply
        // amount = max possible to allow for better player UX (don't have to approve every time)
        // in-game this means UX doesn't need to include call to approve each play, but will need to check/read allowance
        // TODO: player approves only amount needed each play
        _approve(owner, spender, amount);
        return true;
    }
   
}
