'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

/* Settings tabs */
export enum SettingsTabs {
  ManageProfile = 'manage-profile',
  Ownership = 'ownership',
  Subdomain = 'subdomain',
}

export const settingTabsForDisplay = {
  [SettingsTabs.ManageProfile]: 'Manage Profile',
  [SettingsTabs.Ownership]: 'Ownership',
  [SettingsTabs.Subdomain]: 'Subdomain',
};

export const allSettingsTabs = [
  SettingsTabs.ManageProfile,
  SettingsTabs.Ownership,
  SettingsTabs.Subdomain,
];

// Other features are not yet supported
export const settingsTabsEnabled = [SettingsTabs.ManageProfile];

/* Context */
export type UsernameProfileSettingsContextProps = {
  currentSettingsTab: SettingsTabs;
  setCurrentSettingsTab: Dispatch<SetStateAction<SettingsTabs>>;
};

export const UsernameProfileSettingsContext = createContext<UsernameProfileSettingsContextProps>({
  currentSettingsTab: SettingsTabs.ManageProfile,
  setCurrentSettingsTab: () => undefined,
});

/* Provider */
type UsernameProfileSettingsProviderProps = {
  children: ReactNode;
};

export default function UsernameProfileSettingsProvider({
  children,
}: UsernameProfileSettingsProviderProps) {
  const [currentSettingsTab, setCurrentSettingsTab] = useState<SettingsTabs>(
    SettingsTabs.ManageProfile,
  );

  const values = useMemo(() => {
    return {
      currentSettingsTab,
      setCurrentSettingsTab,
    };
  }, [currentSettingsTab]);

  return (
    <UsernameProfileSettingsContext.Provider value={values}>
      {children}
    </UsernameProfileSettingsContext.Provider>
  );
}

/* Hook */
export function useUsernameProfileSettings() {
  const context = useContext(UsernameProfileSettingsContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}
