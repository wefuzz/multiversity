---
sidebar_position: 2
title: Solana Program Library
hide_title: true
slug: /smart-contracts/solana-spl
---

## Solana Program Library

The Solana Program Library (SPL) is a collection of `on-chain` programs targeting the `Sealevel parallel runtime`. These are deployed and available on the mainnet. 

Available programs in the SPL:
- **Token Program**: This program defines a common implementation for Fungible and Non Fungible tokens.
- **Token-2022 Program**: A token program on the Solana blockchain, defining a common implementation for fungible and non-fungible tokens. The Token-2022 Program is a superset of the functionality provided by the Token Program, deployed to all networks.
- **Token Swap Program**: A Uniswap-like exchange for the Token program on the Solana blockchain, implementing multiple automated market maker (AMM) curves.
- **Token-Lending Program**: A lending protocol for the Token program on the Solana blockchain inspired by Aave and Compound.
- **Associated Token Account Program**: This program defines the convention and provides the mechanism for mapping the user's wallet address to the associated token accounts they hold.
- **Token Upgrade Program**: The Token Upgrade Program provides a stateless protocol for permanently converting tokens from one mint to another.
- **Memo Program**: The Memo program is a simple program that validates a string of UTF-8 encoded characters and verifies that any accounts provided are signers of the transaction. 
- Name Service: A SPL program for issuing and managing ownership of: domain names, Solana Pubkeys, URLs, Twitter handles, ipfs cid's etc..
- **Shared memory Program**: A simple program and highly optimized program that writes instruction data into the provided account's data
- **Feature Proposal Program**: The Feature Proposal Program provides a workflow for activation of Solana network features through community vote based on validator stake weight.

SPL source code is available here: [solana-program-library](https://github.com/solana-labs/solana-program-library)


## References
- [Solana programs Part 1: understanding SPL Token Mint](https://medium.com/coinmonks/solana-programs-part-1-understanding-spl-token-mint-fabd13323219)
- [Solana programs Part 2: understanding SPL Associated Token Account](https://medium.com/coinmonks/solana-programs-part-2-understanding-spl-associated-token-account-25082b9b5471)
- [Solana programs Part 3: understanding Metaplex Token Metadata](https://medium.com/coinmonks/solana-programs-part-3-understanding-metaplex-token-metadata-3cafde284d72)
- [Solana programs Part 4: Metaplex Candy Machine — how does it work?](https://medium.com/coinmonks/solana-programs-part-4-metaplex-candy-machine-how-does-it-work-a27d7a133fad)