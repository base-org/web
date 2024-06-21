---
title: 'Thirdweb and Unreal - NFT Items'
slug: /thirdweb-unreal-nft-items
description: Learn how to use NFTs as in-game items using Thirdweb and Unreal.
author: briandoyle81
keywords: [Solidity, ERC-721, token, NFT, thirdweb, Unreal, c++, blueprints, onchain games]
tags: ['nft', 'smart contracts']
difficulty: hard
hide_table_of_contents: false
displayed_sidebar: null
---

[thirdweb] provides a number of contracts and tools for building onchain. Their [Gaming SDK] enables seamless onboarding, cross-platform support, and provides many other features. It's compatible with [Unreal Engine] and can be used to enable onchain elements in your games.

In this tutorial, you'll learn how to add NFT item usage on top of the demo game you build in their [Unreal Engine Quickstart]. Specifically, you'll use an NFT collection of random colors to change the color of the player's race car.

![Color changing car nft](../../assets/images/build-with-thirdweb/car-color-nft.gif)

---

## Objectives

By the end of this tutorial you should be able to:

- Pull a user's NFTs into an Unreal Engine Game
- Apply elements from the NFT to game entities
- Award NFTs to players for game accomplishments or actions

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

Make sure Docker desktop is running.

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

:::caution

We do not have an official browser recommendation, but during our testing, Chrome worked and Brave did not with the engine setup and configuration.

:::

Navigate to the [thirdweb engine dashboard], and click the `Import` button. Enter a name and the local address for your engine instance:

![Add engine instance](../../assets/images/build-with-thirdweb/import-image-instance.png)

Next, you must add your wallet to the engine instance. Open up the instance in the dashboard, then click the `Import` button next to `Backend Wallets`. Enter your secret key for the wallet.

:::danger

Remember, the wallet key gives full access to all assets within any wallet. Use separate wallets for development and individual production tasks. Don't hold or fund a production wallet with any assets other than the minimum amount necessary for the task it is accomplishing.

:::

**Be sure to fund** this wallet with Base Sepolia ETH. It will be paying the gas for transactions.

:::caution

The key to your wallet is stored in ephemeral memory in the engine itself. You'll need to re-add it whenever you restart the engine.

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

- Don't change the `THIRDWEB_ENGINE_URL`. (It **is** supposed to be `https`)
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

Open `server/src/controllers/engineController.ts`. Update the `const`s at the beginning to load from environment variables:

```typescript
const ENGINE_URL = process.env.THIRDWEB_ENGINE_URL;
const BACKEND_WALLET = process.env.THIRDWEB_ENGINE_BACKEND_WALLET;
const ERC20_CONTRACT = process.env.ERC20_CONTRACT;
const CHAIN = process.env.CHAIN;
```

You'll need to deploy your own version of the [Token Drop] contract. Click `Deploy Now`, then enter the name, symbol, and image of your choosing.

**Select `Base Sepolia Testnet` as the Network / Chain**.

You can leave the `Recipient Address` as your connected address, and you don't need to do an advanced configuration.

Click `Deploy Now`, and approve the transactions to deploy the contract and add it to your dashboard.

Next, click the `Claim Conditions` tab on the left side nav. Then click the `+ Add Phase` button and select `Public`. Review the options, but don't change any of them for this demo. Click `Save Phases`.

:::caution

If later in the tutorial, you get an error when you attempt to claim a token, but not an error every four seconds failing to read the balance, it's because you missed this step.

:::

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

Click the icons at the top to `Compile` and save your asset.

From the content drawer, drag your asset into the viewport.

You should now see a blue orb floating where you placed it.

Make sure the orb is low enough to drive through, then run the game. Collect the orb, then verify on a block explorer that you received the NFT.

### Tinting the Car

In the content browser, open `All>Content>Vehicles>SportsCar>Materials`. Right-click in an empty spot and select `Material>Material Parameter Collection`. Name yours `NFT_MPS`. Open the collection, click the `+` to add an item to `Vector Parameters` and create the color of your choosing. Bright red is a good option to make your change very visible.

Right-click in an empty spot again and select `Create Basic Asset>Material`. Name your new material `M_NFT_Color`. Open it by double-clicking.

Right-click on the graph and add a `Collection Parameter` node. In the `Details` panel on the left, select your `NFT_MPS` collection and pick the first vector for `Parameter Name`

Connect the output to the `Base Color` of `M_NFT_Color`, then save and close the editor.

Again in the content browser, right-click on the `M_NFT_Color` asset and select `Create Material Instance`. Name the instance `MI_NFT_Color`.

Navigate to the sports car mesh located in `VehicleTemplate>Blueprints>SportsCar` and double-click to to open the `SportsCar_pawn`. Select the `Mesh` from the `Components` tree and you should see the car in the editor.

On the right side, change the `Element 2` material to `MI_NFT_Color`. The car is now bright red. Radical! Take your newly red car for a spin.

### Fetching the NFT Colors

Return to `engine-express` and open `engineController.ts`. Add a function to `getNFTColors` that uses the `read` endpoint to call the `getNFTsOwned` function.

```typescript
export const getNFTColors = async (req: Request, res: Response) => {
  const { authToken } = req.body;
  if (!authToken || !userTokens[authToken]) {
    return res.status(400).json({ message: 'Invalid auth token' });
  }
  const user = userTokens[authToken];
  try {
    const url = `${ENGINE_URL}/contract/${CHAIN}/${RANDOM_COLOR_NFT_CONTRACT}/read?functionName=getNftsOwned&args=${user.ethAddress}`;
    const headers = {
      'x-backend-wallet-address': BACKEND_WALLET,
      Authorization: `Bearer ${process.env.THIRDWEB_API_SECRET_KEY}`,
    };

    const response = await axiosInstance.get(url, { headers: headers });

    // TODO:  Extract the color from the image

    // TODO: Replace response
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error getting NFT data' });
  }
};
```

You'll also need to add this function to `engineRoutes.ts`:

```typescript
router.post('/get-nft-colors', getNFTColors);
```

Return to `engineController.ts`.

Because Unreal doesn't support SVGs, you'll need to extract the color from your NFT metadata, and pass that to use in the material you created. Start by adding a type for the response, and for the JSON metadata:

```typescript
type NFTData = {
  tokenId: bigint;
  metadata: string;
};

type JSONMetadata = {
  name: string;
  description: string;
  image: string;
};
```

You'll also need helper functions to decode the base64 encoded metadata and SVG, then get the color from the SVG.

```typescript
function getJsonMetadata(nft: NFTData) {
  const base64String = nft.metadata.split(',')[1];
  const jsonString = atob(base64String);
  return JSON.parse(jsonString) as JSONMetadata;
}

function getColorFromBase64StringSVG(base64String: string) {
  const base64Data = base64String.split(',')[1];
  const svgString = atob(base64Data);
  const color = svgString.match(/fill=['"](#[0-9a-fA-F]{6})['"]/);
  return color ? color[1] : '#000000';
}
```

Use these to extract an array of colors and return it:

```typescript
const nfts = response.data.result.map((item: any) => {
  return {
    tokenId: item[0],
    metadata: item[1],
  };
});

const metadata = nfts.map((nft: NFTData) => getJsonMetadata(nft));
const colors = metadata.map((m: JSONMetadata) => getColorFromBase64StringSVG(m.image));

res.json(colors);
// Delete res.json(response.data);
```

:::info

To test with Postman or similar, comment out the check for a valid `authToken` and hardcode in an address that you know has NFTs.

:::

### Getting the Colors into the Game

Return to the game in your code editor, and open `ThirdwebManager.cpp` and `ThirdwebManager.h`. As before, add a function to call and endpoint on your server. This time to retrieve the array of colors. You'll need to do a little more for this one to set an in-game variable for the colors.

First, you'll need to add a new multicast delegate type to handle the response in `ThirdwebManager.h`:

```c++
// ThirdwebManager.h
DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnNFTColorsResponse, bool, bWasSuccessful, const TArray<FString> &, ResponseArray);
```

And expose it to the editor:

```c++
// ThirdwebManager.h
// This delegate is triggered in C++, and Blueprints can bind to it.
UPROPERTY(BlueprintAssignable, Category = "Thirdweb", meta = (DisplayName = "OnNFTColorsResponse"))
FOnNFTColorsResponse OnNFTColorsResponse;;
```

Then, add the function to `ThirdwebManager.cpp`. It's similar, but instead hits the endpoint for the NFT color array and uses the response you just created. It also expects the response to be an array of strings instead of searching for a property called `result`:

```c++
// ThirdwebManager.cpp
void AThirdwebManager::GetNFTColors()
{
	TSharedRef<IHttpRequest, ESPMode::ThreadSafe> HttpRequest = FHttpModule::Get().CreateRequest();
	HttpRequest->SetURL(this->ServerUrl + "/engine/get-nft-colors"); // The endpoint to get the NFT colors
	HttpRequest->SetVerb("POST");
	HttpRequest->SetHeader(TEXT("Content-Type"), TEXT("application/json"));

	TSharedPtr<FJsonObject> JsonObject = MakeShareable(new FJsonObject);
	JsonObject->SetStringField("authToken", AuthToken);

	FString OutputString;
	TSharedRef<TJsonWriter<>> Writer = TJsonWriterFactory<>::Create(&OutputString);
	FJsonSerializer::Serialize(JsonObject.ToSharedRef(), Writer);

	UE_LOG(LogTemp, Warning, TEXT("OutputString: %s"), *OutputString);

	HttpRequest->SetContentAsString(OutputString);

	HttpRequest->OnProcessRequestComplete().BindLambda([this](FHttpRequestPtr Request, FHttpResponsePtr Response, bool bWasSuccessful)
		{
		if (bWasSuccessful && Response.IsValid())
		{
			int32 StatusCode = Response->GetResponseCode();
			if (StatusCode == 200)
			{
				TArray<TSharedPtr<FJsonValue>> JsonArray;
				TSharedRef<TJsonReader<>> Reader = TJsonReaderFactory<>::Create(Response->GetContentAsString());
				if (FJsonSerializer::Deserialize(Reader, JsonArray) && JsonArray.Num() > 0)
				{
					TArray<FString> ResponseArray;
					for (const TSharedPtr<FJsonValue>& Value : JsonArray)
					{
						FString StringValue;
						if (Value->TryGetString(StringValue))
						{
							ResponseArray.Add(StringValue);
						}
					}
					this->OnNFTColorsResponse.Broadcast(true, ResponseArray);
					UE_LOG(LogTemp, Warning, TEXT("Get NFT Color response: %s"), *Response->GetContentAsString());
					return;
				}
				this->OnNFTColorsResponse.Broadcast(false, TArray<FString>());
			}
			else
			{
				FString ErrorMsg = FString::Printf(TEXT("HTTP Error: %d, Response: %s"), StatusCode, *(Response->GetContentAsString()));
				TArray<FString> ErrorArray;
				ErrorArray.Add(ErrorMsg);
				this->OnNFTColorsResponse.Broadcast(false, ErrorArray);
				UE_LOG(LogTemp, Warning, TEXT("ErrorMsg: %s"), *ErrorMsg);
			}
		}
		else
		{
			TArray<FString> ErrorArray;
			ErrorArray.Add(TEXT("Failed to connect to the server."));
			this->OnNFTColorsResponse.Broadcast(false, ErrorArray);
			UE_LOG(LogTemp, Warning, TEXT("Failed to connect to the server."));
		} });

	HttpRequest->ProcessRequest();
}
```

Finally, expose this function to the editor.

```c++
// ThirdwebManager.h
// Function to perform the get NFT Colors operation
UFUNCTION(BlueprintCallable, Category = "Thirdweb")
void GetNFTColors();
```

Compile and reload the project in the editor.

In the content browser, find and open `Content>_Thirdweb>Blueprints>Canvas_HUD`.

Under the text field for `Tokens`, drag a new `Text` widget in. Set the name at the top to `Label_Colors` and check `Is Variable`. Change the `Content` to `Colors`. If you put it on the right side, move the `Anchor` to the upper right corner.

In the upper right, click the `Graph` tab. Add a `Sequence` node to split the flow after `Get Actor Of Class`. Following the same pattern as the flow that gets the balance response, add one that gets the NFT colors.

Create the `Bind Event to OnNFTColorsResponse` node first, then create the `Custom Event` node from dragging from `Event`.

For now, simply grab the last color in the array and set it in the HUD. To get it, drag off the `Response Array` in `OnNFTColorResponseReceived` and add a `Last Index` node. Drag again from the `Response Array` and add a `Get (Ref)` node. Connect the output of `Last Index` to the `Input` of `Get`. From there, drag from the output of `Get` and add a `To Text (String)` node.

Drag out of the exec (white) connector of `OnNFTColorResponseReceived` and add a `Branch` and connect `Was Successful` to the `Condition`. For the `True` state, drag and add a `SetText (Text)`. Right click and add a reference to `Label Colors` and drag it to the `Target` of `SetText`. Connect the `Return Value` of `To Text (String)` to `In Text`.

Finally, drag off `Bind Event to OnNFTColorsResponse` and add a `Set Timer by Function Name` node. Connect the `Return Value` of `Get Actor Of Class` to `Object`. Set the `Function Name` to `GetNFTColors` and the `Time` to `2.0`.

You should end up with something like this:

![Get NFT Colors](../../assets/images/build-with-thirdweb/get-nft-colors.png)

Compile the blueprint then run the game. You should see that last color in the array in the HUD, and you should see the full list printed in the console every two seconds.

:::caution

If you have an error in your `GetNFTColors` function that prevents `.Broadcast` from being called, nothing in the NFT Colors branch of this blueprint will run, including printing to the console.

:::

### Changing the Color of the Car

Now that you have the colors, you can use them to change the color of your car! For now, you can just set the car to the last color, but on your own you'll want to add a UI widget to allow the player to pick their color.

:::info

If you really wanted to get fancy, you could modify the contract to emit an `event` containing the color of the newly-minted NFT, extract that from the receipt, and optimistically make it available to the player a few seconds earlier.

:::

Unreal doesn't use hex colors, so you'll need to convert your hex string to a linear color and save it in the `Material Parameter Collection` you created earlier.

Converting the hex code with a blueprint is very complicated. Luckily, Unreal has a helpful community that has created many utilities, including a [conversion function].

:::danger

Copying and pasting code for a game engine isn't quite as dangerous as copying and pasting unknown smart contract code, but you're working at the intersection of these worlds. Be sure to review and make sure you understand anything you find online.

:::

In the content browser, add a `Blueprints>Blueprint Function Library` called `ColorUtils`. In it, add a function called `HexStringToColor`.

Copy the code from the community site and paste it into the function. Connect the `Hex String to Color` node to the `SET` node attached to `Make Array`, then from `SET` to the `Return Node`.

Compile, and you'll get an error. Find and right-click on the error in the `Hex Code` node, then select `Create local variable`. Recompile and the error will resolve.

You also need to input the string you want converted. Select the `Hex String to Color` node and click the `+` button by `Inputs` located in the panel on the right. Name it `hexString` and give it a `string` type. `Hex String` will now appear as a value in the `Hex String to Color` node. Connect it to the `Source String` input in the `Replace` node.

Compile one last time, then save and close `ColorUtils`.

Return to `Canvas_HUD` and open the `Graph`. Drag out of the `SetText` node that adds the color to the HUD and add a `Hex String to Color` node. The function expects alpha values in the hex code. To add this connect a second output of the string array `GET` to an `Append` function and append `ff` in the `B` input. Connect the `Return Value` to the `Hex String` input in `Hex String to Color`.

Finally, add a `Set Vector Parameter Value`. Select `NFT_MPS` for the collection and `Vector` for the `Parameter Name`. Connect the `Liner Color` output of `Hex String to Color` to the `Parameter Value` input.

![Hex to linear color](../../assets/images/build-with-thirdweb/hex-to-linear-color.png)

Compile, save, and close `Canvas_HUD`. Run the game. Your car will start red, but after the response from the server, it will turn the color of your last NFT! Drive and collect the NFT collectible, and it will change colors!

## Conclusion

In this tutorial, you've learned how to set up Thirdweb's engine and use it to connect an Unreal Engine game to Base. You've also learned how to use their platform to deploy and manager your contracts. Finally, you've learned how to build game elements to allow players to collect new NFTs and use them to personalize their game items.

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

  function getNftsOwned(address owner) public view returns (TokenAndMetatdata[] memory) {
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
[conversion function]: https://blueprintue.com/blueprint/vm4ujcqe/
