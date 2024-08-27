import { useFrameContext } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import { StaticImageData } from 'next/image';

import cornerGarnish from './corner-garnish.svg';
import frameIcon from './frame-icon.svg';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';

export default function TryNowHero() {
  const { openFrameManagerModal } = useFrameContext();

  return (
    <section className="relative flex flex-row items-center justify-start gap-2 rounded-xl border border-palette-line/20 pl-1 pr-6">
      <ImageAdaptive alt="" src={frameIcon as StaticImageData} className="z-1" />
      <div className="grow">
        <h1 className="text-xl font-medium text-illoblack">Pin a frame to your profile</h1>
        <p className="max-w-80 text-illoblack">
          Add fun and interactive experiences to your profile with a frame.
        </p>
      </div>
      <Button rounded variant={ButtonVariants.Black} onClick={openFrameManagerModal}>
        Try it now
      </Button>
      <ImageAdaptive
        alt=""
        src={cornerGarnish as StaticImageData}
        className="absolute bottom-0 left-0 z-0 rounded-bl-xl"
      />
    </section>
  );
}
