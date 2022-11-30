---
sidebar_position: 2
title: Static and Dynamic Analysis
hide_title: true
slug: /tools/tools
---

## Static and Dynamic Analysis
### Static Source Code Analysis
- [Slither](https://github.com/crytic/slither): Static analysis framework with detectors for many common Solidity issues. It has taint and value tracking capabilities and is written in Python.
- [Contract Library](https://library.dedaub.com/contracts/hottest): Decompiler and security analysis tool for all deployed contracts.
- [MadMax](https://github.com/nevillegrech/MadMax): Static analysis tool for gas DoS vulnerabilities.
- [Gigahorse](https://github.com/nevillegrech/gigahorse-toolchain): Fast binary lifter and program analysis framework written in Datalog.
- [Securify](https://github.com/eth-sri/securify2): Securify 2.0 is a security scanner for Ethereum smart contracts based on the research paper [Securify: Practical Security Analysis of Smart Contracts](https://files.sri.inf.ethz.ch/website/papers/ccs18-securify.pdf).
- [Oyente](https://github.com/enzymefinance/oyente): Analyze Ethereum code to find common vulnerabilities, based on the research paper [Making Smart Contracts Smarter](https://www.comp.nus.edu.sg/~prateeks/papers/Oyente.pdf).

### Visualization Tools
- [Solidity Visual Auditor](https://github.com/ConsenSys/vscode-solidity-auditor): This extension contributes security centric syntax and semantic highlighting, a detailed class outline and advanced Solidity code insights to Visual Studio Code
- [Surya](https://github.com/ConsenSys/surya): Utility tool for smart contract systems, offering a number of visual outputs and information about the contracts' structure. Also supports querying the function call graph.
- [VSCode Ethereum Security Bundle](https://github.com/tintinweb/vscode-ethereum-security-bundle): A meta-extension bundling vscode marketplace plugins for secure Ethereum smart contract development.

### Dynamic Analysis
- [Mythril](https://github.com/ConsenSys/mythril): The Swiss army knife for smart contract security. It uses symbolic execution, SMT solving and taint analysis to detect a variety of security vulnerabilities.
- [Certora](https://www.certora.com/)
- [Echidna](https://github.com/crytic/echidna): The only available fuzzer for Ethereum software. Uses property testing to generate malicious inputs that break smart contracts.
- [Manticore](https://github.com/trailofbits/manticore): Dynamic binary analysis tool with EVM support.
- [Vertigo](https://github.com/JoranHonig/vertigo)
- [Octopus](https://github.com/FuzzingLabs/octopus): Security Analysis tool for Blockchain Smart Contracts with support of EVM and (e)WASM.
- [sFuzz](https://github.com/duytai/sFuzz): Efficient fuzzer inspired from AFL to find common vulnerabilities.
- [EVM lab](https://github.com/ethereum/evmlab): Rich tool package to interact with the EVM. Includes a VM, Etherchain API, and a trace-viewer.
- [ethereum-graph-debugger](https://github.com/fergarrui/ethereum-graph-debugger): Graphical EVM debugger.
- [chinfuzz by ant4g0nist](https://github.com/ant4g0nist/chinfuzz): Tezos smart contract fuzzer
- [FuzzyVM](https://github.com/MariusVanDerWijden/FuzzyVM)

## Slither

Slither usage:
```sh
coder@training:~/labs/not-so-smart-contracts/denial_of_service$ slither -h
usage: slither target [flag]

target can be:
        - file.sol // a Solidity file
        - project_directory // a project directory. See https://github.com/crytic/crytic-compile/#crytic-compile for the supported platforms
        - 0x.. // a contract on mainet
        - NETWORK:0x.. // a contract on a different network. Supported networks: mainet,ropsten,kovan,rinkeby,goerli,tobalaba,bsc,testnet.bsc,arbi,testnet.arbi,poly,avax,testnet.avax,ftm

For usage information, see https://github.com/crytic/slither/wiki/Usage

optional arguments:
  -h, --help            show this help message and exit
  --version             displays the current version

Compile options:
  --compile-force-framework COMPILE_FORCE_FRAMEWORK
                        Force the compile to a given framework (solc,truffle,embark,dapp,etherlime,etherscan,vyper,waffle,brownie,solc-
                        json,buidler,hardhat,foundry,standard,archive)
  --compile-remove-metadata
                        Remove the metadata from the bytecodes
  --compile-custom-build COMPILE_CUSTOM_BUILD
                        Replace platform specific build command
  --ignore-compile      Do not run compile of any platform

Solc options:
  --solc SOLC           solc path
  --solc-remaps SOLC_REMAPS
                        Add remapping
  --solc-args SOLC_ARGS
                        Add custom solc arguments. Example: --solc-args "--allow-path /tmp --evm-version byzantium".
  --solc-disable-warnings
                        Disable solc warnings
  --solc-working-dir SOLC_WORKING_DIR
                        Change the default working directory
  --solc-solcs-select SOLC_SOLCS_SELECT
                        Specify different solc version to try (env config). Depends on solc-select
  --solc-solcs-bin SOLC_SOLCS_BIN
                        Specify different solc version to try (path config). Example: --solc-solcs-bin solc-0.4.24,solc-0.5.3
  --solc-standard-json  Compile all specified targets in a single compilation using solc standard json
  --solc-force-legacy-json
                        Force the solc compiler to use the legacy json ast format over the compact json ast format

Truffle options:
  --truffle-ignore-compile
                        Do not run truffle compile
  --truffle-build-directory TRUFFLE_BUILD_DIRECTORY
                        Use an alternative truffle build directory
  --truffle-version TRUFFLE_VERSION
                        Use a local Truffle version (with npx)
  --truffle-overwrite-config
                        Use a simplified version of truffle-config.js for compilation
  --truffle-overwrite-version TRUFFLE_OVERWRITE_VERSION
                        Overwrite solc version in truffle-config.js (only if --truffle-overwrite-config)

Embark options:
  --embark-ignore-compile
                        Do not run embark build
  --embark-overwrite-config
                        Install @trailofbits/embark-contract-export and add it to embark.json

Dapp options:
  --dapp-ignore-compile
                        Do not run dapp build

Etherlime options:
  --etherlime-ignore-compile
                        Do not run etherlime compile
  --etherlime-compile-arguments
                        Add arbitrary arguments to etherlime compile (note: [dir] is the the directory provided to crytic-compile)

Etherscan options:
  --etherscan-only-source-code
                        Only compile if the source code is available.
  --etherscan-only-bytecode
                        Only looks for bytecode.
  --etherscan-apikey ETHERSCAN_API_KEY
                        Etherscan API key.
  --arbiscan-apikey ARBISCAN_API_KEY
                        Etherscan API key.
  --polygonscan-apikey POLYGONSCAN_API_KEY
                        Etherscan API key.
  --avax-apikey AVAX_API_KEY
                        Etherscan API key.
  --ftmscan-apikey FTMSCAN_API_KEY
                        Etherscan API key.
  --bscan-apikey BSCAN_API_KEY
                        Etherscan API key.
  --etherscan-export-directory ETHERSCAN_EXPORT_DIR
                        Directory in which to save the analyzed contracts.

Waffle options:
  --waffle-ignore-compile
                        Do not run waffle compile
  --waffle-config-file WAFFLE_CONFIG_FILE
                        Provide a waffle config file

NPX options:
  --npx-disable         Do not use npx

Buidler options:
  --buidler-ignore-compile
                        Do not run buidler compile
  --buidler-cache-directory BUIDLER_CACHE_DIRECTORY
                        Use an alternative buidler cache directory (default ./cache)
  --buidler-skip-directory-name-fix
                        Disable directory name fix (see https://github.com/crytic/crytic-compile/issues/116)

hardhat options:
  --hardhat-ignore-compile
                        Do not run hardhat compile
  --hardhat-cache-directory HARDHAT_CACHE_DIRECTORY
                        Use an alternative hardhat cache directory (default ./cache)
  --hardhat-artifacts-directory HARDHAT_ARTIFACTS_DIRECTORY
                        Use an alternative hardhat artifacts directory (default ./artifacts)

Detectors:
  --detect DETECTORS_TO_RUN
                        Comma-separated list of detectors, defaults to all, available detectors: abiencoderv2-array, arbitrary-send, array-by-reference, controlled-
                        array-length, assembly, assert-state-change, backdoor, weak-prng, boolean-cst, boolean-equal, shadowing-builtin, constable-states, constant-
                        function-asm, constant-function-state, pragma, controlled-delegatecall, costly-loop, dead-code, delegatecall-loop, deprecated-standards,
                        divide-before-multiply, enum-conversion, external-function, function-init-state, erc20-interface, erc721-interface, solc-version, incorrect-
                        equality, incorrect-unary, shadowing-local, locked-ether, low-level-calls, mapping-deletion, events-access, events-maths, missing-
                        inheritance, missing-zero-check, incorrect-modifier, msg-value-loop, calls-loop, multiple-constructors, name-reused, naming-convention,
                        variable-scope, protected-vars, public-mappings-nested, redundant-statements, reentrancy-benign, reentrancy-eth, reentrancy-events,
                        reentrancy-unlimited-gas, reentrancy-no-eth, reused-constructor, rtlo, shadowing-abstract, incorrect-shift, similar-names, shadowing-state,
                        storage-array, suicidal, timestamp, too-many-digits, tx-origin, tautology, unchecked-lowlevel, unchecked-send, unchecked-transfer,
                        unimplemented-functions, erc20-indexed, uninitialized-fptr-cst, uninitialized-local, uninitialized-state, uninitialized-storage, unprotected-
                        upgrade, unused-return, unused-state, void-cst, write-after-write
  --list-detectors      List available detectors
  --exclude DETECTORS_TO_EXCLUDE
                        Comma-separated list of detectors that should be excluded
  --exclude-dependencies
                        Exclude results that are only related to dependencies
  --exclude-optimization
                        Exclude optimization analyses
  --exclude-informational
                        Exclude informational impact analyses
  --exclude-low         Exclude low impact analyses
  --exclude-medium      Exclude medium impact analyses
  --exclude-high        Exclude high impact analyses
  --show-ignored-findings
                        Show all the findings

Printers:
  --print PRINTERS_TO_RUN
                        Comma-separated list fo contract information printers, available printers: cfg, constructor-calls, contract-summary, data-dependency,
                        echidna, function-id, function-summary, modifiers, call-graph, evm, human-summary, inheritance, inheritance-graph, slithir, slithir-ssa,
                        pausable, vars-and-auth, require, variable-order
  --list-printers       List available printers

Additional options:
  --json JSON           Export the results as a JSON file ("--json -" to export to stdout)
  --sarif SARIF         Export the results as a SARIF JSON file ("--sarif -" to export to stdout)
  --json-types JSON_TYPES
                        Comma-separated list of result types to output to JSON, defaults to detectors,printers. Available types:
                        compilations,console,detectors,printers,list-detectors,list-printers
  --zip ZIP             Export the results as a zipped JSON file
  --zip-type ZIP_TYPE   Zip compression type. One of lzma,stored,deflated,bzip2. Default lzma
  --markdown-root MARKDOWN_ROOT
                        URL for markdown generation
  --disable-color       Disable output colorization
  --filter-paths FILTER_PATHS
                        Comma-separated list of paths for which results will be excluded
  --triage-mode         Run triage mode (save results in slither.db.json)
  --config-file CONFIG_FILE
                        Provide a config file (default: slither.config.json)
  --solc-ast            Provide the contract as a json AST
  --generate-patches    Generate patches (json output only)
```
Slither available printers:

| Num |      Printer      |                               What it Does                               |
|---    |---    |---    |
|  1  |     call-graph    |           Export the call-graph of the contracts to a dot file           |
|  2  |        cfg        |                     Export the CFG of each functions                     |
|  3  | constructor-calls |                     Print the constructors executed                      |
|  4  |  contract-summary |                     Print a summary of the contracts                     |
|  5  |  data-dependency  |               Print the data dependencies of the variables               |
|  6  |      echidna      |                    Export Echidna guiding information                    |
|  7  |        evm        |             Print the evm instructions of nodes in functions             |
|  8  |    function-id    |             Print the keccack256 signature of the functions              |
|  9  |  function-summary |                     Print a summary of the functions                     |
|  10 |   human-summary   |             Print a human-readable summary of the contracts              |
|  11 |    inheritance    |            Print the inheritance relations between contracts             |
|  12 | inheritance-graph |       Export the inheritance graph of each contract to a dot file        |
|  13 |     modifiers     |               Print the modifiers called by each function                |
|  14 |      pausable     |              Print functions that do not use whenNotPaused               |
|  15 |      require      |           Print the require and assert calls of each function            |
|  16 |      slithir      |            Print the slithIR representation of the functions             |
|  17 |    slithir-ssa    |            Print the slithIR representation of the functions             |
|  18 |   variable-order  |              Print the storage order of the state variables              |
|  19 |   vars-and-auth   | Print the state variables written and the authorization of the functions |

```sh
coder@training:~/labs/not-so-smart-contracts/denial_of_service$ slither --print contract-summary auction.sol 
Compilation warnings/errors on auction.sol:
auction.sol:51:5: Warning: Failure condition of 'send' ignored. Consider using 'transfer' instead.
    msg.sender.send(refund);
    ^---------------------^


+ Contract DosAuction (Most derived contract)
  - From DosAuction
    - bid() (public)

+ Contract SecureAuction (Most derived contract)
  - From SecureAuction
    - bid() (external)
    - withdraw() (external)

auction.sol analyzed (2 contracts)
coder@training:~/labs/not-so-smart-contracts/denial_of_service$ slither --print human-summary auction.sol 
Compilation warnings/errors on auction.sol:
auction.sol:51:5: Warning: Failure condition of 'send' ignored. Consider using 'transfer' instead.
    msg.sender.send(refund);
    ^---------------------^


Compiled with solc
Number of lines: 53 (+ 0 in dependencies, + 0 in tests)
Number of assembly lines: 0
Number of contracts: 2 (+ 0 in dependencies, + 0 tests) 

Number of optimization issues: 1
Number of informational issues: 3
Number of low issues: 0
Number of medium issues: 1
Number of high issues: 0


+---------------+-------------+------+------------+--------------+-------------+
|      Name     | # functions | ERCS | ERC20 info | Complex code |   Features  |
+---------------+-------------+------+------------+--------------+-------------+
|   DosAuction  |      1      |      |            |      No      | Receive ETH |
|               |             |      |            |              |   Send ETH  |
| SecureAuction |      2      |      |            |      No      | Receive ETH |
|               |             |      |            |              |   Send ETH  |
+---------------+-------------+------+------------+--------------+-------------+
auction.sol analyzed (2 contracts)
coder@training:~/labs/not-so-smart-contracts/denial_of_service$ 
```

## Echinda
- [Fuzzing Tools Series: Echidna](https://www.youtube.com/watch?v=kAfknRlvAt0)
- [Echidna, a smart fuzzer for Ethereum](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/)
- [Using Echidna to test a smart contract library](https://blog.trailofbits.com/2020/08/17/using-echidna-to-test-a-smart-contract-library/)
- [Fuzzing with Echidna](https://0xmacro.com/blog/fuzzing-with-echidna/)

## Foundry Fuzzing
- [Fuzz Testing](https://book.getfoundry.sh/forge/fuzz-testing)
- [Testing with Foundry](https://www.youtube.com/watch?v=pgh74-XulXg)

## References

- https://www.certora.com/#Education
- https://consensys.github.io/smart-contract-best-practices/security-tools/
- [MythX](https://mythx.io/)
- [Slither – a Solidity static analysis framework](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)