'use client';

// TODO: Comment this out if we don't need NeynarAuthButton
import '@neynar/react/dist/style.css';

import { NeynarContextProvider } from '@neynar/react';
import { NeynarContextProviderProps } from '@neynar/react/dist/contexts/NeynarContextProvider';
import { ReactNode, useMemo } from 'react';

type NeymarProviderProps = {
  children: ReactNode;
};

export default function NeymarProvider({ children }: NeymarProviderProps) {
  const settings: NeynarContextProviderProps['settings'] = useMemo(() => {
    return {
      clientId: process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID ?? '',
      eventsCallbacks: {
        onAuthSuccess: (params) => console.log('PARAMS', { params }),
        onSignout: (user) => {
          console.log('USER', { user });
        },
      },
    };
  }, []);

  return <NeynarContextProvider settings={settings}>{children}</NeynarContextProvider>;
}
