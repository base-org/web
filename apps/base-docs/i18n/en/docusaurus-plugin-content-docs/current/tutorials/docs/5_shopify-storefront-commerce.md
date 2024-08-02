---
title: 'Deploy a Shopify Storefront with Coinbase Commerce'
slug: /shopify-storefront-commerce
description: Learn how to launch a Shopify storefront that uses Coinbase Commerce as a crypto payment gateway.
author: hughescoin
keywords:
  [Shopify, Coinbase Commerce, crypto payments, ecommerce, Hydrogen, Oxygen, USDC, ocs, onchain]
tags: ['ecommerce', 'crypto', 'shopify', 'onchain summer', ocs]
difficulty: easy
hide_table_of_contents: false
displayed_sidebar: null
---

Deploy a Shopify Storefront with [Coinbase Commerce Plugin](https://docs.cdp.coinbase.com/commerce-onchain/docs/integrate-shopify/)
[Shopify](https://www.shopify.com/) provides a robust platform for creating online stores.

[Shopify Storefronts](https://www.shopify.com/custom-storefront-tools) allow you to create unique experiences for your online store.

This tutorial will guide you through setting up a Shopify storefront that integrates with Coinbase Commerce, allowing you to accept cryptocurrency payments.

Learn more about [Hydrogen and Oxygen](https://shopify.dev/docs/storefronts/headless/hydrogen/fundamentals).

## Objectives

By the end of this tutorial will be able to:

- Create a Shopify storefront
- Link your Coinbase Commerce account to Shopify
- Link Shopify credentials to your storefront
- Deploy a test site using Hydrogen/Oxygen

## Prerequisites

### Coinbase Commerce

Coinbase Commerce is a platform that enables merchants to accept cryptocurrency payments in a decentralized manner. It provides tools for integrating crypto payments into online stores, offering a secure and straightforward way to receive hundreds of tokens across Base, Polygon, and Ethereum.

To proceed, you will need a Coinbase Commerce Managed account. You can sign up for a business account [here](https://beta.commerce.coinbase.com/sign-up).

### Shopify

You will need a Shopify [Basic plan](https://www.shopify.com/pricing) for this demo, creating a custom storefront, and using Hydrogen/Oxygen

#### Hydrogen

Hydrogen is Shopify's React-based framework for developing custom storefronts, offering components, utilities, and design patterns to simplify working with Shopify APIs. These projects are Remix apps preconfigured with Shopify-specific features.

#### Oxygen

Oxygen is Shopify’s global serverless hosting platform for deploying Hydrogen storefronts at the edge, managing deployment environments, environment variables, caching, and integrating with Shopify’s CDN.

## Getting Started

To comply with Shopify's requirements, the Coinbase Commerce account linked to Shopify must be a Coinbase Managed account.

To create one, [sign up](https://beta.commerce.coinbase.com/sign_up) for a business account and select `Coinbase Commerce` as the account type. See this Coinbase Commerce Merchant [help article](https://help.coinbase.com/en/commerce/getting-started/merchant-guidelines-commerce-application) for additional information on how to sign your business up.

### Link Coinbase Commerce to your Shopify store

![shopify-install-commerce.gif](../../assets/images/shopify-storefront-commerce/shopify-install-commerce.gif)

Once, you've created a Coinbase Commerce Managed account you can now add the plugin to your Shopify store.

To add Coinbase Commerce as a payment method on your Shopify store, start by navigating to your admin page at `https://admin.shopify.com/store/<YOUR-STORE-NAME>`.
Once there, click on Settings , located in the bottom left panel of the screen (or at `https://admin.shopify.com/store/<YOUR-STORE-NAME>settings/general`). Then select the `Payments` tab.
Proceed by clicking `Add a payment method` and choose `Search by provider`. In the search field, type in `Coinbase` and select `Coinbase Commerce` from the results.
Click `Install` and you should be redirected to Coinbase Commerce with a prompt log into your Coinbase account. Finally, click `Activate` to enable the Coinbase Commerce plugin.

### Create a Storefront

This tutorial will guide you through the steps to create a new Hydrogen storefront for your Shopify store. This will allow you to showcase the products you already have in your Shopify account. Make sure you've already created your products by following the [Shopify products guide](https://help.shopify.com/en/manual/online-sales-channels/shop/products-and-collections).

:::warning[Shopify Basic Plan Required]

To access the Hydrogen and Oxygen APIs, Shopify requires users to have at least a Basic Plan. The following steps will not work without this plan configured.

:::

To get started, clone a Shopify demo store using the Hydrogen framework. This will give us a quick setup to work with.

```bash
npm create @shopify/hydrogen@latest -- --quickstart
```

Once the demo store is cloned, navigate into the project directory and start the development server:

```bash
cd hydrogen-quickstart
npx shopify hydrogen dev
```

Next, open a new terminal. You'll need to link your Hydrogen project to your Shopify store. This step connects the demo storefront with your Shopify account, allowing you to display your products.

```bash
npx shopify hydrogen link
```

:::info[Install Hydrogen sales channel]

You will need to create access tokens for your own Shopify store. This is done by installing the [Hydrogen sales channel](https://apps.shopify.com/hydrogen?shpxid=4c8ddf03-1A48-4F61-D565-FB8DC4E5A4A0), which includes built-in support for Oxygen, Shopify’s global edge hosting platform.

:::

The Shopify quickstart comes with a Mock Shop as a template. To ensure your storefront is configured with your products, update the project environment variables.

The following code pulls the necessary settings from your Shopify account into the Hydrogen project:

```bash
npx shopify hydrogen env pull
```

:::note[Not seeing your products?]

Your Shopify store should have products.

Visit [Shopify products guide](https://help.shopify.com/en/manual/online-sales-channels/shop/products-and-collections) for more details.

:::

Now, verify that everything is set up correctly and your site is running. Start the development server again:

```bash
npx shopify hydrogen dev
```

Finally, deploy your Hydrogen storefront to Oxygen, Shopify's hosting platform for Hydrogen apps. Run the following script:

```bash
npx shopify hydrogen deploy
```

Select **Preview** as the deployment type. After deployment, your terminal should display a URL where you can view your live site, such as:

Your terminal will display a url like:
`https://hydrogen-quickstart-20c3648d482c7a17d77d.o2.myshopify.dev/`

You've successfully created and deployed your Hydrogen storefront.

## Accepting payments

Visit your new storefront and add an item to your cart. Proceed to view your cart and then proceed to checkout. On the payment screen, you should see Coinbase Commerce automatically appear as an additional payment method alongside your existing payment options.

:::info[Not seeing a crypto payment option?]

Remember to link "activate" your Coinbase Commerce plugin.

:::

## Conclusion

You now have a custom store front with the products from your Shopify account.

In this tutorial, you learned how to to integrate Coinbase as a payment provider for your Shopify store. You've also learned how to use Hydrogen and Oxygen to create and deploy a version of your store separate from Shopify.
