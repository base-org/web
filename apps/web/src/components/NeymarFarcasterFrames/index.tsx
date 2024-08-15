import { useNeynarContext } from '@neynar/react';
import NeymarFrame, { NeynarFrame } from 'apps/web/src/components/NeymarFrame';
import { fetchCastByIdentifier } from 'apps/web/src/utils/frames';
import { useEffect, useState } from 'react';

export default function NeymarFarcasterFrames({
  identifier,
  type,
}: {
  identifier: string;
  type: 'url' | 'hash';
}) {
  const { user, client_id: clientId } = useNeynarContext();

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
  }, [clientId, identifier, type, viewerFid]);

  if (frames.length === 0) return null;

  return (
    <ul className="flex">
      {frames.map((frame) => (
        <li key={frame.title} className="w-2/3">
          <NeymarFrame frame={frame} hash={hash} />
        </li>
      ))}
    </ul>
  );
}
