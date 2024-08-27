import { Icon } from '../Icon/Icon';
import ResourceCard from './ResourceCard/ResourceCard';
import { FUNDING_SECTION_ID } from './Funding';
import { GET_NOTICED_SECTION_ID } from './GetNoticed';
import { GET_INVOLVED_SECTION_ID } from './GetInvolved';
import { START_BUILDING_SECTION_ID } from './StartBuilding';
import { sectionContainerClasses, gridClasses } from './styles';

const titleClasses = `
  mb-4 lg:mb-6
  text-3xl sm:text-4xl lg:text-6xl
  leading-none
`;

const subtitleClasses = `
  mb-4 sm:mb-6 lg:mb-8
  font-sans
  text-base sm:text-lg lg:text-xl
  leading-snug
`;

export default async function Essentials() {
  return (
    <div className={`${sectionContainerClasses} mt-20`}>
      <h1 className={titleClasses}>The Essentials</h1>
      <h2 className={subtitleClasses}>
        Jump to our most frequently requested tools and resources.
      </h2>
      <div className={gridClasses}>
        <ResourceCard
          title="Create your profile"
          description="Claim a Basename and create your Based Profile to connect with other Builders"
          href="/names?utm_source=dotorg&utm_medium=builderkit"
          topLeft={<Icon name="basenamesIcon" color="white" />}
          classnames="bg-purple-60 border-purple-60"
        />
        <ResourceCard
          title="Office Hours"
          description="Check out our Office Hours schedule to ask your questions live"
          href="https://lu.ma/base-officehours/?utm_source=dotorg&medium=builderkit"
          topLeft={<Icon name="dotGrid" color="white" />}
          classnames="bg-purple-80 border-purple-80"
        />
        <ResourceCard
          title="Get Involved"
          description="Become an active participant in the Base community"
          href={`#${GET_INVOLVED_SECTION_ID}`}
          topLeft={<Icon name="people" color="white" />}
          classnames="bg-purple-60 border-purple-60"
        />
        <ResourceCard
          title="Get Funded"
          description="A collection of monetary programs to help you build or grow your project"
          href={`#${FUNDING_SECTION_ID}`}
          topLeft={<Icon name="cash" color="white" />}
          classnames="bg-purple-80 border-purple-80"
        />
        <ResourceCard
          title="Get Noticed"
          description="Looking for help with distribution? Get noticed by millions of potential new users"
          href={`#${GET_NOTICED_SECTION_ID}`}
          topLeft={<Icon name="people" color="white" />}
          classnames="bg-purple-60 border-purple-60"
        />
        <ResourceCard
          title="Build Your Project"
          description="Resources that make it easy to build and use your onchain project"
          href={`#${START_BUILDING_SECTION_ID}`}
          topLeft={<Icon name="builderHammer" color="white" />}
          classnames="bg-purple-80 border-purple-80"
        />
      </div>
    </div>
  );
}
