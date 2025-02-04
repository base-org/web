import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Link from 'apps/web/src/components/Link';

const TEMPLATES = [
  {
    title: 'Quickstart Template',
    href: '',
  },
  {
    title: 'Onchain Store Template',
    href: '',
  },
  {
    title: 'Onchain Social Template',
    href: '',
  },
];
export function Templates() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="grid w-full grid-cols-3 gap-6">
        {TEMPLATES.map((template) => {
          return (
            <div className="flex h-[220px] flex-col justify-between rounded-lg bg-[purple] p-6">
              <Title level={TitleLevel.Title3}>{template.title}</Title>
              <Link href={template.href} className="flex gap-2 text-[#C9A4FA]">
                <Title level={TitleLevel.Headline}>Fork the template</Title>
                <Icon name="fork" color="currentColor" />
              </Link>
            </div>
          );
        })}
      </div>
      <div>
        <Button variant={ButtonVariants.SecondaryOutline} iconName="github">
          Feature your template
        </Button>
      </div>
    </div>
  );
}
