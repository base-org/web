---
title: Deploying Smart Contracts
description: Deploy smart contracts with hardhat deploy and hardhat
hide_table_of_contents: false
---

In this article, you'll learn how to deploy smart contracts to multiple Blockchain networks using Hardhat and Hardhat deploy.

---

## Objectives

By the end of this lesson you should be able to:

- Deploy a smart contract to the Base Goerli Testnet with hardhat-deploy
- Deploy a smart contract to the Goerli Testnet with hardhat-deploy
- Deploy a smart contract to the Mumbai Testnet with hardhat-deploy
- Use etherscan to view a deployed smart contract

---

## Overview

Hardhat capabilities enable developers to deploy smart contracts easily to any Blockchain by simply creating `tasks` or `scripts`. However, due to the Hardhat architecture that enables its extension by creating plugins, we can rely in existing solutions developed by the community.

[Hardhat deploy](https://github.com/wighawag/hardhat-deploy) is a community developed plugin that enable the deployment of our smart contracts in a simple way.

## Setup Hardhat Deploy

To install we simply run `npm install -D hardhat-deploy`.

Then we import hardhat-deploy in hardhat.config.ts.

```Javascript
import "hardhat-deploy"
```

We create a folder called deploy and inside a new file called

`001_deploy_lock.ts`

Then we include the following content:

```Javascript
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // code here
};
export default func;
```

We need to modify our tsconfig.json file to look like:

```Javascript
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["./hardhat.config.ts", "./scripts", "./deploy", "./test"]
}
```

Before implementing the deploy functionality, we can configure a deployer account in our `hardhat.config.ts`. Hardhat deploy includes a way to name accounts in our config file.

We can simply do:

```Javascript
const config: HardhatUserConfig = {
  solidity: "0.8.18",
  namedAccounts: {
    deployer: 0
  }
};
```

This simply is adding an alias to the account 0 of our environment.

We now implement the deploy function by including the following in the `001_deploy_lock.ts` file.

```Javascript
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { ethers} from 'hardhat'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deploy} = hre.deployments;
  // We can now use deployer
  const {deployer} = await hre.getNamedAccounts();

  // The value we want to lock
  const VALUE_LOCKED = hre.ethers.parseEther("0.01");

  // The unlock time after deployment
  const UNLOCK_TIME = 10000;

  // We user ethers to get the current time stamp
  const blockNumber = await ethers.provider.getBlockNumber();
  const lastBlockTimeStamp = (await ethers.provider.getBlock(blockNumber))?.timestamp as number

  // We say we want to deploy our Lock contract using the deployer
  // account and passing the value and arguments.
  await deploy("Lock", {
    from: deployer,
    args: [lastBlockTimeStamp + UNLOCK_TIME],
    value: VALUE_LOCKED.toString()
  })
};

export default func;

// This tag will help us in the next section to trigger this deployment file programmatically
func.tags = ["DeployAll"]
```

## Testing our deployment

The easiest way to test our deployment is by modifying our test.

We go to Lock.ts and we include in our imports the following:

`import { ethers, deployments } from "hardhat";`

`deployments` will allow us to execute our deployment files from our test.

We change our `before` function to look like:

```Javascript

before(async() => {
    lastBlockTimeStamp = await time.latest()

    const signers = await ethers.getSigners()
    ownerSigner = signers[0]
    otherUserSigner= signers[1]

    await deployments.fixture(['DeployAll']);
    const lockDeployment = await deployments.get('Lock');

    lockInstance =  Lock__factory.connect(lockDeployment.address, ownerSigner)
})
```

Notice how we execute `deployments.fixture` and pass a tag that matches the tag we specified in our deployment file (001_deploy_lock.ts).

This will execute our deployment file, so we can reuse that functionality and simply consume the address of the newly deployed contract by using:

```Javascript
 const lockDeployment = await deployments.get('Lock');
```

Then we reuse `Lock__factory` but we use the connect function and pass the address of the newly created contract plus a signer.

Now we simply run `npx hardhat test`

And we should get the same result:

```
  Lock
    ✔ should get the unlockTime value
    ✔ should have the right ether balance
    ✔ should have the right owner
    ✔ shouldn"t allow to withdraw before unlock time (51ms)
    ✔ shouldn"t allow to withdraw a non owner
    ✔ should allow to withdraw a owner


  6 passing (2s)
```

## Deploy to a test network

Deploying to a real test network involves configuring the network parameters in our hardhat config file:

We need to include parameters like:

- The JSON RPC url
- The account we want to use
- To have real test ether or the native Blockchain token for gas costs.

We will include the following in our `hardhat.config.ts`:

```Javascript
const config: HardhatUserConfig = {
  solidity: "0.8.18",
  namedAccounts: {
    deployer: 0
  },
  networks: {
    base_goerli: {
      url: "https://goerli.base.org",
      accounts: {
        mnemonic: process.env.MNEMONIC ?? ""
      }
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_GOERLI_KEY ?? ""}`,
      accounts: {
        mnemonic: process.env.MNEMONIC ?? ""
      }
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_MUMBAI_KEY ?? ""}`,
      accounts: {
        mnemonic: process.env.MNEMONIC ?? ""
      }
    }
  }
};
```

We have configued 3 networks:

- base_goerli
- goerli
- mumbai

You also need to create a .env file with the following variables:

```
MNENOMIC="<REPLACE WITH YOUR MNEMONIC>"
ALCHEMY_GOERLI_KEY=<REPLACE WITH YOUR API KEY>
ALCHEMY_MUMBAI_KEY=<REPLACE WITH YOUR API KEY>
```

In order to ensure the environment variables are loaded, we need to install another package called dotenv.

We install dotenv by running `npm install -D dotenv`.

And we include in our `hardhat.config.ts` the following:

```Javascript
import dotenv from 'dotenv'

dotenv.config()
```

Now let's deploy to base with the following command:

`npx hardhat deploy --network base_goerli`

After we run this command we should have a deployments folder with a newly created deployment for base_goerli.

![New deployment](../../assets/images/hardhat-deploying/new-deploy.png)

If we want to deploy to another network, we simply change the network name as the follows:

`npx hardhat deploy --network goerli`

or to deploy to mumbai:

`npx hardhat deploy --network mumbai`

Be aware you that you need to have the right environment variables for the JSON RPC urls. For instance for goerli `ALCHEMY_GOERLI_KEY` and for mumbai `ALCHEMY_MUMBAI_KEY`.

## Conclusion

In this lesson, you've learned how to deploy smart contracts using Hardhat and Hardhat-deploy. We have configured hardhat to easily deploy to multiple networks and we created deployment files to abstract this task.

---

## See also

[Solidity Docs](https://docs.soliditylang.org/en/v0.8.17/)
[Remix Project]: https://remix-project.org/
[Hardhat]: https://hardhat.org/
[Hardhat Deploy]: https://github.com/wighawag/hardhat-deploy
