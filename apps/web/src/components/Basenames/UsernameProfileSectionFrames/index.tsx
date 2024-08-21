import UsernameProfileSectionTitle from 'apps/web/src/components/Basenames/UsernameProfileSectionTitle';
import TryNowHero from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/TryNowHero';

import { useFrameContext, FrameProvider } from './Context';
import AddFrameModal from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/AddFrameModal';

import { FrameUI } from '@frames.js/render/ui';
import {
  components,
  theme,
} from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/FrameTheme';

function SectionContent() {
  const { currentWalletIsOwner, homeframeUrl, frameState } = useFrameContext();

  if (currentWalletIsOwner && !homeframeUrl) {
    return <TryNowHero />;
  }
  if (!homeframeUrl) return null;
  return (
    <section>
      <div className="flex flex-row justify-between">
        <UsernameProfileSectionTitle title="Frames" />
      </div>
      <FrameUI frameState={frameState} components={components} theme={theme} />
    </section>
  );
}

function UsernameProfileSectionFrames() {
  return (
    <FrameProvider>
      <SectionContent />
      <AddFrameModal />
    </FrameProvider>
  );
}

export default UsernameProfileSectionFrames;
