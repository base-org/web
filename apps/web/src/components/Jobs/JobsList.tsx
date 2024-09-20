'use client';

import { useEffect, useMemo, useState } from 'react';
import { Divider } from 'apps/web/src/components/Divider/Divider';
import { Job } from 'apps/web/src/components/Jobs/Job';
import { greenhouseApiUrl } from 'apps/web/src/constants';
import { useErrors } from 'apps/web/contexts/Errors';

async function getJobs() {
  const res = await fetch(`${greenhouseApiUrl}/boards/basejobs/jobs?content=true`);
  const { jobs } = (await res.json()) as { jobs: JobType[] };
  return jobs;
}

type Department = {
  id: string;
  name: string;
  jobs?: JobType[];
};

type DepartmentByIdReduceType = Record<string, { name: string; jobs: JobType[] }>;

export type JobType = {
  id: string;
  title: string;
  location: {
    name: string;
  };
  departments: Department[];
};

export default function JobsList() {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const { logError } = useErrors();
  useEffect(() => {
    getJobs()
      .then((js) => setJobs(js))
      .catch((error) => {
        logError(error, 'Failed to get jobs');
      });
  }, [logError]);

  const departments = useMemo(() => {
    const departmentsById = jobs.reduce<DepartmentByIdReduceType>((acc, job) => {
      const name = !job.departments.length ? 'Other' : job.departments[0].name;
      const id = !job.departments.length ? 'no-department' : job.departments[0].id;
      acc[id] = {
        name,
        jobs: !acc[id] ? [job] : [...acc[id].jobs, job],
      };

      return acc;
    }, {} as DepartmentByIdReduceType);

    return Object.entries(departmentsById).map(([id, department]) => ({ id, ...department }));
  }, [jobs]);

  return !jobs.length ? (
    <p className="text-md my-8 p-1">Loading jobs...</p>
  ) : (
    <div className="mt-10 flex w-full flex-col">
      <div className="flex flex-col">
        {departments.map((department, index) => (
          <div key={department.id}>
            <h2 className="text-xl font-bold">
              {department.name === 'Business Development & Partnerships'
                ? 'Ecosystem'
                : department.name}
            </h2>
            <div className="flex flex-col">
              {department.jobs?.map((job) => (
                <Job key={job.id} job={job} />
              ))}
            </div>
            {departments.length - 1 !== index && <Divider fullWidth />}
          </div>
        ))}
      </div>
    </div>
  );
}
