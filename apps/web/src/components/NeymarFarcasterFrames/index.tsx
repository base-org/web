import { NeynarAuthButton, useNeynarContext } from '@neynar/react';
import NeymarFrame, { NeynarFrame } from 'apps/web/src/components/NeymarFrame';
import { fetchCastByIdentifier } from 'apps/web/src/utils/frames';
import { useEffect, useState } from 'react';

export default function NeymarFarcasterFrames() {
  const { user, client_id: clientId } = useNeynarContext();
  const type = 'url';
  const identifier = 'https://warpcast.com/morpheus-network/0xda14ca4b';
  const viewerFid = user?.fid;

  const [hash, setHash] = useState<string>('');
  const [frames, setFrames] = useState<NeynarFrame[]>([]);
  useEffect(() => {
    fetchCastByIdentifier({ type, identifier, viewerFid, clientId })
      .then((data) => {
        if (data?.hash) setHash(data?.hash);
        if (data?.frames) setFrames(data?.frames);
      })
      .catch((error) => console.log('ERROR', error));
  }, [clientId, viewerFid]);

  if (frames.length === 0) return null;

  return (
    <>
      <NeynarAuthButton />
      <ul className="flex">
        {frames.map((frame) => (
          <li key={frame.title} className="w-2/3">
            <NeymarFrame frame={frame} hash={hash} />
          </li>
        ))}
      </ul>
    </>
  );
}
