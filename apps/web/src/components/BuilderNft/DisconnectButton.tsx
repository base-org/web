import { Button } from 'apps/web/src/components/Button/Button';
import { useDisconnect } from 'wagmi';

export function DisconnectButton({ title }: { title: string }) {
  const { disconnect } = useDisconnect();

  return (
    <Button variant="secondary" onClick={disconnect}>
      {title}
    </Button>
  );
}
