---
sidebar_position: 5
title: Introduction to Ethereum
hide_title: true
slug: /blockchain/ethereum-intro
---

## Introduction to Ethereum

:::info Ethereum
Ethereum intends to provide: a blockchain with a built-in Turing-complete programming language, allowing anyone to write smart contracts and decentralized applications where they can create their own arbitrary rules for ownership, transaction formats and state transition functions.
:::

- The Ethereum platform enables developers to build decentralized applications with built-in economic functions, by programming on top of `Ether`.

- Ethereum has a general-purpose programmable blockchain that runs a virtual machine capable of executing code. 

- Smart contracts run inside a powerful virtual machine known as EVM.

- Smart contracts are compiled to a low-level, stack based bytecode language, referred to as "Ethereum virtual machine code" or "EVM Code".

- Ethereum has its own cryptocurrency, `Ether`, which is used to pay for certain activities on the Ethereum network.

- Ethereum is often referred to as "the world computer"

:::info GAS
"Ether" is the main internal crypto-fuel of Ethereum, and is used to pay transaction fees.
:::

## Ethereum Architecture
The main components of the Ethereum blockchain system are:

- P2P network
- Consensys rules
- Transactions
- State Machine
- Data structures
- Economic security
- Clients

#### P2P network
Ethereum runs on the Ethereum main network, which is addressable on TCP port 30303, and runs a protocol called [ÐΞVp2p](https://github.com/ethereum/devp2p/blob/master/rlpx.md).

#### Consensus rules
- Ethereum 1.0 uses a Proof-of-Work Algorithm called `Ethash` to achieve consensus.
- While Ethereum 1.0 uses a proof-of-work, Ethereum 2.0 will use a proof-of-stake (PoS) mechanism to achieve consensus.

#### Transactions
Ethereum transactions are network messages that include (among other things) a `sender`, `recipient`, `value`, and `data payload`.

#### State machine
Ethereum state transitions are processed by the Ethereum Virtual Machine (EVM), a stack-based virtual machine that executes bytecode (machine-language instructions). EVM programs, called "smart contracts," are written in high-level languages (e.g., Solidity) and compiled to bytecode for execution on the EVM.

#### Data structures
Ethereum’s state is stored locally on each node as a database (usually Google’s LevelDB), which contains the transactions and system state in a serialized hashed data structure called a Merkle Patricia Tree.

#### Consensus algorithm
Ethereum uses Bitcoin’s consensus model, Nakamoto Consensus, which uses sequential single-signature blocks, weighted in importance by PoW to determine the longest chain and therefore the current state. However, there are plans to move to a PoS weighted voting system, codenamed Casper, in the near future.

#### Economic security
Ethereum currently uses a PoW algorithm called `Ethash`, but this will eventually be dropped with the move to PoS at some point in the future.

#### Clients
An Ethereum client is a software application that implements the Ethereum specification and communicates over the peer-to-peer network with other Ethereum clients. Ethereum has several interoperable implementations of the client software, the most prominent of which are Go-Ethereum (`Geth`) and `Parity`. 

![EVM](https://raw.githubusercontent.com/ethereumbook/ethereumbook/develop/images/evm-architecture.png)

:::demo https://txstreet.com/v/eth:::

### Ethereum Accounts
In Ethereum, the state as part of the state machine is made up of objects called `accounts`, with each account having a `20-byte` ` address` and state transitions being direct transfers of value and information between `accounts`. 

An Ethereum account contains four fields:
- The `nonce`, a counter used to make sure each transaction can only be processed once
- The account's current `ether balance`
- The account's `contract code`, if present
- The account's `storage` (empty by default)

There are two types of accounts:
- Externally owned accounts
- Contract accounts

:::info Externally owned accounts 
- Externally owned accounts are accounts controlled by private keys.
- An externally owned account has no code, and one can send messages from an externally owned account by creating and signing a transaction.
:::

:::info Contract Accounts
- Contract accounts are accounts that are controlled by their `contract code`.
- In a Contract account, every time the contract account receives a message its code activates, allowing it to read and write to internal storage and send other messages or create contracts in turn.
:::

### Messages and Transactions

#### Transactions
Every transaction in Ethereum contain:
- The `recipient` of the message
- A `signature` identifying the `sender`
- The amount of `ether` to transfer from the `sender` to the `recipient`
- An optional `data` field 
- A `STARTGAS` value, representing the maximum number of `computational` steps the transaction execution is allowed to take
- A `GASPRICE` value, representing the `fee` the sender pays per `computational step`

The `data` field is an optional field taht a virtual machine can parse and use for example as function arguments to a contract.

:::info GAS
- The `STARTGAS` and `GASPRICE` fields are crucial for Ethereum's anti-denial of service model. 
- The fundamental unit of computation is `gas`; usually, a `computational step` costs 1 gas, but some operations cost higher amounts of gas because they are more computationally expensive, or increase the amount of data that must be stored as part of the state.
- Every Ethereum transaction requires payment of a fee, which is collected by the miners to validate the transaction.
:::

:::note
- Reading from the blockchain is free of gas fee.
- Writing costs you gas as it modifies the blockchain and the miners have to run computations to achieve consensus.
:::

#### Messages
- Essentially, a message is like a transaction, except it is produced by a contract and not an external actor. 
- A message is produced when a contract currently executing code executes the `CALL` opcode, which produces and executes a message.
- Like a transaction, a message leads to the recipient account running its code.
- Thus, contracts can have relationships with other contracts in exactly the same way that external actors can.

A message contains:
- The `sender` of the message (implicit)
- The `recipient` of the message
- The amount of `ether` to transfer alongside the message
- An optional `data` field
- A `STARTGAS` value

:::note Gas allowance
Note that the gas allowance assigned by a transaction or contract applies to the total gas consumed by that transaction and all sub-executions.
:::

### Code Execution
- The code in Ethereum contracts is written in a low-level, stack-based bytecode language, referred to as "Ethereum virtual machine code" or "EVM code". 
- The code consists of a series of bytes, where each byte represents an operation. 

The operations have access to three types of space in which to store data:
- **Stack**: a last-in-first-out container to which values can be pushed and popped
- **Memory**: an infinitely expandable byte array
- **Storage**: the contracts' long-term storage, a key-value store. 

Writing to **Storage** persists for the long term, unlike *Stack* and *Memory

:::info
The code can also access the `value`, `sender` and `data` of the incoming message, as well as `block header data`, and the code can also return a byte array of data as an output.
:::

### Ethereum block Explorers
- Block explorers are your portal to Ethereum's data.
- They are basically a search engine for all transactions related to the specific blockchain.
- Blockchain explorers leverage the AAPI and nodes for fetching data from the blockchain.
- You can use them to see real-time data on blocks, transactions, miners, accounts, and other on-chain activity.

:::demo https://etherscan.io/ :::

## API, Nodes, and Clients
:::info Node & CLIENT
A `node` is a computer running Ethereum client software. A `client` is an implementation of Ethereum that verifies all transactions in each block, keeping the network secure and the data accurate.
:::

You can read more about Nodes & Clients here: 
- [Ethereum Clients](https://github.com/ethereumbook/ethereumbook/blob/develop/03clients.asciidoc)
- [NODES AND CLIENTS](https://ethereum.org/en/developers/docs/nodes-and-clients/)

There are three types of `nodes` that can be run by an Ethereum `client`:

- Full nodes
- Light nodes
- Archive nodes

:::info Full Node
- Stores full blockchain data (although this is periodically pruned so a full node does not store all state data back to genesis)
- Participates in block validation, verifies all blocks and states.
- All states can be derived from a full node (although very old states are reconstructed from requests made to archive nodes).
- Serves the network and provides data on request.
- This type of node is very expensive and resource intensive to run.
:::

:::info Light node
- Instead of downloading every block, light nodes download block headers.  These headers only contain summary information about the contents of the blocks. 
- Where there is a need for additional information, a light node will query the full node. 
-  Light nodes enable users to participate in the Ethereum network without the powerful hardware or high bandwidth required to run full nodes.
- In future, light nodes might run on mobile phones or embedded devices.
:::

:::info Archive nodes
- Stores everything kept in the full node and builds an archive of historical states.
- Aptly named, these nodes serve as a sort of archive for the blockchain data.
- Archive nodes can save terabytes of data, which makes them less attractive for an average user.
:::

:::info APIS
- Ethereum clients provide a JSON-RPC interface as per the Ethereum's specification.
- This enables interaction with the Ethereum's blockchain data.
:::

If you do not want to run your own node to use in light clients like wallets, there are third party, both centralized and decelitralized, API providers. 

:::info Centralised API Provider
- Infura
- Alchemy
:::

:::info Decentralized API Provider
- Pokt Network
:::

You can find Ethereum JSON-RPC Specification [here](https://ethereum.github.io/execution-apis/api-documentation/).


## References

- [Ethereum Whitepaper](https://ethereum.org/en/whitepaper/)
- [Introduction to Ethereum](https://ethereum.org/nl/developers/docs/intro-to-ethereum/)
- https://ethereum.github.io/yellowpaper/paper.pdf
- https://github.com/ethereumbook/ethereumbook
- https://cypherpunks-core.github.io/ethereumbook/01what-is.html
