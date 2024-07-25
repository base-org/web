import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { GradientCircle } from 'apps/web/src/components/GradientCircle/GradientCircle';
import Link from 'next/link';

export function Commitment() {
  return (
    <div className="flex w-full max-w-[1440px] flex-col px-8 py-12">
      <div className="flex flex-col justify-between pb-6 lg:flex-row lg:gap-20">
        <div className="flex flex-col pb-8 font-display text-3xl text-white lg:basis-1/2 lg:pb-16 lg:text-6xl">
          <h2>Base is our commitment to onchain</h2>
        </div>
        <div className="flex flex-col lg:basis-1/2">
          <p className="pb-6 font-display text-sm text-white md:text-lg lg:text-xl">
            We believe that the onchain platform is the most important builder platform since the
            internet (“online”). We believe that the onchain platform should be open source, free to
            use, and globally available. And we believe that in order to make it really work, we
            need all hands on deck, working together to scale in a secure, decentralized,
            easy-to-use way.
          </p>
          <Link href="/about" aria-label="Read more about us">
            <Button variant={ButtonVariants.Primary} className="lg:self-start">
              Read More
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-10 flex max-w-[1440px] flex-row justify-between gap-4 self-center bg-gray-90 p-4 lg:p-8">
        <GradientCircle className="h-[90px] w-[90px] md:h-[100px] md:w-[100px] xl:h-[163px] xl:w-[163px]" />
        <GradientCircle className="hidden h-[90px] w-[90px] md:h-[100px] md:w-[100px] lg:inline-block xl:h-[163px] xl:w-[163px]" />
        <GradientCircle className="hidden h-[90px] w-[90px] md:h-[100px] md:w-[100px] lg:inline-block xl:h-[163px] xl:w-[163px]" />
        <GradientCircle
          type="secondary"
          className="h-[90px] w-[90px] md:h-[100px] md:w-[100px] xl:h-[163px] xl:w-[163px]"
        />
        <GradientCircle className="hidden h-[90px] w-[90px] rotate-180 md:h-[100px] md:w-[100px] lg:inline-block xl:h-[163px] xl:w-[163px]" />
        <GradientCircle className="hidden h-[90px] w-[90px] rotate-180 md:h-[100px] md:w-[100px] lg:inline-block xl:h-[163px] xl:w-[163px]" />
        <GradientCircle className="h-[90px] w-[90px] rotate-180 md:h-[100px] md:w-[100px] xl:h-[163px] xl:w-[163px]" />
      </div>
    </div>
  );
}
