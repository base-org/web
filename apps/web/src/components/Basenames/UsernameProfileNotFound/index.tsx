'use client';
import notFoundIllustration from './notFoundIllustration.svg';
import Image, { StaticImageData } from 'next/image';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Link from 'next/link';
import { claimQueryKey } from 'apps/web/src/components/Basenames/RegistrationFlow';
import { BaseName } from '@coinbase/onchainkit/identity';

export default function UsernameProfileNotFound({ username }: { username: BaseName }) {
  return (
    <div className="flex w-full flex-col items-center gap-8 text-center">
      <Image src={notFoundIllustration as StaticImageData} alt="404 Illustration" />
      <h2 className="break-all text-3xl font-bold	">{username} is not found</h2>
      <p className="text-lg">
        There&apos;s no profile associated with this name, but it could be yours!
      </p>
      <Link href={`/names?${claimQueryKey}=${username}`}>
        <Button variant={ButtonVariants.Black} rounded>
          Register name
        </Button>
      </Link>
    </div>
  );
}
