import { LiveDemo as LiveDemoComponent } from 'apps/web/src/components/Builders/Shared/LiveDemo';

const components = ['Wallet', 'Buy', 'Pay', 'Swap', 'Earn'];

export function LiveDemo() {
  return <LiveDemoComponent components={components} />;
}
