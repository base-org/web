import Link from 'next/link';
import { useRouter } from 'next/router';

type BridgeContainerProps = {
  children: JSX.Element;
};

const tabs = [
  {
    text: 'Deposit',
    link: '/deposit',
  },
  {
    text: 'Withdraw',
    link: '/withdraw',
  },
];

export function BridgeContainer({ children }: BridgeContainerProps) {
  const { pathname } = useRouter();
  return (
    <div className="m-0 flex h-full w-full flex-col p-0">
      <div className="flex flex-row sm:border-b sm:border-sidebar-border sm:px-8">
        {tabs.map(({ text, link }) => (
          <Link
            key={`container-link-${link}`}
            href={link}
            className={`text-md mr-4 w-1/2 pb-2 text-center font-sans sm:w-auto sm:text-sm ${
              pathname.includes(link)
                ? 'border-b-2 border-cds-primary text-cds-primary'
                : 'text-white'
            }`}
          >
            {text}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
}
