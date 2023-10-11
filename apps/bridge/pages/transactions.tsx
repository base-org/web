import { memo, useMemo, useState } from 'react';
import { AccountContainer } from 'apps/bridge/src/components/AccountContainer/AccountContainer';
import { FaqSidebar } from 'apps/bridge/src/components/Faq/FaqSidebar';
import { Table } from 'apps/bridge/src/components/system/layout/Table/Table';
import { DepositRow } from 'apps/bridge/src/components/Transactions/DepositRow/DepositRow';
import { FinalizeWithdrawalModal } from 'apps/bridge/src/components/Transactions/WithdrawalRow/FinalizeWithdrawalModal';
import { ProveWithdrawalModal } from 'apps/bridge/src/components/Transactions/WithdrawalRow/ProveWithdrawalModal';
import { WithdrawalRow } from 'apps/bridge/src/components/Transactions/WithdrawalRow/WithdrawalRow';
import { useDeposits } from 'apps/bridge/src/data/useDeposits';
import { useWithdrawals } from 'apps/bridge/src/data/useWithdrawals';
import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';
import { mergeAndSortTransactionsLists } from 'apps/bridge/src/utils/array/mergeAndSortTransactionLists';
import { useAddress } from 'apps/bridge/src/utils/hooks/useAddress';
import { useChainEnv } from 'apps/bridge/src/utils/hooks/useChainEnv';
import { useDisclosure } from 'apps/bridge/src/utils/hooks/useDisclosure';
import { useBlockNumberOfLatestL2OutputProposal } from 'apps/bridge/src/utils/hooks/useBlockNumberOfLatestL2OutputProposal';
import Head from 'next/head';
import Image from 'next/image';

const COLUMNS = ['Time', 'Type', 'Amount', 'Phase', 'Status'];

type TransactionTableProps = {
  transactions: BridgeTransaction[];
};

const TransactionsTable = memo(function TransactionsTable({ transactions }: TransactionTableProps) {
  const blockNumberOfLatestL2OutputProposal = useBlockNumberOfLatestL2OutputProposal();

  const [modalProveTxHash, setModalProveTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [modalFinalizeTxHash, setModalFinalizeTxHash] = useState<`0x${string}` | undefined>(
    undefined,
  );

  const {
    isOpen: isProveWithdrawalModalOpen,
    onOpen: onOpenProveWithdrawalModal,
    onClose: onCloseProveWithdrawalModal,
  } = useDisclosure();
  const {
    isOpen: isFinalizeWithdrawalModalOpen,
    onOpen: onOpenFinalizeWithdrawalModal,
    onClose: onCloseFinalizeWithdrawalModal,
  } = useDisclosure();

  return (
    <div className="h-screen w-full overflow-auto">
      <ProveWithdrawalModal
        isOpen={isProveWithdrawalModalOpen}
        onClose={onCloseProveWithdrawalModal}
        proveTxHash={modalProveTxHash}
      />
      <FinalizeWithdrawalModal
        isOpen={isFinalizeWithdrawalModalOpen}
        onClose={onCloseFinalizeWithdrawalModal}
        finalizeTxHash={modalFinalizeTxHash}
      />
      <Table
        head={COLUMNS}
        rows={transactions.map((transaction) => {
          if (transaction.type === 'Deposit') {
            return <DepositRow key={transaction.hash} transaction={transaction} />;
          }
          return (
            <WithdrawalRow
              key={transaction.hash}
              transaction={transaction}
              blockNumberOfLatestL2OutputProposal={blockNumberOfLatestL2OutputProposal}
              onOpenProveWithdrawalModal={onOpenProveWithdrawalModal}
              onCloseProveWithdrawalModal={onCloseProveWithdrawalModal}
              onOpenFinalizeWithdrawalModal={onOpenFinalizeWithdrawalModal}
              onCloseFinalizeWithdrawalModal={onCloseFinalizeWithdrawalModal}
              setModalProveTxHash={setModalProveTxHash}
              setModalFinalizeTxHash={setModalFinalizeTxHash}
            />
          );
        })}
      />
    </div>
  );
});

const Empty = memo(function Empty() {
  const chainEnv = useChainEnv();
  const isMainnet = chainEnv === 'mainnet';

  return (
    <div className="mb-2 mt-2 flex h-full min-h-[440px] w-full flex-row items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center">
        <Image src="/icons/empty-transaction.png" width="240" height="240" alt="" />
        <h3 className="color-white pt-16 font-display text-2xl">Bridge your assets with Base</h3>
        <span className="max-w-[420px] pt-2 text-base text-[#8A919E]">
          {isMainnet
            ? 'You can bridge whitelisted ERC-20 tokens from Ethereum mainnet to Base mainnet.'
            : 'You can bridge whitelisted ERC-20 token from Goerli / Sepolia (Ethereum testnet) to Base Goerli / Sepolia testnet.'}
        </span>
        <a
          href="./"
          className="mt-6 inline-block max-w-[200px] rounded bg-white px-5 py-3.5 text-center font-sans font-bold text-[#000000] decoration-[#000000]"
        >
          BRIDGE ASSETS
        </a>
      </div>
    </div>
  );
});

const Loading = memo(function Loading() {
  return <div className="flex h-full w-full items-center justify-center">Loading</div>;
});

export default memo(function Transactions() {
  const address = useAddress();
  const { deposits, isFetched: depositsLoaded } = useDeposits(address);
  const { withdrawals, isFetched: withdrawalsLoaded } = useWithdrawals(address);
  const hasDeposits = !!deposits.length;
  const hasWithdrawals = !!withdrawals.length;

  const sortedTransactions = useMemo(() => {
    if (depositsLoaded && withdrawalsLoaded) {
      return mergeAndSortTransactionsLists(deposits, withdrawals);
    }
    return [];
  }, [deposits, withdrawals, depositsLoaded, withdrawalsLoaded]);

  let content;

  if (hasDeposits || hasWithdrawals) {
    content = <TransactionsTable transactions={sortedTransactions} />;
  } else if (depositsLoaded && withdrawalsLoaded) {
    content = <Empty />;
  } else {
    content = <Loading />;
  }

  return (
    <>
      <Head>
        <title>Base</title>
      </Head>
      <AccountContainer>
        <>
          <div className="grow">{content}</div>
          <FaqSidebar />
        </>
      </AccountContainer>
    </>
  );
});
