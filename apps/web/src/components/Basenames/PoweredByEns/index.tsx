import Image, { StaticImageData } from 'next/image';

import subtract from './assets/subtract.svg';
import vector from './assets/vector.svg';  
import classNames from 'classnames';

enum CircleColors {
    Green='green',
    Blue='blue',
    Pink='pink',
    Grey='gray',
}

type CircleProps = {
    color: string;
    className: string;
}

function Circle({ color, className }: CircleProps) {
    // bg-grey-40, bg-pink-15, bg-green-15, bg-blue-15
    const circleClass = classNames(`absolute rounded-full`, {
        'bg-green-15 w-[14%] max-w-[70.11px] pt-[14%]': color === CircleColors.Green,
        'bg-blue-15': color === CircleColors.Blue,
        'bg-pink-15 w-[8%] max-w-[41.84px] pt-[8%]': color === CircleColors.Pink,
        'bg-gray-40 w-[14%] max-w-[71.25px] pt-[14%]': color === CircleColors.Grey,
    });

    return (
      <div
        className={classNames(circleClass, className)}
      />
    );
  }


export default function PoweredByEns() {
    return (
        <section className="max-w-7xl mx-auto pt-24 md:pt-36">
            <div className="flex flex-col lg:flex-row justify-end items-center">
                {/* Graphic */}
                <div className="w-3/4 sm:w-2/5 mb-8 lg:mb-0 order-last lg:order-first">
                    <div className="relative w-full pt-[100%] max-h-[580.66] max-w-[476.95px]">
                    {/* Main circles */}
                        <div className="absolute top-1/4 right-1/4 w-2/5 max-w-[214.93px] translate-x-1/3 -translate-y-1/4">
                            <div className="relative pt-[100%] bg-blue-500 rounded-full shadow">
                                <div className="absolute inset-2 translate-y-1 flex items-center justify-center">
                                    <Image src={subtract as StaticImageData} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-1/4 left-1/3 w-2/5 max-w-[214.10px] -translate-x-3/4">
                            <div className="relative pt-[100%] bg-[#3580B7] rounded-full shadow">
                                <div className="absolute inset-5 flex items-center justify-center">
                                    <Image src={vector as StaticImageData} alt=""/>
                                </div>
                            </div>
                        </div>
                        <Circle color="gray" className="top-1/4 right-1/2 -translate-x-1/4 -translate-y-1/2" />
                        <Circle color="gray" className="top-2 right-0" />
                        <Circle color="gray" className="bottom-8 left-1/3" />

                        <Circle color="pink" className="top-1/3 left-0 -translate-x-3/4" />
                        <Circle color="pink" className="top-1/2 right-0" />
                        <Circle color="pink" className="bottom-1/4 translate-x-1/4 translate-y-3/4" />
                        
                        <Circle color="green" className="top-8 left-8" />
                        <Circle color="green" className="bottom-1/4 right-10" />

                        <div className="absolute top-2 right-1/2 w-[8%] max-w-[41.84px] pt-[8%] bg-blue-15 rounded-full" />
                        <div className="absolute bottom-1/4 right-1/3 w-[20%] translate-y-1/4 max-w-[102.51px] pt-[20%] bg-blue-15 rounded-full" />`
                        {/* Decorative circles */}
                    </div>
                </div>
            
                {/* Text content */}
                <div className="w-full md:w-1/2 lg:pl-28 text-left px-4">
                    <div className="flex text-5xl md:text-6xl font-normal pb-8">Powered by ENS</div>
                    <div className="flex text-xl pb-10">Base usernames works with ENS to provide you the most powerful blockchain naming standard across the superchain. </div>
                </div>
            </div>
      </section>
    );
}