---
sidebar_position: 1
title: Solidity 101
hide_title: true
---

# Solidity 101

- Solidity is a high-level language for writing smart contracts for EVM
- Solidity compiles to EVM byte code
- Solidity is mainly influenced by C++, a little from Python & JavaScript.
- Syntax and Object oriented programming concepts come from C++
- Modifiers, multiple inheritance, super keyword and [C3 linearization](https://en.wikipedia.org/wiki/C3_linearization) come from `Python`
- Solidity is `statically` typed, supports inheritance, libraries and complex user-defined types. 

## Development Setup

Before we proceed with learning Solidty, let's install [Foundry](https://github.com/foundry-rs/foundry).

Installation:

```sh
curl -L https://foundry.paradigm.xyz | bash
```

and run
```sh
foundryup
```

or if you want to use `Docker`:

```sh
docker pull ghcr.io/foundry-rs/foundry:latest
```

Install [Solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) extension in VScode.

If you use a non-standard project layout, you may have to add the following to your .vscode/settings.json:
```json
{
  "solidity.packageDefaultDependenciesContractsDirectory": "src",
  "solidity.packageDefaultDependenciesDirectory": "lib"
}
```

Manual or book for Foundry is available here: https://book.getfoundry.sh/

To initialize a new foundry project:

```sh
mkdir HelloWorld
cd HelloWorld
forge init
```

Folder structure should like this:

```sh
HelloWorld  🍣 main 🗑️  ×4🛤️  ×3
➜ tree
.
├── cache
├── foundry.toml
├── lib
├── script
│   └── HelloWorld.s.sol
├── src
│   └── HelloWorld.sol
└── test
    └── HelloWorld.sol

5 directories, 4 files
```

HelloWorld  🍣 main 🗑️  ×4🛤️  ×3

Please open the folder `codes/HelloWorld` in VSCode.

```sh showLineNumbers
forge build
forge test
```

Anvil is a local testnet node shipped with Foundry. Anvil can be used for testing contracts. To start a local development chain, run:

```sh
anvil
```

![anvil](/img/anvil.png)

To compile the HelloWorld contract:
```sh
forge build
``` 

To run tests against the HelloWorld contract:
```sh
forge test
```

To deploy the HelloWorld contract to `anvil`:

```sh
forge create --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/HelloWorld.sol:HelloWorld
```

## Solidity File Layout

:::note
Source files can contain an arbitrary number of contract definitions, import , pragma and using for directives and struct, enum, function, error and constant variable definitions.
:::

According to Solidity docs, the best practice to organize the contracts layout:

* Layout contract elements in the following order:
    * Pragma statements
    * Import statements
    * Interfaces
    * Libraries
    * Contracts

* Inside each contract, library or interface, use following order:
    * State variables
    * Events
    * Struct, Arrays or Enums
    * Modifiers
    * Constructor
    * Fallback — Receive function
    * `external` visible functions
    * `public` visible functions
    * `internal` visible functions
    * `private` visible functions

### SPDX
Every source file should start with a comment indicating its license:
```js
// SPDX-License-Identifier: MIT
```

The compiler does not validate that the license is part of the list allowed by SPDX, but it does include the supplied string in the bytecode metadata.

The comment can be placed anywhere in the file at the file level, but it is recommended to put it at the top of the file.

You can read more about SPDX here: https://spdx.dev/ids/#how

### Pragma
* The pragma keyword is used to enable certain compiler features or checks.
* A pragma directive is always local to a source file, so you have to add the pragma to all your files if you want to enable it in your whole project.
* Available `pragmas`:

#### Version Pragma: 
:::success Version Pragma
This indicates the specific Solidity compiler version to be used for that source file
:::

* It just instructs the compiler to check whether its version matches the one required by the pragma.
* The latest compiler versions are in the 0.8.z range
* The version pragma is used as follows: `pragma solidity ^0.8.0;`
* A `^` symbol in the pragma `pragma solidity ^0.8.0` indicates that the source file may be compiled only from versions starting with `0.8.0` until `0.8.z`, but not `0.9.0`
* Change in `y` in pragma `x.y.z` indicates breaking changes.
* More complex pragmas can be specified following `semver` syntax: `>`, `>=`, `<` and `<=`. Example: `pragma solidity >0.8.0 < 0.8.4;`

#### ABI Coder Pragma
:::success Version Pragma
By using `pragma abicoder v1;` or `pragma abicoder v2;` you can select between the two implementations of the `ABI` `encoder` and `decoder`.
:::

* The new ABI coder (v2) is able to encode and decode arbitrarily nested arrays and structs.

#### Experimental Pragma
:::success Experimental Pragma
It can be used to enable features of the compiler or language that are not yet enabled by default.
:::

Supported Experimental pragmas:
* `pragma experimental SMTChecker;`
    * If you use `pragma experimental SMTChecker;`, then you get additional safety warnings which are obtained by querying an SMT solver. 

### Imports
* Solidity supports import statements to help modularise your code that are similar to those available in JavaScript 
```js
import "./AccessControl.sol";
import * as AccessControl from "./AccessControl.sol";
import "./AccessControl.sol" as AccessControl;
import {ControlCheck as check, PauseContract} from "./AccessControl.sol";
```

### Comments
* Single-line comments use `//`
* Multie-line comments use `/* ... */`
* NatSpec Comments: NatSpec stands for `Ethereum Natural Language Specification Format`. To use NatSpec comments, you can use `///` or a double asterisk block `/** ... */`. 
* NatSpec are written directly abvoe function declarations or statements to generate documentation in JSON format for developers.


|Tag            |   |Context    |
|--- |--- |--- |
|``@title`` |     A title that should describe the contract/interface                                    |contract, library, interface |
|``@author`` |    The name of the author                                                                 |contract, library, interface |
|``@notice`` |    Explain to an end user what this does                                                  |contract, library, interface, function, public  |state variable, event
|``@dev`` |       Explain to a developer any extra details                                               |contract, library, interface, function, state  |variable, event
|``@param`` |     Documents a parameter just like in Doxygen (must be followed by parameter name)        |function, event |
|``@return`` |    Documents the return variables of a contract's function                                |function, public state variable |
|``@inheritdoc`` |Copies all missing tags from the base function (must be followed by the contract name) |function, public state variable |
|``@custom:...`` |Custom tag, semantics is application-defined                                           |everywhere |

## Structure of a Contract
### State Variables
:::success State Variables
State variables are variables whose values are permanently stored in contract storage.
:::

```solidity showLineNumbers
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract SimpleStorage {
    uint storedData; // State variable
    // ...
}
```

### Functions
- Functions are the executable units of code. Functions are usually defined inside a contract, but they can also be defined outside of contracts.

```solidity showLineNumbers
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.1 <0.9.0;

contract SimpleAuction {
    function bid() public payable { // Function
        // ...
    }
}

// Helper function defined outside of a contract
function helper(uint x) pure returns (uint) {
    return x * 2;
}
```

* Function Calls can happen `internally` or `externally` and have different levels of `visibility` towards other contracts. 
* Functions accept parameters and return variables to pass parameters and values between them.
* Functions can be declared pure in which case they promise not to read from or modify the state.
* Functions can be declared view in which case they promise not to modify the state.

### Function Modifiers
Function Modifiers can be used to change the behaviour of functions in a declarative way. For example, you can use a modifier to automatically check a condition prior to executing the function.

```solidity showLineNumbers
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.1 <0.9.0;

contract owned {
    constructor() { owner = payable(msg.sender); }
    address payable owner;

    // This contract only defines a modifier but does not use
    // it: it will be used in derived contracts.
    // The function body is inserted where the special symbol
    // `_;` in the definition of a modifier appears.
    // This means that if the owner calls this function, the
    // function is executed and otherwise, an exception is
    // thrown.
    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }
}

contract destructible is owned {
    // This contract inherits the `onlyOwner` modifier from
    // `owned` and applies it to the `destroy` function, which
    // causes that calls to `destroy` only have an effect if
    // they are made by the stored owner.
    function destroy() public onlyOwner {
        selfdestruct(owner);
    }
}

contract priced {
    // Modifiers can receive arguments:
    modifier costs(uint price) {
        if (msg.value >= price) {
            _;
        }
    }
}

contract Register is priced, destructible {
    mapping (address => bool) registeredAddresses;
    uint price;

    constructor(uint initialPrice) { price = initialPrice; }

    // It is important to also provide the
    // `payable` keyword here, otherwise the function will
    // automatically reject all Ether sent to it.
    function register() public payable costs(price) {
        registeredAddresses[msg.sender] = true;
    }

    function changePrice(uint _price) public onlyOwner {
        price = _price;
    }
}

contract Mutex {
    bool locked;
    modifier noReentrancy() {
        require(
            !locked,
            "Reentrant call."
        );
        locked = true;
        _;
        locked = false;
    }

    /// This function is protected by a mutex, which means that
    /// reentrant calls from within `msg.sender.call` cannot call `f` again.
    /// The `return 7` statement assigns 7 to the return value but still
    /// executes the statement `locked = false` in the modifier.
    function f() public noReentrancy returns (uint) {
        (bool success,) = msg.sender.call("");
        require(success);
        return 7;
    }
}
```

### Events
Solidity events give an abstraction on top of the EVM’s logging functionality. Applications can subscribe and listen to these events through the RPC interface of an Ethereum client.

```solidity showLineNumbers
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.21 <0.9.0;

contract SimpleAuction {
    event HighestBidIncreased(address bidder, uint amount); // Event

    function bid() public payable {
        // ...
        emit HighestBidIncreased(msg.sender, msg.value); // Triggering event
    }
}
```
More info: https://docs.soliditylang.org/en/v0.8.9/contracts.html#events

### Struct & Enum Types
Structs are custom defined types that can group several variables. 
```solidity showLineNumbers
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

// Defines a new type with two fields.
// Declaring a struct outside of a contract allows
// it to be shared by multiple contracts.
// Here, this is not really needed.
struct Funder {
    address addr;
    uint amount;
}

contract CrowdFunding {
    // Structs can also be defined inside contracts, which makes them
    // visible only there and in derived contracts.
    struct Campaign {
        address payable beneficiary;
        uint fundingGoal;
        uint numFunders;
        uint amount;
        mapping (uint => Funder) funders;
    }

    uint numCampaigns;
    mapping (uint => Campaign) campaigns;

    function newCampaign(address payable beneficiary, uint goal) public returns (uint campaignID) {
        campaignID = numCampaigns++; // campaignID is return variable
        // We cannot use "campaigns[campaignID] = Campaign(beneficiary, goal, 0, 0)"
        // because the right hand side creates a memory-struct "Campaign" that contains a mapping.
        Campaign storage c = campaigns[campaignID];
        c.beneficiary = beneficiary;
        c.fundingGoal = goal;
    }

    function contribute(uint campaignID) public payable {
        Campaign storage c = campaigns[campaignID];
        // Creates a new temporary memory struct, initialised with the given values
        // and copies it over to storage.
        // Note that you can also use Funder(msg.sender, msg.value) to initialise.
        c.funders[c.numFunders++] = Funder({addr: msg.sender, amount: msg.value});
        c.amount += msg.value;
    }

    function checkGoalReached(uint campaignID) public returns (bool reached) {
        Campaign storage c = campaigns[campaignID];
        if (c.amount < c.fundingGoal)
            return false;
        uint amount = c.amount;
        c.amount = 0;
        c.beneficiary.transfer(amount);
        return true;
    }
}
```

- Struct types can be used inside `mappings` and `arrays` and they can themselves contain mappings and arrays.

:::note
You can observer in above code, that, in all the functions, a `struct` type is assigned to a local variable with data location `storage`. This does not copy the struct but only stores a `reference` so that assignments to members of the local variable actually write to the state.
:::

`Enums` can be used to create custom types with a finite set of `constant values`. They are explicitly convertible to and from all integer types but implicit conversion is not allowed. Enums cannot have more than 256 members.

```sol showLineNumbers
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.8;

contract test {
    enum ActionChoices { GoLeft, GoRight, GoStraight, SitStill }
    ActionChoices choice;
    ActionChoices constant defaultChoice = ActionChoices.GoStraight;

    function setGoStraight() public {
        choice = ActionChoices.GoStraight;
    }

    // Since enum types are not part of the ABI, the signature of "getChoice"
    // will automatically be changed to "getChoice() returns (uint8)"
    // for all matters external to Solidity.
    function getChoice() public view returns (ActionChoices) {
        return choice;
    }

    function getDefaultChoice() public pure returns (uint) {
        return uint(defaultChoice);
    }

    function getLargestValue() public pure returns (ActionChoices) {
        return type(ActionChoices).max;
    }

    function getSmallestValue() public pure returns (ActionChoices) {
        return type(ActionChoices).min;
    }
}
```

## Primitive Data Types
### Boolean
- bool: The possible values are constants `true` and `false`.
Operators:
- ! (logical negation)
- && (logical conjunction, “and”)
- || (logical disjunction, “or”)
- == (equality)
- != (inequality)

### Integers
- `int` or `uint`: Signed and unsigned integers of various sizes
- `uint8` to `uint256` in steps of `8` (unsigned of 8 up to 256 bits) and `int8` to `int256`. 
- `uint` and `int` are aliases for `uint256` and `int256`, respectively.

Operators:
* Comparisons: `<=, <, ==, !=, >=, >`(evaluate to bool)
* Bit operators: `&, |, ^` (bitwise exclusive or), ~ (bitwise negation)
* Shift operators: `<<` (left shift), `>>` (right shift)
* Arithmetic operators: `+`, `-`, `unary -` (only for signed integers), `*`, `/`, `%` (modulo), `**` (exponentiation)

- For an integer type `X`, you can use` type(X).min` and `type(X).max` to access the minimum and maximum value representable by the type.

### Address
The `address` type comes in two flavours, which are largely identical:
* `address`: Holds a 20 byte value (size of an Ethereum address). 
Example: 
```solidity
address owner = address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
```
* `address payable`: Same as address, but with the additional members `transfer` and `send`.

Example: 

```solidity
address payable owner = address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
```

The idea behind this distinction is that `address payable` is an `address` you can send `Ether` to, while a plain address **cannot** be sent Ether.

Implicit conversions from address payable to address are allowed, whereas conversions from address to address payable must be explicit via payable(address).

* `address.balance` returns `uint256`, balance of the Address in Wei 
* `address.code` returns `(bytes memory)` code at the Address (can be empty)
* `address.codehash` returns `(bytes32)` the codehash of the Address
* `<address payable>.transfer(uint256 amount)` sends given amount of Wei to Address, reverts on failure, forwards 2300 gas stipend, not adjustable.
* `<address payable>.send(uint256 amount)` returns `(bool)` and sends given amount of Wei to Address, returns false on failure, forwards 2300 gas stipend, not adjustable
* `address.call(bytes memory)` returns `(bool, bytes memory)` and issues low-level `CALL` with the given payload, returns success condition and return data, forwards all available gas, adjustable
* `address.delegatecall(bytes memory)` returns `(bool, bytes memory)` and issues low-level `DELEGATECALL` with the given payload, returns success condition and return data, forwards all available gas, adjustable
* `address.staticcall(bytes memory)` returns `(bool, bytes memory)` issue low-level STATICCALL with the given payload, returns success condition and return data, forwards all available gas, adjustable

In order to interface with contracts that do not adhere to the ABI, or to get more direct control over the encoding, the functions `call`, `delegatecall` and `staticcall` are provided. They all take a single `bytes memory` parameter and return the success condition (as a `bool`) and the returned data (`bytes memory`). The functions `abi.encode`, `abi.encodePacked`, `abi.encodeWithSelector` and `abi.encodeWithSignature` can be used to encode structured data.

For example, if you want to call the function `register(string)` in contract `nameReg`, the call looks like:
```solidity showLineNumbers
address nameReg = address(0x9cc6334f1a7bc20c9dde91db536e194865af0067);
bytes memory payload = abi.encodeWithSignature("register(string)", "Chai");
(bool success, bytes memory returnData) = nameReg.call(payload);
require(success);
```

It is possible to adjust the supplied `gas` with the `gas` modifier:

```solidity showLineNumbers
nameReg.call{gas: 1000000}(abi.encodeWithSignature("register(string)", "MyName"));
```

Similarly, the supplied Ether value can be controlled too:

```solidity showLineNumbers
address(nameReg).call{value: 1 ether}(abi.encodeWithSignature("register(string)", "MyName"));
```

Since byzantium `staticcall` can be used as well. This is basically the same as call, but will revert if the called function modifies the state in any way.

:::danger delegatecall
- The function `delegatecall` can be used similar to `call`: the main difference is that only the code of the given `address` is used, all other aspects (`storage`, `balance`, …) are taken from the `current` `contract`. 
- The purpose of `delegatecall` is to use `library` code which is stored in another contract. 
- The user has to ensure that the layout of storage in both contracts is suitable for `delegatecall` to be used.
:::

All contracts can be converted to `address` type, so it is possible to query the balance of the current contract using `address(this).balance`.

### Contract Types
Every `contract` defines its own type. You can implicitly convert contracts to contracts they inherit from. Contracts can be explicitly converted to and from the address type.

### Bytes & Strings
The value types `bytes1`, `bytes2`, `bytes3`, …, `bytes32` hold a sequence of bytes from `one` to up to `32`. These are Fixed-size byte arrays.

Dynamically-sized byte array:
* bytes: Dynamically-sized byte array, see [Arrays](https://docs.soliditylang.org/en/v0.8.9/types.html#arrays). Not a value-type!
* string: Dynamically-sized UTF-8-encoded string, see [Arrays](https://docs.soliditylang.org/en/v0.8.9/types.html#arrays). Not a value-type!

- Arrays can have a compile-time fixed size, or they can have a dynamic size.
- `string` is equal to `bytes` but does not allow length or index access.
- You can also compare two strings by their `keccak256`-hash using `keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked(s2))`
- You can concatenate two strings using `bytes.concat(bytes(s1), bytes(s2))`

### Mapping Types
- Mapping types use the syntax `mapping(_KeyType => _ValueType)` 
- Variables of mapping type are declared using the syntax `mapping(_KeyType => _ValueType) _VariableName;`
- The `_KeyType` can be any built-in value type, `bytes`, `string`, or any `contract` or `enum` type. Other user-defined or complex types, such as mappings, structs or array types are not allowed. 
- `_ValueType` can be `any` type, including `mappings`, `arrays` and `structs`.
```solidity showLineNumbers
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract MappingExample {

    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }

    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        _transfer(sender, recipient, amount);
        approve(sender, msg.sender, amount);
        return true;
    }

    function approve(address owner, address spender, uint256 amount) public returns (bool) {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
        return true;
    }

    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _balances[sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }
}
```

- You cannot iterate over mappings, i.e. you cannot enumerate their keys.
- It is possible, though, to implement a data structure on top of them and iterate over that.

```solidity showLineNumbers
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.8 <0.9.0;

struct IndexValue { uint keyIndex; uint value; }
struct KeyFlag { uint key; bool deleted; }

struct itmap {
    mapping(uint => IndexValue) data;
    KeyFlag[] keys;
    uint size;
}

library IterableMapping {
    function insert(itmap storage self, uint key, uint value) internal returns (bool replaced) {
        uint keyIndex = self.data[key].keyIndex;
        self.data[key].value = value;
        if (keyIndex > 0)
            return true;
        else {
            keyIndex = self.keys.length;
            self.keys.push();
            self.data[key].keyIndex = keyIndex + 1;
            self.keys[keyIndex].key = key;
            self.size++;
            return false;
        }
    }

    function remove(itmap storage self, uint key) internal returns (bool success) {
        uint keyIndex = self.data[key].keyIndex;
        if (keyIndex == 0)
            return false;
        delete self.data[key];
        self.keys[keyIndex - 1].deleted = true;
        self.size --;
    }

    function contains(itmap storage self, uint key) internal view returns (bool) {
        return self.data[key].keyIndex > 0;
    }

    function iterate_start(itmap storage self) internal view returns (uint keyIndex) {
        return iterate_next(self, type(uint).max);
    }

    function iterate_valid(itmap storage self, uint keyIndex) internal view returns (bool) {
        return keyIndex < self.keys.length;
    }

    function iterate_next(itmap storage self, uint keyIndex) internal view returns (uint r_keyIndex) {
        keyIndex++;
        while (keyIndex < self.keys.length && self.keys[keyIndex].deleted)
            keyIndex++;
        return keyIndex;
    }

    function iterate_get(itmap storage self, uint keyIndex) internal view returns (uint key, uint value) {
        key = self.keys[keyIndex].key;
        value = self.data[key].value;
    }
}

// How to use it
contract User {
    // Just a struct holding our data.
    itmap data;
    // Apply library functions to the data type.
    using IterableMapping for itmap;

    // Insert something
    function insert(uint k, uint v) public returns (uint size) {
        // This calls IterableMapping.insert(data, k, v)
        data.insert(k, v);
        // We can still access members of the struct,
        // but we should take care not to mess with them.
        return data.size;
    }

    // Computes the sum of all stored data.
    function sum() public view returns (uint s) {
        for (
            uint i = data.iterate_start();
            data.iterate_valid(i);
            i = data.iterate_next(i)
        ) {
            (, uint value) = data.iterate_get(i);
            s += value;
        }
    }
}
```

### Block and Transaction Properties

- ``blockhash(uint blockNumber) returns (bytes32)``: hash of the given block when ``blocknumber`` is one of the 256 most recent blocks; otherwise returns zero
- ``block.basefee`` (``uint``): current block's base fee (`EIP-3198 <https://eips.ethereum.org/EIPS/eip-3198>`_ and `EIP-1559 <https://eips.ethereum.org/EIPS/eip-1559>`_)
- ``block.chainid`` (``uint``): current chain id
- ``block.coinbase`` (``address payable``): current block miner's address
- ``block.difficulty`` (``uint``): current block difficulty
- ``block.gaslimit`` (``uint``): current block gaslimit
- ``block.number`` (``uint``): current block number
- ``block.timestamp`` (``uint``): current block timestamp as seconds since unix epoch
- ``gasleft() returns (uint256)``: remaining gas
- ``msg.data`` (``bytes calldata``): complete calldata
- ``msg.sender`` (``address``): sender of the message (current call)
- ``msg.sig`` (``bytes4``): first four bytes of the calldata (i.e. function identifier)
- ``msg.value`` (``uint``): number of wei sent with the message
- ``tx.gasprice`` (``uint``): gas price of the transaction
- ``tx.origin`` (``address``): sender of the transaction (full call chain)


#### OpenZepplin AccessControl Contract
```solidity showLineNumbers
// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (access/AccessControl.sol)

pragma solidity ^0.8.0;

import "./IAccessControl.sol";
import "../utils/Context.sol";
import "../utils/Strings.sol";
import "../utils/introspection/ERC165.sol";

/**
 * @dev Contract module that allows children to implement role-based access
 * control mechanisms. This is a lightweight version that doesn't allow enumerating role
 * members except through off-chain means by accessing the contract event logs. Some
 * applications may benefit from on-chain enumerability, for those cases see
 * {AccessControlEnumerable}.
 *
 * Roles are referred to by their `bytes32` identifier. These should be exposed
 * in the external API and be unique. The best way to achieve this is by
 * using `public constant` hash digests:
 *
 * ```
 * bytes32 public constant MY_ROLE = keccak256("MY_ROLE");
 * ```
 *
 * Roles can be used to represent a set of permissions. To restrict access to a
 * function call, use {hasRole}:
 *
 * ```
 * function foo() public {
 *     require(hasRole(MY_ROLE, msg.sender));
 *     ...
 * }
 * ```
 *
 * Roles can be granted and revoked dynamically via the {grantRole} and
 * {revokeRole} functions. Each role has an associated admin role, and only
 * accounts that have a role's admin role can call {grantRole} and {revokeRole}.
 *
 * By default, the admin role for all roles is `DEFAULT_ADMIN_ROLE`, which means
 * that only accounts with this role will be able to grant or revoke other
 * roles. More complex role relationships can be created by using
 * {_setRoleAdmin}.
 *
 * WARNING: The `DEFAULT_ADMIN_ROLE` is also its own admin: it has permission to
 * grant and revoke this role. Extra precautions should be taken to secure
 * accounts that have been granted it.
 */
abstract contract AccessControl is Context, IAccessControl, ERC165 {
    struct RoleData {
        mapping(address => bool) members;
        bytes32 adminRole;
    }

    mapping(bytes32 => RoleData) private _roles;

    bytes32 public constant DEFAULT_ADMIN_ROLE = 0x00;

    /**
     * @dev Modifier that checks that an account has a specific role. Reverts
     * with a standardized message including the required role.
     *
     * The format of the revert reason is given by the following regular expression:
     *
     *  /^AccessControl: account (0x[0-9a-f]{40}) is missing role (0x[0-9a-f]{64})$/
     *
     * _Available since v4.1._
     */
    modifier onlyRole(bytes32 role) {
        _checkRole(role);
        _;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IAccessControl).interfaceId || super.supportsInterface(interfaceId);
    }

    /**
     * @dev Returns `true` if `account` has been granted `role`.
     */
    function hasRole(bytes32 role, address account) public view virtual override returns (bool) {
        return _roles[role].members[account];
    }

    /**
     * @dev Revert with a standard message if `_msgSender()` is missing `role`.
     * Overriding this function changes the behavior of the {onlyRole} modifier.
     *
     * Format of the revert message is described in {_checkRole}.
     *
     * _Available since v4.6._
     */
    function _checkRole(bytes32 role) internal view virtual {
        _checkRole(role, _msgSender());
    }

    /**
     * @dev Revert with a standard message if `account` is missing `role`.
     *
     * The format of the revert reason is given by the following regular expression:
     *
     *  /^AccessControl: account (0x[0-9a-f]{40}) is missing role (0x[0-9a-f]{64})$/
     */
    function _checkRole(bytes32 role, address account) internal view virtual {
        if (!hasRole(role, account)) {
            revert(
                string(
                    abi.encodePacked(
                        "AccessControl: account ",
                        Strings.toHexString(account),
                        " is missing role ",
                        Strings.toHexString(uint256(role), 32)
                    )
                )
            );
        }
    }

    /**
     * @dev Returns the admin role that controls `role`. See {grantRole} and
     * {revokeRole}.
     *
     * To change a role's admin, use {_setRoleAdmin}.
     */
    function getRoleAdmin(bytes32 role) public view virtual override returns (bytes32) {
        return _roles[role].adminRole;
    }

    /**
     * @dev Grants `role` to `account`.
     *
     * If `account` had not been already granted `role`, emits a {RoleGranted}
     * event.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     *
     * May emit a {RoleGranted} event.
     */
    function grantRole(bytes32 role, address account) public virtual override onlyRole(getRoleAdmin(role)) {
        _grantRole(role, account);
    }

    /**
     * @dev Revokes `role` from `account`.
     *
     * If `account` had been granted `role`, emits a {RoleRevoked} event.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     *
     * May emit a {RoleRevoked} event.
     */
    function revokeRole(bytes32 role, address account) public virtual override onlyRole(getRoleAdmin(role)) {
        _revokeRole(role, account);
    }

    /**
     * @dev Revokes `role` from the calling account.
     *
     * Roles are often managed via {grantRole} and {revokeRole}: this function's
     * purpose is to provide a mechanism for accounts to lose their privileges
     * if they are compromised (such as when a trusted device is misplaced).
     *
     * If the calling account had been revoked `role`, emits a {RoleRevoked}
     * event.
     *
     * Requirements:
     *
     * - the caller must be `account`.
     *
     * May emit a {RoleRevoked} event.
     */
    function renounceRole(bytes32 role, address account) public virtual override {
        require(account == _msgSender(), "AccessControl: can only renounce roles for self");

        _revokeRole(role, account);
    }

    /**
     * @dev Grants `role` to `account`.
     *
     * If `account` had not been already granted `role`, emits a {RoleGranted}
     * event. Note that unlike {grantRole}, this function doesn't perform any
     * checks on the calling account.
     *
     * May emit a {RoleGranted} event.
     *
     * [WARNING]
     * ====
     * This function should only be called from the constructor when setting
     * up the initial roles for the system.
     *
     * Using this function in any other way is effectively circumventing the admin
     * system imposed by {AccessControl}.
     * ====
     *
     * NOTE: This function is deprecated in favor of {_grantRole}.
     */
    function _setupRole(bytes32 role, address account) internal virtual {
        _grantRole(role, account);
    }

    /**
     * @dev Sets `adminRole` as ``role``'s admin role.
     *
     * Emits a {RoleAdminChanged} event.
     */
    function _setRoleAdmin(bytes32 role, bytes32 adminRole) internal virtual {
        bytes32 previousAdminRole = getRoleAdmin(role);
        _roles[role].adminRole = adminRole;
        emit RoleAdminChanged(role, previousAdminRole, adminRole);
    }

    /**
     * @dev Grants `role` to `account`.
     *
     * Internal function without access restriction.
     *
     * May emit a {RoleGranted} event.
     */
    function _grantRole(bytes32 role, address account) internal virtual {
        if (!hasRole(role, account)) {
            _roles[role].members[account] = true;
            emit RoleGranted(role, account, _msgSender());
        }
    }

    /**
     * @dev Revokes `role` from `account`.
     *
     * Internal function without access restriction.
     *
     * May emit a {RoleRevoked} event.
     */
    function _revokeRole(bytes32 role, address account) internal virtual {
        if (hasRole(role, account)) {
            _roles[role].members[account] = false;
            emit RoleRevoked(role, account, _msgSender());
        }
    }
}
```


## References

- https://consensys.github.io/smart-contract-best-practices/development-recommendations/
- https://docs.soliditylang.org/en/v0.8.9/
- https://docs.soliditylang.org/en/v0.8.9/natspec-format.html
- https://secureum.substack.com/p/solidity-101
- https://solidity-by-example.org/
- https://www.youtube.com/channel/UCJWh7F3AFyQ_x01VKzr9eyA
- https://github.com/ethdebug/solidity-data-representation/blob/master/src/types.md
- [Foundry cheat-codes](https://github.com/foundry-rs/foundry/blob/master/forge/README.md#cheat-codes)