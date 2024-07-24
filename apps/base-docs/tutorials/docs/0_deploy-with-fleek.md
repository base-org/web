---
title: 'Deploy an Onchain App with Fleek'
slug: /deploy-with-fleek
description: Learn how to deploy an onchain app using Fleek.
author: briandoyle81
keywords: [deploy, fleek, onchain, dapp, onchain app]
tags: ['frontend']
difficulty: hard
hide_table_of_contents: false
displayed_sidebar: null
---

One of the "secrets" of onchain apps is that they almost always have a very large web2 component that they're dependent on. Most onchain apps rely on traditional infrastructure for their frontends, APIs, and other parts of the architecture.

[Fleek]'s goal is to address this issue with the [Fleek Network], a fast and trustless Content Delivery Network (CDN).

In this tutorial, you'll use [Fleek] to deploy a site built with the [An Onchain App in 100 Components] template.

---

## Objectives

By the end of this tutorial you should be able to:

- Deploy a [Next.js] using the Coinbase [Smart Wallet] on [Fleek]
- Integrate with [Github] for CI/CD

## Prerequisites

### Next.js

You should be familiar with [Next.js], but do not need to be an expert. If you are comfortable with other React libraries, the pattern should be relatively easy to follow.

### Onchain Apps

The tutorial assumes you're comfortable with the basics of deploying an app and connecting it to a smart contract. If you're still learning this part, check out our tutorials in [Base Learn] for [Building an Onchain App].

---

## Setting up the Template

You can skip this section if you've already built an app based off the template, such as our tutorial for [How to Mint on Zora with an App].

Open [An Onchain App in 100 Components], click the green `Use  this template` button, and create a new repository from the template. Clone your repo and open it in an editor.

Install _bun_ if you need to, and install dependencies.

```bash
# Install bun in case you don't have it
curl -fsSL https://bun.sh/install | bash

# Install packages
bun i

# Run Next app
bun run dev
```

Navigate to `localhost:3000` and make sure that it's working, then shut down the server. For this tutorial, you **do not** need to set any environment variables.

## Installing and Configuring Fleek

[Fleek] requires static pages, so you'll need to ensure that your build process produces them. In your editor, open `next.config.js` and update the `nextConfig`.

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
```

Save and close the file.

Run `bun run build` and confirm that a directory called `out` is created.

Navigate to [Fleek]'s website and create an account, or log in if you already have one.

Click into `First Project`. You can rename it if you want in the `Settings` tab.

The best way to start is to link Fleek to your repo from the beginning. Click `Add New` from the upper right corner, then select `Deploy My Site`. Select your code location, log into your Git provider, and accept installing the Fleek app.

You can either give it permissions for all repos, or add them one at a time.

Select your repo, and click the `Deploy` button. The `Configure Site` window should automatically populate with the appropriate information, but just in case:

- Site Name: Your site name
- Framework: Next.js
- Branch: main
- Publish Directory: out
- Build Command: npm install && npm run build

Click `Deploy Site`. Your deploy will probably fail, but this is expected!

Return to your code editor.

Open a terminal and install the Fleek CLI with:

```bash
npm install -g @fleek-platform/cli
```

Then, **in the root of your project** run:

```bash
fleek login
```

Click the link in your terminal, then click `Confirm` in the web page that opens up. Once your are connected, click the `Visit Dashboard` button. The site automatically creates a project called `First Project`. If you'd like, you can rename it, or add a new one.

Each project can include more than one site.

Return to your terminal in the app folder, and run:

```bash
fleek sites init
```

Select `First Project` from the list

```
⚠️ Warning! To proceed, please select a project...

✔ Select a project from the list: › First Project

✅ Success! You have switched to project "First Project".
```

For `We've found existing sites. Would you like to link to one of them?`, pick: `Y`

Find the site you just added and select it.

:::caution

You're using TypeScript, but **do not** select `TypeScript (fleek.config.ts)` in the final prompt. Select `JSON (fleek.config.json)`.

:::

You'll get a few more prompts:

- ? Please specify the directory containing the site files to be uploaded
  - Enter `out`
- ? Would you like to include the optional "build" command?
  - Pick `Y`
- ? Specify `build` command:
  - Enter `npm install && npm run build`
  - Select `JSON (fleek.config.json)`

### Deployment

You can deploy the site from the CLI as the docs describe, but you **do not need to**. There is a better way!

```bash
# Don't use, better method below!
fleek sites deploy
```

Instead, trigger an automatic deploy by making a change to the text at `src/app/page.tsx`, committing your changes, and pushing to your repo.

## Dashboard Overview and Confirming Deployment

Return to your dashboard and click on the `Sites` tab. Click on the card for your new site to open it. Here, you can see information about your site in a similar presentation to other deployment providers.

Click on the `<-> Deploys` tab and you'll see the automatic deploy you triggered by pushing the commit! Open your site by clicking on the build once it shifts from `Pending` to `Live`. You can then click on the link to view your site.

Click on `Settings`. If you'd like, you can change the slug for your site to a name that's more related to your project.

## Conclusion

In this tutorial, you learned how to use [Fleek] to deploy a [Next.js] site based on [An Onchain App in 100 Components]. You also learned how to link Fleek to your Git provider to enable CI/CD.

---

[Base Learn]: https://base.org/learn
[Smart Wallet]: https://www.smartwallet.dev/why
[Fleek]: https://fleek.xyz
[Fleek Network]: https://fleek.xyz/blog/announcements/introducing-fleek-network-and-fleek-xyz/
[Next.js]: https://nextjs.org/
[An Onchain App in 100 Components]: https://github.com/Zizzamia/an-onchain-app-in-100-components
[Smart Wallet]: https://www.coinbase.com/wallet/smart-wallet
[How to Mint on Zora with an App]: /tutorials/minting-nfts-with-zora
