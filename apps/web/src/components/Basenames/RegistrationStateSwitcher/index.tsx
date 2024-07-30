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

export default function RegistrationStateSwitcher() {
  const { setRegistrationStep } = useRegistration();

  return (
    <div className="absolute right-10 top-20 z-50 shadow-lg">
      <Dropdown>
        <DropdownToggle>
          <Button variant={ButtonVariants.Gray}>[DEV TEST] Change state</Button>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setRegistrationStep(RegistrationSteps.Search)}>
            Search
          </DropdownItem>
          <DropdownItem onClick={() => setRegistrationStep(RegistrationSteps.Claim)}>
            Claim
          </DropdownItem>
          <DropdownItem onClick={() => setRegistrationStep(RegistrationSteps.Pending)}>
            Registering
          </DropdownItem>
          <DropdownItem onClick={() => setRegistrationStep(RegistrationSteps.Success)}>
            Success
          </DropdownItem>
          <DropdownItem onClick={() => setRegistrationStep(RegistrationSteps.Profile)}>
            Profile
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
