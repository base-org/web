import { isValidElement, ReactNode } from 'react';

type FeatureCardProps = {
  featureItem: {
    number: string;
    title?: string | JSX.Element;
    description?: string | ReactNode;
  };
};

export function HowItWorksCard({ featureItem: { number, title, description } }: FeatureCardProps) {
  return (
    <div className="flex w-[290px] flex-shrink-0 flex-col space-y-10   bg-gray-90 p-8 md:w-[330px]">
      <p className="font-mono text-2xl uppercase text-white">{number}</p>
      <div className="flex flex-col space-y-4">
        {isValidElement(title) ? (
          title
        ) : (
          <p className="font-mono text-lg uppercase text-white">{title}</p>
        )}
        {isValidElement(description) ? (
          description
        ) : (
          <p className="font-sans text-gray-60 text-white">{description}</p>
        )}
      </div>
    </div>
  );
}
