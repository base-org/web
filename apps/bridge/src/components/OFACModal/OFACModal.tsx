import { Modal } from 'apps/bridge/src/components/Modal/Modal';
import Image from 'next/image';

type OFACModalProps = {
  isOpen: boolean;
};

function BridgeCard({ name, url, imageFilename, domain }: { name: string; url: string; imageFilename: string, domain: string }) {
  return (
    <a href={url}>
      <div className="flex flex-row gap-4 bg-neutral-800 p-4 rounded-8">
        <Image src={`/images/partners/${imageFilename}`} alt={name} width={48} height={48} className="rounded-full" />
        <div className="flex flex-col">
          <p className="text-white text-md text-left">{name}</p>
          <p className="text-sm font-mono">{domain}</p>
        </div>
      </div>
    </a>
  );
}

export function OFACModal({ isOpen }: OFACModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title="THIS SERVICE IS NOT AVAILABLE IN YOUR REGION"
      content={(
        <div>
          <p className="text-white mt-4">Alternatively, you can use these approved third-party bridges.</p>
          <div className="flex flex-row gap-8 mt-8">
            <BridgeCard name="Hop" url="https://app.hop.exchange" imageFilename="hop.png" domain="app.hop.exchange" />
            <BridgeCard name="Bungee" url="https://bungee.exchange" imageFilename="bungee.png" domain="bungee.exchange" />
          </div>
        </div>
  )}
    />
  );
}
