import { Discount } from 'apps/web/pages/names';
import {
  AttestationData,
  useCheckCB1Attestations,
  useCheckCBIDAttestations,
  useCheckCoinbaseAttestations,
} from 'apps/web/src/utils/hooks/useAttestations';
import { useActiveDiscountValidators } from 'apps/web/src/utils/hooks/useReadActiveDiscountValidators';
import { useMemo } from 'react';

type MappedDiscountData = {
  [key in Discount]?: AttestationData & { discountKey: `0x${string}` };
};

export function findFirstValidDiscountKey(
  aggregatedData: MappedDiscountData,
): `0x${string}` | undefined {
  return Object.values(aggregatedData).find((data) => data?.discountKey)?.discountKey ?? undefined;
}
export function useAggregatedDiscountValidators() {
  const { data: activeDiscountValidators, isLoading: loadingActiveDiscounts } =
    useActiveDiscountValidators();
  const { data: CBIDData, loading: loadingCBIDAttestations } = useCheckCBIDAttestations();
  const { data: CB1Data, loading: loadingCB1Attestations } = useCheckCB1Attestations();
  const { data: coinbaseData, loading: loadingCoinbaseAttestations } =
    useCheckCoinbaseAttestations();

  const loadingDiscounts =
    loadingCoinbaseAttestations ||
    loadingCBIDAttestations ||
    loadingCB1Attestations ||
    loadingActiveDiscounts;

  const discountsToAttestationData = useMemo<MappedDiscountData>(() => {
    const discountMapping: MappedDiscountData = {};

    const activeValidators =
      activeDiscountValidators?.filter((validator) => validator.active) ?? [];

    activeValidators.forEach((validator) => {
      if (CBIDData && validator.discountValidator === CBIDData.discountValidatorAddress) {
        discountMapping[Discount.CBID] = { ...CBIDData, discountKey: validator.key };
      }
      if (CB1Data && validator.discountValidator === CB1Data.discountValidatorAddress) {
        discountMapping[Discount.CB1] = { ...CB1Data, discountKey: validator.key };
      }
      if (coinbaseData && validator.discountValidator === coinbaseData.discountValidatorAddress) {
        discountMapping[Discount.COINBASE_VERIFIED_ACCOUNT] = {
          ...coinbaseData,
          discountKey: validator.key,
        };
      }
    });

    return discountMapping;
  }, [activeDiscountValidators, CBIDData, CB1Data, coinbaseData]);

  return {
    data: discountsToAttestationData,
    loading: loadingDiscounts,
    hasUsedADiscount: false,
  };
}
