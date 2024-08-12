import {
  sectionContainer,
  titleClasses,
  GET_NOTICED_SECTION_ID,
} from '../../../app/(base-org)/go-to-community/page';
import ResourceGrid from './ResourceGrid/ResourceGrid';
import { ResourceSectionType } from './resourceTypes';

const getNoticedResources: ResourceSectionType = {
  title: 'Get Noticed',
  colorOne: 'red-80',
  colorTwo: 'red-60',
  cards: [
    {
      title: 'Onchain Content Network',
      description:
        'Submit your project to be viewed by millions of potential users across the network',
      href: 'https://base.mirror.xyz/fD9-3Bl_3PLoUw7T8St6a6UpDIiPxJ-itzmME-b5pwA?utm_source=dotorg&utm_medium=builderkit',
    },
    {
      title: 'Base Builds Channel',
      description:
        'Share your project on /base and /base-builds to get community feedback on Farcaster',
      href: 'https://warpcast.com/~/channel/base-builds/?utm_source=dotorg&utm_medium=builderkit',
    },
  ],
};

export default async function GetNoticed() {
  return (
    <div id={GET_NOTICED_SECTION_ID} className={sectionContainer}>
      <div>
        <h1 className={titleClasses}>{getNoticedResources.title}</h1>
      </div>
      <ResourceGrid section={getNoticedResources} />
    </div>
  );
}
