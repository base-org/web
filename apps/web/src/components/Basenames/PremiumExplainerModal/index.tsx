import Modal from 'apps/web/src/components/Modal';
import { formatEther } from 'viem';

type PremiumExplainerModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
  premiumEthAmount: bigint;
  singleYearEthCost: bigint;
};
export function PremiumExplainerModal({
  isOpen,
  toggleModal,
  premiumEthAmount,
  singleYearEthCost,
}: PremiumExplainerModalProps) {
  const ethTotal = premiumEthAmount + singleYearEthCost;
  return (
    <Modal isOpen={isOpen} onClose={toggleModal} title="">
      <div className="flex max-w-[491px] flex-1 flex-col gap-3">
        <h1 className="w-full text-2xl font-bold">This name has a temporary premium</h1>
        <p className="mb-3 text-illoblack">
          To ensure fair distribution of Basenames, all names have a temporary premium starting at
          100 ETH that then decays exponentially to 0 over 36 hours.
        </p>
        <div className="grid w-full grid-cols-2 grid-rows-4">
          <div className="col-span-2 text-sm font-medium uppercase text-gray-60">current price</div>
          <div className="font-medium">1 year registration</div>
          <div className="justify-self-end">{formatEther(singleYearEthCost)} ETH</div>
          <div className="font-medium">Temporary premium</div>
          <div className="justify-self-end">{formatEther(premiumEthAmount)} ETH</div>
          <div className="font-medium">Estimated total</div>
          <div className="justify-self-end">{formatEther(ethTotal)} ETH</div>
        </div>
        <div>
          <p>See price over time</p>
          <div>insert graph here</div>
        </div>
      </div>
    </Modal>
  );
}
