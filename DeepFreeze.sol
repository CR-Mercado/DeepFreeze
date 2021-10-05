//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;


contract CreateFreezer {
    
  address public creatorOwner;  // public state variable automatically has getter function 
  DeepFreeze[] public deployedFreezer; // public array automatically has getter function 
  
  constructor(){ 
   creatorOwner = msg.sender; 
   // owner of the creator contract is the original deployer (i.e., protocol admin, not freezer owner)   
  }
  
  function createFreezer(string memory hint_, bytes32 answer_) public { 
    DeepFreeze new_freezer_address = new DeepFreeze(msg.sender, hint_, answer_);
    // pass caller to DeepFreeze constructor as eoa; makes them owner of a their freezer 
    deployedFreezer.push(new_freezer_address); // track these freezers
  } 
    
} 

contract DeepFreeze { 
      // Variables 
     address payable public owner; // publicly visible owner of the freezer  
     string internal hint; // only this contract can see this.
     bytes32 internal answer; // only this contract can see this. 
    
     constructor(address eoa, string memory hint_, bytes32 answer_){  // see createFreezer
      owner = payable(eoa); //  owner is freezer creator as payable
       hint = hint_; 
      answer = answer_;
     }
     
     modifier onlyOwner() { 
       require(msg.sender == owner, "Only the freezer owner can do that!");
       _; 
     } 
     
     function requestHint() public onlyOwner view returns(string memory) { 
         return(hint);
     }
     
     function requestKey() public onlyOwner view returns(bytes32) { 
         return(answer);
     }
     
     function deposit() public payable { 
         // just accept msg value from anyone 
     } 
     
      function getBalance() public view returns(uint){
      return address(this).balance;    
     } 
     
     function withdraw(string memory passphrase_) public onlyOwner { 
         require(  keccak256(abi.encodePacked(passphrase_)) == answer, "Your passphrase is wrong.");
         require (getBalance() != 0, "There's nothing to withdraw.");
         // Input code for withdrawing a specific ERC-20 asset.
         selfdestruct(owner); // automatically sends **ETH** to address upon contract death. 
         // ONLY ETH. Don't self destruct with ERC-20 balance! 
     }
    
} 