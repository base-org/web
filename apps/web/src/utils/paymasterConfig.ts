import { base, baseSepolia } from "viem/chains";
import { ENTRYPOINT_ADDRESS_V06 } from "permissionless";
import { createClient, createPublicClient, http } from "viem";
import { paymasterActionsEip7677 } from "permissionless/experimental";


export function initializeClient() {
  
  const client = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });
  return client;
}

const paymasterService = process.env.NEXT_PUBLIC_PAYMASTER_SERVICE; // Change this to the official paymaster

export const paymasterClient = createClient({
  chain: baseSepolia,
  transport: http(paymasterService),
}).extend(paymasterActionsEip7677(ENTRYPOINT_ADDRESS_V06));