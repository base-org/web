'use client';
import notFoundIllustration from './notFoundIllustration.svg';
import Image, { StaticImageData } from 'next/image';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function UsernameProfileNotFound() {
  const params = useSearchParams();
  const username = params?.get('name');

  const title = `${username ?? 'Name'} is not found`;
  const description = username
    ? "There's no profile associated with this name, but it could be yours!"
    : "This profile doesn't exist";
  const linkHref = username ? `/names?claim=${username}` : `/names`;
  return (
    <div className="flex w-full flex-col items-center gap-8 text-center">
      <Image src={notFoundIllustration as StaticImageData} alt="404 Illustration" />
      <h2 className="break-all text-3xl font-bold	">{title}</h2>
      <p className="text-lg">{description}</p>
      <Link href={linkHref}>
        <Button variant={ButtonVariants.Black} rounded>
          Register name
        </Button>
      </Link>
    </div>
  );
}
