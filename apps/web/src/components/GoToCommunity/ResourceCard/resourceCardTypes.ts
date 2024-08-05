export type Resource = {
  title: string;
  description: string;
  href: string;
};

export type ResourceCardProps = Resource & {
  counter: number;
};
