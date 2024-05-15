import Brit from 'apps/web/src/components/OnchainSummer/Brit';
import { BlackCircle } from 'apps/web/src/components/OnchainSummer/Circles';

export default function SponsorsBlock() {
  return (
    <div className="my-12 flex w-full max-w-[1200px] flex-col">
      <div className="text-l flex flex-row items-center gap-2 px-8 font-mono uppercase">
        <BlackCircle /> Sponsors
      </div>
      <div className="my-6 flex flex-col gap-6 px-8">
        <span className="text-5xl font-extrabold leading-9 md:text-7xl">
          8 <Brit axis={68}>s</Brit>PONSORED TR<Brit>a</Brit>CKS
        </span>
        <p className="mt-4 text-2xl">
          Whether it’s payments, creator tooling or decentralized social, build what you’re
          passionate about
        </p>
      </div>
    </div>
  );
}
