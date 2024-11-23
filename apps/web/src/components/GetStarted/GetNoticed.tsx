import Title from 'apps/web/src/components/base-org/typography/Title';
import { Icon } from '../Icon/Icon';
import ResourceCard from './ResourceCard/ResourceCard';
import { gridClasses } from './styles';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

export const GET_NOTICED_SECTION_ID = 'GetNoticed';

export default async function GetNoticed() {
  return (
    <div id={GET_NOTICED_SECTION_ID}>
      <Title level={TitleLevel.Display2} className="mb-6">
        Get Noticed
      </Title>
      <div className={gridClasses}>
        <ResourceCard
          title="Onchain Content Network"
          description="Submit your project to be viewed by millions of potential users across the network"
          href="https://buildonbase.deform.cc/getstarted/?utm_source=dotorg&utm_medium=builderkit"
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
