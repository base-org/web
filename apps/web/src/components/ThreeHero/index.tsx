/* eslint-disable react/no-unknown-property */
'use client';

import * as THREE from 'three';
import { useRef, useReducer, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, MeshTransmissionMaterial, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, Physics, RigidBody, CylinderCollider } from '@react-three/rapier';
import { EffectComposer, N8AO } from '@react-three/postprocessing';
import { easing } from 'maath';

// const accents = ['#4060ff'];
// const shuffle = (accent = 0) => [
//   { color: '#444', roughness: 0.1 },
//   { color: '#444', roughness: 0.75 },
//   { color: '#444', roughness: 0.75 },
//   { color: 'white', roughness: 0.1 },
//   { color: 'white', roughness: 0.75 },
//   { color: 'white', roughness: 0.1 },
//   { color: accents[accent], roughness: 0.1, accent: true },
//   { color: accents[accent], roughness: 0.75, accent: true },
//   { color: accents[accent], roughness: 0.1, accent: true },
// ];

const objectNames: string[] = [
  'Base_Icon',
  'Box',
  'Box_1',
  'Box_2',
  'Box_3',
  'Box_4',
  'Box_5',
  'Box_6',
  'Box_7',
  'Cloth_Avatars',
  'Cloth_Avatars_1',
  'Controller',
  'Cursor',
  'ETH',
  'Globe',
  'Headphone',
  'Mobile_Remesh',
  'Play_Low',
  'Rock',
  'SpikeyShape',
];

const unitSpherePositions: [number, number, number][] = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
  [0.707, 0.707, 0],
  [-0.707, 0.707, 0],
  [0.707, -0.707, 0],
  [-0.707, -0.707, 0],
  [0.707, 0, 0.707],
  [-0.707, 0, 0.707],
  [0.707, 0, -0.707],
  [-0.707, 0, -0.707],
  [0, 0.707, 0.707],
  [0, -0.707, 0.707],
  [0, 0.707, -0.707],
  [0, -0.707, -0.707],
  [0.577, 0.577, 0.577],
  [-0.577, -0.577, -0.577],
];

const dpr: [min: number, max: number] = [1, 1.5];
const gl = { antialias: false };
const camera: { position: [number, number, number]; fov: number; near: number; far: number } = {
  position: [0, 0, 15],
  fov: 17.5,
  near: 1,
  far: 20,
};

const colorArgs: [number, number, number] = [0.01, 0.01, 0.01];
const lightPosition: [number, number, number] = [10, 10, 10];
const lightAngle = 0.15;
const lightPenumbra = 1;
const lightIntensity = 1;
const gravity: [number, number, number] = [0, 0, 0];

type Glb = {
  nodes: Record<
    string,
    {
      children: {
        geometry: THREE.BufferGeometry;
      }[];
    }
  >;
};

export default function Scene() {
  // const [accent, click] = useReducer((state) => ++state % accents.length, 0);
  // const connectors = useMemo(() => shuffle(accent), [accent]);

  const glb = useGLTF('/three/All_3D_models.gltf', false, false) as unknown as Glb;

  return (
    <Canvas shadows dpr={dpr} gl={gl} camera={camera}>
      <color attach="background" args={colorArgs} />
      <ambientLight intensity={0.4} />
      <spotLight
        position={lightPosition}
        angle={lightAngle}
        penumbra={lightPenumbra}
        intensity={lightIntensity}
        castShadow
      />
      <Physics /*debug*/ gravity={gravity}>
        <Pointer />
        {objectNames.map((name, index) => (
          <Connector key={name} position={unitSpherePositions[index]} accent={undefined}>
            <Model geometry={glb.nodes[name].children[0].geometry}>
              <MeshTransmissionMaterial
                clearcoat={1}
                thickness={0.1}
                anisotropicBlur={0.1}
                chromaticAberration={0.1}
                samples={8}
                resolution={512}
                distortionScale={0}
                temporalDistortion={0}
              />
            </Model>
          </Connector>
        ))}
        {/* {connectors.map((props, i) => (
          <Connector key={i} {...props} />
        ))} */}
        <Connector position={[0, 0, 0]} accent={undefined}>
          <Model geometry={glb.nodes.Base_Icon.children[0].geometry}>
            <MeshTransmissionMaterial
              clearcoat={1}
              thickness={0.1}
              anisotropicBlur={0.1}
              chromaticAberration={0.1}
              samples={8}
              resolution={512}
              distortionScale={0}
              temporalDistortion={0}
            />
          </Model>
        </Connector>
      </Physics>
      <EffectComposer disableNormalPass multisampling={8}>
        <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
      </EffectComposer>
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer
            form="circle"
            intensity={4}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={8}
          />
        </group>
      </Environment>
    </Canvas>
  );
}

type ConnectorProps = {
  position: [number, number, number];
  children: React.ReactNode;
  vec: THREE.Vector3;
  r: (arg0: number) => number;
  accent: boolean;
  color: string;
};

function Connector({
  position,
  children,
  vec = new THREE.Vector3(),
  r = THREE.MathUtils.randFloatSpread,
  accent,
  color,
}: ConnectorProps) {
  const api = useRef();
  const pos = useMemo(() => position || [r(10), r(10), r(10)], []);
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta);
    api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.2));
  });
  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={pos}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[0.5]} />
      {children}
      {accent && <pointLight intensity={4} distance={2.5} color={color} />}
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef();
  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(
      vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0),
    );
  });
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[0.5]} />
    </RigidBody>
  );
}

function Model({
  children,
  color = 'white',
  roughness = 0.3,
  geometry,
}: {
  children: React.ReactNode;
  color?: string;
  roughness?: number;
  geometry?: THREE.BufferGeometry;
}) {
  const ref = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>(null);

  useFrame((state, delta) => {
    easing.dampC(ref.current?.material?.color as THREE.Color, color, 0.2, delta);
  });

  return (
    <mesh ref={ref} castShadow receiveShadow scale={0.3} geometry={geometry}>
      <meshStandardMaterial metalness={0.2} roughness={roughness} />
      {children}
    </mesh>
  );
}
