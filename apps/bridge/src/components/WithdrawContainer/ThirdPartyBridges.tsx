import Image from 'next/image';

const THIRD_PARTY_BRIDGES = [
  { name: 'Hop Exchange', logo: '/icons/bridges/hop_protocol.webp', url: 'https://hop.exchange/' },
  { name: 'Synapse', logo: '/icons/bridges/synapse.webp', url: 'https://www.synapseprotocol.com' },
  { name: 'Socket Tech', logo: '/icons/bridges/socket.webp', url: 'https://socket.tech/' },
];

type ThirdPartyBridgeProps = {
  name: string;
  logo: string;
  url: string;
};

function ThirdPartyBridge({ name, logo, url }: ThirdPartyBridgeProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="flex h-24 w-36 flex-col items-center justify-center rounded border border-stone-400"
    >
      <Image width={36} height={36} src={logo} alt={name} className="rounded-full" />
      <span className="pt-4 text-center text-white">{name}</span>
    </a>
  );
}

export function ThirdPartyBridges() {
  return (
    <div className="flex w-full max-w-xl grow flex-col justify-center space-y-4 px-4 pt-8">
      <span className="font-mono uppercase text-white">Choose Third-Party Bridge</span>
      <div className="grid grid-cols-2 place-content-center gap-6 sm:grid-cols-3">
        {THIRD_PARTY_BRIDGES.map((bridge) => (
          <ThirdPartyBridge
            key={bridge.name}
            name={bridge.name}
            logo={bridge.logo}
            url={bridge.url}
          />
        ))}
      </div>
      <a
        href="https://base.org/ecosystem?tag=bridge"
        target="_blank"
        rel="noreferrer"
        className="flex w-full items-center justify-center border border-white py-4 font-mono text-lg uppercase text-white"
      >
        Show More
      </a>
      <span className="text-stone-600">
        These are independent service providers that Base is linking to for your convenience. Base
        has no responsibility for their operation.
      </span>
    </div>
  );
}
