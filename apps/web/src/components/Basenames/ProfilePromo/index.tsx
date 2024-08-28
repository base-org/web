'use client';
import classNames from 'classnames';

const videoClasses = classNames('mix-blend-screen');

import globe from './assets/globe.webp';
import { Button } from 'apps/web/src/components/Button/Button';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Image from 'next/image';
import { useLocalStorage } from 'usehooks-ts';
import { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ActionType, ComponentType } from 'libs/base-ui/utils/logEvent';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useAccount } from 'wagmi';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';

export default function ProfilePromo() {
  const [shouldShowPromo, setShouldShowPromo] = useLocalStorage('shouldShowPromo', true);
  // Web3 data
  const { address } = useAccount();
  const { data: basename, isLoading: basenameIsLoading } = useBaseEnsName({
    address,
  });
  const hasExistingBasename = address && basename && !basenameIsLoading;

  const { logEventWithContext } = useAnalytics();
  const onClose = useCallback(() => {
    logEventWithContext('profile_promo_close', ActionType.click, {
      componentType: ComponentType.button,
    });
    setShouldShowPromo(false);
  }, [logEventWithContext, setShouldShowPromo]);

  const onCTA = useCallback(() => {
    logEventWithContext('profile_promo_cta', ActionType.click, {
      componentType: ComponentType.button,
    });
    setShouldShowPromo(false);
  }, [logEventWithContext, setShouldShowPromo]);

  useEffect(() => {
    if (hasExistingBasename) {
      setShouldShowPromo(false);
    }
  }, [hasExistingBasename, setShouldShowPromo]);

  if (!shouldShowPromo) {
    return null;
  }

  return (
    <div
      className="absolute bottom-4 right-4 flex max-w-[18rem] flex-col items-center justify-between gap-4 rounded-[24px] p-6"
      style={{ background: 'linear-gradient(180deg, #000 0%, #725EE5 158.87%)' }}
    >
      <button
        className="absolute right-0 top-0 pr-8 pt-8"
        onClick={onClose}
        tabIndex={0}
        onKeyDown={onClose}
        type="button"
        aria-label="Close promo"
      >
        <Icon name="close" color="white" width={18} height={18} />
      </button>
      <Image src={globe} alt="Globe" className={videoClasses} />
      <span className="w-full font-display text-2xl font-medium text-white">
        Basenames are here!
      </span>
      <p className="text-l text-white">
        Get a Basename and make it easier to connect, collaborate, and contribute onchain.
      </p>
      <Link href="/names" onClick={onCTA}>
        <Button rounded fullWidth>
          Get a Basename
        </Button>
      </Link>
    </div>
  );
}
