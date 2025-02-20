'use client';

import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import { CtaBanner as DefaultCtaBanner } from 'apps/web/src/components/Builders/Shared/CtaBanner';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { useCallback } from 'react';
import { Icon } from 'apps/web/src/components/Icon/Icon';

const ONCHAINKIT_DOCS_LINK = 'docs.base.org/builderkits/onchainkit/getting-started';

export function CtaBanner() {
  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText('npm create onchain');
  }, []);

  return (
    <DefaultCtaBanner
      title="What will you build?"
      description="To start building, run the command in your terminal or explore documentation."
      cta={
        <>
          <Button
            variant={ButtonVariants.Secondary}
            iconName="copy"
            onClick={handleCopy}
            className="flex items-center justify-between px-4 py-3"
            iconSize="16"
          >
            npm create onchain
          </Button>
          <ButtonWithLinkAndEventLogging
            href={ONCHAINKIT_DOCS_LINK}
            target="_blank"
            variant={ButtonVariants.SecondaryOutline}
            buttonClassNames="flex items-center justify-between px-4 py-3 group"
            eventName="onchainkit-docs"
          >
            <div className="flex items-center gap-4">
              <span>Documentation</span>
              <div className="transition-transform duration-200 group-hover:translate-x-1">
                <Icon name="arrowRight" width={16} height={16} color="white" />
              </div>
            </div>
          </ButtonWithLinkAndEventLogging>
        </>
      }
    />
  );
}
