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

Deploy a Shopify Storefront with Coinbase Commerce Plugin
[Shopify](https://www.shopify.com/) provides a robust platform for creating online stores. This tutorial will guide you through setting up a Shopify storefront that integrates with Coinbase Commerce, allowing you to accept cryptocurrency payments.

## Objectives

By the end of this tutorial, you will have a custom storefront with integrated crypto payments, using your existing Shopify products.

You will learn how to:

- Create a Shopify storefront
- Link your Coinbase Commerce account to Shopify
- Link Shopify credentials to your storefront
- Deploy a test site using Hydrogen/Oxygen

## Prerequisites

- Shopify Basic or better
- Github account
- Business Coinbase Commerce account | [Sign up](https://beta.commerce.coinbase.com/sign-up)

## Getting Started

### Link Coinbase Commerce to your Shopify store

![shopify-install-commerce.gif](../../assets/images/shopify-storefront-commerce/shopify-install-commerce.gif)

1. Navigate to your admin page: (`https://admin.shopify.com/store/<YOUR-STORE-NAME>`)
2. Click on Settings (`https://admin.shopify.com/store/<YOUR-STORE-NAME>settings/general`)
3. Click on the “Payments” tab
4. Click “Add a payment method”
5. Click “Search by provider”
6. Type in “Coinbase” in the search field
7. Select “Coinbase Commerce”
8. Click "Install"
9. Log into your Coinbase account
10. Click "Activate" to enable the Coinbase Commerce plugin

### Create a Storefront

This creates a new Hydrogen storefront with products that already exist in your Shopify account.

#### Clone the Shopify Demo Store

```bash
npm create @shopify/hydrogen@latest -- --quickstart
```

```bash
cd hydrogen-quickstart
npx shopify hydrogen dev
```

#### Link your store and create a new Storefront

```bash
npx shopify hydrogen link
```

#### Update Project Environment Variables

```bash
npx shopify hydrogen env pull
```

#### Verify Your Site is Running

```bash
npx shopify hydrogen dev
```

#### Deploy to Oxygen

Run the following script to deploy your site to Oxygen

```bash
npx shopify hydrogen deploy
```

Select **Preview** as the deployment type

Your terminal should display a url like:
`https://hydrogen-quickstart-20c3648d482c7a17d77d.o2.myshopify.dev/`

## Conclusion

You now have a custom store front with the products from your Shopify account.
