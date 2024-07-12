import React from 'react';

import NavbarLayout from '@theme/Navbar/Layout';
import NavbarContent from '@theme/Navbar/Content';
import Banner from '../../components/Banner/Banner';

export default function Navbar() {
  return (
    <>
      <Banner
        bannerName="onchainKitBanner"
        href="https://onchainkit.xyz/?utm_source=basedocs&utm_medium=banner"
        text="Build on Base in minutes with OnchainKit!"
      />
      <NavbarLayout>
        <NavbarContent />
      </NavbarLayout>
    </>
  );
}
