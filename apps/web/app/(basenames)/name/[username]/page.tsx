import ProfileProviders from 'apps/web/app/(basenames)/name/[username]/ProfileProviders';
import UsernameProfile from 'apps/web/src/components/Basenames/UsernameProfile';
import { Metadata } from 'next';

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): //   parent: ResolvingMetadata,
Promise<Metadata> {
  return {
    title: `Basenames | ${params.username}`,
    openGraph: {
      images: [`https://base.org/api/basenames/${params.username}/assets/coverImage.png`],
    },
  };
}

export default function Username({ params }: Props) {
  return (
    <ProfileProviders username={params.username}>
      <UsernameProfile />
    </ProfileProviders>
  );
}
