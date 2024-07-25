import { CBIDProofResponse } from 'apps/web/pages/api/proofs/cbid';
import { EarlyAccessProofResponse } from 'apps/web/pages/api/proofs/earlyAccess';
import { CoinbaseProofResponse } from 'apps/web/pages/api/proofs/coinbase';
import AttestationValidatorABI from 'apps/web/src/abis/AttestationValidator';
import EarlyAccessValidatorABI from 'apps/web/src/abis/EarlyAccessValidator';
import CBIDValidatorABI from 'apps/web/src/abis/CBIdDiscountValidator';
import { Discount } from 'apps/web/src/utils/usernames';
import { useEffect, useMemo, useState } from 'react';
import { Address, ReadContractErrorType, encodeAbiParameters } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';

const isEarlyAccess = process.env.NEXT_PUBLIC_USERNAMES_EARLY_ACCESS == 'true';

export type AttestationData = {
  discountValidatorAddress: Address;
  discount: Discount;
  validationData: `0x${string}`;
};
type AttestationHookReturns = {
  data: AttestationData | null;
  loading: boolean;
  error: ReadContractErrorType | null;
};
export function useCheckCBIDAttestations(): AttestationHookReturns {
  const { address } = useAccount();
  const [cBIDProofResponse, setCBIDProofResponse] = useState<CBIDProofResponse | null>(null);
  const { basenameChain } = useBasenameChain();
  useEffect(() => {
    async function checkCBIDAttestations(a: string) {
      try {
        const params = new URLSearchParams();
        params.append('address', a);
        params.append('chain', basenameChain.id.toString());
        const response = await fetch(`/api/proofs/cbid?${params}`);
        if (response.ok) {
          const result = (await response.json()) as CBIDProofResponse;
          setCBIDProofResponse(result);
        }
      } catch (e) {
        console.error('Error checking CB.ID attestation:', e);
      }
    }

    if (address && !isEarlyAccess) {
      checkCBIDAttestations(address).catch(console.error);
    }
  }, [address, basenameChain.id]);

  const encodedProof = useMemo(
    () =>
      cBIDProofResponse?.proofs
        ? encodeAbiParameters([{ type: 'bytes32[]' }], [cBIDProofResponse?.proofs])
        : '0x0',
    [cBIDProofResponse?.proofs],
  );
  const readContractArgs = useMemo(() => {
    if (!cBIDProofResponse?.proofs || !address) {
      return {};
    }
    return {
      address: cBIDProofResponse?.discountValidatorAddress,
      abi: CBIDValidatorABI,
      functionName: 'isValidDiscountRegistration',
      args: [address, encodedProof],
    };
  }, [
    address,
    cBIDProofResponse?.discountValidatorAddress,
    cBIDProofResponse?.proofs,
    encodedProof,
  ]);

  const { data: isValid, isLoading, error } = useReadContract(readContractArgs);

  if (isValid && cBIDProofResponse && address) {
    return {
      data: {
        discountValidatorAddress: cBIDProofResponse.discountValidatorAddress,
        discount: Discount.CBID,
        validationData: encodedProof,
      },
      loading: false,
      error: null,
    };
  }
  return { data: null, loading: isLoading, error };
}

// returns info about Coinbase verified account attestations
export function useCheckCoinbaseAttestations() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [coinbaseProofResponse, setCoinbaseProofResponse] = useState<CoinbaseProofResponse | null>(
    null,
  );
  const { basenameChain } = useBasenameChain();

  useEffect(() => {
    async function checkCoinbaseAttestations(a: string) {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append('address', a);
        params.append('chain', basenameChain.id.toString());
        const response = await fetch(`/api/proofs/coinbase?${params}`);
        const result = (await response.json()) as CoinbaseProofResponse;
        if (response.ok) {
          setCoinbaseProofResponse(result);
        }
      } catch (e) {
        console.error('Error checking Coinbase account attestations:', e);
      } finally {
        setLoading(false);
      }
    }

    if (address && !isEarlyAccess) {
      checkCoinbaseAttestations(address).catch(console.error);
    }
  }, [address, basenameChain.id]);

  const signature = coinbaseProofResponse?.signedMessage as undefined | `0x${string}`;

  const readContractArgs = useMemo(() => {
    if (!address || !signature) {
      return {};
    }
    return {
      address: coinbaseProofResponse?.discountValidatorAddress,
      abi: AttestationValidatorABI,
      functionName: 'isValidDiscountRegistration',
      args: [address, signature],
    };
  }, [address, coinbaseProofResponse?.discountValidatorAddress, signature]);

  const { data: isValid, isLoading, error } = useReadContract(readContractArgs);

  if (isValid && coinbaseProofResponse && address && signature) {
    return {
      data: {
        discountValidatorAddress: coinbaseProofResponse.discountValidatorAddress,
        discount: Discount.COINBASE_VERIFIED_ACCOUNT,
        validationData: signature,
      },
      loading: false,
      error: null,
    };
  }
  return { data: null, loading: loading || isLoading, error };
}

export function useCheckCB1Attestations() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [cb1ProofResponse, setCB1ProofResponse] = useState<CoinbaseProofResponse | null>(null);
  const { basenameChain } = useBasenameChain();
  useEffect(() => {
    async function checkCB1Attestations(a: string) {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append('address', a);
        params.append('chain', basenameChain.id.toString());
        const response = await fetch(`/api/proofs/cb1?${params}`);
        if (response.ok) {
          const result = (await response.json()) as CoinbaseProofResponse;
          setCB1ProofResponse(result);
        }
      } catch (e) {
        console.error('Error checking CB1 attestation:', e);
      } finally {
        setLoading(false);
      }
    }

    if (address && !isEarlyAccess) {
      checkCB1Attestations(address).catch(console.error);
    }
  }, [address, basenameChain.id]);

  const signature = cb1ProofResponse?.signedMessage as undefined | `0x${string}`;

  const readContractArgs = useMemo(() => {
    if (!address || !signature) {
      return {};
    }
    return {
      address: cb1ProofResponse?.discountValidatorAddress,
      abi: AttestationValidatorABI,
      functionName: 'isValidDiscountRegistration',
      args: [address, signature],
    };
  }, [address, cb1ProofResponse?.discountValidatorAddress, signature]);

  const { data: isValid, isLoading, error } = useReadContract(readContractArgs);

  if (isValid && cb1ProofResponse && address && signature) {
    return {
      data: {
        discountValidatorAddress: cb1ProofResponse.discountValidatorAddress,
        discount: Discount.CB1,
        validationData: signature,
      },
      loading: false,
      error: null,
    };
  }
  return { data: null, loading: loading || isLoading, error };
}

export function useCheckEAAttestations(): AttestationHookReturns {
  const { address } = useAccount();
  const [EAProofResponse, setEAProofResponse] = useState<EarlyAccessProofResponse | null>(null);
  const { basenameChain } = useBasenameChain();

  useEffect(() => {
    async function checkEarlyAccess(a: string) {
      try {
        const params = new URLSearchParams();
        params.append('address', a);
        params.append('chain', basenameChain.id.toString());
        const response = await fetch(`/api/proofs/earlyAccess?${params}`);
        if (response.ok) {
          const result = (await response.json()) as EarlyAccessProofResponse;
          setEAProofResponse(result);
        }
      } catch (e) {
        console.error('Error checking early access:', e);
      }
    }

    if (address) {
      checkEarlyAccess(address).catch(console.error);
    }
  }, [address, basenameChain.id]);

  const encodedProof = useMemo(
    () =>
      EAProofResponse?.proofs
        ? encodeAbiParameters([{ type: 'bytes32[]' }], [EAProofResponse?.proofs])
        : '0x0',
    [EAProofResponse?.proofs],
  );

  const readContractArgs = useMemo(() => {
    if (!EAProofResponse?.proofs || !address) {
      return {};
    }
    return {
      address: EAProofResponse?.discountValidatorAddress,
      abi: EarlyAccessValidatorABI,
      functionName: 'isValidDiscountRegistration',
      args: [address, encodedProof],
    };
  }, [address, EAProofResponse?.discountValidatorAddress, EAProofResponse?.proofs, encodedProof]);

  const { data: isValid, isLoading, error } = useReadContract(readContractArgs);

  if (isValid && EAProofResponse && address) {
    return {
      data: {
        discountValidatorAddress: EAProofResponse.discountValidatorAddress,
        discount: Discount.EARLY_ACCESS,
        validationData: encodedProof,
      },
      loading: false,
      error: null,
    };
  }
  return { data: null, loading: isLoading, error };
}
