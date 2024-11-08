import { Job } from 'apps/web/src/components/Jobs/Job';
import Card from 'apps/web/src/components/base-org/Card';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

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

export default async function JobsList({ jobs }: { jobs: JobType[] }) {
  const departmentsById = jobs.reduce<DepartmentByIdReduceType>((acc, job) => {
    const name = !job.departments.length ? 'Other' : job.departments[0].name;
    const id = !job.departments.length ? 'no-department' : job.departments[0].id;
    acc[id] = {
      name,
      jobs: !acc[id] ? [job] : [...acc[id].jobs, job],
    };

    return acc;
  }, {} as DepartmentByIdReduceType);

  const departments = Object.entries(departmentsById).map(([id, department]) => ({
    id,
    ...department,
  }));

  return !jobs.length ? (
    <p className="text-md my-8 p-1">Loading jobs...</p>
  ) : (
    <div className="mt-10 flex w-full flex-col">
      <div className="flex flex-col gap-12">
        {departments.map((department) => (
          <div key={department.id}>
            <Title level={TitleLevel.Title1} className="mb-6">
              {department.name === 'Business Development & Partnerships'
                ? 'Ecosystem'
                : department.name}
            </Title>
            <Card innerClassName="p-6 transition-all bg-[#0A0B0C] hover:bg-[#111111]">
              <div className="flex flex-col gap-2">
                {department.jobs?.map((job) => (
                  <Job key={job.id} job={job} />
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
