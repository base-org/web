import { StaticImageData } from 'apps/web/node_modules/next/image';

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
  { name: 'transak', img: transak },
  { name: 'quicknode', img: quicknode },
  { name: 'infura', img: infura },
  { name: 'flipside', img: flipside },
  { name: '0x', img: zeroEx },
  { name: 'mnemonic', img: mnemonic },
  { name: 'blockdaemon', img: blockdaemon },
  { name: 'blockscout', img: blockscout },
  { name: 'etherscan', img: etherscan },
  { name: 'chainlink', img: chainlink },
  { name: 'aave', img: aave },
  { name: 'animoca', img: animoca },
  { name: 'thirdweb', img: thirdweb },
  { name: 'magiceden', img: magiceden },
  { name: 'sushiswap', img: sushiswap },
  { name: 'dune', img: dune },
  { name: 'nansen', img: nansen },
  { name: 'parallel', img: parallel },
  { name: 'daz3d', img: daz3d },
  { name: 'socket', img: socket },
  { name: 'hop', img: hop },
  { name: 'euler', img: euler },
];

export type Partner = {
    name: string;
    img: StaticImageData;
}
