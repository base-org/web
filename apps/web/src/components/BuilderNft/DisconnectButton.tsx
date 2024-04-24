import { Button } from 'apps/web/src/components/Button/Button';
import { useDisconnect } from 'wagmi';
import { useCallback } from 'react';

export function DisconnectButton({ title }: { title: string }) {
  const { disconnect } = useDisconnect();

  const onClick = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <Button variant="secondary" onClick={onClick}>
      {title}
    </Button>
  );
}
