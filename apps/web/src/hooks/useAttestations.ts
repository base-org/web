import { EarlyAccessProofResponse } from 'apps/web/pages/api/proofs/earlyAccess';
import { CoinbaseProofResponse } from 'apps/web/pages/api/proofs/coinbase';
import AttestationValidatorABI from 'apps/web/src/abis/AttestationValidator';
import EarlyAccessValidatorABI from 'apps/web/src/abis/EarlyAccessValidator';
import CBIDValidatorABI from 'apps/web/src/abis/CBIdDiscountValidator';
import { Discount, IS_EARLY_ACCESS } from 'apps/web/src/utils/usernames';
import { useEffect, useMemo, useState } from 'react';
import { Address, ReadContractErrorType, encodeAbiParameters } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { useErrors } from 'apps/web/contexts/Errors';
import { MerkleTreeProofResponse } from 'apps/web/src/utils/proofs';

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
  const { logError } = useErrors();
  const { address } = useAccount();
  const [cBIDProofResponse, setCBIDProofResponse] = useState<MerkleTreeProofResponse | null>(null);
  const { basenameChain } = useBasenameChain();
  useEffect(() => {
    async function checkCBIDAttestations(a: string) {
      try {
        const params = new URLSearchParams();
        params.append('address', a);
        params.append('chain', basenameChain.id.toString());
        const response = await fetch(`/api/proofs/cbid?${params}`);
        if (response.ok) {
          const result = (await response.json()) as MerkleTreeProofResponse;
          setCBIDProofResponse(result);
        }
      } catch (error) {
        logError(error, 'Error checking CB.ID attestation');
      }
    }

    if (address && !IS_EARLY_ACCESS) {
      checkCBIDAttestations(address).catch((error) => {
        logError(error, 'Error checking CB.ID attestation');
      });
    }
  }, [address, basenameChain.id, logError]);

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
  const { logError } = useErrors();
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
      } catch (error) {
        logError(error, 'Error checking Coinbase account attestations');
      } finally {
        setLoading(false);
      }
    }

    if (address && !IS_EARLY_ACCESS) {
      checkCoinbaseAttestations(address).catch((error) => {
        logError(error, 'Error checking Coinbase account attestations');
      });
    }
  }, [address, basenameChain.id, logError]);

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
  const { logError } = useErrors();
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
      } catch (error) {
        logError(error, 'Error checking CB1 attestation');
      } finally {
        setLoading(false);
      }
    }

    if (address && !IS_EARLY_ACCESS) {
      checkCB1Attestations(address).catch((error) => {
        logError(error, 'Error checking CB1 attestation');
      });
    }
  }, [address, basenameChain.id, logError]);

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
  const { logError } = useErrors();
  const { address } = useAccount();
  const [EAProofResponse, setEAProofResponse] = useState<EarlyAccessProofResponse | null>(null);
  const { basenameChain } = useBasenameChain();

  useEffect(() => {
    async function checkEarlyAccess(a: string) {
      const params = new URLSearchParams();
      params.append('address', a);
      params.append('chain', basenameChain.id.toString());
      const response = await fetch(`/api/proofs/earlyAccess?${params}`);
      if (response.ok) {
        const result = (await response.json()) as EarlyAccessProofResponse;
        setEAProofResponse(result);
      }
    }

    if (address) {
      checkEarlyAccess(address).catch((error) => {
        logError(error, 'Error checking early access');
      });
    }
  }, [address, basenameChain.id, logError]);

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

// export function useBuildathonAttestations() {
//   return { data: null, loading: isLoading, error };
// }
// export function useSummerPassAttestations() {
//   return { data: null, loading: isLoading, error };
// }
// export function useBaseDotEthAttestations() {
//   return { data: null, loading: isLoading, error };
// }

// merkle tree discount calls api endpoint
export function useBNSAttestations() {
  const { address } = useAccount();
  const [proofResponse, setProofResponse] = useState<MerkleTreeProofResponse | null>(null);
  const { basenameChain } = useBasenameChain();
  const { logError } = useErrors();

  useEffect(() => {
    async function checkBNS(a: string) {
      const params = new URLSearchParams();
      params.append('address', a);
      params.append('chain', basenameChain.id.toString());
      const response = await fetch(`/api/proofs/bns?${params}`);
      if (response.ok) {
        const result = (await response.json()) as MerkleTreeProofResponse;
        setProofResponse(result);
      }
    }

    if (address) {
      checkBNS(address).catch((error) => {
        logError(error, 'Error checking BNS discount availability');
      });
    }
  }, [address, basenameChain.id, logError]);

  const encodedProof = useMemo(
    () =>
      proofResponse?.proofs
        ? encodeAbiParameters([{ type: 'bytes32[]' }], [proofResponse?.proofs])
        : '0x0',
    [proofResponse?.proofs],
  );

  const readContractArgs = useMemo(() => {
    if (!proofResponse?.proofs || !address) {
      return {};
    }
    return {
      address: proofResponse?.discountValidatorAddress,
      abi: EarlyAccessValidatorABI,
      functionName: 'isValidDiscountRegistration',
      args: [address, encodedProof],
    };
  }, [address, proofResponse?.discountValidatorAddress, proofResponse?.proofs, encodedProof]);

  const { data: isValid, isLoading, error } = useReadContract(readContractArgs);

  if (isValid && proofResponse && address) {
    return {
      data: {
        discountValidatorAddress: proofResponse.discountValidatorAddress,
        discount: Discount.BNS_NAME,
        validationData: encodedProof,
      },
      loading: false,
      error: null,
    };
  }
  return { data: null, loading: isLoading, error };
}
