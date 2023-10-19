import { usdFormatter } from 'apps/bridge/src/utils/formatter/balance';
import { useConversionRate } from 'apps/bridge/src/utils/hooks/useConversionRate';

export function useGetUSDAmount(priceAPIID: string, formattedAmount: string) {
  const conversionRateData = useConversionRate({
    asset: priceAPIID,
  });

  const amountFiat = conversionRateData
    ? usdFormatter(conversionRateData * +formattedAmount)
    : '$0.00';

  return amountFiat;
}
