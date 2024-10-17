import { useMemo } from 'react';
import Link from 'next/link';
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonSizes, ButtonVariants } from 'apps/web/src/components/base-org/Button/types';

type Department = {
  id: string;
  name: string;
  jobs?: JobType[];
};

export type JobType = {
  id: string;
  title: string;
  location: {
    name: string;
  };
  departments: Department[];
};

type JobProps = {
  job: JobType;
};

export function Job({ job }: JobProps) {
  const { id, title } = job;

  const href = useMemo(
    () => ({
      pathname: 'https://boards.greenhouse.io/embed/job_app',
      query: { token: id, for: 'basejobs' },
    }),
    [id],
  );

  return (
    <Link
      href={href}
      rel="noreferrer"
      target="_blank"
      className="inline-block w-full rounded-2xl bg-white/0 p-4 transition-all hover:bg-white/20"
    >
      <div className="flex w-full flex-col items-center justify-between text-white sm:flex-row">
        <div className="flex w-full flex-col">
          <p className="w-full text-xl">{title}</p>
        </div>

        <Button
          variant={ButtonVariants.Secondary}
          size={ButtonSizes.Large}
          className="mt-4 w-full border sm:mt-0 sm:w-auto"
        >
          <p className="text-sm">Apply now</p>
        </Button>
      </div>
    </Link>
  );
}
