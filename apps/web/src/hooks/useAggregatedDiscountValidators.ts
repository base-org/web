import {
  AttestationData,
  useCheckCB1Attestations,
  useCheckCBIDAttestations,
  useCheckCoinbaseAttestations,
  useCheckEAAttestations,
  // useBuildathonAttestations,
  // useSummerPassAttestations,
  // useBaseDotEthAttestations,
  useBNSAttestations,
} from 'apps/web/src/hooks/useAttestations';
import { useActiveDiscountValidators } from 'apps/web/src/hooks/useReadActiveDiscountValidators';
import { Discount } from 'apps/web/src/utils/usernames';
import { useMemo } from 'react';

export type DiscountData = AttestationData & { discountKey: `0x${string}` };

export type MappedDiscountData = {
  [key in Discount]?: DiscountData;
};

export function findFirstValidDiscount(
  aggregatedData: MappedDiscountData,
): DiscountData | undefined {
  return (
    Object.values(aggregatedData)
      .sort((a) => (a.discount === Discount.CB1 ? -1 : 1))
      .find((data) => data?.discountKey) ?? undefined
  );
}
export function useAggregatedDiscountValidators() {
  const { data: activeDiscountValidators, isLoading: loadingActiveDiscounts } =
    useActiveDiscountValidators();
  const { data: CBIDData, loading: loadingCBIDAttestations } = useCheckCBIDAttestations();
  const { data: CB1Data, loading: loadingCB1Attestations } = useCheckCB1Attestations();
  const { data: EAData, loading: loadingEAAttestations } = useCheckEAAttestations();
  const { data: coinbaseData, loading: loadingCoinbaseAttestations } =
    useCheckCoinbaseAttestations();
  // const { data: BuildathonData, loading: loadingBuildathon } = useBuildathonAttestations();
  // const { data: SummerPassData, loading: loadingSummerPass } = useSummerPassAttestations();
  // const { data: BaseDotEthData, loading: loadingBaseDotEth } = useBaseDotEthAttestations();
  const { data: BNSData, loading: loadingBNS } = useBNSAttestations();

  const loadingDiscounts =
    loadingCoinbaseAttestations ||
    loadingCBIDAttestations ||
    loadingCB1Attestations ||
    loadingActiveDiscounts ||
    loadingEAAttestations ||
    // loadingBuildathon ||
    // loadingSummerPass ||
    // loadingBaseDotEth ||
    loadingBNS;

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
      if (EAData && validator.discountValidator === EAData.discountValidatorAddress) {
        discountMapping[Discount.EARLY_ACCESS] = { ...EAData, discountKey: validator.key };
      }

      // if (
      //   BuildathonData &&
      //   validator.discountValidator === BuildathonData.discountValidatorAddress
      // ) {
      //   discountMapping[Discount.BASE_BUILDATHON_PARTICIPANT] = {
      //     ...BuildathonData,
      //     discountKey: validator.key,
      //   };
      // }
      // if (
      //   SummerPassData &&
      //   validator.discountValidator === SummerPassData.discountValidatorAddress
      // ) {
      //   discountMapping[Discount.SUMMER_PASS_LVL_3] = {
      //     ...SummerPassData,
      //     discountKey: validator.key,
      //   };
      // }
      // if (
      //   BaseDotEthData &&
      //   validator.discountValidator === BaseDotEthData.discountValidatorAddress
      // ) {
      //   discountMapping[Discount.BASE_ETH_NFT] = { ...BaseDotEthData, discountKey: validator.key };
      // }
      if (BNSData && validator.discountValidator === BNSData.discountValidatorAddress) {
        discountMapping[Discount.BNS_NAME] = { ...BNSData, discountKey: validator.key };
      }
    });

    return discountMapping;
  }, [
    activeDiscountValidators,
    CBIDData,
    CB1Data,
    coinbaseData,
    EAData,
    // BuildathonData,
    // SummerPassData,
    // BaseDotEthData,
    BNSData,
  ]);

  return {
    data: discountsToAttestationData,
    loading: loadingDiscounts,
    hasUsedADiscount: false,
  };
}
