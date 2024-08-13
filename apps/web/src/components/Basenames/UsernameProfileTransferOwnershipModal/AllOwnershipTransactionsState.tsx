import { useProfileTransferOwnership } from 'apps/web/src/components/Basenames/UsernameProfileTransferOwnershipModal/context';
import { OwnershipTransactionState } from 'apps/web/src/components/Basenames/UsernameProfileTransferOwnershipModal/OwnershipTransactionState';

// List all 4 transactions states
export default function AllOwnershipTransactionsState() {
  const { ownershipSettings } = useProfileTransferOwnership();
  return (
    <ul className="flex w-full flex-col gap-4">
      {ownershipSettings.map((ownershipSetting) => (
        <li key={ownershipSetting.id} className="flex items-baseline gap-4">
          <OwnershipTransactionState ownershipSetting={ownershipSetting} />
        </li>
      ))}
    </ul>
  );
}
