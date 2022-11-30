---
sidebar_position: 3
title: Decompilers, Emulators and More
hide_title: true
slug: /tools/decompilers-emulator-and-more
---

## Decompilers, Emulators and More

Smart Contracts are typically written in some high-level language such as Solidity, Rust and then compiled into byte code to be uploaded on the blockchain. Sometimes as a reverse engineer, you might not have the luxury of access to source code. 

This is where the disassemblers, decompilers, emulators and debuggers come into play. There are some awesome tools and articles made by the community.

---
Sergio Anguita of Certik's blog:

- https://curiousstuff.eu/post/part-1-building-ethereum-evm-decompiler-from-scratch.-getting-opcodes/
- https://curiousstuff.eu/post/part-2-building-ethereum-evm-decompiler-from-scratch.-getting-code-blocks/
---

[Richard Patel](https://twitter.com/terorie_dev) added Capstone disassembler for BPF. 
- https://github.com/radareorg/radare2/pull/20212
- https://twitter.com/terorie_dev/status/1532459642474971191

[Richard Patel](https://twitter.com/terorie_dev) Binary Ninja plugin for eBPF
- https://github.com/terorie/binaryninja-ebpf

---
14 places to learn about Solana Bytecode Format by  [Richard Patel](https://twitter.com/terorie_dev)

References:
- [bpf.wtf ISA reference](https://bpf.wtf/sol-0x03-isa/)
- [Linux eBPF ISA v1.0](https://docs.kernel.org/bpf/instruction-set.html)
- [iovisor/bpf-docs](https://github.com/iovisor/bpf-docs/blob/master/eBPF.md)

Implementations:

- [Rust instruction set](https://github.com/solana-labs/rbpf/blob/main/src/ebpf.rs)
- [Rust disassembler](https://github.com/solana-labs/rbpf/blob/main/src/disassembler.rs)
- [Rust interpreter](https://github.com/solana-labs/rbpf/blob/main/src/interpreter.rs)
- [Rust JIT compiler](https://github.com/solana-labs/rbpf/blob/main/src/jit.rs)
- [Go disassembler and interpreter](https://pkg.go.dev/go.firedancer.io/radiance/pkg/sbf)

Binary Analysis:
- [LLVM BPF target ](https://github.com/solana-labs/llvm-project/tree/solana-rustc/14.0-2022-03-22/llvm/lib/Target/BPF)
- [Capstone BPF disassembler ](https://github.com/capstone-engine/capstone/tree/next/arch/BPF)
- [Binary Ninja plugin (Python) ](https://github.com/otter-sec/bn-ebpf-solana)
- [Binary Ninja plugin (C++) ](https://github.com/terorie/binaryninja-ebpf)
- [Ghidra plugin ](https://github.com/neodyme-labs/SolDragon)
- [Radare2 plugin ](https://github.com/radareorg/radare2/blob/master/libr/anal/p/anal_bpf_cs.c)
---


Reverse Engineering Solana with Binary Ninja:
- https://osec.io/blog/tutorials/2022-08-27-reverse-engineering-solana/
- https://twitter.com/osec_io/status/1563688394437169152
---

Porting the Solana eBPF JIT compiler to ARM64 by Trail of Bits
- https://blog.trailofbits.com/2022/10/12/solana-jit-compiler-ebpf-arm64/

---

Symbolic execution of eBPF with [radius2](https://github.com/aemmitt-ns/radius) by [alkali](https://twitter.com/alkalinesec)
- https://twitter.com/alkalinesec/status/1533298958143000576
- https://github.com/aemmitt-ns/radius

---

[Addison Crump](https://twitter.com/addisoncrump_vr)'s blog on **Earn $200K by fuzzing for a weekend**
- https://secret.club/2022/05/11/fuzzing-solana.html
- https://secret.club/2022/05/11/fuzzing-solana-2.html

---

[TheZero](https://twitter.com/Th3Zer0)'s blog on **A Sneak Peek into Smart Contracts Reversing and Emulation**
- https://www.shielder.com/blog/2022/04/a-sneak-peek-into-smart-contracts-reversing-and-emulation/

---

[Will Schwab](https://mobile.twitter.com/wschwab_)'s about their experiences reverse engineering smart contract articles from bytecode and calldata: 
- [Belisarius and the Horde Chapter 1: Cracking the Contract](https://mirror.xyz/wschwab.eth/BNalhR2Z3jsyB24CUAiMKGLbwz411j0QYU-aIkkzaI0)
- [Belisarius and the Horde Chapter 2: The Contract and the Calldata](https://mirror.xyz/wschwab.eth/cB8O2y3BqKublvhEhgsg7iX1B-Aee_cGCBZ5K6NWkFA)


