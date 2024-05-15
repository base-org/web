import { PinkCircle } from 'apps/web/src/components/OnchainSummer/Circles';

export default function AboutBlock() {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-b-[6px] bg-ocsblue text-white">
      <div className="mt-16 flex max-w-[1200px] flex-col gap-8">
        <div className="text-l flex flex-row items-center gap-2 px-8 font-mono uppercase">
          <PinkCircle /> About
        </div>
        <p className="mb-16 px-8 text-3xl font-light leading-snug md:text-5xl">
          Onchain Summer is a global movement that invites everyone to create and experience the
          potential of onchain. Last year, for 23 days, we celebrated the launch of Base’s mainnet
          with onchain music, gaming, advocacy, and art. This year we’re inviting everyone to build
          all summer long.
        </p>
      </div>
    </div>
  );
}
