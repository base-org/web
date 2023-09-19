import { getOEContract } from '@eth-optimism/sdk';
import { Log, TransactionReceipt } from '@ethersproject/providers';
import { WithdrawalMessage } from 'apps/bridge/src/types/WithdrawalMessage';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const L2_L1_MESSAGE_PASSER_ADDRESS = (
  publicRuntimeConfig?.l2L1MessagePasserAddress ?? '0x4200000000000000000000000000000000000016'
).toLowerCase();

const L2_CHAIN_ID = Number.isNaN(parseInt(publicRuntimeConfig?.l2ChainID))
  ? 84531
  : parseInt(publicRuntimeConfig?.l2ChainID);

const l2L1MessagePasserInterface = getOEContract('L2ToL1MessagePasser', L2_CHAIN_ID, {
  address: L2_L1_MESSAGE_PASSER_ADDRESS,
}).interface;

export function getWithdrawalMessage(
  withdrawalReceipt: TransactionReceipt,
  isERC20Withdrawal = false,
) {
  let parsedWithdrawalLog;
  if (isERC20Withdrawal) {
    const messageLog = withdrawalReceipt.logs.find((log) => {
      if (log.address === L2_L1_MESSAGE_PASSER_ADDRESS) {
        const parsed = l2L1MessagePasserInterface.parseLog(log);
        return parsed.name === 'MessagePassed';
      }
      return false;
    });
    parsedWithdrawalLog = l2L1MessagePasserInterface.parseLog(messageLog as Log) as unknown as {
      args: WithdrawalMessage;
    };
  } else {
    parsedWithdrawalLog = l2L1MessagePasserInterface.parseLog(
      withdrawalReceipt.logs[0],
    ) as unknown as {
      args: WithdrawalMessage;
    };
  }

  const withdrawalMessage = {
    nonce: parsedWithdrawalLog.args.nonce,
    sender: parsedWithdrawalLog.args.sender,
    target: parsedWithdrawalLog.args.target,
    value: parsedWithdrawalLog.args.value,
    gasLimit: parsedWithdrawalLog.args.gasLimit,
    data: parsedWithdrawalLog.args.data,
  };

  return withdrawalMessage;
}
