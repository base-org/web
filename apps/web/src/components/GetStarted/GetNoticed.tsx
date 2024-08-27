import { Icon } from '../Icon/Icon';
import ResourceCard from './ResourceCard/ResourceCard';
import { gridClasses, sectionContainerClasses, titleClasses } from './styles';

export const GET_NOTICED_SECTION_ID = 'GetNoticed';

export default async function GetNoticed() {
  return (
    <div id={GET_NOTICED_SECTION_ID} className={sectionContainerClasses}>
      <div>
        <h1 className={titleClasses}>Get Noticed</h1>
      </div>
      <div className={gridClasses}>
        <ResourceCard
          title="Onchain Content Network"
          description="Submit your project to be viewed by millions of potential users across the network"
          href="https://base.mirror.xyz/fD9-3Bl_3PLoUw7T8St6a6UpDIiPxJ-itzmME-b5pwA?utm_source=dotorg&utm_medium=builderkit"
          topLeft={<span className="font-mono">01</span>}
          topRight={<Icon name="diagonalUpArrow" width="16px" height="16px" />}
          classnames="bg-pink-60 border-pink-60"
        />
        <ResourceCard
          title="Base Builds Channel"
          description="Share your project on /base and /base-builds to get community feedback on Farcaster"
          href="https://warpcast.com/~/channel/base-builds/?utm_source=dotorg&utm_medium=builderkit"
          topLeft={<span className="font-mono">02</span>}
          topRight={<Icon name="diagonalUpArrow" width="16px" height="16px" />}
          classnames="bg-pink-80 border-pink-80"
        />
      </div>
    </div>
  );
}
