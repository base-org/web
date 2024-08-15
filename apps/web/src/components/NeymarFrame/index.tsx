import ImageRaw from 'apps/web/src/components/ImageRaw';
import { NeynarFrame } from 'apps/web/src/utils/frames';

// Simple frame, without buttons
export default function NeymarFrame({ frame }: { hash: string; frame: NeynarFrame }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-40/20">
      {frame.frames_url && (
        <a href={frame.frames_url} target="_blank" rel="noopener noreferrer">
          <ImageRaw src={frame.image} alt={`Frame image for ${frame.frames_url}`} />
        </a>
      )}
    </div>
  );
}
