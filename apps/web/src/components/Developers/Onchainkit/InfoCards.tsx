import { Card } from 'apps/web/src/components/Developers/Shared/Card';
import { Icon } from 'apps/web/src/components/Icon/Icon';

const INFO_CARDS = [
  {
    icon: <Icon name="eye" color="currentColor" />,
    title: 'Full-stack in one command',
    description:
      'Abstract away any complex configuration or setup. No blockchain knowledge required.',
  },
  {
    icon: <Icon name="eye" color="currentColor" />,
    title: 'AI-compatible',
    description:
      'Leverage your favorite AI tools to get your app onchain faster with more features than possible otherwise.',
  },
  {
    icon: <Icon name="eye" color="currentColor" />,
    title: 'Serverless',
    description:
      'To deploy full-stack onchain apps without managing backend infrastructure — just "npm create onchain" to get started.',
  },
  {
    icon: <Icon name="eye" color="currentColor" />,
    title: 'Composable',
    description:
      'To build apps that can interact with and build upon other apps in the Base ecosystem.',
  },
  {
    icon: <Icon name="eye" color="currentColor" />,
    title: 'Go to market faster',
    description:
      'We streamline all the table stake features, so you can focus on your differentiator and go to market faster.',
  },
  {
    icon: <Icon name="eye" color="currentColor" />,
    title: 'Cost-effective',
    description:
      'To make it cost-effective to build and scale applications with transaction fees of less than 1 cent.',
  },
];

export function InfoCards() {
  return (
    <div className="grid w-full grid-cols-3 gap-20">
      {INFO_CARDS.map((card) => {
        return (
          <Card
            key={card.title}
            icon={card.icon}
            title={card.title}
            description={card.description}
            iconClassName="text-[#C9A4FA]"
          />
        );
      })}
    </div>
  );
}
