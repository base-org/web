import Image from 'next/image';

export default function RegistrationLandingExplore() {
    return (
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex w-full justify-center">
            <span className="justify-center text-[#454545] fontSize: md">Scroll to explore</span>
            <Image src="/images/basenames/scroll.gif" width={25} height={25} alt="" className="rounded-lg translate-x-1/4"/>
        </div>
    )
}