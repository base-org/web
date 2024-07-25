/* eslint-disable */
import React from 'react';
import { useState } from 'react';
import { useAccount } from 'wagmi';

import useNFTData from '../../utils/nft-exercise-data';
import NFTCard from './NFTCard';

export default function StudentProgress() {
  const nftData = useNFTData();

  const [earnedNFTCount, setNFTCount] = useState(0);
  const [totalNFTCount] = useState(Object.keys(nftData).length);
  const { isConnecting, isConnected, address, chain } = useAccount();

  // mapping addresses to 'true' or 'false' to keep track of `earnedNFTCount`
  const earnedNFTMap = Object.keys(nftData).reduce((acc, prop) => {
    const nft = nftData[prop];

    acc[nft.deployment.address] = false;

    return acc;
  }, {});

  // called by NFTCard
  const updateNFTCount = (hasNFT, nft) => {
    earnedNFTMap[nft.deployment.address] = hasNFT;

    setNFTCount(
      Object.keys(earnedNFTMap).reduce((acc, prop) => {
        const thisOneHasNFT = earnedNFTMap[prop];

        if (thisOneHasNFT) {
          return acc + 1;
        }

        return acc;
      }, 0),
    );
  };

  // Function to render the NFT cards in the desired order (imports after 'inheritance' and before 'errors')
  const renderNFTs = () => {
    // Get the sorted NFT keys, excluding key '19' imports
    const sortedNFTKeys = Object.keys(nftData)
      .filter((key) => key !== '19')
      .sort((a, b) => a - b);

    // Find the index of key '8' and insert key '19' after it
    const index = sortedNFTKeys.findIndex((key) => key === '8');
    sortedNFTKeys.splice(index + 1, 0, '19');

    // Map over the sorted NFT keys and render the NFT cards
    const NFTs = sortedNFTKeys.map((nftNum) => {
      const nft = nftData[nftNum];

      return (
        <NFTCard
          key={nft.deployment.address}
          currentWalletAddress={address}
          nftData={nft}
          updateNFTCount={updateNFTCount}
        />
      );
    });

    return NFTs;
  };

  const renderNFTProgressContainer = () => {
    if (isConnecting) {
      return <p style={{ textAlign: 'center' }}>Connecting...</p>;
    }
    if (isConnected) {
      return (
        <div style={{ padding: '5px' }}>
          <p style={{ paddingBottom: '25px' }}>
            Address <span style={{ color: '#688CEC' }}>{address}</span> has earned {earnedNFTCount}{' '}
            out of {totalNFTCount} Base Learn exercise NFTs on {chain.name}.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>{renderNFTs()}</div>
        </div>
      );
    }
    return (
      <p style={{ padding: '5px', textAlign: 'center' }}>
        Connect your wallet to view your Base Learn progress.
      </p>
    );
  };

  return (
    <div style={{ padding: '25px' }}>
      <div style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
        <div
          style={{
            display: 'flex',
            width: 'auto',
            flexBasis: '50%',
            flexDirection: 'row',
            paddingRight: '0.5rem',
          }}
        >
          <h1 style={{ paddingBottom: '40px' }}>Base Learn Progress</h1>
        </div>
      </div>

      {renderNFTProgressContainer()}
    </div>
  );
}
