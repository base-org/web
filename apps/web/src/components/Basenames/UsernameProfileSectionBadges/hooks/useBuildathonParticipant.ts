import { useReadContract } from 'wagmi';
import BuildathonSBT from 'apps/web/src/abis/BuildathonSBT';

const PARTICIPANT_SBT_ADDRESS = '0x59ca61566C03a7Fb8e4280d97bFA2e8e691DA3a6';

export default function useBuildathonParticipant(address?: `0x${string}`): boolean {
  const { data: balanceOf } = useReadContract({
    address: PARTICIPANT_SBT_ADDRESS,
    abi: BuildathonSBT,
    functionName: 'balanceOf',
    args: [address ?? '0x'],
    query: {
      enabled: !!address,
    },
  });

  if (!balanceOf) return false;
  return balanceOf > 0;
}
