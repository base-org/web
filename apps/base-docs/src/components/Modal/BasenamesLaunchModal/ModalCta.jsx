import React, { useCallback } from 'react';
import Link from '@docusaurus/Link';
import { useAnalytics } from 'base-ui/contexts/Analytics';
import { ActionType, ComponentType } from 'base-ui/utils/logEvent';

export default function ModalCta({ buttonClassNames, setIsModalOpen }) {
  const { logEventWithContext } = useAnalytics();

  const handleClick = useCallback(() => {
    logEventWithContext('get_a_basename', ActionType.click, {
      componentType: ComponentType.button,
    });
    setIsModalOpen(false);
  }, [logEventWithContext, setIsModalOpen]);

  return (
    <Link href="https://base.org/names?utm_source=docs&utm_medium=modal" onClick={handleClick}>
      <button className={buttonClassNames}>Get your basename</button>
    </Link>
  );
}
