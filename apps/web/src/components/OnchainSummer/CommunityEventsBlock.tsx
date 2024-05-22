import Brit from 'apps/web/src/components/OnchainSummer/Brit';
import { WhiteCircle } from 'apps/web/src/components/OnchainSummer/Circles';
import { FadeInSection } from 'apps/web/src/components/OnchainSummer/FadeIns';
import { OCSButton } from 'apps/web/src/components/OnchainSummer/OCSButton';

export default function CommunityEventsBlock() {
  return (
    <div className="flex w-full flex-col items-center rounded-[6px] bg-ocsblue">
      <div className="my-12 flex w-full max-w-[1200px] flex-col rounded-[6px] pt-8 text-white">
        <FadeInSection>
          <div className="text-l flex flex-row items-center gap-2 px-8 font-mono uppercase">
            <WhiteCircle /> Community Events
          </div>
          <div className="my-6 flex flex-col gap-6 px-8">
            <span className="text-5xl font-extrabold leading-9 md:text-7xl">
              <Brit axis={117}>g</Brit>ET TOGE<Brit axis={70}>t</Brit>HER <Brit axis={117}>i</Brit>
              RL
            </span>
            <p className="text-2xl font-light md:text-4xl">
              Want to share what you’ve learned, host a meetup, or simply get together to hack?
            </p>
            <div className="mb-6 mt-6 w-fit">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSf5wnzD_czyYOyHFeOmFK_rjsJj7Utovo3jWwR40JizPqmDZg/viewform"
                target="_blank"
                rel="noreferrer noopener"
              >
                <OCSButton variant="primaryBlue">Apply here</OCSButton>
              </a>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
