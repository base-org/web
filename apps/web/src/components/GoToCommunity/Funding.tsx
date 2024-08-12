import {
  sectionContainer,
  titleClasses,
  FUNDING_SECTION_ID,
} from '../../../app/(base-org)/go-to-community/page';
import ResourceGrid from './ResourceGrid/ResourceGrid';
import { ResourceSectionType } from './resourceTypes';

const fundingResources: ResourceSectionType = {
  title: 'Fund your project',
  colorOne: 'green-80',
  colorTwo: 'green-60',
  cards: [
    {
      title: 'Gas Credits',
      description: 'Eligible projects may receive up to $15K in gas credits for their users',
      href: 'https://www.smartwallet.dev/base-gasless-campaign/?utm_source=dotorg&utm_medium=builderkit',
    },
    {
      title: 'Base Builder Grants',
      description:
        'Apply for a retroactive Base Builder Grant, rewarding great projects being built on Base',
      href: 'https://paragraph.xyz/@grants.base.eth/calling-based-builders/?utm_source=dotorg&utm_medium=builderkit',
    },
    {
      title: 'Rounds Grants',
      description:
        'Post to /base-builds on Farcaster to be eligible for 2.25 ETH in weekly rewards ',
      href: 'https://warpcast.com/base/0xb3f1428b?utm_source=dotorg&urm_medium=builderkit',
    },
  ],
};

export default async function Funding() {
  return (
    <div id={FUNDING_SECTION_ID} className={sectionContainer}>
      <div>
        <h1 className={titleClasses}>{fundingResources.title}</h1>
      </div>
      <ResourceGrid section={fundingResources} />
    </div>
  );
}
