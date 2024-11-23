---
title: 'Coinbase Smart Wallet'
slug: /coinbase-smart-wallet
description: Learn to create an app that uses the Coinbase Smart Wallet and effectively manages assets and permissions for both native and new users of onchain apps
author: briandoyle81
keywords: [Solidity, ERC-721, token, NFT, wagmi, viem, smart wallet]
tags: ['nft', 'Smart Wallet', 'Paymaster']
difficulty: intermediate
hide_table_of_contents: false
displayed_sidebar: null
---

The [Coinbase Smart Wallet] is a new application of account abstraction that makes it easy to give the exact same onboarding to both native crypto users who have their own EOA wallet, and new users who would benefit from an easier onboarding to crypto. For the former, the wallet works almost exactly the way they are used to. For the latter, [passkeys] are used to create a wallet and securely save the keys.

Most importantly, this wallet will work for the user across all apps using the Smart Wallet, across many different chains! Think of it as an onchain version of the social logins that most regular users now expect in their apps.

---

## Objectives

By the end of this tutorial you should be able to:

- Connect users to your onchain app using the Coinbase Smart Wallet
- Integrate the Smart Wallet with wagmi
- Provide an easy path for your users to buy crypto and put it in their wallet
- Compare and contrast the Smart Wallet with other forms of account abstraction
- Take advantage of the [Base Gasless Campaign] to onboard your first users with free gas

---

## Prerequisites

### Random Color NFT Contract

The app you build during this tutorial interacts with the Random Color NFT contract built in the [Simple Onchain NFTs] tutorial. You'll either need to complete that tutorial, deploy a copy of the contract provided at the bottom, or interact with our copy, deployed on Base Sepolia at `0x59c35beE5eAdeEDDc2c34d419459243bD70AFD72`. You can also find the contract ABI in the tutorial link.

### ERC-721 Tokens

This tutorial assumes that you are able to write, test, and deploy your own ERC-721 tokens using the Solidity programming language. If you need to learn that first, check out our content in [Base Learn] or the sections specific to [ERC-721 Tokens]!

### Vercel

You'll need to be comfortable deploying your app to [Vercel], or using another solution on your own. Check out our tutorial on [deploying with Vercel] if you need a refresher!

### Onchain Apps

The tutorial assumes you're comfortable with the basics of deploying an app and connecting it to a smart contract. If you're still learning this part, check out our tutorials in [Base Learn] for [Building an Onchain App].

---

## Building an Onchain App with the Smart Wallet

If you're an experienced frontend developer looking to build a production-ready site, check out the [BOAT] template. You can also use the [wagmi template] if you want to start with a smaller and simpler site.

Follow the instructions to spin up a new app. Using the [wagmi template], pick:

- Name as you see fit. The script does allow you to use `.` to install in the current folder
- React
- Next

### Initial Testing

Run `pnpm install` then `pnpm run dev` to start the site. First, open it with your regular browser. If you have a wallet browser extension installed, you'll see two buttons to connect:

![Two Buttons](../../assets/images/smart-wallet/wagmi-template-normal.png)

The reason is that the `wagmi` template maps all the connectors it can detect to a button on the page. In this case, it has both the injected provider from your browser extension, and the Smart Wallet provider you added doing the setup steps. You'll fix this UX quirk shortly.

Try connecting, and you'll find that it works exactly like you're expecting it to as a user who has a wallet already and is familiar with onchain apps.

### Testing as a New User

Next, open up a private or incognito window in your browser and visit your site on `localhost:3000`. If you've enabled your wallet extension in this mode, you'll need to disable it.

Here, you should see only one button. The magic happens when you click it. Pretend you are an onchain newbie and click the `Create a smart wallet` button.

Select any of the options to create a new passkey.

That's it, you've created a new wallet and logged into your app!

![Create a passkey](../../assets/images/smart-wallet/create-a-passkey.png)

The next time you try this, the app will automatically log you in. If you want to create a new wallet, use the `Disconnect` button, then the `Coinbase Wallet Button`, then click the gear and log out of the wallet.

## Improving the Experience

By using the Smart Wallet, you've made it easy for both new and experienced users to connect with your onchain app, but there are some improvements you can make that will benefit both types of users.

Open `page.tsx` and find the `<div>` with the Connect section:

```tsx
<div>
  <h2>Connect</h2>
  {connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector, chainId })} type="button">
      {connector.name}
    </button>
  ))}
  <div>{status}</div>
  <div>{error?.message}</div>
</div>
```

Add a `<header>` element to the top (or as appropriate for the UI/UX library you are using). Move the Connect `<div>` inside, and replace the `connectors.map` function with one that finds the Smart Wallet and uses it to connect. First, create the function:

```tsx
const createWallet = useCallback(() => {
  const coinbaseWalletConnector = connectors.find(
    (connector) => connector.id === 'coinbaseWalletSDK',
  );
  if (coinbaseWalletConnector) {
    connect({ connector: coinbaseWalletConnector, chainId });
  }
}, [connectors, connect]);
```

Then update the `<header>` to use it. You can also move the `Disconnect` button into the header. Only show the appropriate button, depending on the connection state.

```tsx
<header>
  <div>
    <h2>Connect</h2>
    {account.status === 'disconnected' && (
      <button onClick={() => createWallet()} type="button">
        Connect
      </button>
    )}
    {account.status === 'connected' && (
      <button type="button" onClick={() => disconnect()}>
        Disconnect
      </button>
    )}
    <div>{'Status: ' + status}</div>
    <div>{error?.message}</div>
  </div>
</header>
```

### Showing the User's Balance

Experienced users will know that they need funds for gas and payments to interact with your app, but new users may not. Both benefit from seeing their balance shown on the app. Import `useBalance` and initialize it below `useAccount`:

```tsx
const account = useAccount();
const balance = useBalance({ address: account.address });
```

Then add it to the display when the user is logged in. You'll need to extract it from the object returned by `useBalance`, and you'll want to truncate some decimals. It's also a good idea to indicate the chain the user is on.

Create a helper function to show the balance with four decimals:

```tsx
function weiToEtherString(wei: bigint) {
  const ether = formatEther(wei);
  return parseFloat(ether).toFixed(4).toString();
}
```

Then use it to display the user's balance:

```tsx
<div>
  {account.status === 'connected' &&
    'Balance: (' + account.chain?.name + ') ' + weiToEtherString(balance?.data?.value || BigInt(0))}
</div>
```

### Making it Easy to Fund Wallets

One of the most confusing things about onchain apps for new users is the number of steps and the amount of knowledge it takes to get the right amount of the right currency on the right network to be able to use these apps.

**The most important thing you can do to help your app and _every_ app on Base is to make it easy for _anyone_ to fund their wallet.**

In doing so, you make it much easier for people to onboard to your app, and you can take advantage of being a part of a community of developers doing the same.

Together, we can create a gateway to bring the world onchain!

Start by logging in to the [Coinbase Developer Platform (CDP)]. Create an account if you don't have one yet.

Find your App Id by going to [Project Settings]. It's listed as `Project ID`.

**You must initialize the Onramp feature.** Click on the tab for `Onramp`, then `Edit` your `Display wallet name`. It takes a few minutes to process.

Once you have that, you can use the _One Click_ pay feature to set up a transaction that will allow the user to use their Coinbase retail account to easily fund their new wallet. These funds will be available for them to use on **any** app on Base that uses the Smart Wallet.

![One Click Pay](../../assets/images/smart-wallet/one-click-pay.png)

To add this, first add a helper function to build the link:

```tsx
const APP_ID = 1234; // Replace with your Project Id

function buildOneClickURL() {
  return `https://pay.coinbase.com/buy/one-click?appId=${APP_ID}&defaultAsset=ETH&defaultPaymentMethod=ACH_BANK_ACCOUNT&destinationWallets=[{"address":"${account.address}","blockchains":["base"]}]&fiatCurrency=usd&presetFiatAmount=25&quoteId=fund-wallet-button`;
}
```

Then add a new button that opens the URL in a new window:

```tsx
<div>
  {account.status === 'connected' && (
    <button onClick={() => window.open(buildOneClickURL())}>Fund Wallet (Uses Real Money!)</button>
  )}
</div>
```

:::danger

This link creates real transactions taking payment in real money for real ETH on Base. During testing, you may want to hide this feature, or make it clear that it is not using testnet funds.

:::

For your production app, it would also be a good idea to add a tooltip explaining:

> Onchain apps use cryptocurrency to make it easy for users to send and receive payments to one another, or the app. They also use cryptocurrency to allow users to directly pay for their own computation and resource usage in a transparent manner. As such, you need funds to use this app. You can add them with the button above, and you'll be able to use these funds on **any app** within the **Base ecosystem** that uses the smart wallet.

## Connecting to the Contract

Use a blockchain explorer to mint a few NFTs on your contract if you haven't yet.

Add a new folder in `app` for `components` then add a component called `nftList` in a file of the same name. Import the address and ABI for your deployed Random Color NFT contract. Also import `useAccount` and `useReadContract` from `wagmi`:

```tsx
import { useAccount, useReadContract } from 'wagmi';
import contractData from '../contracts/RandomColorNFT.json';
```

Build the component and return a list of the tokens owned by the connected address, as well as the metadata for that token. First, add a type matching the `struct` you added to your contract:

```solidity
type NFTData = {
  tokenId: bigint;
  metadata: string;
};
```

Then add a state variable to hold the list of NFTs, and fetch them with `useReadContract`:

```solidity
export function NFTList() {
  const account = useAccount();
  const [nfts, setNfts] = useState<NFTData[]>([]);

  const { data: nftData, refetch: refetchNftData } = useReadContract({
    abi: contractData.abi,
    address: contractData.address as `0x${string}`,
    functionName: "getNFftsOwned",
    args: [account.address],
  });

  useEffect(() => {
    if (nftData) {
      const newNfts = nftData as NFTData[];
      setNfts(newNfts);
    }
  }, [nftData]);

  return (
    <div>
      <h2>NFTs</h2>
      {/* TODO */}
    </div>
  );
}
```

### Interpreting the Metadata and Image

Add a type and helper function to convert the base64 encoded metadata to JSON:

```tsx
type JSONMetadata = {
  name: string;
  description: string;
  image: string;
};

function getJsonMetadata(nft: NFTData) {
  const base64String = nft.metadata.split(',')[1];
  const jsonString = atob(base64String);
  return JSON.parse(jsonString) as JSONMetadata;
}
```

The image is already in a format usable by `<img>` tags!

### Displaying a List of NFTs

Now that you can extract your metadata and image from your data, use it to build a render function for your NFTs:

```tsx
function renderNft(nft: NFTData) {
  const metadata = getJsonMetadata(nft);
  return (
    <div key={nft.tokenId.toString()}>
      <h3>{metadata.name}</h3>
      <p>{metadata.description}</p>
      <img src={metadata.image} alt={metadata.name} />
    </div>
  );
}
```

And use it to display them:

```tsx
return (
  <div>
    <h2>NFTs</h2>
    <div>{`Address: ${account.address}`}</div>
    <div>{nfts.map((nft) => renderNft(nft))}</div>
  </div>
);
```

Add further styling or use a library to improve the appearance.

### Testing with Smart Wallet

Test with both your normal wallet in the browser, and use incognito or private mode to test with the Smart Wallet.

Don't forget to mint some NFTs for the Smart Wallet address!

Everything should work as expected for both.

### Adding a Mint Button

Import and set up functions to write to your contract and wait for the receipt:

```tsx
const { data: writeData, writeContract } = useWriteContract();
const { data: receipt } = useWaitForTransactionReceipt({
  hash: writeData,
});
```

Wait for the receipt, and use it to trigger a refetch of the NFT data. Doing so will update the user's list of NFTs after they buy a new one:

```tsx
useEffect(() => {
  if (receipt) {
    refetchNftData();
  }
}, [receipt]);
```

Finally, add a button allowing the user to purchase a new NFT:

```tsx
<button
  onClick={() =>
    writeContract({
      abi: contractData.abi,
      address: contractData.address as `0x${string}`,
      functionName: 'mintTo',
      args: [account.address],
    })
  }
>
  Mint NFT
</button>
```

:::caution

Reminder: We've constructed our contract to require an explicit address for the recipient in the `mintTo` function.

:::

Test it with your normal wallet. Everything should work as expected. Now, test it with the Smart Wallet. You **don't** need to fund the wallet (on testnet).

Not only does the transaction work in a way that's easy for new users, but for a currently, Base is automatically sponsoring transactions done through the Smart Wallet (**on testnet only)**.

![Smart Wallet Tx](../../assets/images/smart-wallet/sponsored-by-base.png)

But you can also get **thousands of dollars of gas sponsorship** with a few setup steps during the [Base Gasless Campaign]. Also check out the [Paymaster] docs to see how to sponsor gas beyond this.

## Interacting with the Contract

When using the Smart Wallet, you can effortlessly use the same code for both EOA wallet users and Smart Wallet users.

Try adding a button that sends the NFT to another user. You can use one of the known testing addresses for now. Update `renderNFT`:

```solidity
  function renderNft(nft: NFTData) {
    const metadata = getJsonMetadata(nft);
    return (
      <div key={nft.tokenId.toString()}>
        <h3>{metadata.name}</h3>
        <p>{metadata.description}</p>
        <img src={metadata.image} alt={metadata.name} />
        <button
          onClick={() =>
            writeContract({
              abi: contractData.abi,
              address: contractData.address as `0x${string}`,
              functionName: "transferFrom",
              args: [account.address, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", nft.tokenId],
            })
          }
        >Test Transfer</button>
      </div>
    );
  }
```

Test with both the EOA and Smart Wallet. Everything works as expected!

## Conclusion

In this tutorial, you've learned how to connect users to your onchain app with the Coinbase Smart Wallet. You've seen how the wallet works seamlessly for both EOA and Smart Wallet users. It provides the experience expected for both audiences, without you needing to do extra development to accommodate both paths. You've also learned of a method to make it easy for both new and experienced users to fund their wallets with ETH on Base that they can use on any app in the ecosystem. Finally, you've learned where you can find resources for applying for the [Base Gasless Campaign]. This program will give you a gas subsidy that you can pass on to your users.

---

[Base Learn]: https://base.org/learn
[ERC-721 Tokens]: https://docs.base.org/base-learn/docs/erc-721-token/erc-721-standard-video
[Building an Onchain App]: https://docs.base.org/base-learn/docs/frontend-setup/overview
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
[Coinbase Smart Wallet]: https://www.smartwallet.dev
[passkeys]: https://fidoalliance.org/passkeys/
[Building Onchain NFTs]: https://docs.base.org/tutorials/complex-onchain-nfts
[rect]: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect
[Testnet Opensea]: https://testnets.opensea.io/
[deploy]: https://docs.base.org/tutorials?tag=smart%20contracts
[Sepolia Basescan]: https://sepolia.basescan.org/
[BOAT]: https://www.smartwallet.dev/guides/create-app/using-boat
[wagmi template]: https://www.smartwallet.dev/guides/create-app/using-wagmi
[Coinbase Developer Platform (CDP)]: https://portal.cdp.coinbase.com/
[Base Gasless Campaign]: https://www.smartwallet.dev/base-gasless-campaign
[Paymaster]: https://www.smartwallet.dev/guides/paymasters
[Project Settings]: https://portal.cdp.coinbase.com/project-settings
[Simple Onchain NFTs]: /tutorials/simple-onchain-nfts
