import SearchIcon from 'apps/web/src/components/Icon/SearchIcon';

export default function Search() {
  return (
    <div className="flex w-1/2 flex-row">
      <input
        type="text"
        placeholder="search for a name"
        className="w-full rounded border border-solid border-muted bg-darkgray px-3 py-4 text-white focus:border-2 focus:border-white focus:outline-none "
      />
      <button className="relative left-[-40px]" type="submit">
        <SearchIcon />
      </button>
    </div>
  );
}
