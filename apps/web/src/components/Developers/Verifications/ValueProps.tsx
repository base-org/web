import { ValueProp } from 'apps/web/src/components/Developers/Shared/ValueProp';
import coinbase from 'apps/web/src/components/Developers/Verifications/coinbase.svg';
import globe from 'apps/web/src/components/Developers/Verifications/globe.svg';
import coinbaseOne from 'apps/web/src/components/Developers/Verifications/coinbaseOne.svg';

const VALUE_PROPS = [
  {
    title: 'Verified Account',
    description: 'A Coinbase user with a valid Coinbase trading account. ',
    icon: coinbase,
  },
  {
    title: 'Verified Country',
    description: 'The user’s verified country of residence on Coinbase.',
    icon: globe,
  },
  {
    title: 'Verified Coinbase One',
    description: 'A Coinbase user with an active Coinbase One membership.',
    icon: coinbaseOne,
  },
];
export function ValueProps() {
  return (
    <div className="flex flex-col gap-3 w-full">
      {VALUE_PROPS.map((prop) => {
        return (
          <ValueProp
            key={prop.title}
            title={prop.title}
            icon={prop.icon}
            description={prop.description}
          />
        );
      })}
    </div>
  );
}
