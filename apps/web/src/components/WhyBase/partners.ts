import { StaticImport } from 'apps/web/node_modules/next/dist/shared/lib/get-img-props';

import zeroEx from 'apps/web/src/components/WhyBase/partnerImages/0x.svg';
import aave from 'apps/web/src/components/WhyBase/partnerImages/aave.svg';
import animoca from 'apps/web/src/components/WhyBase/partnerImages/animoca.svg';
import blockdaemon from 'apps/web/src/components/WhyBase/partnerImages/blockdaemon.svg';
import blockscout from 'apps/web/src/components/WhyBase/partnerImages/blockscout.svg';
import chainlink from 'apps/web/src/components/WhyBase/partnerImages/chainlink.svg';
import daz3d from 'apps/web/src/components/WhyBase/partnerImages/daz3d.svg';
import dune from 'apps/web/src/components/WhyBase/partnerImages/dune.svg';
import etherscan from 'apps/web/src/components/WhyBase/partnerImages/etherscan.svg';
import euler from 'apps/web/src/components/WhyBase/partnerImages/euler.svg';
import flipside from 'apps/web/src/components/WhyBase/partnerImages/flipside.svg';
import hop from 'apps/web/src/components/WhyBase/partnerImages/hop.svg';
import infura from 'apps/web/src/components/WhyBase/partnerImages/infura.svg';
import magiceden from 'apps/web/src/components/WhyBase/partnerImages/magiceden.svg';
import mnemonic from 'apps/web/src/components/WhyBase/partnerImages/mnemonic.svg';
import nansen from 'apps/web/src/components/WhyBase/partnerImages/nansen.svg';
import parallel from 'apps/web/src/components/WhyBase/partnerImages/parallel.svg';
import quicknode from 'apps/web/src/components/WhyBase/partnerImages/quicknode.svg';
import socket from 'apps/web/src/components/WhyBase/partnerImages/socket.svg';
import sushiswap from 'apps/web/src/components/WhyBase/partnerImages/sushiswap.svg';
import thirdweb from 'apps/web/src/components/WhyBase/partnerImages/thirdweb.svg';
import transak from 'apps/web/src/components/WhyBase/partnerImages/transak.svg';

export const partners: Partner[] = [
  { name: 'transak', img: transak as StaticImport },
  { name: 'quicknode', img: quicknode as StaticImport },
  { name: 'infura', img: infura as StaticImport },
  { name: 'flipside', img: flipside as StaticImport },
  { name: '0x', img: zeroEx as StaticImport },
  { name: 'mnemonic', img: mnemonic as StaticImport },
  { name: 'blockdaemon', img: blockdaemon as StaticImport },
  { name: 'blockscout', img: blockscout as StaticImport },
  { name: 'etherscan', img: etherscan as StaticImport },
  { name: 'chainlink', img: chainlink as StaticImport },
  { name: 'aave', img: aave as StaticImport },
  { name: 'animoca', img: animoca as StaticImport },
  { name: 'thirdweb', img: thirdweb as StaticImport },
  { name: 'magiceden', img: magiceden as StaticImport },
  { name: 'sushiswap', img: sushiswap as StaticImport },
  { name: 'dune', img: dune as StaticImport },
  { name: 'nansen', img: nansen as StaticImport },
  { name: 'parallel', img: parallel as StaticImport },
  { name: 'daz3d', img: daz3d as StaticImport },
  { name: 'socket', img: socket as StaticImport },
  { name: 'hop', img: hop as StaticImport },
  { name: 'euler', img: euler as StaticImport },
];

export type Partner = {
  name: string;
  img: StaticImport;
};
