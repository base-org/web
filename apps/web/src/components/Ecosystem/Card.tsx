'use client';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';

type Props = {
  name: string;
  url: string;
  description: string;
  imageUrl: string;
  tags: string[];
};

function getNiceDomainDisplayFromUrl(url: string) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0];
}

export function Card({ name, url, description, imageUrl, tags }: Props) {
  return (
    <a
      href={url}
      rel="noreferrer noopener"
      target="_blank"
      className="flex w-full flex-col justify-start gap-8 bg-gray-90 p-8 visited:opacity-50 hover:bg-gray-dark"
    >
      <div className="flex flex-row justify-between">
        <div className="relative h-[80px] w-[80px] overflow-hidden rounded-[3px]">
          <ImageWithLoading
            src={imageUrl}
            alt={`Logo of ${name}`}
            width={80}
            height={80}
            backgroundClassName="bg-black"
          />
        </div>
        <div className="flex h-6 flex-col justify-center rounded-[100px] bg-black px-2 py-1">
          <span className="font-mono text-xs uppercase text-white">{tags[0]}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h3 className="font-mono text-xl uppercase text-white">{name}</h3>
          <span className="truncate font-mono text-gray-muted">
            {getNiceDomainDisplayFromUrl(url)}
          </span>
        </div>
        <p className="ecosystem-card-description font-sans text-base text-white">{description}</p>
      </div>
    </a>
  );
}
