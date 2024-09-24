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
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import {
  useGLTF,
  Lightformer,
  Environment,
  Html,
  Center,
  OrbitControls,
  MeshTransmissionMaterial,
} from '@react-three/drei';
import {
  Physics,
  RigidBody,
  BallCollider,
  Vector3Tuple,
  CylinderCollider,
} from '@react-three/rapier';
import { SVGLoader } from 'three-stdlib';
import { EffectComposer, Bloom, SMAA } from '@react-three/postprocessing';

// Environnment
import environmentLight from './assets/environmentLight.jpg';

// Models
import babylong_optimize_1 from './assets/babylon_optimize_1.glb';

import baseLogo from './assets/base-logo.svg';

const blue = '#105eff';

const modelToUse = babylong_optimize_1;

/*
  Constants
*/
const blackColor = new THREE.Color(0.08, 0.08, 0.08);

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
          <meshPhysicalMaterial color="#666" side={THREE.BackSide} />
        </mesh>

        <EffectComposer multisampling={0} stencilBuffer={false}>
          <Bloom mipmapBlur luminanceThreshold={1} intensity={1.5} />
          <SMAA />
        </EffectComposer>

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
        intensity={10}
        rotation-x={Math.PI / 2}
        position={[5, 5, -3]}
        scale={4}
        color={blue}
      />
      <Lightformer
        form="circle"
        intensity={20}
        rotation-x={Math.PI / 2}
        position={[0, 5, -9]}
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
        color={blue}
        intensity={10}
        onUpdate={(self) => self.lookAt(0, 0, 0)}
        position={[10, 10, 0]}
        scale={4}
      />
    </Environment>
  );
}

function BlackMaterial() {
  return (
    <meshPhysicalMaterial
      color={blackColor}
      metalness={0.5}
      roughness={0.5}
      side={THREE.DoubleSide}
    />
  );
}

function MetalMaterial() {
  return (
    <meshPhysicalMaterial color="white" metalness={0.8} roughness={0.3} side={THREE.DoubleSide} />
  );
}

/* 
  The GLTF Scene
  - Loads the GLTF file / 3D scene
  - Handle / update rotation from context
  - Setup the camera
  - Setup the HDR environnment (ie: "lighting")
*/
export function Everything(props) {
  const groupRef = useRef();
  const { nodes } = useGLTF(modelToUse);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/*<PhysicsMesh>
        <mesh geometry={nodes.Object_1.geometry}>
          <BlackMaterial />
        </mesh>
      </PhysicsMesh>*/}

      <PhysicsMesh>
        <mesh geometry={nodes.ETH.geometry}>
          <MetalMaterial />
        </mesh>
      </PhysicsMesh>
      <PhysicsMesh>
        <mesh geometry={nodes.Spikey.geometry}>
          <BlackMaterial />
        </mesh>
      </PhysicsMesh>
      <PhysicsMesh>
        <mesh geometry={nodes.Mobile_Phone.geometry}>
          <BlackMaterial />
        </mesh>
      </PhysicsMesh>

      <PhysicsMesh>
        <group>
          <mesh geometry={nodes.Cursor.geometry} scale={[0.88, 0.88, 0.88]}>
            <BlackMaterial />
          </mesh>

          <mesh geometry={nodes.Cursor1.geometry}>
            <MetalMaterial />
          </mesh>
        </group>
      </PhysicsMesh>
      <Boxes count={10} geometry={nodes.Box_08.geometry} />

      <PhysicsMesh>
        <mesh geometry={nodes.Boole.geometry}>
          <BlackMaterial />
        </mesh>
      </PhysicsMesh>
      <PhysicsMesh>
        <mesh geometry={nodes.Globe.geometry}>
          <MetalMaterial />
        </mesh>
      </PhysicsMesh>
      <PhysicsMesh>
        <mesh geometry={nodes.Controller.geometry}>
          <BlackMaterial />
        </mesh>
      </PhysicsMesh>
      <PhysicsMesh>
        <mesh geometry={nodes.headphone.geometry}>
          <BlackMaterial />
        </mesh>
      </PhysicsMesh>
      <PhysicsMesh>
        <mesh geometry={nodes.Object_02.geometry}>
          <BlackMaterial />
        </mesh>
      </PhysicsMesh>
      <PhysicsMesh>
        <mesh geometry={nodes.Object_01.geometry}>
          <BlackMaterial />
        </mesh>
      </PhysicsMesh>
      <PhysicsMesh>
        <mesh geometry={nodes.Extrude.geometry}>
          <BlackMaterial />
        </mesh>
      </PhysicsMesh>
      <BaseLogo /*geometry={nodes.Wallet.geometry}*/ />
      <Balls />
    </group>
  );
}

function Boxes({ geometry, count = 10 }: { geometry: any; count?: number }) {
  const boxes = useMemo(
    () =>
      new Array(count).fill(null).map((_, index) => {
        return (
          <PhysicsMesh scale={0.5} gravityEffect={0.03} key={index}>
            <mesh geometry={geometry} scale={0.5}>
              <BlackMaterial />
            </mesh>
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
            <mesh>
              <sphereGeometry args={[0.25, 64, 64]} />
              <meshPhysicalMaterial color={blue} />
            </mesh>
          </PhysicsMesh>
        );
      }),
    [count],
  );

  return <group>{boxes}</group>;
}

function BaseLogo() {
  const [click, setClick] = useState(false);
  const logoRef = useRef<THREE.Group>(null!);
  const doneRef = useRef<boolean>(false);

  const svg = useLoader(SVGLoader, baseLogo.src);

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
  return (
    <RigidBody type="kinematicPosition" colliders={false}>
      <CylinderCollider rotation={[Math.PI / 2, 0, 0]} args={[10, 2]} />
      <group
        ref={logoRef}
        position={[0, 0, -10]}
        rotation={[0, -Math.PI, 0]}
        onPointerDown={() => {
          setClick(true);
        }}
        onPointerUp={() => {
          setClick(false);
        }}
      >
        <Center>
          <mesh scale={0.13}>
            <extrudeGeometry
              args={[
                svg.paths[0].toShapes(),
                {
                  curveSegments: 64,
                  depth: 5,
                  bevelEnabled: true,
                  bevelSegments: 64,
                  bevelSize: 0.5,
                  bevelThickness: 1,
                },
              ]}
            />

            <meshPhysicalMaterial
              color={blue}
              metalness={0.5}
              roughness={0.5}
              iridescence={0.5}
              // ior={2}
              // clearcoat={0.1}
            />
            {/*<MeshTransmissionMaterial
              color={blue}
              metalness={0}
              roughness={1}
              backside
              backsideThickness={1}
              thickness={2}
            />*/}
          </mesh>
        </Center>
      </group>
    </RigidBody>
  );
}

function PhysicsMesh({
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
  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(
      vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0),
    );
  });
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  );
}
