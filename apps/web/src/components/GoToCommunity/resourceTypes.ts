export type Resource = {
  href: string;
  title: string;
  description: string;
  icon?: string;
};

export type ResourceSectionType = {
  title?: string;
  colorOne: string;
  colorTwo: string;
  cards: Resource[];
};

export type ResourceSectionProps = {
  section: ResourceSectionType;
};
