import classNames from 'classnames';

const videoClasses = classNames('mix-blend-screen');

// import globe from './assets/globe.webm';
import globe from './assets/globe.webp';
import { Button } from 'apps/web/src/components/Button/Button';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Image from 'next/image';

export default function ProfilePromo() {
  return (
    <div
      className="absolute bottom-4 right-4 flex max-w-[18rem] flex-col items-center justify-between gap-4 rounded-[24px] p-6"
      style={{ background: 'linear-gradient(180deg, #000 0%, #725EE5 158.87%)' }}
    >
      <div className="absolute right-8 top-8">
        <Icon name="close" color="white" width={18} height={18} />
      </div>
      <Image src={globe} alt="Globe" className={videoClasses} />
      <span className="w-full font-display text-2xl font-medium text-white">
        Basenames are here!
      </span>
      <p className="text-l text-white">
        Get a Basename and make it easier to connect, collaborate, and contribute onchain.
      </p>
      <Button rounded fullWidth>
        Get a Basename
      </Button>
    </div>
  );
}
