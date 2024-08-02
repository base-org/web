import DocSidebarItemCategory from '@theme/DocSidebarItem/Category';
import DocSidebarItemLink from '@theme/DocSidebarItem/Link';
import DocSidebarItemHtml from '@theme/DocSidebarItem/Html';
import DocSidebarItemDoc from '@theme/DocSidebarItem/Doc';

export default function DocSidebarItem({item, ...props}) {
  switch (item.type) {
    case 'category':
      return <DocSidebarItemCategory item={item} {...props} />;
    case 'html':
      return <DocSidebarItemHtml item={item} {...props} />;
    case 'doc':
      return <DocSidebarItemDoc item={item} {...props} />;
    case 'link':
    default:
      return <DocSidebarItemLink item={item} {...props} />;
  }
}