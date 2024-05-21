---
title: 'Thirdweb and Unreal - NFT Items'
slug: /thirdweb-unreal-nft-items
description: Learn how to use NFTs as in-game items using Thirdweb and Unreal.
author: briandoyle81
keywords: [Solidity, ERC-721, token, NFT, thirdweb, unreal]
tags: ['nft']
difficulty: intermediate
hide_table_of_contents: false
displayed_sidebar: null
---

[thirdweb] provides a number of contracts and tools for building onchain. Their [Gaming SDK] enables seamless onboarding, cross-platform support, and provides many other features. It's compatible with [Unreal Engine] and can be used to enable onchain elements in your games.

In this tutorial, you'll learn how to add NFT item usage on top of the demo game you build in their [Unreal Engine Quickstart].

---

## Objectives

By the end of this tutorial you should be able to:

- List a user's NFTs inside an Unreal Engine Game
- Apply elements from the NFT to game entities
- Remove the NFT element from the asset if the user no longer owns the NFT

---

## Prerequisites

### ERC-721 Tokens

This tutorial assumes that you are able to write, test, and deploy your own ERC-721 tokens using the Solidity programming language. If you need to learn that first, check out our content in [Base Camp] or the sections specific to [ERC-721 Tokens]!

### Unreal Engine

This tutorial will cover everything you need to know to accomplish the learning objectives, but it won't teach you how to make a game. You'll need to take further steps to learn the [Unreal Engine] on your own.

### Onchain Apps

The tutorial assumes you're comfortable with the basics of deploying an app and connecting it to a smart contract. If you're still learning this part, check out our tutorials in [Base Camp] for [Building an Onchain App].

---

## Reviewing the Contract

[Below], you can find an example of an ERC-721 NFT contract. It's an extension of the [OpenZeppelin ERC-721] implementation. When a user mints, they're granted an NFT with a random color. The metadata is fully onchain, as is the svg image. The image is a simple 1024\*1024 `rect`, with a `fill` of the randomly generated color.

If the user dislikes the color, they may shuffle it and the NFT will change to a new randomly-selected color.

These NFTs are not restricted for trading. The contract includes a utility function, `getNftsOwned`, which will return an array containing the `tokenId` and base64-encoded metadata string for all tokens currently owned by the provided `address`.

## Getting Started with Unreal

Continue below for some tips on completing the [Unreal Engine Quickstart] tutorial provided by thirdweb. This tutorial will guide you through installing the Unreal Engine and setting up the major components of the thirdweb [Gaming SDK].

It will also guide you through setting up the website and backend that are needed to support the game integration. The client in their example uses Next.js, and the server is built with Node and Express.

### Setting up the Engine

First, you need to set up the [Engine]. For testing, you can [run it locally] with a [Docker] container.

If you need to, install or update [Docker] and [Postgres].

Start Postgres:

```shell
docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

Create a [thirdweb API key]. Allow `localhost:3000` and `localhost:8000` when creating your api key. When you deploy, you'll need to update the allowed domains.

The command to launch the engine itself is complicated and has many parameters. You'll want to create a file and run it from that. Create `thirdweb-engine.sh` in a convenient location and add:

```shell
docker run \
  -e ENCRYPTION_PASSWORD="<encryption_password>" \
  -e THIRDWEB_API_SECRET_KEY="<thirdweb_secret_key>" \
  -e ADMIN_WALLET_ADDRESS="<admin_wallet_address>" \
  -e POSTGRES_CONNECTION_URL="postgresql://postgres:postgres@host.docker.internal:5432/postgres?sslmode=disable" \
  -e ENABLE_HTTPS=true \
  -p 3005:3005 \
  --pull=always \
  --cpus="0.5" \
  thirdweb/engine:latest
```

Enter your `THIRDWEB_API_SECRET_KEY` and the wallet address you sign into thirdweb with as the `ADMIN_WALLET_ADDRESS`. You can see a full list of [environment variables] in the docs, but shouldn't need to set any others now.

Give your script permission to run with `chmod +x ./thirdweb-engine.sh` then run it with `./thirdweb-engine.sh
`.

It will take awhile to spin up, and you can ignore the warning about the `Chain Indexer Listner not started...` for now.

## Setting up the Client and Server

Clone the [engine-express] repo. CD into the `client` and `server` repos and run `yarn` to install dependencies, then CD back to root and run `yarn` again.

In both the `client` and `server` folders, copy or rename the `.env.example` files as `.env`.

In the client `.env`:

- Set `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` to the **Client ID** matching your [thirdweb API key]
- You don't need to change the `NEXT_PUBLIC_BACKEND_URL`
- Set the `NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN` as `localhost`

In the server `.env`:

- Don't change the `THIRDWEB_ENGINE_URL`
- Set the `THIRDWEB_ENGINE_BACKEND_WALLET` to the same as you used in the engine setup
- Set the `THIRDWEB_AUTH_DOMAIN` as `localhost`
- Set the `THIRDWEB_API_SECRET_KEY` to the **Secret Key** matching your [thirdweb API key]
- Set the `THIRDWEB_AUTH_PRIVATE_KEY` to the private key matching your backend engine wallet

Open `server/src/engineController.ts`. Update the `const`s at the beginning to load from environment variables:

```typescript
const ENGINE_URL = process.env.THIRDWEB_ENGINE_URL;
const BACKEND_WALLET = process.env.THIRDWEB_ENGINE_BACKEND_WALLET;
const ERC20_CONTRACT = process.env.ERC_20_CONTRACT;
const CHAIN = process.env.CHAIN;
```

You'll need to deploy your own version of the [Token Drop] contract. Click `Deploy Now`, then enter the name, symbol, and image of your choosing.

**Select `Base Sepolia Testnet` as the Network / Chain**.

You can leave the `Recipient Address` as your connected address, and you don't need to do an advanced configuration.

Click `Deploy Now`, and approve the transactions to deploy the contract and add it to your dashboard.

Next, click the `Claim Conditions` tab on the left side nav. Then click the `+ Add Phase` button and select `Public`. Review the options, but don't change any of them for this demo. Click `Save Phases`.

Copy the address from the dashboard:

![Token Airdrop Dashboard](../../assets/images/build-with-thirdweb/token-airdrop-dashboard.png)

Return to the `.env` for your server, and add:

```env
ERC20_CONTRACT=0x... # Your Address
CHAIN=84532 # Base Sepolia
```

Run the client and server with `yarn client` and `yarn server`. Navigate to `localhost:3000`, create a user, and link a wallet.

## Setting Up the Game

Clone the thirdweb [Unreal Demo], and open it with the Unreal Editor. Do so by clicking the `Recent Projects` tab in the upper left, then `Browse`, in the lower right.

![Open Unreal Project](../../assets/images/build-with-thirdweb/open-unreal-project.png)

Open the folder cloned from the repo and select `unreal_demo.uproject`. You may need to convert the project to the current version of Unreal. Click the `Open a copy` button.

When the scene loads, double-click `Scene_Game` in the upper-right corner.

![Scene Game](../../assets/images/build-with-thirdweb/scene-game.png)

Before you can play, you need to do some config. Scroll down in the `Outliner` until you find `ThirdWebManager`. Click the `Open Thirdweb Manager` button to open the file in your editor.

![Open Thirdweb Manager](../../assets/images/build-with-thirdweb/open-thirdweb-manager.png)

Then, click the green play button at the top of the viewport.

![Play Button](../../assets/images/build-with-thirdweb/play-button.png)

Log in using the credentials you created on the website, and play the game for a minute or two. If you get a 404, check that your engine, client, and server are all still running.

## Random Color NFT Contract

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract RandomColorNFT is ERC721 {
  using EnumerableSet for EnumerableSet.UintSet;

  mapping (address => EnumerableSet.UintSet) tokensOwned;

  uint public counter;

  mapping (uint => string) public tokenIdToColor;

  error InvalidTokenId(uint tokenId);
  error OnlyOwner(address);

  constructor() ERC721("RandomColorNFT", "RCNFT") {
  }

  function mintTo(address _to) public {
    counter++;
    _safeMint(_to, counter);
    tokenIdToColor[counter] = generateRandomColor();
  }

  struct TokenAndMetatdata {
    uint tokenId;
    string metadata;
  }

  function getNFftsOwned(address owner) public view returns (TokenAndMetatdata[] memory) {
    TokenAndMetatdata[] memory tokens = new TokenAndMetatdata[](tokensOwned[owner].length());
    for (uint i = 0; i < tokensOwned[owner].length(); i++) {
      uint tokenId = tokensOwned[owner].at(i);
      tokens[i] = TokenAndMetatdata(tokenId, tokenURI(tokenId));
    }
    return tokens;
  }

  function shuffleColor(uint _tokenId) public {
    if(_tokenId > counter) {
      revert InvalidTokenId(_tokenId);
    }
    if(ownerOf(_tokenId) != msg.sender) {
      revert OnlyOwner(msg.sender);
    }
    tokenIdToColor[_tokenId] = generateRandomColor();
  }

  function _update(address to, uint256 tokenId, address auth) internal override(ERC721) returns(address) {
    // Only remove the token if it is not being minted
    if (tokenId != counter){
      tokensOwned[auth].remove(tokenId);
    }
    tokensOwned[to].add(tokenId);

    return super._update(to, tokenId, auth);
  }

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
          name(),
          ' #: ',
          Strings.toString(_tokenId),
          '","description": "Random colors are pretty or boring!", "image": "data:image/svg+xml;base64,',
          Base64.encode(bytes(render(_tokenId))),
          '"}'
          )
        )
      )
    );

    return string(abi.encodePacked(_baseURI(), json));
  }

  function render(uint _tokenId) public view returns (string memory) {
    return string(
      abi.encodePacked(
        "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'>",
        "<rect width='1024' height='1024' fill='",
        tokenIdToColor[_tokenId],
        "' />",
        "</svg>"
      )
    );
  }

  // Function to generate a random color hex code
  function generateRandomColor() public view returns (string memory) {
    // Generate a pseudo-random number using block.prevrandao
    uint256 randomNum = uint256(keccak256(abi.encodePacked(block.prevrandao, block.timestamp, msg.sender)));

    // Extract RGB components from the random number
    bytes memory colorBytes = new bytes(3);
    colorBytes[0] = bytes1(uint8(randomNum >> 16));
    colorBytes[1] = bytes1(uint8(randomNum >> 8));
    colorBytes[2] = bytes1(uint8(randomNum));

    // Convert RGB components to hex string
    string memory colorHex = string(abi.encodePacked(
      "#",
      toHexDigit(uint8(colorBytes[0]) >> 4),
      toHexDigit(uint8(colorBytes[0]) & 0x0f),
      toHexDigit(uint8(colorBytes[1]) >> 4),
      toHexDigit(uint8(colorBytes[1]) & 0x0f),
      toHexDigit(uint8(colorBytes[2]) >> 4),
      toHexDigit(uint8(colorBytes[2]) & 0x0f)
    ));

    return colorHex;
  }

  // Helper function to convert a uint8 to a hex character
  function toHexDigit(uint8 d) internal pure returns (bytes1) {
    if (d < 10) {
      return bytes1(uint8(bytes1('0')) + d);
    } else {
      return bytes1(uint8(bytes1('a')) + d - 10);
    }
  }
}
```

## Conclusion

---

[Base Camp]: https://base.org.camp
[ERC-721 Tokens]: https://docs.base.org/base-camp/docs/erc-721-token/erc-721-standard-video
[OpenZeppelin ERC-721]: https://docs.openzeppelin.com/contracts/2.x/api/token/erc721
[OpenZeppelin]: https://www.openzeppelin.com/
[Unreal Engine]: https://www.unrealengine.com/en-US
[thirdweb]: https://thirdweb.com/
[Gaming SDK]: https://portal.thirdweb.com/solutions/gaming/overview
[Unreal Engine Quickstart]: https://portal.thirdweb.com/solutions/gaming/unreal-engine/quickstart
[Below]: #random-color-nft-contract
[Engine]: https://github.com/thirdweb-dev/engine
[run it locally]: https://portal.thirdweb.com/engine/self-host
[Docker]: https://www.docker.com/
[Postgres]: https://www.postgresql.org/
[thirdweb API key]: https://thirdweb.com/dashboard/settings/api-keys
[environment variables]: https://portal.thirdweb.com/engine/self-host#environment-variables
[engine-express]: https://github.com/thirdweb-example/engine-express
[Token Drop]: https://thirdweb.com/thirdweb.eth/DropERC20
[Unreal Demo]: https://github.com/thirdweb-example/unreal_demo
