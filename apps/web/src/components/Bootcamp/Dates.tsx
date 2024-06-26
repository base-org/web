import { Button, ButtonVariants } from '../Button/Button';
import Link from 'next/link';

export function Dates() {
  return (
    <div className="flex w-full max-w-[1440px] flex-col space-y-20 bg-black px-8 pt-12">
      <div className="flex w-full flex-col font-display text-3xl text-white md:text-5xl lg:text-6xl">
        <p>Dates and deadlines</p>
      </div>
      <div className="grid grid-cols-2">
        <div className="text-md font-sans text-white">
          <p className="pb-2">
            <span className="font-bold">Cohort 4: Approximately</span> March 18, 2024
          </p>
          <p>
            <span className="font-bold">Application deadline:</span> March 11, 2024
          </p>

          <div className="mt-10 w-[200px]">
            <Link
              className="w-full"
              href="https://forms.gle/iqZqJ6WAqkWaouLn8"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Button variant={ButtonVariants.Primary} className="w-full">
                Apply now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
