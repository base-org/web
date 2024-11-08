import UsernameNav from 'apps/web/src/components/Layout/UsernameNav';
import { Providers } from 'apps/web/app/(basenames)/providers';

export default async function BasenameLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="max-w-screen flex min-h-screen flex-col">
        <UsernameNav />
        {children}
      </div>
    </Providers>
  );
}
