---
sidebar_position: 2
title: The Smart Contract Lifecycle
hide_title: true
---

## Smart Contract Lifecycle 🌴🚲
![Life Cycle of Smart Contract Development](/img/quillhash-lifecycle.gif)

## Design Patterns
:::note DESIGN PATTERN
Design patterns are reusable, conventional solutions used to solve reoccurring design flaws.
:::

### Behavioral patterns
* [Guard check](#guard-check)
* [State machine](#state-machine)
* [Oracle](#oracle)
* [Randomness](#randomness)

### Security patterns
* [Access restriction](#access-restriction)
* [Checks Effects Interactions](#checks-effects-interactions)
* [Secure Ether transfer](#secure-ether-transfer)
* [Pull-over-push](#pull-over-push)
* [Emergency stop](#emergency-stop)

### Upgradeability patterns
* [Proxy delegate](#proxy-delegate)
* [Eternal storage](#eternal-storage)
* [Memory array building](#memory-array-building)

## Behavioral Patterns
### Guard Check
:::info Intent
Ensure that the behavior of a smart contract and its input parameters are as expected.
:::

```solidity showLineNumbers
contract Contribution {
  function contribute (address _from) payable public {
    //NOTE: requires msg.value to be not 0.
    require(msg.value != 0);

    //NOTE: requires that the sender or _from address be not 0.
    require(_from != address(0));

    unit prevBalance = this.balance;
    unit amount;

    if(_from.balance == 0) {
      amount = msg.value;
    } 
    else if (_from.balance < msg.sender.balance) {
      amount = msg.value / 2;
    } 
    else {
    //NOTE: revert throws an exception
      revert("Insufficent Balance!!!");
    }

    _from.transfer(amount);

    //assert 
    assert(this.balance == prevBalance - amount);
  }
}
```

Solidity uses `state-reverting` exceptions to handle errors. These exceptions undo all the changes made to the state in the current function call and sub-calls and flags an error to the caller.

Some exceptions in a sub-call are rethrown automatically unless they are caught in a `try/catch` statement.
Exceptions to this rule are:
* **send**
* **call**
* **delegatecall**
* **staticcall**

The above functions return `false` as their first return value in case of exception instead of throwing an error.

:::info revert
- A direct revert can be triggered using the `revert` statement and the `revert` function.
- The `revert` statement takes a custom error as direct argument without parentheses: `revert CustomError(arg1, arg2)`
- The `revert()` function, which uses parentheses and accepts a string: `revert();` or `revert("description");`
:::

:::info assert
`assert()` :
- evaluates the conditions for a function
- throws an exception, reverts the contract to previous state
- consumes the gas supply if the requirements fail after execution
- assert should only be used to test for internal errors and to check invariants
:::

:::info require
- `require()` is used to declare the conditions under which a function executes.
- It takes a condition as an argument and throws an exception if the condition evaluates to `false`
- It terminates the function's execution in case of `false` without burning any gas.
- It is currently not possible to use custom errors in combination with require
:::

### State Machine
:::info Intent
Enable a contract to go through different stages with different corresponding functionality exposed.
:::

- The state machine pattern simulates the behavior of a system based on its previous and current inputs. 
- This pattern is used to breakdown larger problems into simple stages, which are later used to control the execution flow.


This sample contract showcases the state machine for a blind auction and is inspired by the example code provided in the [Solidity documentation](https://docs.soliditylang.org/en/v0.4.21/common-patterns.html#state-machine).

```solidity showLineNumbers
// This code has not been professionally audited, therefore I cannot make any promises about
// safety or correctness. Use at own risk.
contract StateMachine {
    
    enum Stages {
        AcceptingBlindBids,
        RevealBids,
        WinnerDetermined,
        Finished
    }

    Stages public stage = Stages.AcceptingBlindBids;

    uint public creationTime = now;

    modifier atStage(Stages _stage) {
        require(stage == _stage);
        _;
    }
    
    modifier transitionAfter() {
        _;
        nextStage();
    }
    
    modifier timedTransitions() {
        if (stage == Stages.AcceptingBlindBids && now >= creationTime + 6 days) {
            nextStage();
        }
        if (stage == Stages.RevealBids && now >= creationTime + 10 days) {
            nextStage();
        }
        _;
    }

    function bid() public payable timedTransitions atStage(Stages.AcceptingBlindBids) {
        // Implement biding here
    }

    function reveal() public timedTransitions atStage(Stages.RevealBids) {
        // Implement reveal of bids here
    }

    function claimGoods() public timedTransitions atStage(Stages.WinnerDetermined) transitionAfter {
        // Implement handling of goods here
    }

    function cleanup() public atStage(Stages.Finished) {
        // Implement cleanup of auction here
    }
    
    function nextStage() internal {
        stage = Stages(uint(stage) + 1);
    }
}
```

If the current state of the contract is not `AcceptingDeposit`, users can not deposit to the contract, and if the current state is not `ReleasingDeposit`, users can not withdraw from the contract.

### Oracle
:::info Intent
Gain access to data stored outside of the blockchain.
:::

Blockchains have their own ecosystem and do not have access to data outside the blockchain network. Smart contracts can only import external data via a transaction. 

`Oracles` solve this problem by connecting to the outside world. When an `oracle` service and a smart contract communicate asynchronously, the `oracle` service serves as an API. For example, there's a smart contract that has to fetch the current stock price of `Tesla`, it has to talk with an Oracle, that fetches the stock price from real world.

Oracles are currently run by some trusted parties. This kinda breaks the decentralization.😕


```solidity showLineNumbers
// This code has not been professionally audited, therefore I cannot make any promises about
// safety or correctness. Use at own risk.
import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";

contract OracleExample is usingOraclize {

    string public EURUSD;

    function updatePrice() public payable {
        if (oraclize_getPrice("URL") > this.balance) {
            //Handle out of funds error
        } else {
            oraclize_query("URL", "json(http://api.fixer.io/latest?symbols=USD).rates.USD");
        }
    }
    
    function __callback(bytes32 myid, string result) public {
        require(msg.sender == oraclize_cbAddress());
        EURUSD = result;
    }
}
```

### Randomness
:::info Intent
Generate a random number of a predefined interval in the deterministic environment of a blockchain.
:::

- The problem with randomness in Ethereum is that Ethereum is a deterministic Turing machine, with no inherent randomness involved.
- A majority of miners have to obtain the same result when evaluating a transaction to reach consensus. 

#### Flaws
- One of the first sources of randomness in Ethereum that came to mind were block timestamps.
- The problem with block timestamps is, that they can be influenced by the miner, as long as the timestamp is not older than its parent block. 
- Block timestamps, block hashes, block numbers can all be either influenced or guessed.

```solidity showLineNumbers
// Randomness provided by this is predicatable. Use with care!
function randomNumber() internal view returns (uint) {
    return uint(blockhash(block.number - 1));
}
```
- block.number is a variable available to everyone on the blockchain.
- A user could use the `block.number` as input.

#### Workarounds
- **Block hash PRNG** - the hash of a block as source of randomness
- **Oracle RNG** - randomness provided by an oracle, see Oracle pattern
- **Collaborative PRNG** - collaborative generation of a random number within the blockchain

```solidity showLineNumbers 
// This code has not been professionally audited, therefore I cannot make any promises about
// safety or correctness. Use at own risk.
contract Randomness {

    bytes32 sealedSeed;
    bool seedSet = false;
    bool betsClosed = false;
    uint storedBlockNumber;

    // a trused party hardcoded by the contract developer
    address trustedParty = 0xdCad3a6d3569DF655070DEd06cb7A1b2Ccd1D3AF;

    // The seed is set by the trusted party, and only by the trusted party, by calling `setSealedSeed(bytes32 _sealedSeed)`.
    function setSealedSeed(bytes32 _sealedSeed) public {
        require(!seedSet);
        require (msg.sender == trustedParty);
        betsClosed = true;
        sealedSeed = _sealedSeed;
        storedBlockNumber = block.number + 1;
        seedSet = true;
    }

    //Users can make their bets by calling the function bet(). 
    function bet() public {
        require(!betsClosed);
        // Make bets here
    }

    function reveal(bytes32 _seed) public {
        require(seedSet);
        require(betMade);
        require(storedBlockNumber < block.number);
        require(keccak256(msg.sender, _seed) == sealedSeed);
        uint random = uint(keccak256(_seed, blockhash(storedBlockNumber)));
        // Insert logic for usage of random number here;
        seedSet = false;
        betsClosed = false;
    }
}
```
## Security patterns
### Access Restriction
:::info Intent
Restrict the access to contract functionality according to suitable criteria.
:::

Use the Access Restriction pattern when:
* your contract functions should only be callable under certain circumstances.
* you want to apply similar restrictions to several functions.
* you want to increase security of your smart contract against unauthorized access.

```solidity showLineNumbers
// This code has not been professionally audited, therefore I cannot make any promises about
// safety or correctness. Use at own risk.
pragma solidity ^0.4.21;

contract AccessRestriction {

    address public owner = msg.sender;
    uint public lastOwnerChange = now;
    
    modifier onlyBy(address _account) {
        require(msg.sender == _account);
        _;
    }
    
    modifier onlyAfter(uint _time) {
        require(now >= _time);
        _;
    }
    
    modifier costs(uint _amount) {
        require(msg.value >= _amount);
        _;
        if (msg.value > _amount) {
            msg.sender.transfer(msg.value - _amount);
        }
    }
    
    function changeOwner(address _newOwner) public onlyBy(owner) {
        owner = _newOwner;
    }
    
    function buyContract() public payable onlyAfter(lastOwnerChange + 4 weeks) costs(1 ether) {
        owner = msg.sender;
        lastOwnerChange = now;
    }
}
```

### Checks Effects Interactions
:::info Intent
Reduce the attack surface for malicious contracts trying to hijack control flow after an external call.
:::

A possible attack vector is a re-entrancy attack, in which the malicious contract is reentering the initial contract, before the first instance of the function containing the call is finished. 

Use the Checks Effects Interactions pattern when:
- it cannot be avoided to hand over control flow to an external entity.
- you want to guard your functions against re-entrancy attacks.

```solidity showLineNumbers
// This code has not been professionally audited, therefore I cannot make any promises about
// safety or correctness. Use at own risk.
contract ChecksEffectsInteractions {

    mapping(address => uint) balances;

    function deposit() public payable {
        balances[msg.sender] = msg.value;
    }

    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount);

        balances[msg.sender] -= amount;

        msg.sender.transfer(amount);
    }
}
```

### Secure Ether Transfer
:::info 
Secure transfer of ether from a contract to another address.
:::

Use the Secure Ether Transfer pattern when:
- you want to transfer ether from a contract address to another address in a secure way.
- you are not sure which method of ether transfer is the most suitable for your needs.
- you want to guard your contract against re-entrancy attacks.

|Funtion|Amount of Gas Forwarded	|Exception Propagation|
|---	|---	|---		|
|send|2300 (not adjustable)	|`false` on failure|
|call.value|all remaining gas (adjustable)|`false` on failure|
|transfer|2300 (not adjustable)|`throws` on failure|

```solidity showLineNumbers
// This code has not been professionally audited, therefore I cannot make any promises about
// safety or correctness. Use at own risk.
contract EtherReceiver {
    function () public payable {}
}

contract EtherSender {

    EtherReceiver private receiverAdr = new EtherReceiver();

    function sendEther(uint _amount) public payable {
        //transfer forwards exactly 2,300 gas
        if (!address(receiverAdr).send(_amount)) {
            //handle failed send
        }
    }

    function callValueEther(uint _amount) public payable {
        // for call() the return value needs to be verified
        require(address(receiverAdr).call.value(_amount).gas(35000)());
    }

    function transferEther(uint _amount) public payable {
       //transfer forwards exactly 2,300 gas
        address(receiverAdr).transfer(_amount);
    }
}
```

### Pull over Push: 
:::info Intent
Shift the risk associated with transferring ether to the user.
:::

:::danger
Never trust external calls to execute without throwing an error.
:::

Use the Pull over Push pattern when:
* you want to handle multiple ether transfers with one function call.
* you want to avoid taking the risk associated with ether transfers.
* there is an incentive for your users to handle ether withdrawal on their own.

#### Problem
```solidity showLineNumbers
// THis code contains deliberate errors. Do not use.
contract BadAuction {

    address highestBidder;
    uint highestBid;

    function bid() public payable {
        require(msg.value >= highestBid);

        if (highestBidder != 0) {
            // if highestBidder is a contract; the fallback function gets triggered on transfer
            // What if the fallback function of highestBidder just `reverts`?
            highestBidder.transfer(highestBid); 
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
    }
}
```

#### Possible Solution 
```solidity showLineNumbers
// This code has not been professionally audited, therefore I cannot make any promises about
// safety or correctness. Use at own risk.
contract PullOverPush {

    uint highestBid;
    address highestBidder;
    mapping(address => uint) bids;

    function bid() public payable {
        require(msg.value >= highestBid);
        bids[msg.sender] = msg.value;
        highestBidder = msg.sender;
    }

    function withdrawBids() public {
        require(msg.sender != highestBidder);

        uint amount = credits[msg.sender];

        require(amount != 0);
        require(address(this).balance >= amount);

        credits[msg.sender] = 0;

        msg.sender.transfer(amount);
    }
}
```

### Emergency Stop
:::info Intent
Add an option to disable critical contract functionality in case of an emergency.
:::

Use the Emergency Stop pattern when:
* you want to have the ability to pause your contract.
* you want to guard critical functionality against the abuse of undiscovered bugs.
* you want to prepare your contract for potential failures.

```solidity showLineNumbers
contract EmergencyStop {

    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    modifier onlyAuthorized {
        // Check for authorization of msg.sender here
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Deposit logic happening here
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Emergency withdraw happening here
    }
}
```

## Upgradeability Patterns

### Proxy Delegate: 
:::info Intent
Introduce the possibility to upgrade smart contracts without breaking any dependencies.
:::

Use the Proxy Delegate pattern when:
* you want to delegate function calls to other contracts.
* you need upgradeable delegates, without breaking dependencies.
* you are familiar with advanced concepts like delegatecalls and inline assembly.

```solidity showLineNumbers
contract Proxy {

    address delegate;
    address owner = msg.sender;

    function upgradeDelegate(address newDelegateAddress) public {
        require(msg.sender == owner);
        delegate = newDelegateAddress;
    }

    function() external payable {
        assembly {
            let _target := sload(0)
            calldatacopy(0x0, 0x0, calldatasize)
            let result := delegatecall(gas, _target, 0x0, calldatasize, 0x0, 0)
            returndatacopy(0x0, 0x0, returndatasize)
            switch result case 0 {revert(0, 0)} default {return (0, returndatasize)}
        }
    }
}
```

### Eternal Storage
:::info Intent
Keep contract storage after a smart contract upgrade.
:::

Use the Eternal Storage pattern when:
* your contract is upgradeable and should retain storage after an upgrade.
* you want to avoid problems with migrating storage after a contract upgrade.
* you can accept a slightly more complex syntax for storing data.

```solidity showLineNumbers
contract EternalStorage {

    address owner = msg.sender;
    address latestVersion;

    mapping(bytes32 => uint) uIntStorage;
    mapping(bytes32 => address) addressStorage;

    modifier onlyLatestVersion() {
       require(msg.sender == latestVersion);
        _;
    }

    function upgradeVersion(address _newVersion) public {
        require(msg.sender == owner);
        latestVersion = _newVersion;
    }

    // *** Getter Methods ***
    function getUint(bytes32 _key) external view returns(uint) {
        return uIntStorage[_key];
    }

    function getAddress(bytes32 _key) external view returns(address) {
        return addressStorage[_key];
    }

    // *** Setter Methods ***
    function setUint(bytes32 _key, uint _value) onlyLatestVersion external {
        uIntStorage[_key] = _value;
    }

    function setAddress(bytes32 _key, address _value) onlyLatestVersion external {
        addressStorage[_key] = _value;
    }

    // *** Delete Methods ***
    function deleteUint(bytes32 _key) onlyLatestVersion external {
        delete uIntStorage[_key];
    }

    function deleteAddress(bytes32 _key) onlyLatestVersion external {
        delete addressStorage[_key];
    }
}
```

## Memory Array Building
:::info intent
Aggregate and retrieve data from contract storage in a gas efficient way.
:::

Use the Memory Array Building pattern when:
* you want to retrieve aggregated data from storage.
* you want to avoid paying gas when retrieving data.
* your data has attributes that are subject to changes.

```solidity showLineNumbers
contract MemoryArrayBuilding {

    struct Item {
        string name;
        string category;
        address owner;
        uint32 zipcode;
        uint32 price;
    }

    Item[] public items;

    mapping(address => uint) public ownerItemCount;

    function getItemIDsByOwner(address _owner) public view returns (uint[]) {
        uint[] memory result = new uint[](ownerItemCount[_owner]);
        uint counter = 0;
        
        for (uint i = 0; i < items.length; i++) {
            if (items[i].owner == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }
}
```

## References

- https://github.com/fravoll/solidity-patterns
- https://hackernoon.com/solidity-tutorial-understanding-design-patterns-part-1
- https://blog.quillhash.com/2022/04/22/smart-contract-security-an-agile-sdlc-approach/
- https://blog.logrocket.com/developers-guide-solidity-design-patterns/
- https://fravoll.github.io/solidity-patterns/
- https://consensys.github.io/smart-contract-best-practices/development-recommendations/general/external-calls/#dont-use-transfer-or-send
- https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/
- https://blog.trailofbits.com/2020/10/30/good-idea-bad-design-how-the-diamond-standard-falls-short/
- https://research.csiro.au/blockchainpatterns/general-patterns/security-patterns/
- https://docs.openzeppelin.com/learn/