import React from 'react';
import NavbarLayout from '@theme/Navbar/Layout';
import NavbarContent from '@theme/Navbar/Content';
import { OcsBanner } from '../../components/OnchainSummer/OcsBanner';
export default function Navbar() {
  return (
    <>
      <OcsBanner />
      <NavbarLayout>
        <NavbarContent />
      </NavbarLayout>
    </>
  );
}
