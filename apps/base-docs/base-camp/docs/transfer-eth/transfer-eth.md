---
title: Transfer ETH in solidity
description: A guide to understand different ways to transfer ETH through smart contracts
hide_table_of_contents: false
---

This article will delve into the three primary methods for sending Ether: transfer, send, and call.e'll discuss their differences, use cases, and the recommended practices.

---

## Objectives

By the end of this lesson, you should be able to:

- Userstand the different ways to transfer ETH
- Determine when to use each type appropriately in contract development
- Get insight about gas utilization and best practices, while transfering Ether

---

## Sending Ether
### Transfer
 This method allows you to send Ether, consuming 2300 gas units. If the operation fails, it throws an error.

:::info  
The receiving smart contract should have a fallback function defined or else the transfer call will throw an error. There is a gas limit of 2300 gas, which is enough to complete the transfer operation  
:::

```solidity
function sendViaTransfer(address payable recipient) public payable {
       recipient.transfer(msg.value); // Automatically reverts on failure
}
```

### Send
Similar to transfer, send also consumes 2300 gas units but returns a boolean value indicating the success or failure of the operation.

```solidity 
function sendViaSend(address payable recipient) public payable {
        bool sent = recipient.send(msg.value); // Returns false on failure
        require(sent, "Failed to send Ether");
    }
```

### Call
This method is more flexible, allowing you to forward all gas or set a specific gas limit. Like send, it returns a boolean value indicating the operation's success or failure

```solidity
function sendViaCall(address payable recipient) public payable {
        (bool sent, bytes memory data) = recipient.call{gas :10000, value: msg.value}(""); // Returns false on failure
        require(sent, "Failed to send Ether");
    }
```

## Usage guidelines
The choice between transfer, send, and call depends on the specific requirements of your contract and the level of control you need over the transaction.

###  Transfer 
 This was once the simplest and safest way to send Ether, as it automatically reverts the transaction if the call fails. However, it only forwards a fixed amount of gas (2300), which may not be enough for more complex operations in the receiving contract.

The gas limit of 2300 gas, which is enough to complete the transfer operation. It is hardcoded to prevent reentrancy attacks.

### Send
This method is similar to transfer but returns false instead of throwing an exception when the call fails. This allows you to handle the failure in your contract. However, like transfer , it also only forwards 2300 gas.

### Call
It allows you to forward all remaining gas or specify a certain amount. This flexibility makes it suitable for more complex operations. However, it also requires you to handle the possibility of reentrancy attacks and manually check the return value. 

:::note
Call is the recommended way of sending ETH to a smart contract as of Solidity 0.6.0
:::

Using call, one can also trigger other functions defined in the contract and send a fixed amount of gas to execute the function.
```solidity
function sendViaCallExternalContract(address payable recipient) public payable {
(bool sent, bytes memory data) = recipient.call{ gas :10000, value: msg.value }  
 ("func_signature(uint256 args)");
 }
```