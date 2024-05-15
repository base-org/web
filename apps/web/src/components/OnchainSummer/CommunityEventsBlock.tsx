import Brit from 'apps/web/src/components/OnchainSummer/Brit';
import { WhiteCircle } from 'apps/web/src/components/OnchainSummer/Circles';
import { OCSButton } from 'apps/web/src/components/OnchainSummer/OCSButton';

export default function CommunityEventsBlock() {
  return (
    <div className="flex w-full flex-col items-center rounded-[6px] bg-ocsblue">
      <div className="my-12 flex w-full max-w-[1200px] flex-col rounded-[6px] pt-8 text-white">
        <div className="text-l flex flex-row items-center gap-2 px-8 font-mono uppercase">
          <WhiteCircle /> Community Events
        </div>
        <div className="my-6 flex flex-col gap-6 px-8">
          <span className="text-5xl font-extrabold leading-9 md:text-7xl">
            <Brit axis={117}>g</Brit>ET TOGE<Brit axis={70}>t</Brit>HER <Brit axis={117}>i</Brit>RL
          </span>
          <p className="text-2xl font-light">
            Want to share what you’ve learned, host a meetup, or simply get together to hack?
          </p>
          <div className="mb-6 w-fit">
            <OCSButton variant="primary">Apply here</OCSButton>
          </div>
        </div>
      </div>
    </div>
  );
}
