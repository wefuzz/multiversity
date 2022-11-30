---
sidebar_position: 3
title: Cryptography, Keys and Wallets
hide_title: true
slug: /blockchain/cryptography
---

## Cryptography

The main features offered by Blockchain are:
- **Immutability**
- **Reliability**
- **Security**
- **Traceability**

All this is possible thanks to the strong Cryptography at the heart of blockchains.

Cryptography is the core of Blockchain and cryptocurrencies. The core idea of cryptography is to protect data from being accessed by unauthorized people. Cryptography achieves this by leveraging a specific type of `key` and `algorithm` to `encrypt`(digital equivalent to closing a lock) a message before sending it to the receiver from the sender. Then, the receiver employs `decryption`(digital equivalent to opening a lock) to obtain the original message. 

So, the critical aspect of the operations of Cryptography is the **encryption keys**, just like keys to the door locks or bank safes. 

Cryptography can also be used to prove knowledge of a secret without revealing that secret (digital signatures, Zero-knowledge proof, etc.) or to prove the authenticity of data (e.g., with digital fingerprints, also known as "hashes")

:::info Transactions are not encrypted
Though the Blockchain leverages Cryptography, no part of the Blockchain directly involves encryption; i.e., all communications within the Blockchain between nodes are unencrypted and can be read by anyone. The Blockchain is a public, transparent record of all transactions.
:::

One of the uses of Cryptography in the Blockchain is establishing the ownership of funds or assets. This is done primarily using digital keys, addresses, and digital signatures with asymmetric key cryptography at its heart.

## Symmetric Key Cryptography
Symmetric-key cryptography uses the **same** cryptographic keys for both the `encryption` of plaintext and the `decryption` of ciphertext. This key represents a shared secret between two or more parties that the parties can use to maintain a private information bridge between them.

:::info faster
In general, Symmetric-key cryptography runs faster than Asymmetric-key Cryptography.
:::

:::danger drawback
The requirement that both parties have access to the secret key is one of the main drawbacks of symmetric-key encryption,
:::

Symmetric key cryptography is sometimes also called Private Key Cryptography.

## Asymmetric Key Cryptography
In Asymmetric Key Cryptography, as the name suggests, the keys used for encryption and the key used for decryption are different. Asymmetric cryptography always uses two complementary keys, a public key and a private key pair. Using the two complementary keys is similar to a mailbox, where everyone can put letters in, but only the owner can open it.

The public key is derived from the private key. So, it is possible to find a public key if you know a private key, but it is relatively impossible to find a private one with a public key.

The idea of public key cryptography was first presented by Martien Hellman, Ralph Merkle, and Whitefield Diffie at Stanford in 1976.

![Asymmetric key](/img/asymmetric.png)

* Example public key in Ethereum: 0xaED017301a14097e047E288357f302ED0102102a
* Example private key in Ethereum: 2bb76935e20710b587a0601f5ae3fa755ceca5d4adaaf66f5abdda49973421f5

The Blockchain uses asymmetric cryptography to achieve two goals:
* Identifying accounts
* Authorizing transactions

#### Identifying accounts
Blockchain uses public keys as the `addresses` to the accounts. The Blockchain treats user accounts like mailboxes: They have a publicly known `address`, and everyone can send messages to them. These addresses are derived from the public key using `hash` functions.

#### Authorizing transactions
In the real world, the transactions of assets are usually authorized with signatures. In the crypto world, the transactions can only be authorized using private keys, which are used to sign the transactions cryptographically. As in the real world, a signed transaction can grant access to the assets connected to these keys.

:::info Not your keys, not your coins
Only the private key owner can sign the transaction and access the assets.
:::

## Hash functions
:::info Definition
A cryptographic hash function is a mathematical function that can be used to map data of arbitrary size to fixed-size values. Hash functions are generally intended to be one-way functions.
:::

![Hash function](/img/address-hashfunction.jpg)

Some of the Hash families available are Message Direct (MD), Secure Hash Algorithm (SHA), and RIPE Message Direct (RIPEMD).

![Hash function](/img/hash-function.jpg)

#### Applications of Hash functions
- Verifying the integrity of messages and files
- Signature generation and verification
- Proof-of-Work (Bitcoin uses HashCash, partial hash inversions to prove that work was done)

## Merkle Tree and Merkle Root

- As we already know, Blockchain is comprised of various blocks that are linked with one another. 
- A `Merkle tree`, encodes the blockchain data in an efficient and secure manner.
- Merkle tree is a binary tree (2 children for every node)
- Merkle tree enables quick verification of blockchain data, as well as the quick movement of large amounts of data from one computer node to the other on the peer-to-peer blockchain network.

![Merkle tree](/img/merkle-tree.jpg)

- Efficient validation of the data's integrity
- Merkle tree allows partial data verification (Use case, in a p2p decentralized system like IPFS where data is downloaded in chunks from different peers, it's useful to verify chunks of data)

![Merkle tree difference](/img/merkle-comparision.jpg)

##### Verification
![Merkle tree verification](/img/merkle-verification.jpg)

## Elliptic Curve Digital Signature Algorithm 
The Elliptic Curve Digital Signature Algorithm (ECDSA) is a cryptographically secure Digital Signature Algorithm based on the Elliptic Curve Cryptography (ECC). 

ECDSA keys and signatures are `shorter` than in RSA for the same security level. A 256-bit ECDSA signature offers the same security strength as a 3072-bit RSA signature.

![ECDSA](/img/ecdsa.png)

The ECDSA key pair consists of:
- private key (integer)
- public key (EC point) derived from the private key

Using Elliptic Curve Point manipulation, we can derive a value from the private key, which is not reversible. This way, it is possible to create signatures that are safe and tamperproof. The functions that derive the values are called "trapdoor functions".

:::info Trapdoor
A `trapdoor` function is a function that is easy to compute in one direction yet difficult to compute in the opposite direction (finding its inverse) without special information, called the "trapdoor".
:::

ECDSA is used in blockchains for signature generation for signing the transaction and signature verifications for verifying the signature on the transaction.

#### Signature Generation algorithm
- ECDSA takes the private key and Merkle root (hash) of the transaction and creates the signature by mathematical computations. The transaction is now signed.
- The signed transaction is sent out to other peers or nodes on the blockchain network.

#### Signature Verification Algorithm
- To verify the signatures on the signed transactions, the peers or nodes calculate a boolean result (true or false) using the public key of the sender and the transaction information.
- If the result of the mathematical computation is True, then the transaction is verified that transaction is from the authorized owner

## Wallets
:::info definition
A cryptocurrency wallet is a device, physical medium, program or service which stores the private keys for cryptocurrency transactions.
:::

The wallet lets users private keys that are used to sign the transactions and allow's users to interact with the Blockchain.

There are mainly two types of wallets:
- **Hot wallet**:  A wallet that IS connected to the internet.
- **Cold wallet**:  A wallet that IS NOT connected to the internet.

--- 
| Hot Wallet    |  Cold Wallet|
|---    |---    |
| Connected to the internet | NOT connected to the internet|
| Easy to hack (XSS in the wallet?) | Difficult to hack|
|Browser extensions, mobile applications|Hardware and Paper wallets|
|Day-to-Day transactions| Useful for Long term holding|
--- 

--- 
|Software Wallets | Hardware Wallets| Paper Wallets|
|---    |---    |--- |
|Desktop/mobile applications| USB Drive| Written/printed on Paper|
|Easy to access| Harder to access| Hard to access|
|Metamask, Coinbase|Ledger|Paper|

--- 
| Custodial Wallet      |  non-Custodial Wallet|
|---    |---    |
| Private keys are in control of the wallet provider| The user has complete control and access to their private key|
| Wallet provider is in control of the user's funds| The user is in control of their own funds|
|KYC/AML procedures | No KYC/AML|
|More user-friendly | Might require some technicals skills to use|
|Eg: Coinbase, Kraken, Binance| Metamask, Temple, Phantom|

Main use cases of a wallet are:
- **Control** your own private keys 
- **Manage** all your digital assets in one secure place 
- **Send** and **receive** cryptocurrency to and from anywhere in the world 
- Browse decentralized finance apps(**dApp**)

## References
- [A (Relatively Easy To Understand) Primer on Elliptic Curve Cryptography](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/)
- [ECDSA: The digital signature algorithm of a better internet](https://blog.cloudflare.com/ecdsa-the-digital-signature-algorithm-of-a-better-internet/)
- https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/
- https://soatok.blog/2021/04/19/a-furrys-guide-to-cryptocurrency/
- https://soatok.blog/2022/05/19/guidance-for-choosing-an-elliptic-curve-signature-algorithm-in-2022/