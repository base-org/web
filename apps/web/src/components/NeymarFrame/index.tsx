import { useNeynarContext } from '@neynar/react';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import ImageRaw from 'apps/web/src/components/ImageRaw';
import { fetchWithTimeout, NEYNAR_API_URL } from 'apps/web/src/utils/frames';
import { useCallback, useEffect, useState } from 'react';

export type NeymarButton = {
  action_type: string;
  index: number;
  post_url: string;
  title: string;
  target?: string;
};

export type NeynarFrame = {
  buttons: NeymarButton[];
  frames_url: string;
  image: string;
  image_aspect_ratio: string;
  title: string;
  // input: {};
  post_url?: string;
  // state: {};
  version?: string;
};

// Invididual buttons
type CastFrameButtonProps = {
  number: number;
  text: string;
  actionType: string;
  target?: string;
  handleOnClick: (btnNumber: number) => void;
};
function CastFrameButton({
  number,
  text,
  actionType,
  target,
  handleOnClick,
}: CastFrameButtonProps) {
  const handleClick = useCallback(() => {
    if (actionType === 'link' && target) {
      window.open(target, '_blank');
    } else {
      handleOnClick(number);
    }
  }, [actionType, handleOnClick, number, target]);

  return (
    <Button onClick={handleClick} size={ButtonSizes.Small} rounded variant={ButtonVariants.Gray}>
      {text}
      {/* {(actionType === 'link' || actionType === 'post_redirect') && <ExternalLinkIcon />} */}
    </Button>
  );
}

// Frame using neymar's frames data from warpcast url
export default function NeymarFrame({ hash, frame }: { hash: string; frame: NeynarFrame }) {
  const [localFrame, setLocalFrame] = useState<NeynarFrame>(frame);
  const [signerValue, setSignerValue] = useState<string | null>(null);
  const { user, client_id: clientId } = useNeynarContext();

  useEffect(() => {
    if (user) {
      setSignerValue(user.signer_uuid);
    } else {
      console.warn('No NEYNAR_AUTHENTICATED_USER found in local storage.');
    }
  }, [user]);

  const handleButtonClick = (btnIndex: number) => {
    if (!signerValue) {
      console.log('SIGNER UUI NOT AVAILABLED');
      return;
    }

    const button = localFrame.buttons.find((btn) => btn.index === btnIndex);
    const postUrl = button?.post_url;

    try {
      fetchWithTimeout(`${NEYNAR_API_URL}/v2/farcaster/frame/action?client_id=${clientId}`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          cast_hash: hash,
          signer_uuid: signerValue,
          action: {
            button: {
              index: btnIndex,
            },
            frames_url: localFrame.frames_url,
            post_url: postUrl ? postUrl : localFrame.frames_url,
          },
        }),
      })
        .then(async (response) => {
          console.log('resposne', { response });
          if (response.ok) {
            const json = (await response.json()) as NeynarFrame;
            setLocalFrame(json);
          } else {
            console.log(`HTTP error! status: ${response.status}`);
          }
        })
        .catch((error: unknown) => {
          console.log('ERROR', { error });
          // logerror
        });
    } catch (error: unknown) {
      console.log(`An error occurred: ${error}`);
    }
  };
  const buttons = localFrame.buttons;

  if (!localFrame) return null;
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-40/20">
      {localFrame.frames_url && (
        <>
          {localFrame.frames_url && (
            <a href={localFrame.frames_url} target="_blank" rel="noopener noreferrer">
              <ImageRaw src={localFrame.image} alt={`Frame image for ${localFrame.frames_url}`} />
            </a>
          )}
          {buttons.length > 0 && (
            <ul className="flex	 flex-wrap gap-4 p-4 ">
              {buttons.map((button) => (
                <li key={button.index}>
                  <CastFrameButton
                    key={button.index}
                    number={button.index}
                    text={button.title}
                    actionType={button.action_type}
                    target={button.target}
                    handleOnClick={handleButtonClick}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
