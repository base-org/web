---
title: 'Signature Mint NFT'
slug: /signature-mint-nft
description: A tutorial that teaches how to create a signature mint, in which minters pay their own gas, but must first be given a valid signed authorization.
author: briandoyle81
keywords: [Solidity, ERC-721, token, NFT, signature mint, viem, soulbound]
tags: ['nft']
difficulty: intermediate
hide_table_of_contents: false
displayed_sidebar: null
---

A _signature mint_ is a term for an NFT mint in which the recipient of the NFT pays for their own gas to receive the NFT, but may only do so if they possess a correct message signed by the owner or authorized address of the mint contract. Reasons for doing this include allowing fiat payment of minting fees, allowing holders of an NFT on one chain to mint that NFT on an unrelated chain, or gating the mint to users who meet other specific offchain requirements.

Signature mints are not particularly complex, but they remain challenging to implement. Because they make use of both hashing and cryptography, there are no partially-correct states - either everything is exactly right and the mint works, or **something** is wrong **somewhere** and it doesn't.

Combined with the rapid changes in Solidity, library contracts, and frontend libraries, troubleshooting errors is particularly difficult.

---

## Objectives

By the end of this tutorial you should be able to:

- Cryptographically sign a message with a wallet
- Validate a signed message in a smart contract
- Implement a signature ERC-721 mint

---

## Prerequisites

### ERC-721 Tokens

This tutorial assumes that you are able to write, test, and deploy your own ERC-721 tokens using the Solidity programming language. If you need to learn that first, check out our content in [Base Camp] or the sections specific to [ERC-721 Tokens]!

### Vercel

You'll need to be comfortable deploying your app to [Vercel], or using another solution on your own. Check out our tutorial on [deploying with Vercel] if you need a refresher!

---

## Building the Contract

Start by setting up an [OpenZeppelin ERC-721] contract. Set up variables and use the constructor to assign:

- A name for the collection
- Symbol for the collection
- Description
- IPFS Hash for the NFT art (assuming the same art for each NFT)
- A counter to keep track of which NFT id is next

```Solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SoulboundSignatureMint is ERC721, Ownable {
    string public nameString;
    string public description;
    string public tokenArtIPFSId;
    uint public counter;

    constructor(
      string memory _nameString,
      string memory _symbol,
      string memory _tokenArtIPFSId,
      string memory _description
      ) ERC721(_nameString, _symbol) Ownable(msg.sender) {
      nameString = _nameString;
      description = _description;
      tokenArtIPFSId = _tokenArtIPFSId;
    }
}
```

You're also using `Ownable` to assign an owner to this contract. You could instead just save an address for the authorized signer if you aren't going to add any functionality only the owner can invoke.

### Public Mint Function

For the `public`-facing mint function, create a function called `mintTo` that accepts an `address` for the `_recipient`.

:::info

A common pattern used to be to simply mint the token and give it to `msg.sender`. This practice is falling out of favor. Allowing the recipient to be different than the sender gives greater flexibility. Doing so is also necessary to assign the right NFT owner in the event the user is using a smart contract wallet, paymaster, or other form of account abstraction.

:::

```Solidity
function mintTo(address _recipient, bytes memory _signature) public {
  counter++;
  _safeMint(msg.sender, counter);
}
```

### Onchain Metadata

Rather than pointing to a `json` file on the traditional internet, you can put your metadata directly in the contract. To do so, first import some helper libraries:

```Solidity
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
```

Next, `override` the functions for `_baseURI` and `tokenURI` to return base 64 encoded json metadata with the information you supplied in the constructor:

```Solidity
function _baseURI() internal pure override returns (string memory) {
  return "data:application/json;base64,";
}

function tokenURI(uint _tokenId) public view override returns (string memory) {
  if(_tokenId > counter) {
    revert InvalidTokenId(_tokenId);
  }

  string memory json = Base64.encode(
    bytes(
      string(
        abi.encodePacked(
          '{"name": "',
          nameString,
          ' #: ',
          Strings.toString(_tokenId),
          '","description": "',
          description,
          '", "image": "ipfs://',
          tokenArtIPFSId,
          '"}'
        )
      )
    )
  );

  return string(abi.encodePacked(_baseURI(), json));
}
```

**Be very careful** setting up the single and double quotes above and be sure to test this function to make sure the result is valid json metadata. An error here will break the NFT and it won't show up correctly in wallets or marketplaces!

### Preventing Transfers

_Soulbound_ is a video-game term that means that an item is permanently attached to the receiver - it can **not** be transferred. It's up to you if this restriction fits your design goals. We use it often because our NFTs are intended to be fun mementos or markers of personal accomplishment and not something that will ever have monetary value. Preventing trading reduces speculation and farming on something we did for fun!

To prevent transfers other than the initial mint, you can `override` the `_update` function.

:::info

Previously, this was done with the `_beforeTransfer` function. Current versions of OpenZeppelin's ERC-721 implementation have replaced that function with `_update`.

:::

```Solidity
/**
  * Disallow transfers (Soulbound NFT)
  */
/**
  * @dev Internal function to handle token transfers.
  * Restricts the transfer of Soulbound tokens.
  */
function _update(address to, uint256 tokenId, address auth)
    internal
    override(ERC721)
    returns (address)
{
    address from = _ownerOf(tokenId);
    if (from != address(0) && to != address(0)) {
        revert SoulboundToken();
    }

    return super._update(to, tokenId, auth);
}
```

### Deploy and Test

Before getting into the complexity of validating a cryptographic signature, it's a good idea to validate your contract and make sure it is working as expected. You'll need to pin an image to IPFS and get a hash for it to use in your metadata. You can use a service like [Pinata] to help with that.

### Adding Signature Validation

To validate the signature that you'll later create in your backend, you'll use a pair of cryptography utilities from OpenZeppelin:

```Solidity
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
```

```Solidity
using ECDSA for bytes32;
using MessageHashUtils for bytes32;
```

These utilities abstract away most of the complexity involved in working with messages adhering to the [ERC-191] and [EIP-712] specifications. Importantly, they work with the message format that prefixes `"\x19Ethereum Signed Message:\n32"` to the message. You **must** also do this when creating the signed message!

Add a function to `validateSignature`:

```Solidity
function validateSignature(address _recipient, bytes memory _signature) public view returns (bool) {
  bytes32 messageHash = keccak256(abi.encodePacked(_recipient));
  bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
  address signer = ethSignedMessageHash.recover(_signature);

  return signer == owner();
}
```

The way the verification works is a little obtuse, particularly given that you haven't created the `_signature` yet. The function has two inputs:

- The message or variables in the signed message
  - Here, this is the `address` of the `_recipient`
  - The `_signature`, or signed message provided by the user claiming they have been given permission to mint the NFT

First, the function recreates the hash of the data to be signed. If you were including other variables, you'd include them here as well. Next, `messageHash.toEthSignedMessageHash` prepends the bytes representation of `"\x19Ethereum Signed Message:\n32"` to the message, then hashes the result.

Finally, calling `recover` with `ethSignedMessageHash` and the `_signature` attempts to recover the signing `address` from the `_signature` using the **independently constructed** message data.

If the recovered address matches the expected address, in this case, the contract owner, then the provided `_signature` is valid. If the addresses do not match, then the `_signature` is not valid.

Update your `mintTo` function to make use of the validation:

```Solidity
function mintTo(address _recipient, bytes memory _signature) public {
  if(!validateSignature(_recipient, _signature)) {
    revert InvalidSignature();
  }

  counter++;
  _safeMint(msg.sender, counter);
}
```

:::danger

Nothing in the above validation method prevents a user, or a third party, from obtaining a valid, signed message from a previous transaction and reusing it for a **new** transaction. In this case, it doesn't matter because signature re-use would only allow minting more soulbound NFTs for the address within the signature.

Other design requirements should use a nonce as a part of the signed data to prevent signature reuse.

:::

## Signing the Message

If you're using [Hardhat] with [viem], you can write tests to verify the signing and validation mechanisms are working. Otherwise, there isn't a point, as success is dependent on the exact and specific way and order signing happens. If you're using a different toolkit to write your smart contracts, continue in your backend directly.

If you're using a different library, you'll need to do research to figure out how to **exactly** reproduce the steps below.

### Setting Up the Test

Add a new test file and fill out a skeleton to deploy your contract and run a test:

```typescript
import { loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers';
import { expect } from 'chai';
import hre from 'hardhat';

describe('Test', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploySignatureFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, signer0, signer1] = await hre.viem.getWalletClients();

    const soulboundSignatureMint = await hre.viem.deployContract('SoulboundSignatureMint', [
      'Cool NFT Name', // Name
      'CNFT', // Symbol
      'QmRsQCyTEALYnHvBupFcs2ofzeeswEEEGN...', // IPFS Hash
      'This is a cool NFT!', // Description
    ]);

    const publicClient = await hre.viem.getPublicClient();

    return {
      soulboundSignatureMint,
      owner,
      signer1,
      publicClient,
    };
  }

  describe('Mint', function () {
    it('Should validate the signed message', async function () {
      const { soulboundSignatureMint, owner, signer0, signer1 } = await loadFixture(
        deploySignatureFixture,
      );

      const ownerAddress = await owner.account.address;
      const signer1Address = await signer1.account.address;

      // TODO...

      // Signer 1 calls the mintTo function with the signature
      expect(await soulboundSignatureMint.write.mintTo([signer1Address, signature])).to.be.ok;
    });
  });
});
```

You can use the example in the documentation for [signMessage] in the [viem] wallet client to get started, but it will **not** work as expected.

```typescript
// BAD CODE EXAMPLE DO NOT USE!
const signature = await owner.signMessage({
  message: signer1Address,
});
```

Try it, and it will fail. Add a log to your contract and you'll see that the recovered `signer` address is random, rather than the first address in the list of default Hardhat accounts.

The reason for this is that while `signMessage` does follow the previously mentioned standards, prepends `"\x19Ethereum Signed Message:\n32"` to the message, and correctly signs it, it does **not** prepare the data to be signed in exactly the same way as the smart contract converts the `address` to `bytes32`.

To fix this, first import some helper functions from [viem]:

```typescript
import { keccak256, encodePacked, toBytes } from 'viem';
```

Then `encodePacked` and `keccak256` hash your variables and turn them into `bytes`, just like you did in the contract in `validateSignature`:

```typescript
const message = keccak256(encodePacked(['address'], [signer1Address]));
const messageBytes = toBytes(message);
```

Finally, call the wallet `signMessage` function with the newly assembled `messageBytes`. You'll need to mark the data representation as `raw`:

```typescript
const signature = await owner.signMessage({
  message: { raw: messageBytes },
});
```

Test again, and it will pass!

## Signing from the Backend

It's up to you to determine the conditions that you're willing to sign a message. Once those conditions are met, you can use a similar process to load a wallet from your private key and sign the message on any TypeScript backend:

```typescript
const authorizedAccount = privateKeyToAccount(COINBASE_WALLET_KEY as `0x${string}`);

const authorizedClient = createWalletClient({
  account: authorizedAccount,
  chain: base,
  transport: http(), // Leave empty for local account
});

// Align signed message with OpenZeppelin/Solidity

const messageToSign = keccak256(encodePacked(['address'], [userAddress as `0x${string}`]));
const messageBytes = getBytes(messageToSign);

// Create an Ethereum Signed Message with the user's address
const signedMessage = await authorizedClient.signMessage({
  message: { raw: messageBytes },
});
console.log('User address:', userAddress);
console.log('Signed message:', signedMessage);

const data = encodeFunctionData({
  abi: mintContractData.abi,
  functionName: 'mintTo',
  args: [userAddress, signedMessage],
});
```

:::info

`privateKeyToAccount` expects that your key starts with `0x`. You may need to manually add that depending on the tool you exported it from.

:::

## Conclusion

In this tutorial, you've learned how to create a signature mint, which allows you to set conditions on a backend before a user is allowed to mint your NFT. You've learned the detailed and specific steps needed to align [viem]'s method of signing messages with [OpenZeppelin]'s method of verifying them. Finally, you've learned a few of the risks and considerations needed in designing this type of mint.

---

[Base Camp]: https://base.org.camp
[ERC-721 Tokens]: https://docs.base.org/base-camp/docs/erc-721-token/erc-721-standard-video
[Vercel]: https://vercel.com
[deploying with Vercel]: /tutorials/farcaster-frames-deploy-to-vercel
[OpenZeppelin ERC-721]: https://docs.openzeppelin.com/contracts/2.x/api/token/erc721
[Pinata]: https://www.pinata.cloud/
[ERC-191]: https://eips.ethereum.org/EIPS/eip-191
[EIP-712]: https://eips.ethereum.org/EIPS/eip-712
[Hardhat]: https://hardhat.org/
[viem]: https://viem.sh/
[signMessage]: https://viem.sh/docs/actions/wallet/signMessage.html
[OpenZeppelin]: https://www.openzeppelin.com/
