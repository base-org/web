/* eslint-disable */
import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';

export default function NFTCard({ nftData, updateNFTCount, currentWalletAddress }) {
  const [hasNFT, setHasNFT] = useState(false);

  const { data } = useContractRead({
    address: nftData.deployment.address,
    abi: nftData.deployment.abi,
    functionName: 'owners',
    args: [currentWalletAddress],
  });

  useEffect(() => {
    if (data) {
      setHasNFT(true);
      updateNFTCount(data, nftData);
    }
  }, [data, updateNFTCount, nftData]);

  function renderNFTCard() {
    if (hasNFT) {
      return (
        <div>
          <a href={nftData.url}>
            <img
              title={nftData.title}
              alt={nftData.title}
              style={{ width: '12rem' }}
              src={nftData.img}
            />
            <p style={{ textAlign: 'center' }}>{nftData.title}</p>
          </a>
        </div>
      );
    }
    return (
      <div>
        <a href={nftData.url}>
          <img
            title={nftData.title}
            alt={nftData.title}
            style={{ width: '12rem', filter: 'blur(4px)grayscale(100%)' }}
            src={nftData.img}
          />
          <p style={{ textAlign: 'center' }}>{nftData.title}</p>
        </a>
      </div>
    );
  }

  return <div>{renderNFTCard()}</div>;
}
