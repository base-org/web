/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-perf/jsx-no-new-object-as-prop */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable react-perf/jsx-no-new-array-as-prop */
/* eslint-disable react/no-unknown-property */
/* sorry! */

'use client';
import * as THREE from 'three';
import { useRef, useMemo, useCallback, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Lightformer, Environment, Html, Center } from '@react-three/drei';
import {
  Physics,
  RigidBody,
  BallCollider,
  CuboidCollider,
  Vector3Tuple,
  CylinderCollider,
  InstancedRigidBodies,
} from '@react-three/rapier';

import { EffectComposer, Bloom, SMAA } from '@react-three/postprocessing';

import {
  //Box,
  BlackMaterial,
  BaseLogoModel,
  Lightning,
  blue,
  Controller,
  Eth,
  Globe,
  Phone,
  Headphones,
  Spikey,
  Play,
  Blobby,
} from './models';

import baseLogo from './assets/base-logo.svg';

// Environnment
import environmentLight from './assets/environmentLight.jpg';

/* 
  The Main Scene
  - Keeps track of window focus, intersection observer
  - Listen to Mouse event for rotation context
  - Global setup such as gravity, dpr & Physics
*/

const gravity: Vector3Tuple = [0, 0, 0];

export default function Scene(): JSX.Element {
  const [isVisible, setIsVisible] = useState(true);
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleVisibilityChange = useCallback(() => {
    setIsWindowFocused(!document.hidden);
  }, []);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }, // Adjust this value as needed
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const isActive = isVisible && isWindowFocused;

  return (
    <div style={{ width: '100%', height: '100%' }} ref={containerRef}>
      <Canvas shadows frameloop={isActive ? 'always' : 'never'} camera={{ position: [0, 0, 5] }}>
        <fog attach="fog" args={['#111', 2.5, 7]} />

        <mesh>
          <sphereGeometry args={[7, 64, 64]} />
          <meshPhysicalMaterial color="#666" side={THREE.BackSide} depthTest={false} />
        </mesh>

        <Effects />
        <EnvironmentSetup />

        <Suspense fallback={<Loader />}>
          <Physics gravity={gravity} timeStep="vary" paused={!isActive}>
            <Pointer />
            <Everything />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}

function Effects() {
  return (
    <EffectComposer multisampling={0} stencilBuffer={false}>
      <Bloom mipmapBlur luminanceThreshold={1} intensity={1} />
      <SMAA />
    </EffectComposer>
  );
}

function Loader() {
  //const { progress } = useProgress();
  return (
    <Html center>
      <div className="h-[50px] w-[50px] animate-pulse">
        <img src={baseLogo.src} alt="Loading..." className="w-[50px]" />
      </div>
    </Html>
  );
}

/* 
  The Environment
  - Loads the JPEG / HDR gainmap file
  - Set as global texture
*/
function EnvironmentSetup() {
  return (
    <Environment files={environmentLight.src}>
      <Lightformer
        form="ring"
        intensity={6}
        rotation-x={Math.PI / 2}
        position={[5, 5, -3]}
        scale={4}
        color="white"
      />
      <Lightformer
        form="circle"
        intensity={20}
        rotation-x={Math.PI / 2}
        position={[0, -15, -9]}
        scale={2}
      />
      <Lightformer
        form="circle"
        intensity={2}
        rotation-y={-Math.PI / 2}
        position={[10, 1, 0]}
        scale={8}
      />
      <Lightformer
        form="ring"
        color="white"
        intensity={5}
        onUpdate={(self) => self.lookAt(0, 0, 0)}
        position={[10, 10, 0]}
        scale={4}
      />
    </Environment>
  );
}

/* 
  The GLTF Scene
  - Loads the GLTF file / 3D scene
*/
export function Everything(props) {
  const groupRef = useRef();

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <BaseLogo />
      <Balls />
      <Lightning />
      <Boxes />
      <Controller />
      <Eth />
      <Globe />
      <Phone />
      <Headphones />
      <Spikey />
      <Play />
      <Blobby />
      <Blobby />
    </group>
  );
}

function Boxes({ count = 10 }) {
  const instancedApi = useRef(null);
  const { viewport } = useThree();
  const vec = useMemo(() => new THREE.Vector3(), []);
  const gravityEffect = 0.003;

  const instances = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        key: 'instance_' + i,
        position: [
          THREE.MathUtils.randFloatSpread(viewport.width * 2),
          THREE.MathUtils.randFloatSpread(viewport.height * 2),
          THREE.MathUtils.randFloatSpread(viewport.width * 2),
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.5,
      });
    }
    return temp;
  }, [count, viewport]);

  useFrame(() => {
    if (instancedApi.current) {
      for (let i = 0; i < count; i++) {
        if (!instancedApi.current.at(i)) continue;
        const instance = instancedApi.current.at(i);
        const translation = instance.translation();
        vec.set(translation.x, translation.y, translation.z).negate().multiplyScalar(gravityEffect);
        instance.applyImpulse(vec);
      }
    }
  });

  return (
    <InstancedRigidBodies
      instances={instances}
      ref={instancedApi}
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
    >
      <instancedMesh args={[null, null, count]} castShadow receiveShadow>
        <boxGeometry args={[0.75, 0.75, 0.75]} />
        <BlackMaterial />
      </instancedMesh>
      <CuboidCollider args={[0.5, 0.5, 0.5]} />
    </InstancedRigidBodies>
  );
}

/*
function Boxes({ count = 10 }: { count?: number }) {
  const boxes = useMemo(
    () =>
      new Array(count).fill(null).map((_, index) => {
        return (
          <PhysicsMesh scale={0.5} gravityEffect={0.03} key={index}>
            <Box />
          </PhysicsMesh>
        );
      }),
    [count],
  );

  return <group>{boxes}</group>;
}


function Balls({ count = 10 }: { count?: number }) {
  const boxes = useMemo(
    () =>
      new Array(count).fill(null).map((_, index) => {
        return (
          <PhysicsMesh scale={0.25} gravityEffect={0.004} key={index}>
            <mesh castShadow receiveShadow>
              <sphereGeometry args={[0.25, 64, 64]} />
              <meshPhysicalMaterial color={blue} />
            </mesh>
          </PhysicsMesh>
        );
      }),
    [count],
  );

  return <group>{boxes}</group>;
}*/

function Balls({ count = 20 }) {
  const instancedApi = useRef(null);
  const { viewport } = useThree();
  const vec = useMemo(() => new THREE.Vector3(), []);
  const gravityEffect = 0.00005;

  const instances = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        key: 'instance_' + i,
        position: [
          THREE.MathUtils.randFloatSpread(viewport.width * 2),
          THREE.MathUtils.randFloatSpread(viewport.height * 2),
          THREE.MathUtils.randFloatSpread(viewport.width * 2),
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.25,
      });
    }
    return temp;
  }, [count, viewport]);

  useFrame(() => {
    if (instancedApi.current) {
      for (let i = 0; i < count; i++) {
        if (!instancedApi.current.at(i)) continue;
        const instance = instancedApi.current.at(i);
        const translation = instance.translation();
        vec.set(translation.x, translation.y, translation.z).negate().multiplyScalar(gravityEffect);
        instance.applyImpulse(vec);
      }
    }
  });

  return (
    <InstancedRigidBodies
      instances={instances}
      ref={instancedApi}
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
    >
      <instancedMesh args={[null, null, count]} castShadow receiveShadow>
        <sphereGeometry args={[0.25, 64, 64]} />
        <meshPhysicalMaterial color={blue} />
      </instancedMesh>
      <BallCollider args={[0.25]} />
    </InstancedRigidBodies>
  );
}

function BaseLogo() {
  const { size } = useThree();
  const logoRef = useRef<THREE.Group>(null!);
  const doneRef = useRef<boolean>(false);

  useFrame(({ mouse }) => {
    if (doneRef.current) {
      logoRef.current.rotation.y = THREE.MathUtils.lerp(logoRef.current.rotation.y, mouse.x, 0.05);
      logoRef.current.rotation.x = THREE.MathUtils.lerp(logoRef.current.rotation.x, -mouse.y, 0.05);
    } else {
      logoRef.current.rotation.y = THREE.MathUtils.lerp(logoRef.current.rotation.y, 0, 0.05);
    }
    logoRef.current.position.z = THREE.MathUtils.lerp(logoRef.current.position.z, 0, 0.05);

    // lerp never gets to 0
    if (logoRef.current.position.z > -0.01) {
      doneRef.current = true;
    }
  });

  let mobile = false;
  if (size.width < 768) {
    mobile = true;
  }

  return (
    <RigidBody type="kinematicPosition" colliders={false}>
      <CylinderCollider rotation={[Math.PI / 2, 0, 0]} args={[10, mobile ? 1.1 : 2]} />
      <group ref={logoRef} position={[0, 0, -10]} rotation={[0, -Math.PI, 0]}>
        <Center scale={mobile ? 0.075 : 0.13}>
          <BaseLogoModel />
        </Center>
      </group>
    </RigidBody>
  );
}

export function PhysicsMesh({
  vec = new THREE.Vector3(),
  r = THREE.MathUtils.randFloatSpread,
  scale = 1,
  gravityEffect = 0.2,
  children,
}: {
  vec?: THREE.Vector3;
  r?: (a: number) => number;
  scale?: number;
  gravityEffect?: number;
  children: React.ReactNode;
}) {
  const api = useRef();
  const { viewport } = useThree();

  const randomNumberBetween = (min: number, max: number) => {
    const posOrNeg = Math.random() > 0.5 ? 1 : -1;
    const num = Math.min(Math.random() * (max - min) + min, 14);
    return posOrNeg * num;
  };

  const pos = useMemo(
    () =>
      new THREE.Vector3(
        randomNumberBetween(viewport.width * 0.5, viewport.width * 2),
        randomNumberBetween(viewport.height * 0.5, viewport.height * 2),
        randomNumberBetween(viewport.width * 0.5, viewport.width * 2),
      ),
    [],
  );
  const rot = useMemo(() => new THREE.Vector3(r(Math.PI), r(Math.PI), r(Math.PI)), []);

  useFrame(() => {
    api.current?.applyImpulse(
      vec.copy(api.current.translation()).negate().multiplyScalar(gravityEffect),
    );
  });

  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={pos.toArray()}
      rotation={rot.toArray()}
      ref={api}
      colliders={false}
      scale={scale}
    >
      <BallCollider args={[1]} />
      {children}
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef();
  const light = useRef();
  const { size } = useThree();
  let mobile = false;
  if (size.width < 768) {
    mobile = true;
  }

  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(
      vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0),
    );
    light.current?.position.set(0, 0, 10);
    light.current?.lookAt((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0);
  });
  return (
    <>
      <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
        <BallCollider args={[mobile ? 1 : 2]} />
      </RigidBody>

      <directionalLight ref={light} position={[0, 0, 10]} intensity={10} color={blue} />
    </>
  );
}
