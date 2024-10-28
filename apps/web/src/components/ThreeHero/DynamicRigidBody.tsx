'use client';

import { useEffect, useState, forwardRef } from 'react';
import type { RigidBodyProps, RapierRigidBody, RigidBody } from '@react-three/rapier';

// RigidBody cannot be imported using dynamic() due to some import issues
export const DynamicRigidBody = forwardRef<RapierRigidBody, RigidBodyProps>(
  ({ children, ...props }, ref) => {
    const [RigidBodyDynamic, setRigidBody] = useState<typeof RigidBody>();

    // Import happens on render
    useEffect(() => {
      import('@react-three/rapier')
        .then((mod) => {
          setRigidBody(() => mod.RigidBody);
        })
        .catch((error) => console.log('error', error));
    }, []);

    if (!RigidBodyDynamic) return null;

    return (
      <RigidBodyDynamic ref={ref} {...props}>
        {children}
      </RigidBodyDynamic>
    );
  },
);

DynamicRigidBody.displayName = 'DynamicRigidBody';

export default DynamicRigidBody;
