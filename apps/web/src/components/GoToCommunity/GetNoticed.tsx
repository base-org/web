import React from 'react';
import { sectionContainer, titleClasses } from '../../../app/(base-org)/go-to-community/page';
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
      href: '/registry',
    },
    {
      title: 'Base Builds Channel',
      description:
        'Share your project on /base and /base-builds to get community feedback on Farcaster',
      href: '/warpcast',
    },
  ],
};

export default async function GetNoticed() {
  return (
    <div className={sectionContainer}>
      <div>
        <h1 className={titleClasses}>{getNoticedResources.title}</h1>
      </div>
      <ResourceGrid section={getNoticedResources} />
    </div>
  );
}
