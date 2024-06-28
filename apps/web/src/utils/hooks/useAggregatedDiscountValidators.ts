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
  [key in Discount]?: AttestationData;
};

export function useAggregatedDiscountValidators() {
  const activeDiscountValidators = useActiveDiscountValidators();
  console.log('activeDiscountValidators', activeDiscountValidators);
  const { data: CBIDData, loading: loadingCBIDAttestations } = useCheckCBIDAttestations();
  const { data: CB1Data, loading: loadingCB1Attestations } = useCheckCB1Attestations();
  const { data: coinbaseData, loading: loadingCoinbaseAttestations } =
    useCheckCoinbaseAttestations();

  const loadingDiscounts =
    loadingCoinbaseAttestations || loadingCBIDAttestations || loadingCB1Attestations;

  const mapDiscountsToAttestationData = useMemo<MappedDiscountData>(() => {
    const discountMapping: MappedDiscountData = {};

    if (CBIDData) {
      discountMapping[Discount.CBID] = CBIDData;
    }
    if (CB1Data) {
      discountMapping[Discount.CB1] = CB1Data;
    }
    if (coinbaseData) {
      discountMapping[Discount.COINBASE_VERIFIED_ACCOUNT] = coinbaseData;
    }

    return discountMapping;
  }, [CBIDData, CB1Data, coinbaseData]);

  return {
    data: mapDiscountsToAttestationData,
    loading: loadingDiscounts,
    hasUsedADiscount: false,
  };
}
