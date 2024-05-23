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

This tutorial will cover everything you need to know to accomplish the learning objectives, but it won't teach you how to make a game. You'll need to take further steps to learn the [Unreal Engine] on your own. You'll also need to have Visual Studio or Visual Studio Code set up to edit and compile Unreal files.

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

It will take awhile to spin up, and you can ignore the warning about the `Chain Indexer Listener not started...`.

Once the engine is running, navigate to `https://localhost:3005/json`. Click through the warning that the connection is not secure. Doing so allows your browser to connect to your engine instance.

Navigate to the [thirdweb engine dashboard], and click the `Import` button. Enter a name and the local address for your engine instance:

![Add engine instance](../../assets/images/build-with-thirdweb/import-image-instance.png)

Next, you must add your wallet to the engine instance. Open up the instance in the dashboard, then click the `Import` button next to `Backend Wallets`. Enter your secret key for the wallet.

:::danger

Remember, the wallet key gives full access to all assets within any wallet. Use separate wallets for development and individual production tasks. Don't hold or fund a production wallet with any assets other than the minimum amount necessary for the task it is accomplishing.

:::

**Be sure to fund** this wallet with Base Sepolia ETH. It will be paying the gas for transactions.

:::caution

The key to your wallet is stored in ephemeral memory in the engine itself. You'll need to readd it whenever you restart the engine.

:::

## Setting up the Client and Server

Clone the [engine-express] repo. CD into the `client` and `server` repos and run `yarn` to install dependencies, then CD back to root and run `yarn` again.

In both the `client` and `server` folders, copy or rename the `.env.example` files as `.env`.

### Client

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

Open `client/components/ThirdwebProvider.tsx`. Update the `activeChain` to Base Sepolia.

```typescript
import { BaseSepoliaTestnet } from '@thirdweb-dev/chains';

// This is the chainId your dApp will work on.
const activeChain = BaseSepoliaTestnet;
```

### Server

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

:::caution

The demo does not actually have a database connected for users. You'll need to recreate your user each time you restart the server. For production, you'll need to swap this out with an actual database.

:::

If you get an error 500 `"No configured wallet found with address 0xABCD...."`, it's because you didn't add your wallet in the [thirdweb engine dashboard].

Otherwise, the game should run, and you should receive an ERC20 NFT every time you collect one of the orange orbs on the race track.

## Adding the Color Changer

Your next goal is to make it so that your players can use their Random Color NFTs as skins on the race car. You'll need to deploy the [contract provided below], set it up to be accessed via the server and engine, and finally, enable the colors from the NFTs to be used to change the color of the car.

### Deploying the Contract

You'll use thirdweb's platform to deploy this contract as well. Open a new folder in your editor and run:

```shell
npx thirdweb create contract
```

Then:

- Name the project - `random-color-nft`, or `.` if you run the script from the folder where you want the project
- Select your preference of `Forge` or `Hardhat`
- Name the NFT contract - `RandomColorNFT`
- Select `Empty Contract`

Open `contracts/Contract.sol` and replace the contents with the [contract provided below].

You'll need to import or install the OpenZeppelin contracts. You may also need to update the config for the development environment you're using to `0.8.24`.

Run `yarn build`.

Select `y` to install the thirdweb package and wait for the script to complete.

Run `yarn deploy`.

If you haven't linked your device to your thirdweb account, the browser will open to a page asking you to make the connection. Do so now.

After the script runs for a moment, it will open the thirdweb dashboard with the deployment UI open. Select `Base Sepolia Testnet` as your network, then click the `Deploy Now` button. Sign the transaction and wait for the contract to deploy.

### Adding the Contract to the Server

Copy the address for the contract to the clipboard and return to `thirdweb-engine-express`. Open `server/.env` and add:

```env
RANDOM_COLOR_NFT_CONTRACT=<your contract address>
```

Open `server/src/controllers/engineController.ts` and add it there as well:

```typescript
const RANDOM_COLOR_NFT_CONTRACT = process.env.RANDOM_COLOR_NFT_CONTRACT;
```

Now, using `claimERC20` as a template, add a function to `claimRandomColorNFT`. It's identical, except the `url`, `body`, and error message are:

```typescript
// Other code...
const url = `${ENGINE_URL}/contract/${CHAIN}/${RANDOM_COLOR_NFT_CONTRACT}/write`;
// Other code
const body = {
  functionName: 'mintTo',
  args: [user.ethAddress],
};
// Other code
res.status(400).json({ message: 'Error claiming RandomColorNFT' });
```

:::info

A better practice for production would be to make a more generalized function that can handle multiple requests to your contracts. We're skipping that for now to avoid needing to refactor the existing collectibles in the game.

:::

Next, you need to add a route for this function. Open `server/src/routes/engineRoutes.ts`. Import `claimRandomColorNFT` and add a route for it:

```typescript
router.post('/claim-random-color-nft', claimRandomColorNFT);
```

### Collecting the NFT from the Game

Return to the Unreal Editor and open `ThirdwebManager.cpp`:

![Open ThirdwebManager.cpp](../../assets/images/build-with-thirdweb/open-thirdweb-manager.png).

Similarly to what you did in the server, use the existing `PerformClaim()` as a template to add a function for `PerformNFTClaim()`. The only thing different is the name of the function and the URL:

```c++
HttpRequest->SetURL(this->ServerUrl + "/engine/claim-random-color-nft");
```

:::info

Again, it would be better practice to generalize this function, but you can skip that for now to avoid needing to update all the collectibles.

:::

Next, you need to let the editor know about this new function. Open `Source/unreal_demo/Public/ThirdwebManager.h`. Add your new function under the one for `PerformClaim();`

```c++
// Function to perform the NFT claim operation
UFUNCTION(BlueprintCallable, Category = "Thirdweb")
void PerformNFTClaim();
```

**Build your project**

Once it's done compiling, return UnrealEditor. In the `Outliner`, open the folder for `Collectibles` and click `Edit Collectible`. In the new window, click `File->Save As...` and save a copy as `CollectibleNFT`.

Open the `Content Drawer` at the bottom, search for `CollectibleNFT`, and drag one into the scene. Find it in the `Outliner` and click `Edit Collectible NFT`.

Find the `Perform Claim` function call and replace it with `Perform NFT Claim`. **Note** that the `Target` is passed from `Get Actor of Class`.

![Perform NFT Claim](../../assets/images/build-with-thirdweb/perform-nft-claim.png)

You'll want to be able to tell this collectible apart, so click on the mesh for `Collectible` on the left side in the `Component` tree, then on the `Details` panel on the right, find the `Materials` section and change it to `MI_Solid_Blue`.

You should now see a blue orb floating where you placed it.

Make sure the orb is low enough to drive through, then run the game. Collect the orb, then verify on a block explorer that you received the NFT.

### Tinting the Car

In the content browser, open `All>Content>Vehicles>SportsCar.Materials`. Right-click in an empty spot and select `Create Basic Asset>Material`. Name your new material `M_NFT_Color`. Open it by double-clicking.

Right-click on the graph and add a `Vector Parameter` node. Name it `NFTColor`. Click `Default Value` and change the default color to a bright red, for now, so you can see it. You can just enter `FF0000FF` in `Hex Linear`.

Connect the output to the `Base Color` of `M_NFT_Color`, then save and close the editor.

Again in the content browser, right-click on the `M_NFT_Color` asset and select `Create Material Instance`. Name the instance `MI_NFT_Color`.

Navigate to the sports car mesh located in `VehicleTemplate>Blueprints>SportsCar` and double-click to to open the `SportsCar_pawn`. Select the `Mesh` from the `Components` tree and you should see the car in the editor.

On the right side, change the `Element 2` material to `MI_NFT_Color`. The car is now bright red. Radical! Take your newly red car for a spin.

### Fetching the NFT Colors

Return to `engine-express` and open `engineController.ts`. Add a function to `getNFTColors` that uses the `read` endpoint to call the `getNFTsOwned` function.

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
[contract provided below]: #random-color-nft-contract
[Engine]: https://github.com/thirdweb-dev/engine
[run it locally]: https://portal.thirdweb.com/engine/self-host
[Docker]: https://www.docker.com/
[Postgres]: https://www.postgresql.org/
[thirdweb API key]: https://thirdweb.com/dashboard/settings/api-keys
[environment variables]: https://portal.thirdweb.com/engine/self-host#environment-variables
[engine-express]: https://github.com/thirdweb-example/engine-express
[Token Drop]: https://thirdweb.com/thirdweb.eth/DropERC20
[Unreal Demo]: https://github.com/thirdweb-example/unreal_demo
[thirdweb engine dashboard]: https://thirdweb.com/dashboard/engine
[wallet best practices]: https://portal.thirdweb.com/engine/features/backend-wallets#best-practices
