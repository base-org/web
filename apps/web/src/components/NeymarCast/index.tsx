import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';
import NeymarFrame from 'apps/web/src/components/NeymarFrame';
import { fetchCast, NeymarCastData } from 'apps/web/src/utils/frames';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NeymarCast({
  identifier,
  type,
}: {
  identifier: string;
  type: 'url' | 'hash';
}) {
  const [data, setData] = useState<NeymarCastData['cast']>();

  useEffect(() => {
    fetchCast({ type, identifier })
      .then((result) => {
        if (result) setData(result);
      })
      .catch((error) => console.log('ERROR', error));
  }, [identifier, type]);

  if (!data) return null;

  const frames = data.frames ?? [];
  const { hash, text, author, parent_url: parentUrl } = data;

  return (
    <article className="flex flex-col gap-4 overflow-hidden rounded-3xl border border-gray-40/20 p-8">
      {author && (
        <Link href={parentUrl} target="_blank">
          <header className="flex items-center gap-4">
            {author.pfp_url && (
              <ImageWithLoading
                src={author.pfp_url}
                wrapperClassName="rounded-full h-[3rem] max-h-[3rem] min-h-[3rem] w-[3rem] min-w-[3rem] max-w-[3rem]"
                imageClassName="object-cover min-h-full min-w-full"
                alt={`${author.display_name} Profile picture`}
                width={48}
                height={48}
              />
            )}
            <div>
              <strong className="block">{author.display_name}</strong>
              <span className="text-gray-40">@{author.username}</span>
            </div>
          </header>
        </Link>
      )}
      <Link href={identifier} target="_blank">
        <p>{text}</p>
      </Link>
      <ul className="flex">
        {frames.map((frame) => (
          <li key={frame.title} className="w-2/3">
            <NeymarFrame frame={frame} hash={hash} />
          </li>
        ))}
      </ul>
    </article>
  );
}
