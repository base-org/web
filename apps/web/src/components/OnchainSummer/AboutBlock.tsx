import { PinkCircle } from 'apps/web/src/components/OnchainSummer/Circles';

export default async function AboutBlock() {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-b-[6px] bg-ocsblue text-white">
      <div className="mt-16 flex max-w-[1200px] flex-col gap-8">
        <div className="text-l flex flex-row items-center gap-2 px-8 font-mono uppercase">
          <PinkCircle /> About
        </div>
        <p className="mb-16 px-8 text-3xl font-light leading-snug md:text-5xl">
          We’re bringing back Onchain Summer to unleash onchain creativity, and invite everyone to
          build all summer long. Build, create, and get rewarded.
        </p>
      </div>
    </div>
  );
}
