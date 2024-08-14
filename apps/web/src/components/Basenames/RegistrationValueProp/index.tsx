import Image from 'next/image';

import faceScan from './assets/faceScan.svg';
import currencies from './assets/currencies.svg';
import sofort from './assets/sofort.svg';
import globe from '../assets/globeWhite.webm';
import classNames from 'classnames';

type ValuePropProps = {
    title: string;
    description: string;
    image: string;
    color: string;
};

const valueClass = classNames(
    'relative px-2 py-2',
  );

function ValueProp({ title, description, image, color }: ValuePropProps) {
    return (
        <div className="rounded-xl flex items-center bg-gray-5 py-2 px-2 space-x-2 shadow-md border border-palette-line/20 bg-opacity-80">
            {/* bg-[#0052FF],blue --- bg-[#22AD73],green --- bg-[#8A55E9], purple */}
            <div className={`bg-[${color}] rounded-2xl px-4 py-3`}>
                <Image src={image} alt={title} width={74} height={74} className='flex items-center justify-center' />
            </div>
            <div>
                <h3 className="text-xl mb-1">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>
        </div>
      );
}

export default function RegistrationValueProp() { 
    return (
        <section className="flex flex-col items-center max-w-4xl mx-auto pt-12 px-4 md:px-12 overflow-hidden md:overflow-visible">
            <h1 className='text-left z-20 text-[##0A0B0D] text-pretty pl:2 md:text-center text-palette-foreground text-5xl sm:text-6xl'>
                Get so much more on <br /> Base with your profile
            </h1>
            <div className='relative z-10 pt-12'>
                <div className='grid grid-cols-1 sm:grid-cols-2 row-auto gap-4 md:gap-y-12'>
                    <div className={classNames(valueClass, 'sm:col-start-2')}>
                        <ValueProp title='Establish your identity' description='Be a part of our vibrant Base community with your own unique identity.' image={faceScan} color='#0052FF' />
                    </div>
                    <div className={classNames(valueClass,  'row-start-2 md:translate-x-20')}>
                        <ValueProp title='Easy Payments.' description='Use your human-readable address to send payments with ease.' image={currencies} color='#22AD73' />
                    </div>
                    <div className={classNames(valueClass, 'row-start-3 sm:col-start-2')}>
                        <ValueProp title='Trusted Communities' description='Find Based builders easier. Connect, work together, or get mentorship.' image={sofort} color='#8A55E9' />
                    </div>
                </div>
                <div className="absolute inset-0 -z-10 pt-8 md:pt-12 scale-125 md:scale-150">
                    <video autoPlay className='w-full h-full motion-reduce:hidden object-fit' loop muted playsInline>
                        <source src={globe} type="video/webm" />
                    </video>
                </div>
            </div>
        </section>
    )
}