---
sidebar_position: 1
title: Solana Programs
hide_title: true
slug: /smart-contracts/solana-programs
---

## Solana Programs
Solana Programs, often referred to as "smart contracts" on other blockchains, are the executable code that interprets the instructions sent inside of each transaction on the blockchain.

Solana `programs` are compiled via the LLVM compiler infrastructure to an Executable and Linkable Format (ELF) containing a variation of the `Berkeley Packet Filter` (BPF) bytecode. This LLVM compiler infrastructure allows for a program may be written in any programming language that can target the LLVM's BPF backend. Solana currently supports writing programs in Rust, C/C++ and a Python Transpiler.

![bpf](/img/ebpf.png)

![Solana Programming](/img/solana_programming.png)

## Solana Development Setup

Install RUST
```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Install Solana CLI and update your `PATH` environment variable to include the solana programs:
```sh
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
```

Using Solana CLI:
```sh
solana --help
```
![solana cli 0x1](/img/solana_cli_0x1.png)

It is possible to write contracts using [solana-program](https://docs.rs/solana-program/latest/solana_program/) and `Anchor` framework.

[Anchor](https://www.anchor-lang.com/) is a framework for Solana's Sealevel runtime providing several convenient developer tools for writing smart contracts.

Every Solana `program` has a set of `instructions` that are executed when a transaction is sent to the program.

```rust title="solana-labs/solana/sdk/program/src/instruction.rs"
/// A compact encoding of an instruction.
///
/// A `CompiledInstruction` is a component of a multi-instruction [`Message`],
/// which is the core of a Solana transaction. It is created during the
/// construction of `Message`. Most users will not interact with it directly.
///
/// [`Message`]: crate::message::Message
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, Clone, AbiExample)]
#[serde(rename_all = "camelCase")]
pub struct CompiledInstruction {
    /// Index into the transaction keys array indicating the program account that executes this instruction.
    pub program_id_index: u8,
    /// Ordered indices into the transaction keys array indicating which accounts to pass to the program.
    #[serde(with = "short_vec")]
    pub accounts: Vec<u8>,
    /// The program input data.
    #[serde(with = "short_vec")]
    pub data: Vec<u8>,
}
```
An instruction contains three main pieces of info:
- A `program` ID which references the location of the code we are be calling
- Set of `accounts` being used and whether each one is a `signer` and/or `writable`
- A buffer with some `data` in it, which functions as calldata.

## Concepts
In Ethereum and other EVM-based platforms, the `data` and `code` of a smart contract are `coupled` together. This means that the data stored by a smart contract and the code that processes that data are all stored in the same contract.

Whereas, in Solana, the `data` and the `code` are `decoupled`. In Solana, the `data` of a smart contract is stored in a separate data contract, while the `code` that processes that data is stored in an `executable` contract. This separation of `data` and `code` allows transactions to be processed in parallel, rather than sequentially, which can improve the overall performance of the platform.

One potential downside of decoupling the data and code of smart contracts is that it can make it more difficult to understand the overall behavior of a contract. In EVM-based platforms like Ethereum, all of the relevant information (data and code) for a contract is contained in a single location, which can make it easier to understand how the contract works.

Refer to [Getting Started with Solana Development](https://docs.solana.com/developers) for more information on how to develop Solana Smart Contracts.

## eBPF
eBPF is a revolutionary technology with origins in the Linux kernel that can run sandboxed programs in an operating system kernel. 

- [rbpf](https://github.com/solana-labs/rbpf)

### Memory map
The virtual address memory map used by Solana BPF programs is fixed and laid out as follows:

- Program code starts at *0x100000000*
- Stack data starts at *0x200000000*
- Heap data starts at *0x300000000*
- Program input parameters start at *0x400000000*

### Stack & Heap
Solana Programs use Stack and Heap memory for different purposes. BPF uses `stack` frames instead of a variable stack pointer. Each stack frame is `4KB` in size. BPF `stack frames` occupy a virtual address range starting at `0x200000000`.

If a program violates that stack frame size, the compiler will report the overrun as a warning The reason a warning is reported rather than an error is because some dependent crates may include functionality that violates the stack frame restrictions even if the program doesn't use that functionality. If the program violates the stack size at runtime, an AccessViolation error will be reported.

Programs have access to a runtime `heap` either directly in `C` or via the `Rust` `alloc` APIs. To facilitate fast allocations, a simple 32KB bump heap is utilized. The heap does not support free or realloc so use it wisely. Internally, programs have access to the `32KB` memory region starting at virtual address `0x300000000` and may implement a custom `heap` based on the program's specific needs.

## How is a Solana program deployed
Solana Programs are pretty much like any other `account` but with the exception of having the `executable` flag set to `true` and the `owner` being assigned to a `BPF loader`.

- `Owner`: The loader this program was deployed with.
- `Program Id` is the address that can be referenced in an instruction's `program_id` field when invoking a program.
- `ProgramData Address` is the account associated with the program account that holds the program's data (shared object).
- `Authority` is the program's upgrade authority.
- `Last Deployed In Slot` is the slot in which the program was last deployed.
- `Data Length` is the size of the space reserved for deployments. The actual space used by the currently deployed program may be less.

The native program responsible for program deployment, upgrade, and execution of the programs on the chain is BPFLoaderUpgradeab1e.

```rust title="solana-labs/solana/sdk/program/src/bpf_loader_upgradeable.rs#L28"
/// Upgradeable loader account states
#[derive(Debug, Serialize, Deserialize, PartialEq, Clone, Copy, AbiExample)]
pub enum UpgradeableLoaderState {
    /// Account is not initialized.
    Uninitialized,
    /// A Buffer account.
    Buffer {
        /// Authority address
        authority_address: Option<Pubkey>,
        // The raw program data follows this serialized structure in the
        // account's data.
    },
    /// An Program account.
    Program {
        /// Address of the ProgramData account.
        programdata_address: Pubkey,
    },
    // A ProgramData account.
    ProgramData {
        /// Slot that the program was last modified.
        slot: u64,
        /// Address of the Program's upgrade authority.
        upgrade_authority_address: Option<Pubkey>,
        // The raw program data follows this serialized structure in the
        // account's data.
    },
}
```

The BPF Upgradeable Loader marks itself as "owner" of the executable and `program-data` accounts it creates to store user's program. When a user invokes an `instruction` via a `program_id`, the Solana runtime will load both the user's `program` and its `owner`, the BPF Upgradeable Loader. The runtime then passes the user's program to the BPF Upgradeable Loader to process the instruction.

The command used to deploy a Solana Program:
```sh
solana program deploy <PROGRAM_FILEPATH>
```

This command invokes multiple function calls in the Solana Cli and a series of transactions:

1) `read_and_verify_elf`
2) if it's deploy `do_process_program_write_and_deploy` and if it's upgrade `do_process_program_upgrade`
3) finalize the deployment by setting the authority `process_set_authority`.

`read_and_verify_elf` is a simple program that reads the Solana Program file from given location on system and creates a loader, and verifies if it's a valid ELF file or not by calling `Executable::<InvokeContext>::from_elf`.

```rust
fn read_and_verify_elf(program_location: &str) -> Result<Vec<u8>, Box<dyn std::error::Error>> {
    let mut file = File::open(program_location)
        .map_err(|err| format!("Unable to open program file: {err}"))?;
    let mut program_data = Vec::new();
    file.read_to_end(&mut program_data)
        .map_err(|err| format!("Unable to read program file: {err}"))?;
    let mut transaction_context = TransactionContext::new(Vec::new(), Some(Rent::default()), 1, 1);
    let invoke_context = InvokeContext::new_mock(&mut transaction_context, &[]);

    // Verify the program
    let loader = create_loader(
        &invoke_context.feature_set,
        &ComputeBudget::default(),
        true,
        true,
        false,
    )
    .unwrap();
    let executable = Executable::<InvokeContext>::from_elf(&program_data, loader)
        .map_err(|err| format!("ELF error: {err}"))?;

    let _ = VerifiedExecutable::<RequisiteVerifier, InvokeContext>::from_executable(executable)
        .map_err(|err| format!("ELF error: {err}"))?;

    Ok(program_data)
}
```

`do_process_program_write_and_deploy` functions initializes a program account by calling 

```rust
system_instruction::create_account(
    &config.signers[0].pubkey(),
    buffer_pubkey,
    minimum_balance,
    program_len as u64,
    loader_id,
)
```

and the ELF data is uploaded to the created account.
```rust
loader_instruction::write(buffer_pubkey, loader_id, offset, bytes)
```

Solana programs can be `upgraded` by default. That is, it is possible to `redeploy` a new ELF object (`BPF` bytecode) to the same Solana program account.

```sh
solana program deploy --upgrade-authority
```

![solana-deploy](/img/solana-deploy.svg)

## References
- [Getting Started with Solana Development](https://solana.com/news/getting-started-with-solana-development)
- [Solana Security Workshop](https://workshop.neodyme.io/index.html)
- [Writing Programs Overview](https://docs.solana.com/developing/on-chain-programs/overview)
- [Deploying Programs](https://docs.solana.com/developing/on-chain-programs/deploying)
- https://jstarry.notion.site/Program-deploys-29780c48794c47308d5f138074dd9838#d610bf6a3f3a4e8eb299a6d79549a233
- https://twitter.com/solana_devs/status/1572673862789369856