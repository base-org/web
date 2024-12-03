---
title: 'Enable ERC-20 Gas Payments with Coinbase Paymaster'
slug: /enable-erc20-gas-payments
description: Learn how to enable ERC-20 tokens as gas payment options for smart wallets using Coinbase Paymaster, improving UX and onboarding for your onchain application.
author: hughescoin
keywords:
  [
    Paymaster,
    ERC20 Gas Payments,
    Wagmi,
    React,
    TypeScript,
    Base,
    cbBTC,
    Bitcoin,
    Smart Wallets,
    Paymaster Policy,
  ]
tags: ['backend', 'ethereum', 'base', 'erc20']
difficulty: medium
displayed_sidebar: null
---

# Using a Custom ERC-20 Token for Gas Payments with Coinbase Paymaster

Allowing users to pay gas fees with ERC-20 tokens can significantly improve the user experience by removing the dependency on native tokens. This simplifies onboarding for new users and aligns your application’s utility with its ecosystem token.

With the added flexibility of Paymaster policies, you can further enhance the user journey, tailoring how transactions are sponsored and fees are handled.

This tutorial demonstrates how to enable ERC-20 tokens (including your own custom tokens) as gas payment options for [smart wallets] using the Coinbase Paymaster.

It builds on the [Integrating a Paymaster for Gasless Transactions] tutorial. If you're unfamiliar with integrating Paymasters, start there first.

Ready? Let's build!

---

## Objectives

- Configure the Coinbase Paymaster to allow users to pay gas fees using a custom ERC-20 token, such as `cbBTC`.
- Integrate Paymaster policies to secure transactions and align them with your application’s user experience goals.
- Abstract native token dependencies (ETH) to simplify onboarding and provide a streamlined, user-friendly transaction flow for your onchain application.

## Prerequisites

### Access to the Coinbase Developer Platform

You'll need to set up an account on with [Coinbase Developer Platform (CDP)](https://www.coinbase.com/cloud) account. The CDP provides various tools and services for blockchain development, including access to API endpoints and other resources that will be instrumental in your project. Once you've created your account, you'll be ready to move forward with integrating these services into your application.

### Request Access for ERC-20 Gas Payments

To enable ERC-20 tokens as gas payment options, you need to configure the Coinbase Paymaster to recognize your token. This involves submitting a request to whitelist your token and defining where the gas payments (in ERC-20 tokens) will be sent.

Follow the steps below to request access and get your token approved:

**Submit the Form**  
 Use [this form](https://app.deform.cc/form/9b59499b-e82e-4879-8100-40c603084747/?page_number=0) to request access to enable ERC-20 gas payments. You'll need:

- **Contract Address**: The address of the ERC-20 token you want to use for gas payments.
- **Receiving Address**: An address where the tokens will be sent as users pay for gas.

**Approval Notification**  
Once approved, your Coinbase Developer Platform (CDP) dashboard under the **ERC-20 Paymaster** tab will show your token configuration.

![cdp-erc20-configuration](../../assets/images/paymaster-tutorials/cdp-paymaster-config.png)

## Configure Paymaster & Bundler Gas Policy

Once your ERC-20 token is approved for gas payments, the next step is to configure your Paymaster’s gas policy. Gas policies allow you to fine-tune how transactions are handled, ensuring that your application remains secure, fair, and functional while providing a seamless experience for your users.

For this example, you'll configure the policy to always require a custom ERC-20 token for gas payments. This setup ensures that users interact with your application in a predictable and consistent manner.

:::info

If users are new to your application and do not have the required token, consider sponsoring a few of their User Operations to improve onboarding. You can learn how to set gas policies in [this written guide] or the [YouTube walkthrough].

:::

Navigate to the [Paymaster Configuration Tab](https://portal.cdp.coinbase.com/products/bundler-and-paymaster) and configure the policy parameters with a **per user limit of $0.01** and set the **maximum number of user operations to 1**. These settings ensure that all transactions will utilize the ERC-20 token for gas payments.

This ensures all transactions use the ERC-20 token for gas.

![cdp-policy-setting](../../assets/images/paymaster-tutorials/cdp-policy-settings.png)

Save your Paymaster and Bundler endpoints as environment variables for use in your project.

![cdp-pm-bundler-endpoint](../../assets/images/paymaster-tutorials/cdp-copy-endpoint.png)

## Enable ERC-20 Gas Payments in Your Project

Now that your token is approved and the Paymaster is configured, the next step is to update your project to enable ERC-20 gas payments. This section will guide you through setting up your project to allow users to mint NFTs using `cbBTC` for gas fees.

### Set Up Constants and a Base Client

Begin by defining key constants and initializing the Base client. These constants include the token's address, its number of decimals, and the amount required for approval.

- `cbBtcAddress`: Address of the ERC-20 token (`cbBTC` in this case).
- `tokenDecimals`: Number of decimals for the token (8 for `cbBTC`).
- `minTokenThreshold`: Minimum token amount required for allowance checks.
- `tokenApprovalAmount`: Amount approved for gas payments.

```typescript
const client = createPublicClient({
  chain: base,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL),
});

const cbBtcAddress = '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf' as `0x${string}`;
const tokenDecimals = 8;
const minTokenThreshold = BigInt(1 * 10 ** tokenDecimals);
const tokenApprovalAmount = BigInt(1 * 10 ** tokenDecimals);
const paymasterAddressMainnet = '0x2FAEB0760D4230Ef2aC21496Bb4F0b47D634FD4c';
```

This ensures your application can interact with the cbBTC token and correctly manage allowances for gas payments.

### Check Token Allowance

Create a state variable and a `checkAllowance` function to verify if the user has approved enough tokens for gas payments.

The `checkAllowance` function reads the token allowance granted to the Paymaster contract and updates `hasAllowance` if it exceeds the minimum threshold. This determines whether the user needs to approve more tokens before transacting.

```typescript
const [hasAllowance, setHasAllowance] = useState(false);

const checkAllowance = async () => {
  try {
    const allowance = await client.readContract({
      abi: parseAbi(['function allowance(address owner, address spender) returns (uint256)']),
      address: cbBtcAddress,
      functionName: 'allowance',
      args: [account.address, paymasterAddressMainnet],
    });
    console.log('allowance: ', allowance);

    setHasAllowance(allowance >= minTokenThreshold);
    return allowance >= minTokenThreshold;
  } catch (error) {
    console.error('Error checking allowance:', error);
    return false;
  }
};
```

This function ensures that users have sufficient tokens approved for gas payments before proceeding with any transaction.

### Update the Mint Function

To enable ERC-20 gas payments, the `handleMint` function must be enhanced to include two key steps. First, the function needs to approve the token for Paymaster use by calling the `approve` function. This ensures that the Paymaster is authorized to spend the user’s tokens for gas payments.

Second, the function must include the `mintTo` call, which executes the NFT minting process. These actions are bundled into a `contracts` array, and the `writeContracts` function is used to execute them sequentially. This approach streamlines the process, allowing users to approve tokens and mint NFTs in one seamless operation.

### Add the Mint Button

Finally, update your component to include a button that triggers the `handleMint` function. This button will either connect the user's wallet or execute the mint process, depending on their connection status.

```tsx
<button
  onClick={
    isConnected
      ? handleMint
      : () =>
          connect({
            connector: coinbaseWallet({
              preference: 'smartWalletOnly',
              appName: 'Hughescoin App',
              appLogoUrl: 'https://onchainkit.xyz/favicon/48x48.png?v4-19-24',
            }),
          })
  }
  className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
  disabled={isMinting}
>
  {isMinting ? 'Minting...' : isConnected ? 'Mint NFT' : 'Connect Wallet'}
</button>
```

![mint-with-cbbtc](../../assets/images/paymaster-tutorials/mint-cbbtc.png)

## Verify the Transactions

After minting, verify the gas payments and NFT minting on a block explorer like [Basescan](https://basescan.org/). Transactions will appear under the **Token Transfers (ERC-20)** tab for the receiving address.

![basescan-transaction-page](../../assets/images/paymaster-tutorials/basescan-token-transfer.png)

## Conclusion

Congratulations! You’ve successfully integrated ERC-20 token-based gas payments into your application using the Coinbase Paymaster. By enabling users to pay for gas fees with tokens like `cbBTC`, you’ve significantly enhanced the onboarding experience and aligned your application’s functionality with its ecosystem token.

This tutorial demonstrated how to request token approval, configure Paymaster gas policies, and implement the necessary functions and hooks in your project. With this setup, your application now offers a seamless and user-friendly experience that abstracts away native token dependencies.

Next, explore further customization options for Paymaster policies to tailor your application’s transaction flow and improve user engagement. Happy building!

---

[token allowance]: https://help.coinbase.com/en/wallet/security/dapp-permissions-token-approvals
[this written guide]: https://docs.base.org/tutorials/gasless-transaction-on-base-using-a-paymaster/
[YouTube walkthrough]: https://www.youtube.com/watch?v=2HemR6jziZ0
[smart wallets]: https://www.smartwallet.dev/why
