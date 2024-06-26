import { CBIDProofResponse } from 'apps/web/pages/api/proofs/cbid';
import { CoinbaseProofResponse } from 'apps/web/pages/api/proofs/coinbase';
import { ProofTableNamespace } from 'apps/web/src/utils/proofs';
import { useEffect, useState } from 'react';
import { base, baseSepolia } from 'viem/chains';
import { useAccount } from 'wagmi';

export function useCheckCBIDAttestations() {
  const { chainId } = useAccount();
  const address = '0xB18e4C959bccc8EF86D78DC297fb5efA99550d85';
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CBIDProofResponse | null>(null);

  useEffect(() => {
    async function checkCBIDAttestations() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append('address', address);
        params.append('namespace', ProofTableNamespace.Usernames);
        params.append('chain', (chainId === baseSepolia.id ? chainId : base.id).toString());
        const response = await fetch(`/api/proofs/cbid?${params}`);
        const result = (await response.json()) as CBIDProofResponse;
        setData(result);
      } catch (e) {
        console.error('Error checking CB.ID attestation:', e);
      } finally {
        setLoading(false);
      }
    }

    if (address) {
      checkCBIDAttestations().catch(console.error);
    }
  }, [address, chainId]);

  return { data, loading };
}

// returns info about Coinbase verified account attestations
export function useCheckCoinbaseAttestations() {
  const { chainId } = useAccount();
  const address = '0xB18e4C959bccc8EF86D78DC297fb5efA99550d85';
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CoinbaseProofResponse | null>(null);

  useEffect(() => {
    async function checkCoinbaseAttestations() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append('address', address);
        params.append('chain', (chainId === baseSepolia.id ? chainId : base.id).toString());
        const response = await fetch(`/api/proofs/coinbase?${params}`);
        const result = (await response.json()) as CoinbaseProofResponse;
        setData(result);
      } catch (e) {
        console.error('Error checking Coinbase account attestations:', e);
      } finally {
        setLoading(false);
      }
    }

    if (address) {
      checkCoinbaseAttestations().catch(console.error);
    }
  }, [address, chainId]);

  return { data, loading };
}

// returns info about CB1 attestations
export function useCheckCB1Attestations() {
  const { chainId } = useAccount();
  const address = '0xB18e4C959bccc8EF86D78DC297fb5efA99550d85';
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CoinbaseProofResponse | null>(null);

  useEffect(() => {
    async function checkCB1Attestations() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append('address', address);
        params.append('chain', (chainId === baseSepolia.id ? chainId : base.id).toString());
        const response = await fetch(`/api/proofs/cb1?${params}`);
        const result = (await response.json()) as CoinbaseProofResponse;
        setData(result);
      } catch (e) {
        console.error('Error checking CB1 attestation:', e);
      } finally {
        setLoading(false);
      }
    }

    if (address) {
      checkCB1Attestations().catch(console.error);
    }
  }, [address, chainId]);

  return { data, loading };
}
