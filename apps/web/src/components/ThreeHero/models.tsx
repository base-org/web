/* eslint-disable react/no-unknown-property */
'use client';

// Libraries
import { useMemo, useRef } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import dynamic from 'next/dynamic';

// Assets
import controlerModel from './assets/controller.glb';
import ethModel from './assets/eth.glb';
import globeModel from './assets/globe.glb';
import phoneModel from './assets/phone.glb';
import headphonesModel from './assets/headphones.glb';
import spikeyModel from './assets/spikey.glb';
import playModel from './assets/play.glb';
import objectModel from './assets/object.glb';
import logoModel from './assets/logo.glb';
import cursorModel from './assets/cursor.glb';
import lightningSVG from './assets/lightning.svg';

// 3D libraries - types
import type { Mesh, Shape, DirectionalLight, ExtrudeGeometryOptions } from 'three';
import type { SVGResult } from 'three-stdlib';
import type { MeshProps, Vector3, Euler } from '@react-three/fiber';
import type { CylinderArgs, BallArgs, RapierRigidBody } from '@react-three/rapier';

// 3D Libraries - static - These cannot be dynamically imported
import { Color, MathUtils, Group, Vector3 as ThreeVector3 } from 'three';
import { useGLTF } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { SVGLoader } from 'three-stdlib';

// 3D libraries - dynamic imports

// Dynamic - react-three/rapier
const BallCollider = dynamic(
  async () => import('@react-three/rapier').then((mod) => mod.BallCollider),
  { ssr: false },
);

const CylinderCollider = dynamic(
  async () => import('@react-three/rapier').then((mod) => mod.CylinderCollider),
  { ssr: false },
);

const RigidBody = dynamic(async () => import('@react-three/rapier').then((mod) => mod.RigidBody), {
  ssr: false,
});

// Dynamic - react-three/drei
const Center = dynamic(async () => import('@react-three/drei').then((mod) => mod.Center), {
  ssr: false,
});

/* load draco locally (v1.5.7) */
useGLTF.setDecoderPath('draco/');

/* Constants */
export const blue = '#105eff';
const blackColor = new Color(0.08, 0.08, 0.08);

/* Models */
export function BlackMaterial() {
  return <meshPhysicalMaterial color={blackColor} metalness={0.5} roughness={0.5} />;
}

export function MetalMaterial() {
  return <meshPhysicalMaterial color="white" metalness={0.8} roughness={0.3} />;
}

const boxGeometry: [width: number, height: number, depth: number] = [0.5, 0.5, 0.5];
const boxesCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export function Boxes() {
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
export function Balls() {
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

export function BaseLogo() {
  const logoRef = useRef<Group>(null);
  const doneRef = useRef<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 769px)');

  useFrame(({ pointer }) => {
    if (!logoRef.current) return;

    if (doneRef.current) {
      logoRef.current.rotation.y = MathUtils.lerp(logoRef.current.rotation.y, pointer.x, 0.05);
      logoRef.current.rotation.x = MathUtils.lerp(logoRef.current.rotation.x, -pointer.y, 0.05);
    } else {
      logoRef.current.rotation.y = MathUtils.lerp(logoRef.current.rotation.y, 0, 0.05);
    }
    logoRef.current.position.z = MathUtils.lerp(logoRef.current.position.z, 0, 0.05);

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
  vec = new ThreeVector3(),
  r = MathUtils.randFloatSpread,
  scale = 1,
  gravityEffect = 0.2,
  children,
}: {
  vec?: ThreeVector3;
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
      new ThreeVector3(
        randomNumberBetween(viewport.width * 0.5, viewport.width * 2),
        randomNumberBetween(viewport.height * 0.5, viewport.height * 2),
        randomNumberBetween(viewport.width * 0.5, viewport.width * 2),
      ),
    [viewport.height, viewport.width],
  );
  const rot = useMemo(() => new ThreeVector3(r(Math.PI), r(Math.PI), r(Math.PI)), [r]);

  useFrame(() => {
    if (!rigidBodyApiRef.current) return;
    const vector = rigidBodyApiRef.current.translation();
    const vector3 = new ThreeVector3(vector.x, vector.y, vector.z);
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

export function Pointer() {
  const vec = new ThreeVector3();
  const rigidBodyApiRef = useRef<RapierRigidBody>(null);
  const light = useRef<DirectionalLight>(null);
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

export function BaseLogoModel() {
  const { nodes } = useGLTF(logoModel);
  const model = nodes.Base_Logo as Mesh;

  return (
    <Center>
      <mesh scale={3.2} geometry={model.geometry} castShadow receiveShadow>
        <meshPhysicalMaterial color={blue} metalness={0} roughness={0.25} />
      </mesh>
    </Center>
  );
}

export function Lightning() {
  const svg = useLoader(SVGLoader, lightningSVG.src);
  const shapes = (svg as SVGResult).paths[0].toShapes(true);
  const extrudeArguments: [shapes: Shape[], options: ExtrudeGeometryOptions] = useMemo(
    () => [
      shapes,
      {
        curveSegments: 64,
        depth: 5,
        bevelEnabled: true,
        bevelSegments: 64,
        bevelSize: 0.5,
        bevelThickness: 1,
      },
    ],
    [shapes],
  );
  return (
    <PhysicsMesh>
      <Center>
        <mesh scale={0.019} castShadow receiveShadow>
          <extrudeGeometry args={extrudeArguments} />
          <MetalMaterial />
        </mesh>
      </Center>
    </PhysicsMesh>
  );
}

export function Controller(props: MeshProps) {
  const { nodes } = useGLTF(controlerModel);
  const model = nodes.Controller as Mesh;
  return (
    <PhysicsMesh>
      <mesh {...props} geometry={model.geometry} castShadow receiveShadow scale={0.3}>
        <BlackMaterial />
      </mesh>
    </PhysicsMesh>
  );
}

export function Eth() {
  const { nodes } = useGLTF(ethModel);
  const model = nodes.ETH as Mesh;
  return (
    <PhysicsMesh>
      <mesh geometry={model.geometry} castShadow receiveShadow scale={0.25}>
        <MetalMaterial />
      </mesh>
    </PhysicsMesh>
  );
}

export function Globe() {
  const { nodes } = useGLTF(globeModel);
  const model = nodes.Globe as Mesh;

  return (
    <PhysicsMesh>
      <mesh geometry={model.geometry} castShadow receiveShadow scale={0.25}>
        <MetalMaterial />
      </mesh>
    </PhysicsMesh>
  );
}

const phonePosition: Vector3 = [0, 0, 0.06];
const phoneRotation: Euler = [Math.PI / 2, 0, 0];
const phoneWidth = 1.8;
const phoneHeight = 0.86;
const phoneDimension: [width?: number | undefined, height?: number] = [phoneWidth, phoneHeight];
export function Phone() {
  const { nodes } = useGLTF(phoneModel);
  const model = nodes.Cylinder as Mesh;
  return (
    <PhysicsMesh>
      <mesh geometry={model.geometry} castShadow receiveShadow rotation={phoneRotation}>
        <BlackMaterial />
      </mesh>
      <mesh position={phonePosition}>
        <planeGeometry args={phoneDimension} />
        <MetalMaterial />
      </mesh>
    </PhysicsMesh>
  );
}

export function Headphones() {
  const { nodes } = useGLTF(headphonesModel);
  const model = nodes.Headphones as Mesh;
  return (
    <PhysicsMesh>
      <mesh geometry={model.geometry} castShadow receiveShadow scale={0.2}>
        <BlackMaterial />
      </mesh>
    </PhysicsMesh>
  );
}

export function Spikey() {
  const { nodes } = useGLTF(spikeyModel);
  const model = nodes.Spikey as Mesh;
  return (
    <PhysicsMesh>
      <mesh geometry={model.geometry} castShadow receiveShadow scale={0.3}>
        <BlackMaterial />
      </mesh>
    </PhysicsMesh>
  );
}

export function Play() {
  const { nodes } = useGLTF(playModel);
  const model = nodes.Play as Mesh;
  return (
    <PhysicsMesh>
      <mesh geometry={model.geometry} castShadow receiveShadow scale={0.4}>
        <BlackMaterial />
      </mesh>
    </PhysicsMesh>
  );
}

export function Blobby() {
  const { nodes } = useGLTF(objectModel);
  const model = nodes.Object_02 as Mesh;
  return (
    <PhysicsMesh>
      <mesh geometry={model.geometry} castShadow receiveShadow scale={0.3}>
        <BlackMaterial />
      </mesh>
    </PhysicsMesh>
  );
}

export function Cursor() {
  const { nodes } = useGLTF(cursorModel);
  const cursor = nodes.Cursor as Mesh;
  const cursor1 = nodes.Cursor1 as Mesh;
  return (
    <PhysicsMesh>
      <Center>
        <group scale={0.35}>
          <mesh geometry={cursor.geometry} castShadow receiveShadow>
            <BlackMaterial />
          </mesh>
          <mesh geometry={cursor1.geometry} castShadow receiveShadow>
            <MetalMaterial />
          </mesh>
        </group>
      </Center>
    </PhysicsMesh>
  );
}
