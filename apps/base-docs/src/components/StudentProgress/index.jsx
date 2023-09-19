import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import NFTExerciseData from '../../utils/nft-exercise-data';

import NFTCard from './NFTCard';

export default function StudentProgress() {
  const [earnedNFTCount, setNFTCount] = useState(0);
  const [totalNFTCount] = useState(Object.keys(NFTExerciseData).length);
  const { isConnecting, isConnected, address } = useAccount();

  // mapping addresses to 'true' or 'false' to keep track of `earnedNFTCount
  const earnedNFTMap = Object.keys(NFTExerciseData).reduce((acc, prop) => {
    const nft = NFTExerciseData[prop];

    acc[nft.address] = false;

    return acc;
  }, {});

  // called by NFTCard
  const updateNFTCount = (hasNFT, nftData) => {
    earnedNFTMap[nftData.address] = hasNFT;

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

  const renderNFTs = () => {
    const NFTs = Object.keys(NFTExerciseData).map((nftNum) => {
      const nft = NFTExerciseData[nftNum];

      return (
        <NFTCard
          key={nft.address}
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
            out of {totalNFTCount} Base Camp exercise NFTs.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>{renderNFTs()}</div>
        </div>
      );
    }
    return (
      <p style={{ padding: '5px', textAlign: 'center' }}>
        Connect your wallet to view your Base Camp progress.
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
          <h1 style={{ paddingBottom: '40px' }}>Base Camp Progress</h1>
        </div>
        <div
          style={{
            display: 'flex',
            width: 'auto',
            flexBasis: '50%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: '0.5rem',
            height: '100%',
          }}
        >
          <ConnectButton />
        </div>
      </div>

      {renderNFTProgressContainer()}
    </div>
  );
}
