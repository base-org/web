import { Icon } from 'apps/web/src/components/Icon/Icon';

type UsernameProfileSectionTitleProps = {
  title: string;
};

export default function UsernameProfileSectionTitle({ title }: UsernameProfileSectionTitleProps) {
  return (
    <h3 className="flex flex items-center text-lg font-medium">
      <span className="text-blue-600">
        <Icon name="blueCircle" color="currentColor" height="0.75rem" />
      </span>
      {title}
    </h3>
  );
}
