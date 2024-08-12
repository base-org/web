import { titleClasses, linkTextClasses } from '../../../app/(base-org)/get-started/page';
import { ButtonWithLinkAndEventLogging } from '../Button/ButtonWithLinkAndEventLogging';
import { ButtonVariants } from '../Button/Button';
import buildWithUs from './images/build-with-us.png';
// import { whyBaseSharedClassNames } from '../../../app/(base-org)/why-base/page';
export default async function BuildWithUs() {
  const imageBackgroundStyles = {
    backgroundImage: `url('${buildWithUs.src}')`,
  };
  return (
    <div className="mb-20 mt-6 w-full max-w-[1440px] px-12 sm:mb-16 sm:mt-8 sm:px-16 lg:mb-20 lg:mt-10 lg:px-24">
      <div
        className="mx-auto flex aspect-[1250/380] w-full max-w-[1440px] flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-4 sm:p-8"
        style={imageBackgroundStyles}
      >
        <h2 className={`${titleClasses} mb-6 text-center sm:mb-8`}>Start building with us</h2>
        <div className="flex w-full flex-col items-center justify-center sm:w-auto sm:flex-row sm:gap-8">
          <ButtonWithLinkAndEventLogging
            href="https://lu.ma/base-officehours/?utm_source=dotorg&medium=builderkit"
            eventName="start_building_with_us_contact_us"
            target="_blank"
            rel="noreferrer noopener"
            buttonClassNames={linkTextClasses}
          >
            Contact Us
          </ButtonWithLinkAndEventLogging>
          <ButtonWithLinkAndEventLogging
            href="https://docs.base.org/docs/?utm_source=dotorg&utm_medium=builderkit"
            eventName="start_building_with_us_view_docs"
            target="_blank"
            rel="noreferrer noopener"
            variant={ButtonVariants.Secondary}
            buttonClassNames={linkTextClasses}
          >
            View Our Docs
          </ButtonWithLinkAndEventLogging>
        </div>
      </div>
    </div>
  );
}
