// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./gametoken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract P2EGame is Ownable {
   
    address admin;
   
    uint256 public totalBalance;
    // this is the erc20 gametoken contract address
    address constant tokenAddress = 0xa92d2502Bd3b5c80D60f65c21a1e0E3A4213da3B; // <-- INSERT DEPLYED ERC20 TOKEN CONTRACT HERE
    
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
    // set-up event for emitting once character minted to read out values
    //event NewGame(uint256 id, address indexed player);

    // only admin account can unlock escrow
    modifier onlyAdmin {
        require(msg.sender == admin, "Only admin can unlock escrow.");
        _;
    }

    /**
     * @dev Grants `DEFAULT_ADMIN_ROLE`, `MINTER_ROLE` and `PAUSER_ROLE` to the
     * account that deploys the contract.
     *
     * See {ERC20-constructor}.
     */
    constructor() {
        admin = msg.sender;
       
    }

    // retrieve current state of game funds in escrow
    function startGame(uint256 _gameId, address _treasury, uint256 _amount) external returns (uint256) {
        gametoken token = gametoken(tokenAddress);
        //approve contract to spend amount tokens
        require(token.approve(address(this), _amount), "P2EGame: approval has failed");
        require(_amount >= 1000000000000000000, "P2EGame: must insert 1 whole token");
        token.transferFrom(msg.sender, address(this), _amount);

        totalBalance += _amount;

        balances[msg.sender][_gameId].amount = _amount;
        balances[msg.sender][_gameId].treasury = _treasury;
        balances[msg.sender][_gameId].locked = true;
        balances[msg.sender][_gameId].spent = false;
        return token.balanceOf(msg.sender);
    }

    function gameState(address _player, uint256 _gameId) external view returns (uint256, bool, address) {
        return ( balances [_player][_gameId].amount, balances[_player][_gameId].locked, balances[_player][_gameId].treasury );
    }
        
   

    // admin unlocks tokens in escrow once game's outcome decided
    function playerWon(uint256 _gameId, address _player) onlyAdmin external returns (bool) {
        balances[_player][_gameId].locked = false;

             
        gametoken token = gametoken(tokenAddress);
        token.transfer(_player, balances[_player][_gameId].amount);
        
        totalBalance -= balances[_player][_gameId].amount;
        balances[_player][_gameId].spent = true;
        return true;
    }


    // admin sends funds to treasury if player loses game
    function playerLost(uint256 _gameId, address _player) onlyAdmin external returns(bool){
        gametoken token = gametoken(tokenAddress);
        token.transfer(balances[_player][_gameId].treasury, balances[_player][_gameId].amount);

        balances[_player][_gameId].spent = true;
        totalBalance -= balances[_player][_gameId].amount;
        return true;
    }

    // player is able to withdraw unlocked tokens without admin if unlocked
    function withdraw(uint256 _gameId) external returns (bool) {
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
