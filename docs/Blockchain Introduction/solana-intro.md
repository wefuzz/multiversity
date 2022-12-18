---
sidebar_position: 5
title: Introduction to Solana
hide_title: true
slug: /blockchain/solana-intro
---

## Introduction to Solana

Solana is a fast, secure, and decentralized blockchain platform designed to support a wide range of applications. It was developed by Solana Labs, a San Francisco-based company founded in 2017 by CEO Anatoly Yakovenko and CTO Greg Fitzgerald.

Solana's key differentiator is its focus on scalability. It uses a unique proof-of-stake (PoS) consensus algorithm called Tower BFT, which allows it to process thousands of transactions per second (TPS). In comparison, Ethereum, the second-largest blockchain platform by market capitalization, can process only around 15 TPS. Solana's high transaction throughput makes it suitable for applications that require fast and reliable transaction processing, such as decentralized finance (DeFi) and gaming.

Solana also offers a number of other features that make it an attractive platform for developers. These include:

- Low transaction fees: Solana's PoS consensus algorithm allows it to maintain low transaction fees, making it an affordable platform for developers and users.
- Fast block times: Solana's blocks are produced every 400 milliseconds, which means transactions are confirmed and added to the blockchain much faster than on other platforms.
- Efficient storage: Solana uses a data structure called a segmented log to store transactions, which allows it to store a large number of transactions in a small amount of space.
- Support for smart contracts: Solana has its own programming language, called Solidity, which is used to write smart contracts. Smart contracts are self-executing contracts with the terms of the agreement between buyer and seller being directly written into lines of code.

Solana has gained significant traction in the cryptocurrency and blockchain space since its launch. It has attracted a number of high-profile partnerships, including with FTX, a leading cryptocurrency exchange, and Serum, a decentralized exchange built on Solana. It has also seen significant adoption in the DeFi space, with several popular DeFi projects, such as Mirror and Raydium, being built on the Solana platform.

## Architecture
Solana is a PBFT-like PoS blockchain and it supports upwards of 50,000 TPS with over 200 nodes on current testnet iterations, making it the most performant blockchain and the world’s first web-scale decentralized network.

The Solana blockchain consists of several key components that work together to support the platform's decentralized applications and services. Some of the main high-level components of the Solana blockchain include:

- **Consensus algorithm**: Solana uses a `proof-of-stake` (PoS) consensus algorithm, which allows for fast transaction processing and low transaction fees. It also has a hybrid `consensus` model that combines `PoS` with a fixed validator set to ensure network security and decentralization.
- **Proof of history (PoH)**: `PoH` is a distributed ledger technology that allows for efficient and secure timestamping of transactions. It is used to achieve high transaction throughput and low transaction fees while maintaining a secure and decentralized network.
- **eBPF Virtual machine (VM)**: The Solana VM is used to execute smart contracts and run decentralized applications (DApps) on the platform. Solana uses parallelization to improve the performance and scalability of the virtual machine (VM). Parallelization is used to enable multiple smart contracts or decentralized applications (DApps) to be executed concurrently, rather than sequentially. This helps improve the overall performance of the platform, as it allows the VM to process more transactions in a shorter amount of time.
- **Decentralized governance**: Solana has a decentralized governance model that allows the community to propose and vote on changes to the platform. This helps ensure that the platform stays aligned with the needs and goals of its users.
- **Account-based ledger**: Solana uses an account-based ledger, which means that each account on the platform has its own dedicated balance and can store data. This allows for efficient and flexible transaction processing.

In order to create a decentralized, permissionless network that matches the performance of a single node, the Solana team developed 8 key technologies:

- *Proof of History (POH)** — a clock before consensus;
- *Tower BFT* — a PoH-optimized version of PBFT;
- *Turbine* — a block propagation protocol;
- *Gulf Stream* — Mempool-less transaction forwarding protocol;
- *Sealevel* — Parallel smart contracts run-time;
- *Pipelining* — a Transaction Processing Unit for validation optimization
- *Cloudbreak* — Horizontally-Scaled Accounts Database; and
- *Archivers* — Distributed ledger storage

### Proof-of-History
Proof of history (PoH) is a distributed ledger technology used in the Solana blockchain to enable efficient and secure timestamping of transactions. It allows the platform to achieve high transaction throughput and low transaction fees while maintaining a secure and decentralized network.

In a traditional blockchain, transactions are typically added to the chain in a sequential manner, with each new block being added to the end of the chain. This can be slow and inefficient, as it limits the number of transactions that can be processed in a given period of time.

`PoH` is designed to address this issue by allowing transactions to be timestamped in a more efficient and scalable way. It does this by using a combination of cryptographic techniques and a distributed ledger to create a secure and immutable record of transaction timestamps.

One of the key features of `PoH` is that it allows transactions to be processed in `parallel`, rather than sequentially. This enables the Solana platform to achieve high transaction throughput and low transaction fees, making it suitable for a wide range of decentralized applications and services.

### Tower BFT
`Tower BFT` (Byzantine Fault Tolerance) is a consensus algorithm used in the Solana blockchain to ensure the integrity and security of the network. It is a type of `PoS` consensus algorithm that is designed to be fast, efficient, and secure.

In a `PoS` consensus algorithm, the network relies on a set of validators to process transactions and reach consensus on the state of the blockchain. In `Tower BFT`, the validators are organized into a `tower` structure, with each layer of the tower responsible for processing and verifying a specific set of transactions.

The `Tower BFT` algorithm uses a combination of cryptographic techniques and game theory to ensure that the validators behave honestly and reach consensus in a timely manner. It also has a built-in mechanism for detecting and handling faulty or malicious validators, which helps to ensure the security and integrity of the network.

### Trubine
Turbine, Solana’s block-propagation technique, borrows heavily from BitTorrent. Turbine works by dividing the work of processing transactions into smaller chunks, which are then processed concurrently by different nodes in the network. This allows the network to handle a higher volume of transactions in a shorter amount of time, improving the overall scalability and performance of the platform.

Turbine is an optional feature of the Solana blockchain and can be enabled or disabled by validators depending on their specific needs and requirements. It is typically used in situations where high transaction throughput is required, such as in decentralized finance (DeFi) applications or other high-volume use cases.

### Gulf Stream
Unlike many other protocols, Solana is a Mempool-less Transaction Forwarding Protocol. Solana Labs introduced a new technology called Gulf Stream to make this possible. Gulf Stream is a feature of the Solana blockchain that helps to improve the scalability and performance of the network by pushing transaction caching and forwarding to the edge of the network.

Flow:
- Clients, such as wallets, sign transactions that reference a specific block-hash, which is a fairly recent block-hash that has been fully confirmed by the network.
- Validators forward transactions to upcoming leaders, and clients can subscribe to transaction confirmations from validators.
- Clients know that a block-hash expires in a finite period of time, or the transaction is confirmed by the network, which allows them to sign transactions that are guaranteed to execute or fail.
- Once the network moves past the rollback point, clients have a guarantee that the transaction is now invalid and will never be executed on chain.

### Sealevel
Sealevel is a core component of the Solana Virtual Machine (VM). It is Solana’s parallel smart contracts runtime. Unlike EVM, EOS's WASM based VM runtimes, Solana VM runtime is not single threaded and can process tens of thousands of contracts in parallel, using as many cores as are available to the Validator.

The reasons for parallel execution of Solana transactions is that Solana transactions describe all the states a transaction will read or write while executing, which allows for non-overlapping transactions to be processed in parallel, as well as for transactions that are only reading the same state to be processed concurrently as well.

By describing all the states that a transaction will read or write, Solana is able to ensure that there are no conflicts between transactions and that they can be processed in parallel without affecting each other. 

## Solana Ecosystem
![Alt text](/img/solana_ecosystem.jpeg)

## Core Concepts
### Programs
Solana Programs, often referred to as "smart contracts" on other blockchains, are the executable code that interprets the instructions sent inside of each transaction on the blockchain.

The Solana blockchain has two types of programs:
- Native Programs: These are programs that are built directly into the core of the Solana blockchain.
- On Chain Programs: These are user written programs, and are often referred to as `smart contracts` on other blockchains, are deployed directly to the blockchain for anyone to interact with and execute. 

Solana `programs` are compiled via the LLVM compiler infrastructure to an Executable and Linkable Format (ELF) containing a variation of the `Berkeley Packet Filter` (BPF) bytecode. This LLVM compiler infrastructure allows for a program may be written in any programming language that can target the LLVM's BPF backend. Solana currently supports writing programs in Rust, C/C++ and a Python Transpiler.

You can find BPF instruction set here: https://github.com/iovisor/bpf-docs/blob/master/eBPF.md

Unlike other blockchains, Solana programs can be `upgraded` after they are deployed to the network.

Key points:
- Programs are essentially special type of `Accounts` that is marked as `executable`
- Programs can own other `Accounts`
- Programs can only change the `data` or debit accounts they own
- Any program can `read` or `credit` another account
- Programs are considered `stateless`
- Program account's data contains only the compiled `BPF` code
- Programs can be upgraded by their `owner`

### Accounts
If the program needs to store `state` between transactions, it does so using `accounts`. Accounts act as a basic unit of data storage. Accounts are similar to files in operating systems such as Linux in that they may hold arbitrary `data` that persists beyond the `lifetime` of a `program`. Also like a file, an account includes `metadata` that tells the `runtime` who is allowed to access the data and how.

- The account includes `metadata` for the lifetime of the file which is expressed by a number of fractional native tokens called `lamports`.
- Accounts are held in validator memory and pay `rent` to stay there.
- Any account that drops to zero `lamports` is `purged`.
- Accounts can also be marked `rent-exempt` if they contain a sufficient number of `lamports`.
- Account address is a 32-byte public key.

src: https://github.com/solana-labs/solana/blob/master/sdk/program/src/account_info.rs#L18
```rust
/// Account information
#[derive(Clone)]
pub struct AccountInfo<'a> {
    /// Public key of the account
    pub key: &'a Pubkey,
    /// Was the transaction signed by this account's public key?
    pub is_signer: bool,
    /// Is the account writable?
    pub is_writable: bool,
    /// The lamports in the account.  Modifiable by programs.
    pub lamports: Rc<RefCell<&'a mut u64>>,
    /// The data held in this account.  Modifiable by programs.
    pub data: Rc<RefCell<&'a mut [u8]>>,
    /// Program that owns this account
    pub owner: &'a Pubkey,
    /// This account's data contains a loaded program (and is now read-only)
    pub executable: bool,
    /// The epoch at which this account will next owe rent
    pub rent_epoch: Epoch,
}
```

### Transactions
Any Program execution begins with a `transaction` being submitted to the cluster. The Solana runtime will execute a `program` to process each of the instructions contained in the transaction, in order, and atomically.

A transaction contains a compact-array of `signatures`, followed by a `message`.

#### Struct Transaction
```rust title="solana-labs/solana/sdk/src/transaction/mod.rs"
pub struct Transaction {
    /// A set of signatures of a serialized [`Message`], signed by the first
    /// keys of the `Message`'s [`account_keys`], where the number of signatures
    /// is equal to [`num_required_signatures`] of the `Message`'s
    /// [`MessageHeader`].
    ///
    /// [`account_keys`]: Message::account_keys
    /// [`MessageHeader`]: crate::message::MessageHeader
    /// [`num_required_signatures`]: crate::message::MessageHeader::num_required_signatures
    // NOTE: Serialization-related changes must be paired with the direct read at sigverify.
    #[wasm_bindgen(skip)]
    #[serde(with = "short_vec")]
    pub signatures: Vec<Signature>,

    /// The message to sign.
    #[wasm_bindgen(skip)]
    pub message: Message,
}
```

#### Struct Message
```rust title="solana-labs/solana/sdk/program/src/message/mod.rs"
pub struct Message {
    /// The message header, identifying signed and read-only `account_keys`.
    /// Header values only describe static `account_keys`, they do not describe
    /// any additional account keys loaded via address table lookups.
    pub header: MessageHeader,

    /// List of accounts loaded by this transaction.
    #[serde(with = "short_vec")]
    pub account_keys: Vec<Pubkey>,

    /// The blockhash of a recent block.
    pub recent_blockhash: Hash,

    /// Instructions that invoke a designated program, are executed in sequence,
    /// and committed in one atomic transaction if all succeed.
    ///
    /// # Notes
    ///
    /// Program indexes must index into the list of message `account_keys` because
    /// program id's cannot be dynamically loaded from a lookup table.
    ///
    /// Account indexes must index into the list of addresses
    /// constructed from the concatenation of three key lists:
    ///   1) message `account_keys`
    ///   2) ordered list of keys loaded from `writable` lookup table indexes
    ///   3) ordered list of keys loaded from `readable` lookup table indexes
    #[serde(with = "short_vec")]
    pub instructions: Vec<CompiledInstruction>,

    /// List of address table lookups used to load additional accounts
    /// for this transaction.
    #[serde(with = "short_vec")]
    pub address_table_lookups: Vec<MessageAddressTableLookup>,
}
```

#### Struct MessageHeader
```rust title="solana-labs/solana/sdk/program/src/message/mod.rs"
pub struct MessageHeader {
    /// The number of signatures required for this message to be considered
    /// valid. The signers of those signatures must match the first
    /// `num_required_signatures` of [`Message::account_keys`].
    // NOTE: Serialization-related changes must be paired with the direct read at sigverify.
    pub num_required_signatures: u8,

    /// The last `num_readonly_signed_accounts` of the signed keys are read-only
    /// accounts.
    pub num_readonly_signed_accounts: u8,

    /// The last `num_readonly_unsigned_accounts` of the unsigned keys are
    /// read-only accounts.
    pub num_readonly_unsigned_accounts: u8,
}
```

## References
- https://docs.solana.com/cluster/overview
- https://solana.com/solana-whitepaper.pdf
- https://solana.com/news/8-innovations-that-make-solana-the-first-web-scale-blockchain
- https://medium.com/solana-labs/sealevel-parallel-processing-thousands-of-smart-contracts-d814b378192
- https://medium.com/solana-labs/how-solanas-proof-of-history-is-a-huge-advancement-for-block-time-178899c89723
- https://medium.com/solana-labs/gulf-stream-solanas-mempool-less-transaction-forwarding-protocol-d342e72186ad
- https://medium.com/solana-labs/sealevel-parallel-processing-thousands-of-smart-contracts-d814b378192