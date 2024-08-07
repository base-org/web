'use client';

import {
  RegistrationSteps,
  useRegistration,
} from 'apps/web/src/components/Basenames/RegistrationContext';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Dropdown from 'apps/web/src/components/Dropdown';
import DropdownItem from 'apps/web/src/components/DropdownItem';
import DropdownMenu from 'apps/web/src/components/DropdownMenu';
import DropdownToggle from 'apps/web/src/components/DropdownToggle';
import { useCallback } from 'react';

export function DropdownItemSwitcher({
  registrationStep,
}: {
  registrationStep: RegistrationSteps;
}) {
  const { setRegistrationStep } = useRegistration();
  const updateRegistrationStep = useCallback(() => {
    setRegistrationStep(registrationStep);
  }, [registrationStep, setRegistrationStep]);
  return <DropdownItem onClick={updateRegistrationStep}>{registrationStep}</DropdownItem>;
}

export default function RegistrationStateSwitcher() {
  return (
    <div className="absolute right-10 top-20 z-50 shadow-lg">
      <Dropdown>
        <DropdownToggle>
          <Button variant={ButtonVariants.Gray}>[DEV TEST] Change state</Button>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItemSwitcher registrationStep={RegistrationSteps.Search} />
          <DropdownItemSwitcher registrationStep={RegistrationSteps.Claim} />
          <DropdownItemSwitcher registrationStep={RegistrationSteps.Pending} />
          <DropdownItemSwitcher registrationStep={RegistrationSteps.Success} />
          <DropdownItemSwitcher registrationStep={RegistrationSteps.Profile} />
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
