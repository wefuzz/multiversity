"use strict";(self.webpackChunkhackfi_training=self.webpackChunkhackfi_training||[]).push([[7444],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(n),d=i,f=u["".concat(p,".").concat(d)]||u[d]||m[d]||r;return n?a.createElement(f,o(o({ref:t},c),{},{components:n})):a.createElement(f,o({ref:t},c))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=u;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var s=2;s<r;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},9453:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>m,frontMatter:()=>r,metadata:()=>l,toc:()=>s});var a=n(7462),i=(n(7294),n(3905));const r={sidebar_position:3,title:"Contract ABI Specification",hide_title:!0},o=void 0,l={unversionedId:"Smart-Contracts/solidity-101/contract-abi",id:"Smart-Contracts/solidity-101/contract-abi",title:"Contract ABI Specification",description:"ABI",source:"@site/docs/Smart-Contracts/solidity-101/contract-abi.md",sourceDirName:"Smart-Contracts/solidity-101",slug:"/Smart-Contracts/solidity-101/contract-abi",permalink:"/Smart-Contracts/solidity-101/contract-abi",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Contract ABI Specification",hide_title:!0},sidebar:"tutorialSidebar",previous:{title:"Layout of State Variables in Storage",permalink:"/Smart-Contracts/solidity-101/memory-layout"},next:{title:"web3.js/py",permalink:"/Smart-Contracts/solidity-101/web3py"}},p={},s=[{value:"ABI",id:"abi",level:2},{value:"References",id:"references",level:2}],c={toc:s};function m(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"abi"},"ABI"),(0,i.kt)("p",null,"The Contract Application Binary Interface (ABI) is the standard way to interact with contracts in the Ethereum ecosystem, both from outside the blockchain and for contract-to-contract interaction."),(0,i.kt)("p",null,"You can interact with other contracts by declaring an Interface."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sol",metastring:"showLienNumbers",showLienNumbers:!0},"// SPDX-License-Identifier: MIT\npragma solidity ^0.8.13;\n\n// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0/contracts/token/ERC20/IERC20.sol\ninterface IERC20 {\n    function totalSupply() external view returns (uint);\n\n    function balanceOf(address account) external view returns (uint);\n\n    function transfer(address recipient, uint amount) external returns (bool);\n\n    function allowance(address owner, address spender) external view returns (uint);\n\n    function approve(address spender, uint amount) external returns (bool);\n\n    function transferFrom(\n        address sender,\n        address recipient,\n        uint amount\n    ) external returns (bool);\n\n    event Transfer(address indexed from, address indexed to, uint value);\n    event Approval(address indexed owner, address indexed spender, uint value);\n}\n")),(0,i.kt)("p",null,"ABI acts as a function selector, defining the specific methods that can be called to a smart contract for execution. These specific methods and their connected data types are listed in a generated JSON RPC file."),(0,i.kt)("p",null,"The JSON format for a contract\u2019s interface is given by an array of function, event and error descriptions. "),(0,i.kt)("p",null,"A ",(0,i.kt)("inlineCode",{parentName:"p"},"function")," description is a JSON object with the fields:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"type"),": ",(0,i.kt)("inlineCode",{parentName:"p"},'"function"'),", ",(0,i.kt)("inlineCode",{parentName:"p"},'"constructor"'),", ",(0,i.kt)("inlineCode",{parentName:"p"},'"receive"')," (the :ref:",(0,i.kt)("inlineCode",{parentName:"p"},'"receive Ether" function <receive-ether-function>'),") or ",(0,i.kt)("inlineCode",{parentName:"p"},'"fallback"')," (the :ref:",(0,i.kt)("inlineCode",{parentName:"p"},'"default" function <fallback-function>'),");")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"name"),": the name of the function;")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"inputs"),": an array of objects, each of which contains:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"name"),": the name of the parameter."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"type"),": the canonical type of the parameter (more below)."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"components"),": used for tuple types (more below)."))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"outputs"),": an array of objects similar to ",(0,i.kt)("inlineCode",{parentName:"p"},"inputs"),".")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"stateMutability"),": a string with one of the following values: ",(0,i.kt)("inlineCode",{parentName:"p"},"pure")," (:ref:",(0,i.kt)("inlineCode",{parentName:"p"},"specified to not read\nblockchain state <pure-functions>"),"), ",(0,i.kt)("inlineCode",{parentName:"p"},"view")," (:ref:",(0,i.kt)("inlineCode",{parentName:"p"},"specified to not modify the blockchain\nstate <view-functions>"),"), ",(0,i.kt)("inlineCode",{parentName:"p"},"nonpayable")," (function does not accept Ether - the default) and ",(0,i.kt)("inlineCode",{parentName:"p"},"payable")," (function accepts Ether)."))),(0,i.kt)("p",null,"Constructor and fallback function never have ",(0,i.kt)("inlineCode",{parentName:"p"},"name")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"outputs"),". Fallback function doesn't have ",(0,i.kt)("inlineCode",{parentName:"p"},"inputs")," either."),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"Sending non-zero Ether to non-payable function will revert the transaction.")),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"The state mutability ",(0,i.kt)("inlineCode",{parentName:"p"},"nonpayable")," is reflected in Solidity by not specifying a state mutability modifier at all.")),(0,i.kt)("p",null,"An ",(0,i.kt)("inlineCode",{parentName:"p"},"event")," description is a JSON object with fairly similar fields:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"type"),": always ",(0,i.kt)("inlineCode",{parentName:"p"},'"event"'))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"name"),": the name of the event.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"inputs"),": an array of objects, each of which contains:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"name"),": the name of the parameter."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"type"),": the canonical type of the parameter (more below)."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"components"),": used for tuple types (more below)."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"indexed"),": ",(0,i.kt)("inlineCode",{parentName:"li"},"true")," if the field is part of the log's topics, ",(0,i.kt)("inlineCode",{parentName:"li"},"false")," if it one of the log's data segment."))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"anonymous"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"true")," if the event was declared as ",(0,i.kt)("inlineCode",{parentName:"p"},"anonymous"),"."))),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Errors")," look as follows:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"type"),": always ",(0,i.kt)("inlineCode",{parentName:"p"},'"error"'))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"name"),": the name of the error.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"inputs"),": an array of objects, each of which contains:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"name"),": the name of the parameter."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"type"),": the canonical type of the parameter (more below)."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"components"),": used for tuple types (more below).")))),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"There can be multiple errors with the same name and even with identical signature in the JSON array, for example if the errors originate from different\nfiles in the smart contract or are referenced from another smart contract. For the ABI, only the name of the error itself is relevant and not where it is\ndefined.")),(0,i.kt)("p",null,"Example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sol",metastring:"showLineNumbers title=Test.sol",showLineNumbers:!0,title:"Test.sol"},'// SPDX-License-Identifier: GPL-3.0\npragma solidity ^0.8.4;\n\n\ncontract Test {\n    constructor() { b = hex"12345678901234567890123456789012"; }\n    event Event(uint indexed a, bytes32 b);\n    event Event2(uint indexed a, bytes32 b);\n    error InsufficientBalance(uint256 available, uint256 required);\n    function foo(uint a) public { emit Event(a, b); }\n    bytes32 b;\n}\n')),(0,i.kt)("p",null,"would result in the JSON:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json",metastring:"title=Test.json showLineNumbers",title:"Test.json",showLineNumbers:!0},'[\n  {\n    "type": "error",\n    "inputs": [\n      {\n        "name": "available",\n        "type": "uint256"\n      },\n      {\n        "name": "required",\n        "type": "uint256"\n      }\n    ],\n    "name": "InsufficientBalance"\n  },\n  {\n    "type": "event",\n    "inputs": [\n      {\n        "name": "a",\n        "type": "uint256",\n        "indexed": true\n      },\n      {\n        "name": "b",\n        "type": "bytes32",\n        "indexed": false\n      }\n    ],\n    "name": "Event"\n  },\n  {\n    "type": "event",\n    "inputs": [\n      {\n        "name": "a",\n        "type": "uint256",\n        "indexed": true\n      },\n      {\n        "name": "b",\n        "type": "bytes32",\n        "indexed": false\n      }\n    ],\n    "name": "Event2"\n  },\n  {\n    "type": "function",\n    "inputs": [\n      {\n        "name": "a",\n        "type": "uint256"\n      }\n    ],\n    "name": "foo",\n    "outputs": []\n  }\n]\n')),(0,i.kt)("h2",{id:"references"},"References"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://docs.soliditylang.org/en/v0.8.16/abi-spec.html"},"Contract ABI Specification"))))}m.isMDXComponent=!0}}]);