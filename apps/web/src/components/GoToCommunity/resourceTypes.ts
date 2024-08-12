export type Resource = {
  href: string;
  title: string;
  description: string;
  icon?: string;
};

export type ResourceSectionType = {
  title: string;
  colorOne: string;
  colorTwo: string;
  cards: Resource[];
};

export type ResourceGridProps = {
  section: ResourceSectionType;
};

export type ResourceCardProps = Resource & {
  counter?: number;
  topLeft?: React.ReactNode;
  topRight?: React.ReactNode;
  colorOne: string;
  colorTwo?: string;
};
