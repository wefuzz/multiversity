---
sidebar_position: 2
title: What is Blockchain? 
hide_title: true
slug: /blockchain/introduction
---

## Philosophy

:::info The Crypto Anarchist Manifesto, Timothy C. May
A specter is haunting the modern world, the specter of crypto anarchy.
:::

:::info What is Crypto Anarchy?
Some of us believe various forms of strong cryptography
     will cause the power of the state to decline, perhaps even
     collapse fairly abruptly. We believe the expansion into
     cyberspace, with secure communications, digital money,
     anonymity and pseudonymity, and other crypto-mediated
     interactions, will profoundly change the nature of
     economies and social interactions.

 Governments will have a hard time collecting taxes,
     regulating the behavior of individuals and corporations
     (small ones at least), and generally coercing folks when it
     can't even tell what _continent_ folks are on!

-`The Cyphernomicon`, Timothy C. May

:::

Cryptoanarchists believe strongly in the right to privacy and, therefore, the right to use cryptography to protect communications from others– be it Nation State Actors or your ex.

As `May` predicted exactly 30 years ago, in many ways, Blockchains are the `tamper-proof boxes which implement cryptographic protocols with nearly perfect assurance against any tampering`. We can say that the idea of blockchain started with the Cypherpunk movement and crypto-anarchy.

## Origins of Blockchain
Starting in 1983, the self-proclaimed cypherphunks and other cryptographers began exploring the use of public-private key cryptography to build anonymous cash. Enter, eCash, launched by David Chaum in 1994, which "has the privacy of paper cash, while achieving the high security required for the electronic network environments exclusively through innovations in public key cryptography"

A decade later (2008), the global financial industry crashed. At the same time, a pseudonymous person or persons named **Satoshi Nakamoto** outlined a new protocol for a peer-to-peer electronic cash system using a cryptocurrency called `Bitcoin`. Later it was launched in 2009. 

Unlike our traditional currencies issued by central banks, Bitcoins have `no central monetary authority`.

## Bitcoin

Bitcoin terminology can be confusing because the word Bitcoin is used to simultaneously denote three different things. 

- *Blockchain*: Bitcoin refers to the underlying blockchain technology platform. 
- *Protocol*: Bitcoin is used to mean the protocol that runs over the underlying blockchain technology to describe how assets are transferred on the blockchain. 
- *Currency*: Bitcoin denotes a digital currency, Bitcoin, the first and largest of the cryptocurrencies.

## Blockchain

Blockchain is a global distributed, immutable ledger or a database. This facilitates the process of recording transactions and tracking assets in a network. As blocks store just information, virtually anything of value can be tracked and traded on a blockchain network.

![centralised vs decentralised vs distributed](/img/centralised-decentralised.gif)

Blockchain owes its name to the form it stores transaction data — in blocks linked together to form a chain.
![blocks](/img/blocks.jpg)

Blockchain, as such, tries to solve the double-spend and Byzantine Generals problem using various [consensus](#consensus) mechanisms

## The Double-spend and Byzanite Generals problem
:::info Double Spend Problem
how can a receiver of digital money be sure that the money they were sent was not simultaneously sent to someone else? How can all members of a monetary network be sure others are not duplicating their money at will?
:::
![Double spend](/img/double-spend.png)

---

:::info Byzanite fault
...is the difficulty decentralized parties have in arriving at consensus without relying on a trusted central party.
:::

![Byzanite Generals problem](/img/Byzantine_Generals.png)

:::note
If all generals attack in coordination, the battle is won (left). If two generals falsely declare that they intend to attack, but instead retreat, the battle is lost (right).
:::

Bitcoin solves Byzanite Generals Problem by using a `Proof-of-Work`(PoW) mechanism. In order to add blocks to the blockchain, a member ([miner](#mining)) of the network must publish proof that they invested considerable work into creating the block. A PoW is the result of a complex calculation (time and energy consuming) that can be easily verified. 

:::danger Bitcoin != Blockchain
Bitcoin and blockchain are not the same. Blockchain provides the means to record and store the transactions of Bitcoin, but blockchain has many applications beyond Bitcoin. Bitcoin is only the first use case for blockchain.
:::

![mempool](/img/bitcoin-transaction.png)

### Consensus
- Agreement among nodes regarding the state of the ledger is essential for the function of the blockchain ledger
- Proof of Work, Proof of Stake, Delegated Proof of Stake, Proof of Authority, Proof of Elapsed Time, Proof of Burn 

Watch: [Understanding blockchain Consensys Mechanisms](https://www.youtube.com/watch?v=ojxfbN78WFQ)

### Node
- A node is simply a computer on the blockchain network that stores the ledger.
- Nodes decide whether or not a block of transactions is honest and accept or reject it.
- Nodes save and store transaction blocks.
- In Proof-of-Work (PoW) systems, miners are the nodes
- In Proof-of-Stake (PoS) systems, staking wallets are the nodes

### Mining
- Mining is a way of adding transaction records, via blocks, onto a public ledger.
- Block creators on Proof of Stake are called validators.
- Block creators on Proof of work are called miners.

### Proof of Stake vs Proof of Work
| Proof of Stake   	|  Proof of Work|   	
|---	|---	|
|Block creators are called validators   	|Block creators are called miners|
|Participants must buy coins or tokens to become a validator|Participants must buy equipment and energy to become a miner|   	
|Energy efficiency|Not energy efficient|
|Network control can be bought|Robust security due to expensive upfront requirement|
|Validators receive transactions fees as rewards|Miners receive block rewards|

## Use-cases for Blockchain
- Elections
- Cross-border transactions
- Decentralized exchanges
- Decentralized autonomous organizations (DAO)
- Supply Chain Management
- Decentralized Kick-starter
- Decentralized Youtube
- Decentralized file storage (IPFS)

## Popular Blockchains
- Bitcoin
- Ethereum
- Solana
- BNB
- Cardano
- Tezos
- Avalanche
- Polydot
- Chainlink
- Stellar
- EOS
- Cosmos

![malware](https://i.imgflip.com/1pew3c.jpg)


## References

- [Cryptopedia](https://www.gemini.com/cryptopedia/explore#intro)
- [Bitcoin: A Peer-to-Peer Elecronic Cash System](https://bitcoin.org/bitcoin.pdf)
- https://chaum.com/wp-content/uploads/2022/01/05-27-94-World_s-first-electronic-cash-payment-over-computer-networks.pdf
- [Satoshi Nakamoto Institute](https://nakamotoinstitute.org/literature/)
- [What Is the Byzantine Generals Problem?](https://river.com/learn/what-is-the-byzantine-generals-problem/#:~:text=The%20Byzantine%20Generals%20Problem%20describes,solve%20the%20Byzantine%20Generals%20Problem.) 
- [What Is the Double Spend Problem?](https://river.com/learn/what-is-the-double-spend-problem/#:~:text=The%20Double%20Spend%20Problem%20describes,member%20to%20verify%20every%20transaction.)
- [Why Proof of Stake (Nov 2020)](https://vitalik.ca/general/2020/11/06/pos2020.html)