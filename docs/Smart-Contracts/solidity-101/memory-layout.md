---
sidebar_position: 2
title: Layout of State Variables in Storage
hide_title: true
---

## Layout of State Variables in Storage

Every smart contract running in the Ethereum Virtual Machine (EVM) maintains state in its own permanent `storage`. You can picture the storage as a very large array. Smart contract storage have 2^256 32bytes slots.

- Data is stored contiguously item after item starting with the first state variable, which is stored in slot `0`. 
- For each variable, a size in bytes is determined according to its type. 
- If two consecutive variable can fit in one slot they are packed together from right to left.

![storage](/img/storage.png)

### Locating Fixed-Sized Values
Variables with known fixed sizes just use reserved locations in storage. These slots are determined at `compile` time, strictly based on the order in which the variables appear in the contract code.

```solidity showLineNumbers
contract StorageTest {
    uint256 a;
    uint256[2] b;

    struct Entry {
        uint256 id;
        uint256 value;
    }
    Entry c;
}
```

In the above code:
* a is stored at slot 0.
* b is stored at slots 1, and 2 (one for each element of the array).
* c starts at slot 3 and consumes two slots, because the Entry struct stores two 32-byte values.

![storage fixed](/img/storage-fixed.png)

### Locating Dynamically-Sized Values
Using reserved slots works well for fixed-size state variables, but it doesn’t work for dynamically-sized arrays and mappings because there’s no way of knowing how many slots to reserve.

Due to the shere amount of locations available, 2^256 slots, we can choose storage locations at random without ever experiencing a collision. Solidity uses a hash function to uniformly and repeatably compute locations for dynamically-sized values.


A dynamically-sized array needs a place to store its size as well as its elements.

```sol showLineNumbers
contract StorageTest {
    uint256 a;     // slot 0
    uint256[2] b;  // slots 1-2

    struct Entry {
        uint256 id;
        uint256 value;
    }
    Entry c;       // slots 3-4
    Entry[] d;
}
```

In the above code, the dynamically-sized array `d` is at slot 5, but the only thing that’s stored there is the size of `d`. The values in the array are stored consecutively starting at the `hash` (`keccak256` hash function) of the slot.

![storage dynamic](/img/storage-dynamic.png)

The following Solidity function computes the location of an element of a dynamically-sized array:
```sol showLineNumbers
function arrLocation(uint256 slot, uint256 index, uint256 elementSize)
    public
    pure
    returns (uint256)
{
    return uint256(keccak256(slot)) + (index * elementSize);
}
```

### Mappings
```sol showLineNumbers
contract StorageTest {
    uint256 a;     // slot 0
    uint256[2] b;  // slots 1-2

    struct Entry {
        uint256 id;
        uint256 value;
    }
    Entry c;       // slots 3-4
    Entry[] d;     // slot 5 for length, keccak256(5)+ for data

    mapping(uint256 => uint256) e;
    mapping(uint256 => uint256) f;
}
```

In the above code, the location for `e` is slot 6, and the location for `f` is slot 7, but `nothing` is actually stored at those locations. There is no length to be stored.

To find the location of a specific value within a mapping, the `key` and the `mapping's` slot are `hashed` together.

The following Solidity function computes the location of a value:

```sol showLineNumbers
function mapLocation(uint256 slot, uint256 key) public pure returns (uint256) {
    return uint256(keccak256(key, slot));
}
```

![Storage mapping](/img/storage-mapping.png)

### Combinations of Complex Types
Dynamically-sized `arrays` and `mappings` can be nested within each other recursively. When that happens, the location of a value is found by recursively applying the calculations defined above.

```sol showLineNumbers
contract StorageTest {
    uint256 a;     // slot 0
    uint256[2] b;  // slots 1-2

    struct Entry {
        uint256 id;
        uint256 value;
    }
    Entry c;       // slots 3-4
    Entry[] d;     // slot 5 for length, keccak256(5)+ for data

    mapping(uint256 => uint256) e;    // slot 6, data at h(k . 6)
    mapping(uint256 => uint256) f;    // slot 7, data at h(k . 7)

    mapping(uint256 => uint256[]) g;  // slot 8
    mapping(uint256 => uint256)[] h;  // slot 9
}
```

To find items within these complex types, we can use the functions defined above. 

To find g[123][0]:
```sol
// first find arr = g[123]
arrLoc = mapLocation(8, 123);  // g is at slot 8

// then find arr[0]
itemLoc = arrLocation(arrLoc, 0, 1);
```

To find h[2][456]:
```sol
// first find map = h[2]
mapLoc = arrLocation(9, 2, 1);  // h is at slot 9

// then find map[456]
itemLoc = mapLocation(mapLoc, 456);
```

You can use `cast` command that comes with foundry to inspect the storage of a contract:

```sh
cast storage  -r https://eth-rpc.gateway.pokt.network 0x6D2299C48a8dD07a872FDd0F8233924872Ad1071 1
cast storage  -r https://eth-rpc.gateway.pokt.network 0x6D2299C48a8dD07a872FDd0F8233924872Ad1071 0x0758364a4f55624097844647de7675b993ad2ed16003efa84065140c0c0b48ae
```

![cast storage dump](/img/cast-storage-dump.png)

Dedaub provides an awesome toolkit to check the storage of a contract.
Example: https://library.dedaub.com/contracts/Ethereum/6D2299C48A8DD07A872FDD0F8233924872AD1071/storage-dump

![Dedaub Library](/img/dedaub-storage-dump.png)


## Inheritance
In a contract that inherits, the assignment works as follows: 
- first, the slots are allocated to the inherited variables, from the leftmost contract to the rightmost
- finishing with the current contract.

```sol showLineNumbers
contract Hello {
    string public hello = "Hello!";
}

contract World {
    string public world = "World!";
}

contract HelloWorld is Hello, World {
    string private greet = "Hello World!";

    function getGreeting() public view returns(string memory) {
        return greet;
    }

    function getHello() public view returns(string memory) {
        return hello;
    }

    function getWorld() public view returns(string memory) {
        return world;
    }
}
```

- `hello` gets assigned slot `0`
- `world` gets assigned slot `1`
- `greet` gets assigned slot `2`

## delegatecall
:::danger delegatecall recap
- The function `delegatecall` can be used similar to `call`: the main difference is that only the code of the given `address` is used, all other aspects (`storage`, `balance`, …) are taken from the `current` `contract`. 
- The purpose of `delegatecall` is to use `library` code which is stored in another contract. 
- The user has to ensure that the layout of storage in both contracts is suitable for `delegatecall` to be used.
:::

Challenge:

```sol title=library.sol showLineNumbers
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

// Simple library contract to set the time
contract LibraryContract {

  // stores a timestamp 
  uint storedTime;  

  function setTime(uint _time) public {
    storedTime = _time;
  }
}
```

```sol showLineNumbers title=Preservation.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Preservation {

  // public library contracts 
  address public timeZone1Library;
  address public timeZone2Library;
  address public owner; 
  uint storedTime;
  // Sets the function signature for delegatecall
  bytes4 constant setTimeSignature = bytes4(keccak256("setTime(uint256)"));

  constructor(address _timeZone1LibraryAddress, address _timeZone2LibraryAddress) public {
    timeZone1Library = _timeZone1LibraryAddress; 
    timeZone2Library = _timeZone2LibraryAddress; 
    owner = msg.sender;
  }
 
  // set the time for timezone 1
  function setFirstTime(uint _timeStamp) public {
    timeZone1Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));
  }

  // set the time for timezone 2
  function setSecondTime(uint _timeStamp) public {
    timeZone2Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));
  }
}
```

Memory layout of Preservation:
- `slot0` : timeZone1Library
- `slot1` : timeZone2Library
- `slot2` : owner
- `slot3` : storedTime

Exploit: Overwrite `timeZone1Library` variable with our own `Exploit` contract address; and call `setTime` on our Exploit contract address, that just modifies `owner` variable

Excercise: Try to solve the following Ethernaut challenges:
- https://ethernaut.openzeppelin.com/level/0xf94b476063B6379A3c8b6C836efB8B3e10eDe188
- https://ethernaut.openzeppelin.com/level/0x11343d543778213221516D004ED82C45C3c8788B
- https://ethernaut.openzeppelin.com/level/0x97E982a15FbB1C28F6B8ee971BEc15C78b3d263F



### Table of direct types

| Type                     | Size in storage (bytes)                     | Padding in padded locations         | Default value                             | Is key type? | Allowed in calldata? | Allowed as immutable? |
|--------------------------|---------------------------------------------|-------------------------------------|-------------------------------------------|--------------|----------------------|-----------------------|
| `bool`                   | 1                                           | Zero padded, left                   | `false`                                   | Yes          | Yes                  | Yes                   |
| `uintN`                  | N/8                                         | Zero-padded, left\*                 | 0                                         | Yes          | Yes                  | Yes                   |
| `intN`                   | N/8                                         | Sign-padded, left\*                 | 0                                         | Yes          | Yes                  | Yes                   |
| `address [payable]`      | 20                                          | Zero-padded, left\*                 | Zero address (not valid!)                 | Yes          | Yes                  | Yes                   |
| `contract` types         | 20                                          | Zero-padded, left\*                 | Zero address (not valid!)                 | Yes          | Yes                  | Yes                   |
| `bytesN`                 | N                                           | Zero-padded, right\*                | All zeroes                                | Yes          | Yes                  | Yes                   |
| `enum` types             | As many as needed to hold all possibilities | Zero-padded, left                   | Whichever possibility is represented by 0 | Yes          | Yes                  | Yes                   |
| `function internal`      | 8                                           | Zero-padded, left                   | Depends on location, but always invalid   | No           | No                   | Yes                   |
| `function external`      | 24                                          | Zero-padded, right, except on stack | Zero address, zero selector (not valid!)  | No           | Yes                  | No                    |
| `ufixedMxN`              | M/8                                         | Zero-padded, left\*                 | 0                                         | Yes          | Yes                  | Yes                   |
| `fixedMxN`               | M/8                                         | Sign-padded, left\*                 | 0                                         | Yes          | Yes                  | Yes                   |
| User-defined value types | Same as underlying type (except in 0.8.8)   | Same as underlying type\*           | Same as underlying type                   | Yes          | Yes                  | Yes                   |



## References

- [Layout of State Variables in Storage](https://docs.soliditylang.org/en/v0.8.16/internals/layout_in_storage.html)
- [NESTED_ARRAYS_NOT_IMPLEMENTED](https://github.com/willitscale/learning-solidity/blob/master/support/NESTED_ARRAYS_NOT_IMPLEMENTED.MD)
- [Understanding Ethereum Smart Contract Storage](https://programtheblockchain.com/posts/2018/03/09/understanding-ethereum-smart-contract-storage/)
- [Data Representation in Solidity](https://ethdebug.github.io/solidity-data-representation/)