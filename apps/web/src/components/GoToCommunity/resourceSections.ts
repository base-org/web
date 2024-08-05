export const resourceSections: ResourceSectionType[] = [
  {
    title: 'Resources to BUILD your project',
    description: 'Resources to make your project easier to build and easier to user',
    cards: [
      {
        title: 'Smart Wallet',
        description: 'Help users create an account in seconds without apps or extensions',
      },
      {
        title: 'Smart Wallet',
        description: 'Help users create an account in seconds without apps or extensions',
      },
      {
        title: 'Smart Wallet',
        description: 'Help users create an account in seconds without apps or extensions',
      },
      {
        title: 'Smart Wallet',
        description: 'Help users create an account in seconds without apps or extensions',
      },
    ],
  },
  {
    title: 'Resources to GROW your project',
    description: 'Resources to make your project easier to build and easier to user',
    cards: [
      {
        title: 'Smart Wallet',
        description: 'Help users create an account in seconds without apps or extensions',
      },
      {
        title: 'Something Else',
        description: 'Help users create an account in seconds without apps or extensions',
      },
      {
        title: 'A third thing',
        description: 'Help users create an account in seconds without apps or extensions',
      },
      {
        title: 'Thing #4',
        description: 'Help users create an account in seconds without apps or extensions',
      },
    ],
  },
];

export type ResourceCard = {
  title: string;
  description: string;
};

export type ResourceSectionType = {
  title: string;
  description: string;
  cards: ResourceCard[];
};
