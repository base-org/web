'use client';

import { useCallback } from 'react';
import Link from 'apps/web/node_modules/next/link';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import { Button } from 'apps/web/src/components/Button/Button';
import { ActionType, ComponentType } from 'libs/base-ui/utils/logEvent';

type ModalCtaProps = {
  buttonClassNames: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalCta({ buttonClassNames, setIsModalOpen }: ModalCtaProps) {
  const { logEventWithContext } = useAnalytics();

  const handleClick = useCallback(() => {
    logEventWithContext('get_a_basename', ActionType.click, {
      componentType: ComponentType.button,
    });
    setIsModalOpen(false);
  }, [logEventWithContext, setIsModalOpen]);

  return (
    <Link href="/names" onClick={handleClick}>
      <Button className={buttonClassNames}>Get your basename</Button>
    </Link>
  );
}
