import FarcasterFrameDynamic from 'apps/web/src/components/FarcasterFrame/dynamic';
import { Metadata } from 'next';
import { Address } from 'viem';

/* Page Metadatas */
// TODO: Could get the metadata from the frame url if we wanted to be nice
export const metadata: Metadata = {
  other: {},
};

type FarcasterFrameProps = {
  searchParams: { url: string; address: Address };
};

export default async function Iframe(props: FarcasterFrameProps) {
  const url = props.searchParams.url;
  const address = props.searchParams.address;

  if (!url) return <p>Invalid farcaster Frame</p>;
  if (!address) return <p>Missing address Frame</p>;

  return <FarcasterFrameDynamic url={url} address={address} />;
}
