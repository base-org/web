import { encodeAbiParameters, keccak256, parseAbiParameters } from 'viem';

type HashWithdrawalParams = {
  nonce: bigint;
  sender: `0x${string}`;
  target: `0x${string}`;
  value: bigint;
  gasLimit: bigint;
  data: `0x${string}`;
};

// Hashes a withdrawal
export function hashWithdrawal({
  nonce,
  sender,
  target,
  value,
  gasLimit,
  data,
}: HashWithdrawalParams) {
  return keccak256(
    encodeAbiParameters(parseAbiParameters('uint256, address, address, uint256, uint256, bytes'), [
      nonce,
      sender,
      target,
      value,
      gasLimit,
      data,
    ]),
  );
}
