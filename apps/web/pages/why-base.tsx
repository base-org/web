import React from 'react';

import Hero from '../src/components/WhyBase/Hero';
import ActiveCommunityOfBuilders from '../src/components/WhyBase/ActiveCommunityOfBuilders';
import EvmEquivalent from '../src/components/WhyBase/EvmEquivalent';
import PerformanceAndCost from 'apps/web/src/components/WhyBase/PerformanceAndCost';
import { Divider } from '../src/components/Divider/Divider';

export default function WhyBase() {
  return (
    <div className='text-white'>
      <Hero />
      <ActiveCommunityOfBuilders />
      <Divider />
      <PerformanceAndCost />
      <Divider />
      <EvmEquivalent />
    </div>
  );
}
