"use strict";(self.webpackChunkhackfi_training=self.webpackChunkhackfi_training||[]).push([[644],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>d});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=a.createContext({}),s=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=s(e.components);return a.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,u=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),m=s(n),d=o,k=m["".concat(u,".").concat(d)]||m[d]||p[d]||r;return n?a.createElement(k,i(i({ref:t},l),{},{components:n})):a.createElement(k,i({ref:t},l))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=m;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var s=2;s<r;s++)i[s]=n[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9485:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>p,frontMatter:()=>r,metadata:()=>c,toc:()=>s});var a=n(7462),o=(n(7294),n(3905));const r={sidebar_position:1,title:"Solana Vulnerabilities",hide_title:!0,slug:"/vulnerabilities-and-exploits/common-vulnerabilities/solana-vulnerabilities"},i=void 0,c={unversionedId:"Vulnerabilities and Exploits/common-vulnerabilities/solana",id:"Vulnerabilities and Exploits/common-vulnerabilities/solana",title:"Solana Vulnerabilities",description:"Signer authorization",source:"@site/docs/Vulnerabilities and Exploits/common-vulnerabilities/solana.md",sourceDirName:"Vulnerabilities and Exploits/common-vulnerabilities",slug:"/vulnerabilities-and-exploits/common-vulnerabilities/solana-vulnerabilities",permalink:"/vulnerabilities-and-exploits/common-vulnerabilities/solana-vulnerabilities",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Solana Vulnerabilities",hide_title:!0,slug:"/vulnerabilities-and-exploits/common-vulnerabilities/solana-vulnerabilities"},sidebar:"tutorialSidebar",previous:{title:"Vulnerabilities",permalink:"/vulnerabilities-and-exploits/common-vulnerabilities/vulnerabilities"},next:{title:"Post-mortem Reports",permalink:"/post-mortem-reports"}},u={},s=[{value:"Signer authorization",id:"signer-authorization",level:2},{value:"Account data matching",id:"account-data-matching",level:2},{value:"Checking account ownership",id:"checking-account-ownership",level:2},{value:"Type cosplay",id:"type-cosplay",level:2},{value:"Account initialization",id:"account-initialization",level:2},{value:"Arbitrary CPI",id:"arbitrary-cpi",level:2},{value:"Duplicate mutable accounts",id:"duplicate-mutable-accounts",level:2},{value:"Bump seed canonicalization",id:"bump-seed-canonicalization",level:2},{value:"References",id:"references",level:2}],l={toc:s};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"signer-authorization"},"Signer authorization"),(0,o.kt)("p",null,"If your ",(0,o.kt)("inlineCode",{parentName:"p"},"instruction")," takes in an ",(0,o.kt)("inlineCode",{parentName:"p"},"authority")," account, make sure the account has ",(0,o.kt)("inlineCode",{parentName:"p"},"signed")," the transaction."),(0,o.kt)("p",null,"Why? Because only the ",(0,o.kt)("inlineCode",{parentName:"p"},"owner")," of the ",(0,o.kt)("inlineCode",{parentName:"p"},"authority")," account can ",(0,o.kt)("inlineCode",{parentName:"p"},"sign")," for it\u2014but anyone can pass in the account as a non-signer."),(0,o.kt)("p",null,"Don't:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub struct Example<'info'> {\n    authority: AccountInfo<'info'>\n}\n")),(0,o.kt)("p",null,"DO:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub struct Example<'info'> {\n    authority: Signer<'info'>\n}\n")),(0,o.kt)("h2",{id:"account-data-matching"},"Account data matching"),(0,o.kt)("p",null,"Make sure that passed-in accounts contain valid data."),(0,o.kt)("p",null,"For example, if your instruction expects a token account, the token account should contain an owner, mint, amount, etc."),(0,o.kt)("p",null,"Otherwise, you may be operating with the wrong type of account!"),(0,o.kt)("admonition",{title:"DONT'",type:"danger"},(0,o.kt)("p",{parentName:"admonition"},"the token account can contain arbitrary, invalid data.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub struct Example<'info'> {\n    token: AccountInfo<'info'>,\n    authority: Signer<'info'>\n}\n")),(0,o.kt)("admonition",{title:"DO",type:"success"},(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("inlineCode",{parentName:"p"},"Anchor")," checks that the token account contains valid data, and that its owner is the signer of the transaction.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub struct Example<'info'> {\n    #[account(constraint = authorit.key == & token.owner)]\n    token: Account<'info', TokenAccount>,\n    authority: Signer<'info'>\n}\n")),(0,o.kt)("h2",{id:"checking-account-ownership"},"Checking account ownership"),(0,o.kt)("p",null,"Make sure the passed-in accounts are owned by the correct program."),(0,o.kt)("p",null,"For example, if your instruction expects a token account, it should be owned by the token program."),(0,o.kt)("admonition",{title:"DONT'",type:"danger"},(0,o.kt)("p",{parentName:"admonition"},"this code doesn't check to make sure the token account is ",(0,o.kt)("inlineCode",{parentName:"p"},"owned")," by the SPL token program, so it could be invalid.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},'let token = SplTokenAccount: : unpack (&ctx.accounts.token.data.borrow ( ) )?;\nif ctx.accounts.authority.key != &token.owner {\n    return Err (ProgramError::InvalidAccountData);\n}\nmsg! ("Your account balance is: {}", token. amount);\n')),(0,o.kt)("admonition",{title:"DO",type:"success"},(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("inlineCode",{parentName:"p"},"Anchor")," will verify account ownership for you!")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub struct Example<'info> {\n    #[account (constraint = authority.key == &token.owner)] token: Account<'info, TokenAccount>,\n    authority: Signer<'info>,\n}\n")),(0,o.kt)("h2",{id:"type-cosplay"},"Type cosplay"),(0,o.kt)("p",null,"Make sure one account type (e.g. User) can't be confused for another account type (e.g. Metadata)."),(0,o.kt)("p",null,"This one is a bit confusing, the examples should make it clearer."),(0,o.kt)("admonition",{title:"DONT'",type:"danger"},(0,o.kt)("p",{parentName:"admonition"},"you can't tell a deserialized User account from a deserialized Metadata account")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"#[derive (BorshSerialize, BorshDeserialize)]\npub struct User {\n    authority: Pubkey,\n}\n\n#[derive (BorshSerialize, BorshDeserialize)]\npub struct Metadata {\n    account: Pubkey,\n}\n")),(0,o.kt)("admonition",{title:"DO",type:"success"},(0,o.kt)("p",{parentName:"admonition"},'The manual way to fix this is by adding a "discriminant" to both accounts, i.e. something that allows you to distinguish between them.')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"#[derive (BorshSerialize, BorshDeserialize)]\npub struct User { discriminant: AccountDiscriminant,\n    authority: Pubkey,\n}\n\n#[derive (BorshSerialize, BorshDeserialize)]\npub struct Metadata { discriminant: AccountDiscriminant,\n    account: Pubkey,\n}\n\n#[derive (BorshSerialize, BorshDeserialize, PartialEq) ]\npub enum AccountDiscriminant {\n    User,\n    Metadata,\n}\n")),(0,o.kt)("admonition",{title:"DO",type:"success"},(0,o.kt)("p",{parentName:"admonition"},"The recommended way to fix this is by just using Anchor's #","[account]"," macro, which will automatically add an 8-byte discriminator to the start of the account. Much easier!")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"#[account]\npub struct User {\n    authority: Pubkey,\n}\n\n#[account]\npub struct Metadata {\n    account: Pubkey,\n}\n")),(0,o.kt)("h2",{id:"account-initialization"},"Account initialization"),(0,o.kt)("p",null,"This is similar to the previous vulnerability\u2014when initializing accounts, make sure you account for the discriminator."),(0,o.kt)("p",null,"E.g., you don't want to initialize the wrong type of account. And you may not want to re-initialize an already initialized account."),(0,o.kt)("admonition",{title:"DONT'",type:"danger"},(0,o.kt)("p",{parentName:"admonition"},"The user account could be another account type (since there is no discriminator). And this also lets people re-initialize previously initialized accounts.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"#[derive (Accounts) 1\npub struct Initialize<'info> { user: AccountInfo<' info>,\n    authority: Signer<'info>,\n}\n\n#[derive (BorshSerialize, BorshDeserialize)]\npub struct User {\n    authority: Pubkey,\n}\n\npub fn initialize (ct: Context<Initialize>) -> ProgramResult {\n    let mut user = User::try_from slice(&ct.accounts.user.data.borrow () ) . unwrap ( ) ;\n    user.authority = ct.accounts.authority.key ( );\n    let mut storage = ct.accounts.user.try borrow mut data)?;\n    user.serialize(storage.deref mut ( )) .unwrap ( ) ;\n    Ok(())\n}\n")),(0,o.kt)("admonition",{title:"DO",type:"success"},(0,o.kt)("p",{parentName:"admonition"},"using #","[account(init)]"," will create a new account and set its account discriminator.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"#[derive Accounts) 1\npub struct Init\u2039'info> \u2039\n    #[account (init, payer = authority, space = 8+32)] user: Account<'info, User>,\n    authority: Signer<'info>,\n    system program: Program<'info, System>,\n}\n")),(0,o.kt)("h2",{id:"arbitrary-cpi"},"Arbitrary CPI"),(0,o.kt)("p",null,"When performing CPIs, make sure you're invoking the correct program."),(0,o.kt)("admonition",{title:"DONT'",type:"danger"},(0,o.kt)("p",{parentName:"admonition"},"The token program account gets passed in by the user, and could actually be some other program")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn cpi(ct: Context<Cpi>, amount: u64) -> ProgramResult {\n    solana_program::program::invoke(\n        &sp1_token::instruction::transfer(\n            ctx.accounts.token_program.key,\n            ctx.accounts.source.key,\n            ct.accounts.destination.key,\n            ctx.accounts.authority.key,\n            &[],\n            amount,\n        )?,\n    & [\n        ctx.accounts.source.clone(),\n        ctx.accounts.destination.clone(),\n        ctx.accounts.authority.clone(),\n        ],\n    )\n}\n")),(0,o.kt)("admonition",{title:"DO",type:"success"},(0,o.kt)("p",{parentName:"admonition"},"The manual way to fix this is checking to make sure the token program account has the right address.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn cpi_secure (ct: Context<Cpi>, amount: u64) -> ProgramResult {\n        if &sp1_token::ID == ctx.accounts.token_program.key {\n            return Err (ProgramError:: IncorrectProgramId);\n        }\n        solana_program::program::invoke(\n            &spl_token::instruction::transfer(\n                ctx.accounts.token_program.key,\n                ctx.accounts.source.key,\n                ctx.accounts.destination.key,\n                ctx.accounts.authority.key,\n                &[],\n                amount,\n            )?,\n        & [\n            ctx.accounts.source.clone(),\n            ctx.accounts.destination.clone(),\n            ct.accounts.authority.clone\n        ],\n    )\n}\n")),(0,o.kt)("admonition",{title:"DO",type:"success"},(0,o.kt)("p",{parentName:"admonition"},"The recommended way to fix this is by using Anchor's wrapper of the SPL token program.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"use anchor_spl::token:: {self, Token, TokenAccount};\n\n#[program]\npub mod arbitrary pi recommended {\n    use super::*;\n    pub fn cpi (ctx: Context<Cpi>, amount: u64) -> ProgramResult {\n        token:: transfer (ctx.accounts.transfer_ctx(), amount)\n    }\n}\n\n#[derive (Accounts) ]\npub struct Cpi<'info> {\n    source: Account<'info, TokenAccount>,\n    destination: Account<'info, TokenAccount>,\n    authority: Signer<' info>,\n    token program: Program<' info, Token>,\n}\n\nimpl<'info> Cpi<'info> {\n    pub fn transfer ct(&self) -> CpiContext<'_, '_, '_, 'info, token::Transfer<'info>> {\n        let program = self.token_program.to_account_info();\n        let accounts = token:: Transfer {\n                from: self.source.to_account_info(),\n                to: self.destination.to_account_info(),\n                authority: self.authority.to_account_info(),\n            };\n        CpiContext:: new (program, accounts)\n    }\n}\n")),(0,o.kt)("h2",{id:"duplicate-mutable-accounts"},"Duplicate mutable accounts"),(0,o.kt)("p",null,"If your program takes in two mutable accounts of the same type, make sure people don't pass in the same account twice."),(0,o.kt)("admonition",{title:"DONT'",type:"danger"},(0,o.kt)("p",{parentName:"admonition"},"user_a and user_b may be the same account.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn update (ct: Context<Update>, a: u64, b: u64) -> ProgramResult {\n    let user_a = &mut ctx.accounts.user_a;\n    let user_b = &mut ctx.accounts.user_b;\n    user_a.data = a;\n    user_b.data = b;\n    Ok(())\n}\n\n#[derive (Accounts)]\npub struct Update\u2039'info> {\n    user_a: Account<'info, User>,\n    user_b: Account<'info, User>,\n}\n")),(0,o.kt)("admonition",{title:"DO",type:"success"},(0,o.kt)("p",{parentName:"admonition"},"use Anchor to verify that the two accounts are different.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"#[derive (Accounts) ]\npub struct Update<'info> {\n    #[account (constraint = user_a.key() != user_b.key())]\n    user_a: Account<'info, User>,\n    user_b: Account<'info, User>,\n}\n")),(0,o.kt)("h2",{id:"bump-seed-canonicalization"},"Bump seed canonicalization"),(0,o.kt)("p",null,"Often, you want to have a single PDA associated with a program ID + a set of seeds."),(0,o.kt)("p",null,"For example, associated token accounts (ATAs)."),(0,o.kt)("p",null,"Thus, when verifying ",(0,o.kt)("inlineCode",{parentName:"p"},"PDAs"),", you should use ",(0,o.kt)("inlineCode",{parentName:"p"},"find_program_address")," instead of ",(0,o.kt)("inlineCode",{parentName:"p"},"create_program_address"),"."),(0,o.kt)("admonition",{title:"DONT'",type:"danger"},(0,o.kt)("p",{parentName:"admonition"},"Since the bump is passed in by the user (and not verified), set_value could operate on multiple PDAs associated with the program ID + the set of seeds.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn set_value (ct: Context<BumpSeed>, key: u64, new_value: u64, bump: u8) -> ProgramResult {\n    let address = Pubkey::create_program_address (&[key.to_le_bytes().as_ref (), &[bump]], ctx.program_id)?;\n\n    if address != ct.accounts.data.key() {\n        return Err (ProgramError: :InvalidArgument);\n    }\n\n    ctx.accounts.data.value = new value;\n    Ok(())\n}\n")),(0,o.kt)("admonition",{title:"DO",type:"success"},(0,o.kt)("p",{parentName:"admonition"},"Both the PDA address and bump are verified, which means ",(0,o.kt)("inlineCode",{parentName:"p"},"set_value")," will only operate on one ",(0,o.kt)("inlineCode",{parentName:"p"},"canonical")," PDA.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn set value secure( ct: Context<BumpSeed>, key: u64, new_value: u64, bump: u8,) -> ProgramResult {\n    let (address, expected bump) =\n    Pubkey::find_program_address (&[key.to_le_bytes().as_ref (), &[bump]], ctx.program_id);\n    if address != ctx.accounts.data.key () {\n        return Err (ProgramError::InvalidArgument);\n    }\n    if expected bump != bump {\n        return Err (ProgramError:: InvalidArgument);\n    }\n    ctx.accounts.data.value = new value;\n    Ok(())\n}\n")),(0,o.kt)("h2",{id:"references"},"References"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://twitter.com/pencilflip/status/1483880018858201090"},"https://twitter.com/pencilflip/status/1483880018858201090")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/coral-xyz/sealevel-attacks/tree/master/programs"},"https://github.com/coral-xyz/sealevel-attacks/tree/master/programs")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://blog.neodyme.io/posts/solana_common_pitfalls/"},"https://blog.neodyme.io/posts/solana_common_pitfalls/"))))}p.isMDXComponent=!0}}]);