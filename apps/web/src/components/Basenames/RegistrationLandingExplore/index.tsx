import { useRegistration } from 'apps/web/src/components/Basenames/RegistrationContext';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';

export default function RegistrationLandingExplore({}) {
    const { searchInputFocused } = useRegistration();

    return (
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex w-full justify-center">
            <span className={classNames("justify-center pr-2 fontSize: md", {
                'text-[#454545]': !searchInputFocused,
                'text-white': searchInputFocused,
            } )}> Scroll to explore</span>
            <div className="w-[25px] h-[25px] pl-[6px] py-1.5 bg-[#e7e6e2] rounded-lg animate-bounce">
                <Icon name="caret" color="black" width="12" height="12"/>
            </div>
        </div>
    )
}