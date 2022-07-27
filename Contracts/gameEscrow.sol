// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "gametoken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract escrow is Ownable {
   
    address admin;
    uint256 constant _gameId = 1;
   
    uint256 public totalBalance;
    // this is the erc20 gametoken contract address
    address constant tokenAddress = 0x65E094c43b1059764Df44a0d50768f9F26B9E0c5; // <-- INSERT DEPLYED ERC20 TOKEN CONTRACT HERE
    
    // game data tracking
    struct Game {
        uint256 id;
        address treasury;
        uint256 amount;
        bool locked;
        bool spent;
    }
    // map game to balances
    mapping(address => mapping(uint256 => Game)) public balances;

    constructor() {
        admin = msg.sender;
       
    }

    // retrieve current state of game funds in escrow
    function startGame(address _treasury, uint256 _amount) external returns (uint256) {
        gametoken token = gametoken(tokenAddress);
        //approve contract to spend amount tokens
        require(token.approve(address(this), _amount), "Escrow: approval has failed");
        require(_amount >= 1000000000000000000, "Escrow: must insert 1 whole token");
        token.transferFrom(msg.sender, address(this), _amount);

        totalBalance += _amount;

        balances[msg.sender][_gameId].amount = _amount;
        balances[msg.sender][_gameId].treasury = _treasury;
        balances[msg.sender][_gameId].locked = true;
        balances[msg.sender][_gameId].spent = false;
        return token.balanceOf(msg.sender);
    }

    function gameState(address _player) external view returns (uint256, bool, address) {
        return ( balances [_player][_gameId].amount, balances[_player][_gameId].locked, balances[_player][_gameId].treasury );
    }
        
   //function gameDetails() external returns (address, address) {
   //}


    // admin unlocks tokens in escrow once game's outcome decided
    function playerWon(address _player) external returns (bool) {
        balances[_player][_gameId].locked = false;

             
        gametoken token = gametoken(tokenAddress);
        token.transfer(_player, balances[_player][_gameId].amount);
        
        totalBalance -= balances[_player][_gameId].amount;
        balances[_player][_gameId].spent = true;
        return true;
    }


    // admin sends funds to treasury if player loses game
    function playerLost(address _player) external returns(bool){
        gametoken token = gametoken(tokenAddress);
        token.transfer(balances[_player][_gameId].treasury, balances[_player][_gameId].amount);

        balances[_player][_gameId].spent = true;
        totalBalance -= balances[_player][_gameId].amount;
        return true;
    }

    // player is able to withdraw unlocked tokens without admin if unlocked
    function withdraw() external returns (bool) {
        require(
            balances[msg.sender][_gameId].locked == false,
            "This escrow is still locked"
        );
        require(
            balances[msg.sender][_gameId].spent == false,
            "Already withdrawn"
        );

        gametoken token = gametoken(tokenAddress);
        // transfer to player of game (msg.sender) the value locked in escrow
        token.transfer(msg.sender, balances[msg.sender][_gameId].amount);
        // TODO: add post-transfer funcs to `_afterTokenTransfer` to validate transfer
        // amend escrow balance
        totalBalance -= balances[msg.sender][_gameId].amount;
        // set game balance to spent
        balances[msg.sender][_gameId].spent = true;
        return true;
    }
}
