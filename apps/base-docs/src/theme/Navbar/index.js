import React from 'react';

import NavbarLayout from '@theme/Navbar/Layout';
import NavbarContent from '@theme/Navbar/Content';
import Banner from '../../components/Banner/Banner';

export default function Navbar() {
  return (
    <>
      <Banner
        bannerName="basenamesLaunchDocsBanner"
        href="https://base.org/names?utm_source=docs&utm_medium=banner"
        text="Claim Your Basename Today!"
      />
      <NavbarLayout>
        <NavbarContent />
      </NavbarLayout>
    </>
  );
}
