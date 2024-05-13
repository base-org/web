import { OCSButton } from 'apps/web/src/components/OnchainSummer/OCSButton';

// white circle
function Circle() {
  return <div className="mx-2 h-2 w-2 rounded-full border-2 border-white bg-white" />;
}

export default function AboutBlock() {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-b-[6px] bg-ocsblue text-white">
      <div className="mt-16 flex max-w-[1200px] flex-col gap-8">
        <div className="text-l flex flex-row items-center font-mono uppercase">
          <Circle /> About
        </div>
        <p className="mb-16 text-5xl font-light leading-snug">
          Onchain Summer is a global movement that invites everyone to create and experience the
          potential of onchain. Last year, for 23 days, we celebrated the launch of Base’s mainnet
          with onchain music, gaming, advocacy, and art. This year we’re inviting everyone to build
          all summer long.
        </p>
      </div>
    </div>
  );
}
