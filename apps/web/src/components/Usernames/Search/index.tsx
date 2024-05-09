import SearchIcon from 'apps/web/src/components/Icon/SearchIcon';
import Image from 'next/image';
import UsernameFlair from 'apps/web/public/images/usernames/UsernameFlair.png';

type UsernameResult = {
  name: string;
  available: boolean;
  tooShort?: boolean;
};

function useUsernames(): UsernameResult[] {
  return [
    {
      name: 'jesse-pollak.base.eth',
      available: false,
    },
    {
      name: 'jessepollak.base.eth',
      available: true,
    },
    {
      name: 'jp.base.eth',
      available: false,
      tooShort: true,
    },
  ];
}

function UnavailableTag() {
  return <div className="rounded bg-blue-0 px-2 py-1 text-blue-60">Unavailable</div>;
}

function TooShortTag() {
  return <div className="rounded bg-red-0 px-2 py-1 text-red-60">Too short</div>;
}

function AvailableTag() {
  return <div className="rounded bg-green-0 px-2 py-1 text-green-60">Available</div>;
}

function UsernameResultRow({ name, available, tooShort }: UsernameResult) {
  return (
    <div className="flex flex-row items-center justify-between border-b border-solid border-translucent-200 bg-gray p-4 last:border-none">
      <div className="font-bold text-white">{name}</div>
      <div className="text-sm text-white">
        {tooShort ? <TooShortTag /> : available ? <AvailableTag /> : <UnavailableTag />}
      </div>
    </div>
  );
}

export default function Search() {
  const usernames = useUsernames();
  return (
    <div className="flex w-full flex-row justify-around px-12">
      <div className="flex w-1/2 max-w-[600px] flex-col gap-6 text-white">
        <h1 className="text-3xl uppercase">YOUR BASE USERNAME</h1>
        <p>Search for and create a .base.eth username</p>
        <div className="flex flex-col gap-2">
          <div className="relative flex w-full flex-row items-center">
            <input
              type="text"
              placeholder="search for a name"
              className="w-full rounded border border-solid border-muted bg-darkgray px-3 py-4 text-white focus:border-2 focus:border-white focus:outline-none "
            />
            <button className="absolute right-[10px]" type="submit">
              <SearchIcon />
            </button>
          </div>
          <div>
            {usernames.map((data) => (
              <UsernameResultRow key={data.name} {...data} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-1/2 flex-col items-end">
        <Image src={UsernameFlair} alt="base circles in a square arrangement" />
      </div>
    </div>
  );
}
