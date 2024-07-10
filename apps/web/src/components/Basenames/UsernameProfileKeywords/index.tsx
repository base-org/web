import classNames from 'classnames';

type UsernameProfileKeywordsProps = {
  keywords: string;
};

export default function UsernameProfileKeywords({ keywords }: UsernameProfileKeywordsProps) {
  const keywordsArray = keywords.split(',').filter((k) => !!k);
  return (
    <div>
      <h2 className="font-bold uppercase text-[#5B616E]">Area of expertise</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {keywordsArray.map((keyword) => (
          <li key={keyword}>
            <button
              type="button"
              className={classNames(
                'lex items-center gap-2 rounded-xl bg-line/10 px-3 py-2 text-sm text-black',
              )}
            >
              {keyword}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
