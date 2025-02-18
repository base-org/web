'use client';

import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { useCallback, useState } from 'react';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { CtaBanner } from 'apps/web/src/components/Builders/Shared/BottomCta/CtaBanner';

export function BottomCta() {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText('npm create onchain');
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000); // Reset after 2 seconds
  }, []);

  return (
    <CtaBanner
      title="What will you build?"
      description="Use a starter template or read documentation to get started."
      sectionClassName="my-24"
      cta={
        <>
          <button
            type="button"
            className="inline-flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 font-medium text-dark-palette-primaryForeground transition-colors hover:bg-white/90"
            onClick={handleCopy}
          >
            npm create onchain
            {hasCopied ? (
              <div className="text-green-60">
                <Icon name="checkmark" width="20" height="20" color="currentColor" />
              </div>
            ) : (
              <Icon name="copy" width="20" height="20" color="currentColor" />
            )}
          </button>
          <ButtonWithLinkAndEventLogging
            variant={ButtonVariants.SecondaryOutline}
            linkClassNames="text-base font-medium text-white block"
            buttonClassNames="flex w-full items-center justify-between px-4 py-3 group !rounded-xl"
            target="_blank"
            href="https://docs.base.org"
            eventName="bottom-cta-documentation"
          >
            <div className="flex w-40 items-center justify-between">
              <span>Documentation</span>
              <div className="transition-transform duration-200 group-hover:translate-x-1">
                <Icon name="arrowRight" width={20} height={20} color="white" />
              </div>
            </div>
          </ButtonWithLinkAndEventLogging>
        </>
      }
    />
  );
}
