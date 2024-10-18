/* eslint-disable react/no-unknown-property */
'use client';

import * as THREE from 'three';
import { useRef, useMemo, useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas, Euler, useFrame, useThree, Vector3 } from '@react-three/fiber';
import { Lightformer, Environment, Html, Center } from '@react-three/drei';
import {
  Physics,
  BallCollider,
  Vector3Tuple,
  CylinderCollider,
  CylinderArgs,
  RapierRigidBody,
  RigidBody,
  BallArgs,
} from '@react-three/rapier';
import { EffectComposer, Bloom, SMAA } from '@react-three/postprocessing';
import {
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
  Cursor,
} from './models';

import baseLogo from './assets/base-logo.svg';

// Environnment
import environmentLight from './assets/environmentLight.jpg';
import Image, { StaticImageData } from 'next/image';
import { useMediaQuery } from 'usehooks-ts';
import classNames from 'classnames';
import Link from 'apps/web/src/components/Link';

/* 
  The Main Scene
  - Keeps track of window focus, intersection observer
  - Listen to pointer event for rotation context
  - Global setup such as gravity, dpr & Physics
*/

const mintLink =
  'https://wallet.coinbase.com/nft/mint/eip155:8453:erc721:0x803Fc79D31AB30a39B3BD2A90171470cC82Ba44a';

const gravity: Vector3Tuple = [0, 0, 0];

const sceneFogArguments: [color: THREE.ColorRepresentation, near: number, far: number] = [
  '#111',
  2.5,
  7,
];

const sceneCamera = { position: [0, 0, 5] as Vector3 };
const sceneSphereArguments: [radius: number, widthSegments: number, heightSegments: number] = [
  7, 64, 64,
];

type MouseXY = {
  x: number;
  y: number;
};

export default function Scene(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<MouseXY>({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(true);
  const containerRef = useRef(null);

  const handleContextMenu = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsVisible(true);
    setPosition({ x: event.clientX, y: event.clientY });
  }, []);

  const handleClick = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  useEffect(() => {
    const updateIsActive = () => {
      const isFocused = !document.hidden && document.hasFocus();
      setIsActive(isFocused);
    };

    const container = containerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        setIsActive(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -100% 0px',
      },
    );

    if (container) {
      observer.observe(container);
    }

    // Initial check
    updateIsActive();

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, []);

  const canvaClasses = classNames(
    'fixed h-screen w-full transition-all',
    isActive ? 'opacity-100' : 'opacity-0',
  );

  return (
    <div ref={containerRef} className="absolute h-full w-full" onContextMenu={handleContextMenu}>
      <Canvas
        shadows
        frameloop={isActive ? 'always' : 'never'}
        camera={sceneCamera}
        className={canvaClasses}
      >
        <fog attach="fog" args={sceneFogArguments} />

        <mesh>
          <sphereGeometry args={sceneSphereArguments} />
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

      {isVisible && (
        <div
          className="absolute rounded border border-white/20 bg-black px-4 py-2 shadow-md"
          style={{ top: `${position.y}px`, left: `${position.x}px` }}
        >
          <Link
            href={mintLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue"
          >
            Mint This
          </Link>
        </div>
      )}
    </div>
  );
}

function Effects() {
  return (
    <EffectComposer multisampling={0} stencilBuffer={false}>
      <Bloom mipmapBlur luminanceThreshold={0.5} intensity={1} />
      <SMAA />
    </EffectComposer>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="h-[50px] w-[50px] animate-pulse">
        <Image src={baseLogo as StaticImageData} alt="Loading..." className="w-[50px]" />
      </div>
    </Html>
  );
}

/* 
  The Environment
  - Loads the JPEG / HDR gainmap file
  - Set as global texture
*/
const light1: Vector3 = [5, 5, -3];
const light2: Vector3 = [0, -15, -9];
const light3: Vector3 = [10, 1, 0];
const light4: Vector3 = [10, 10, 0];
function EnvironmentSetup() {
  const onLightUpdated = useCallback(
    (
      self: THREE.Mesh<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[]
      >,
    ) => self.lookAt(0, 0, 0),
    [],
  );
  return (
    <Environment files={environmentLight.src}>
      <Lightformer
        form="ring"
        intensity={6}
        rotation-x={Math.PI / 2}
        position={light1}
        scale={4}
        color="white"
      />
      <Lightformer
        form="circle"
        intensity={20}
        rotation-x={Math.PI / 2}
        position={light2}
        scale={2}
      />
      <Lightformer
        form="circle"
        intensity={2}
        rotation-y={-Math.PI / 2}
        position={light3}
        scale={8}
      />
      <Lightformer
        form="ring"
        color="white"
        intensity={5}
        onUpdate={onLightUpdated}
        position={light4}
        scale={4}
      />
    </Environment>
  );
}

/* 
  The GLTF Scene
  - Loads the GLTF file / 3D scene
*/
export function Everything() {
  return (
    <group dispose={null}>
      <BaseLogo />
      <Lightning />
      <Balls />
      <Boxes />
      <Controller />
      <Eth />
      <Globe />
      <Phone />
      <Headphones />
      <Spikey />
      <Play />
      <Blobby />
      <Cursor />
    </group>
  );
}

const boxGeometry: [width: number, height: number, depth: number] = [0.5, 0.5, 0.5];
const boxesCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function Boxes() {
  const boxes = useMemo(
    () =>
      boxesCount.map((id) => {
        return (
          <PhysicsMesh scale={0.5} gravityEffect={0.03} key={id}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={boxGeometry} />
              <BlackMaterial />
            </mesh>
          </PhysicsMesh>
        );
      }),
    [],
  );

  return <group>{boxes}</group>;
}

const sphereGeometry: [width: number, height: number, depth: number] = [0.25, 64, 64];
const sphereCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function Balls() {
  const boxes = useMemo(
    () =>
      sphereCount.map((id) => {
        return (
          <PhysicsMesh scale={0.25} gravityEffect={0.004} key={id}>
            <mesh castShadow receiveShadow>
              <sphereGeometry args={sphereGeometry} />
              <meshPhysicalMaterial color={blue} />
            </mesh>
          </PhysicsMesh>
        );
      }),
    [],
  );

  return <group>{boxes}</group>;
}

const baseLogoRotation: Euler = [Math.PI / 2, 0, 0];
const baseLogoPosition: [x: number, y: number, z: number] = [0, 0, -10];

function BaseLogo() {
  const logoRef = useRef<THREE.Group>(null);
  const doneRef = useRef<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 769px)');

  useFrame(({ pointer }) => {
    if (!logoRef.current) return;

    if (doneRef.current) {
      logoRef.current.rotation.y = THREE.MathUtils.lerp(
        logoRef.current.rotation.y,
        pointer.x,
        0.05,
      );
      logoRef.current.rotation.x = THREE.MathUtils.lerp(
        logoRef.current.rotation.x,
        -pointer.y,
        0.05,
      );
    } else {
      logoRef.current.rotation.y = THREE.MathUtils.lerp(logoRef.current.rotation.y, 0, 0.05);
    }
    logoRef.current.position.z = THREE.MathUtils.lerp(logoRef.current.position.z, 0, 0.05);

    // lerp never gets to 0
    if (logoRef.current.position.z > -0.01) {
      doneRef.current = true;
    }
  });

  const cylinderArguments: CylinderArgs = useMemo(() => [10, isMobile ? 1.1 : 2], [isMobile]);

  return (
    <RigidBody type="kinematicPosition" colliders={false}>
      <CylinderCollider rotation={baseLogoRotation} args={cylinderArguments} />
      <group ref={logoRef} position={baseLogoPosition}>
        <Center scale={isMobile ? 0.075 : 0.13}>
          <BaseLogoModel />
        </Center>
      </group>
    </RigidBody>
  );
}

const ballArguments: BallArgs = [1];
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
  const rigidBodyApiRef = useRef<RapierRigidBody>(null);
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
    [viewport.height, viewport.width],
  );
  const rot = useMemo(() => new THREE.Vector3(r(Math.PI), r(Math.PI), r(Math.PI)), [r]);

  useFrame(() => {
    if (!rigidBodyApiRef.current) return;
    const vector = rigidBodyApiRef.current.translation();
    const vector3 = new THREE.Vector3(vector.x, vector.y, vector.z);
    rigidBodyApiRef.current.applyImpulse(
      vec.copy(vector3).negate().multiplyScalar(gravityEffect),
      true,
    );
  });

  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={pos.toArray()}
      rotation={rot.toArray()}
      ref={rigidBodyApiRef}
      colliders={false}
      scale={scale}
    >
      <BallCollider args={ballArguments} />
      {children}
    </RigidBody>
  );
}

const pointerPosition: Vector3 = [0, 0, 0];
const pointerLightPosition: Vector3 = [0, 0, 10];
function Pointer() {
  const vec = new THREE.Vector3();
  const rigidBodyApiRef = useRef<RapierRigidBody>(null);
  const light = useRef<THREE.DirectionalLight>(null);
  const isMobile = useMediaQuery('(max-width: 769px)');

  useFrame(({ pointer, viewport }) => {
    rigidBodyApiRef.current?.setNextKinematicTranslation(
      vec.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0),
    );
    light.current?.position.set(0, 0, 10);
    light.current?.lookAt((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0);
  });

  const ballColliderArgs: BallArgs = useMemo(() => [isMobile ? 1 : 2], [isMobile]);

  return (
    <>
      <RigidBody
        position={pointerPosition}
        type="kinematicPosition"
        colliders={false}
        ref={rigidBodyApiRef}
      >
        <BallCollider args={ballColliderArgs} />
      </RigidBody>

      <directionalLight ref={light} position={pointerLightPosition} intensity={10} color={blue} />
    </>
  );
}
