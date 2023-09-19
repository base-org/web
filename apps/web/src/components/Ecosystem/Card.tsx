/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import Image from 'next/image';

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
      className="flex w-full flex-col justify-start gap-8 bg-gray p-8 visited:opacity-50 hover:bg-darkgray"
    >
      <div className="flex flex-row justify-between">
        <div className="relative h-[80px] w-[80px] overflow-hidden rounded-[3px]">
          <Image src={imageUrl} fill style={{ objectFit: 'contain' }} alt={`Logo of ${name}`} />
        </div>
        <div className="flex h-6 flex-col justify-center rounded-[100px] bg-black py-1 px-2">
          <span className="font-mono text-xs uppercase text-white">{tags[0]}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="font-mono text-xl uppercase text-white">{name}</span>
          <span className="muted truncate font-mono text-muted">
            {getNiceDomainDisplayFromUrl(url)}
          </span>
        </div>
        <div className="ecosystem-card-description font-sans text-base text-white">
          {description}
        </div>
      </div>
    </a>
  );
}
