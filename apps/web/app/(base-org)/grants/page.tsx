import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Container from 'apps/web/src/components/base-org/Container';
import GrantApplication from 'apps/web/src/components/Grants/GrantApplication';

export default async function GrantApplicationPage() {
  return (
    <AnalyticsProvider context="grants">
      <div className="pb-16 pt-36">
        <Container>
          <div className="flex flex-col">
            <h1 className="mb-4 self-center text-4xl">Base Builder Grant Application</h1>
            <GrantApplication />
          </div>
        </Container>
      </div>
    </AnalyticsProvider>
  );
}
