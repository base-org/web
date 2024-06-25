import { CBIDProofResponse } from 'apps/web/pages/api/proofs/cbid';
import { CoinbaseProofResponse } from 'apps/web/pages/api/proofs/coinbase';
import { ProofTableNamespace } from 'apps/web/src/utils/proofs';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export function useCheckCBIDAttestations() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CBIDProofResponse | null>(null);

  useEffect(() => {
    async function checkCBIDAttestations() {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/proofs/cbid?address=${address}&namespace=${ProofTableNamespace.Usernames}`,
        );
        const result = (await response.json()) as CBIDProofResponse;
        setData(result);
      } catch (e) {
        console.error('Error checking CB.ID attestation:', e);
      } finally {
        setLoading(false);
      }
    }

    if (address) {
      checkCBIDAttestations();
    }
  }, [address]);

  return { data, loading };
}

export function useCheckCoinbaseAttestations() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CoinbaseProofResponse | null>(null);

  useEffect(() => {
    async function checkCoinbaseAttestations() {
      try {
        setLoading(true);
        const response = await fetch(`/api/proofs/coinbase?address=${address}`);
        const result = (await response.json()) as CoinbaseProofResponse;
        setData(result);
      } catch (e) {
        console.error('Error checking coinbase attestations (CB1, Account verification):', e);
      } finally {
        setLoading(false);
      }
    }

    if (address) {
      checkCoinbaseAttestations();
    }
  }, [address]);

  return { data, loading };
}
