---
sidebar_position: 3
title: Contract ABI Specification
hide_title: true
---

## ABI
The Contract Application Binary Interface (ABI) is the standard way to interact with contracts in the Ethereum ecosystem, both from outside the blockchain and for contract-to-contract interaction.

You can interact with other contracts by declaring an Interface.

```sol showLienNumbers
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0/contracts/token/ERC20/IERC20.sol
interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}
```

ABI acts as a function selector, defining the specific methods that can be called to a smart contract for execution. These specific methods and their connected data types are listed in a generated JSON RPC file.

The JSON format for a contract’s interface is given by an array of function, event and error descriptions. 

A `function` description is a JSON object with the fields:

- ``type``: ``"function"``, ``"constructor"``, ``"receive"`` (the :ref:`"receive Ether" function <receive-ether-function>`) or ``"fallback"`` (the :ref:`"default" function <fallback-function>`);
- ``name``: the name of the function;
- ``inputs``: an array of objects, each of which contains:

  * ``name``: the name of the parameter.
  * ``type``: the canonical type of the parameter (more below).
  * ``components``: used for tuple types (more below).

- ``outputs``: an array of objects similar to ``inputs``.
- ``stateMutability``: a string with one of the following values: ``pure`` (:ref:`specified to not read
  blockchain state <pure-functions>`), ``view`` (:ref:`specified to not modify the blockchain
  state <view-functions>`), ``nonpayable`` (function does not accept Ether - the default) and ``payable`` (function accepts Ether).

Constructor and fallback function never have ``name`` or ``outputs``. Fallback function doesn't have ``inputs`` either.

:::note
Sending non-zero Ether to non-payable function will revert the transaction.
:::

:::note
The state mutability ``nonpayable`` is reflected in Solidity by not specifying a state mutability modifier at all.
:::

An `event` description is a JSON object with fairly similar fields:

- ``type``: always ``"event"``
- ``name``: the name of the event.
- ``inputs``: an array of objects, each of which contains:

  * ``name``: the name of the parameter.
  * ``type``: the canonical type of the parameter (more below).
  * ``components``: used for tuple types (more below).
  * ``indexed``: ``true`` if the field is part of the log's topics, ``false`` if it one of the log's data segment.

- ``anonymous``: ``true`` if the event was declared as ``anonymous``.

`Errors` look as follows:

- ``type``: always ``"error"``
- ``name``: the name of the error.
- ``inputs``: an array of objects, each of which contains:

  * ``name``: the name of the parameter.
  * ``type``: the canonical type of the parameter (more below).
  * ``components``: used for tuple types (more below).

:::note
There can be multiple errors with the same name and even with identical signature in the JSON array, for example if the errors originate from different
files in the smart contract or are referenced from another smart contract. For the ABI, only the name of the error itself is relevant and not where it is
defined.
:::


Example:
```sol showLineNumbers title=Test.sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;


contract Test {
    constructor() { b = hex"12345678901234567890123456789012"; }
    event Event(uint indexed a, bytes32 b);
    event Event2(uint indexed a, bytes32 b);
    error InsufficientBalance(uint256 available, uint256 required);
    function foo(uint a) public { emit Event(a, b); }
    bytes32 b;
}
```

would result in the JSON:

```json title=Test.json showLineNumbers
[
  {
    "type": "error",
    "inputs": [
      {
        "name": "available",
        "type": "uint256"
      },
      {
        "name": "required",
        "type": "uint256"
      }
    ],
    "name": "InsufficientBalance"
  },
  {
    "type": "event",
    "inputs": [
      {
        "name": "a",
        "type": "uint256",
        "indexed": true
      },
      {
        "name": "b",
        "type": "bytes32",
        "indexed": false
      }
    ],
    "name": "Event"
  },
  {
    "type": "event",
    "inputs": [
      {
        "name": "a",
        "type": "uint256",
        "indexed": true
      },
      {
        "name": "b",
        "type": "bytes32",
        "indexed": false
      }
    ],
    "name": "Event2"
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "a",
        "type": "uint256"
      }
    ],
    "name": "foo",
    "outputs": []
  }
]
```

## References

- [Contract ABI Specification](https://docs.soliditylang.org/en/v0.8.16/abi-spec.html)