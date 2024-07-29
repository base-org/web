import { useMemo } from 'react';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Link from 'next/link';

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
    <div className="mt-6 flex w-full flex-col justify-between text-white sm:flex-row">
      <div className="flex flex-col">
        <Link href={href} rel="noreferrer" target="_self">
          <p className="mt-2 max-w-[750px] text-xl">{title}</p>
        </Link>
      </div>
      <Link href={href} rel="noreferrer" target="_self" className="w-full self-center sm:w-auto">
        <Button variant={ButtonVariants.Primary} className="mt-4 w-full border sm:mt-0 sm:w-auto">
          <p className="text-sm">Apply now</p>
        </Button>
      </Link>
    </div>
  );
}
