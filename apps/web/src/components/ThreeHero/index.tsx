'use client';

import * as THREE from 'three';
import {
  useRef,
  useCallback,
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
} from 'react';
import { Canvas, Dpr, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, SoftShadows } from '@react-three/drei';
import { Physics, RapierRigidBody, RigidBody, Vector3Tuple } from '@react-three/rapier';
import { HDRJPGLoader } from '@monogrid/gainmap-js';
import {
  EffectComposer,
  Bloom,
  ToneMapping,
  DepthOfField,
  Vignette,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

// Environnment
import environmentLight from './assets/environmentLight.jpg';

// Models
import babylong_optimize_1 from './assets/babylon_optimize_1.glb';

const modelToUse = babylong_optimize_1;

/*
  Constants
*/
const baseIconName = 'Wallet';
const cursor = 'Cursor';
const cursor1 = 'Cursor1';
/*
  Scene Rotation context
*/
type RotationContextType = {
  rotationSpeed: number;
};

const RotationContext = createContext<RotationContextType>({ rotationSpeed: 1 });

/* 
  The Main Scene
  - Keeps track of window focus, intersection observer
  - Listen to Mouse event for rotation context
  - Global setup such as gravity, dpr & Physics
*/
const dprSettings: Dpr = [1, 1.5];
const glSettings = {
  antialias: true,
  alpha: true,
  stencil: false,
  depth: true,
  logarithmicDepthBuffer: false,
  toneMapping: THREE.ACESFilmicToneMapping,
  toneMappingExposure: 1,
};
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
  const [isDragging, setIsDragging] = useState(false);
  const previousMouseX = useRef(0);
  const rotationSpeed = useRef(0);

  const onPointerDown = useCallback((event: React.PointerEvent) => {
    setIsDragging(true);
    previousMouseX.current = event.clientX;
  }, []);

  const onPointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (isDragging) {
        const deltaX = event.clientX - previousMouseX.current;
        rotationSpeed.current = deltaX * 0.005; // Adjust this multiplier to change rotation sensitivity
        previousMouseX.current = event.clientX;
      }
    },
    [isDragging],
  );

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      style={{ width: '100%', height: '100%', touchAction: 'none' }}
      ref={containerRef}
    >
      <Canvas shadows frameloop={isActive ? 'always' : 'never'} dpr={dprSettings} gl={glSettings}>
        <SoftShadows size={2.5} samples={16} focus={0.5} />
        <Physics gravity={gravity}>
          <GLTFceneRenderer glbPath={modelToUse} rotationSpeed={rotationSpeed} />
        </Physics>
        <EffectComposer>
          <Bloom intensity={0.5} luminanceThreshold={0.9} luminanceSmoothing={0.025} />
          <ToneMapping
            blendFunction={BlendFunction.LIGHTEN}
            adaptive
            resolution={256}
            middleGrey={0.6}
            maxLuminance={16.0}
            averageLuminance={1.0}
            adaptationRate={1.0}
          />

          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />

          <Vignette eskil={false} offset={0.01} darkness={0.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

/* 
  The Environment
  - Loads the JPEG / HDR gainmap file
  - Set as global texture
*/
function EnvironmentSetup() {
  const { gl, scene } = useThree();
  const [envMap, setEnvMap] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new HDRJPGLoader(gl);
    loader.load(environmentLight.src, (result) => {
      const texture = result.renderTarget.texture;
      texture.mapping = THREE.EquirectangularReflectionMapping;

      setEnvMap(texture);

      // Clean up function
      return () => {
        result.dispose();
      };
    });
  }, [gl]);

  useEffect(() => {
    if (envMap) {
      scene.environment = envMap;
    }
  }, [scene, envMap]);

  return null;
}

/* 
  The GLTF Scene
  - Loads the GLTF file / 3D scene
  - Handle / update rotation from context
  - Setup the camera
  - Setup the HDR environnment (ie: "lighting")
*/

type GLTFceneRendererProps = {
  glbPath: string;
  rotationSpeed: React.MutableRefObject<number>;
};

function GLTFceneRenderer({ glbPath, rotationSpeed }: GLTFceneRendererProps): JSX.Element {
  const groupRef = useRef<THREE.Group>(null);
  const { set } = useThree();
  const { scene: gltfScene, cameras } = useGLTF(glbPath);
  const [currentRotationSpeed, setCurrentRotationSpeed] = useState<number>(0);

  // Clone the GLTF scene to avoid modifying the original
  const clonedScene = useMemo(() => gltfScene.clone(true), [gltfScene]);

  const [centerPosition, physicsObjects] = useMemo(() => {
    const objects: { objects: THREE.Object3D[]; isBaseIcon: boolean; isCursor: boolean }[] = [];
    let centerPos = new THREE.Vector3();
    let cursorObjects: THREE.Object3D[] = [];

    clonedScene.children.map((object) => {
      // Added by designer by accident, can be ignored
      if (object.name === 'Boole') return;

      // Base logo is the "center" of the scene
      if (object.name === baseIconName) {
        centerPos.copy(object.position);
      }

      // Filtering all children except 3D ones
      if (object instanceof THREE.Object3D) {
        if ([cursor, cursor1].includes(object.name)) {
          cursorObjects.push(object);
        } else {
          objects.push({
            objects: [object],
            isBaseIcon: object.name === baseIconName,
            isCursor: false,
          });
        }
      }
    });

    if (cursorObjects.length === 2) {
      objects.push({
        objects: cursorObjects,
        isBaseIcon: false,
        isCursor: true,
      });
    }

    return [centerPos, objects];
  }, [clonedScene]);

  const zoom = 3;
  useEffect(() => {
    if (cameras && cameras.length > 0) {
      const gltfCamera = cameras[0];
      if (gltfCamera instanceof THREE.PerspectiveCamera) {
        // Store the original position
        const originalPosition = gltfCamera.position.clone();

        // Function to update camera position based on zoom
        const updateCameraZoom = () => {
          const zoomedPosition = originalPosition.clone().multiplyScalar(1 / zoom);
          gltfCamera.position.copy(zoomedPosition);
        };

        // Initial zoom application
        updateCameraZoom();

        // Set up the camera
        set({ camera: gltfCamera });

        // Return a cleanup function that resets the camera position
        return () => {
          gltfCamera.position.copy(originalPosition);
        };
      }
    }
  }, [cameras, set, zoom]);

  useFrame(() => {
    if (groupRef.current) {
      // Apply rotation to the entire group
      groupRef.current.rotation.y += rotationSpeed.current;

      // Apply friction to rotation
      rotationSpeed.current *= 0.95;

      // Stop rotation if speed is very low
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      setCurrentRotationSpeed(rotationSpeed.current);
    }
  });

  const rotationContextValue = useMemo<RotationContextType>(
    () => ({ rotationSpeed: currentRotationSpeed }),
    [currentRotationSpeed],
  );

  return (
    <RotationContext.Provider value={rotationContextValue}>
      <EnvironmentSetup />

      <group ref={groupRef}>
        {physicsObjects.map(({ objects, isBaseIcon, isCursor }) => (
          <PhysicsObject
            key={objects[0].uuid}
            objects={objects}
            isBaseIcon={isBaseIcon}
            centerPosition={centerPosition}
            isCursor={isCursor}
          />
        ))}
      </group>
    </RotationContext.Provider>
  );
}

/* 
  3D Model
  - Display 3D object(s)
  - Apply attractive force towards the Base logo
  - CenterPosition (Base logo)
*/
type PhysicsObjectProps = {
  objects: THREE.Object3D[];
  isBaseIcon: boolean;
  centerPosition: THREE.Vector3;
  isCursor?: boolean;
};

function PhysicsObject({
  objects,
  isBaseIcon,
  centerPosition,
  isCursor = false,
}: PhysicsObjectProps): JSX.Element {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const { rotationSpeed } = useContext(RotationContext);

  const attractionStrength = 5; // Adjust this to change the strength of attraction

  useFrame((state) => {
    if (!isBaseIcon && rigidBodyRef.current) {
      const currentPosition = rigidBodyRef.current.translation();
      const force = new THREE.Vector3(
        centerPosition.x - currentPosition.x,
        centerPosition.y - currentPosition.y,
        centerPosition.z - currentPosition.z,
      );

      // Normalize and scale the force
      force.normalize().multiplyScalar(attractionStrength);

      // Apply force
      rigidBodyRef.current.applyImpulse(force, true);

      // Apply rotation based on global rotation speed
      const torque = new THREE.Vector3(0, rotationSpeed * 0.1, 0);
      rigidBodyRef.current.applyTorqueImpulse(torque, true);
    }
  });

  // Effect to change material color when isBaseIcon is true
  useEffect(() => {
    if (isBaseIcon) {
      const baseIconMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x105eff),
        metalness: 0,
        roughness: 0.5,
      });

      objects.forEach((object) => {
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = baseIconMaterial;
          }
        });
      });
    }
  }, [isBaseIcon, objects]);

  return (
    <RigidBody
      ref={rigidBodyRef}
      type={isBaseIcon ? 'fixed' : 'dynamic'}
      mass={20}
      colliders="cuboid"
      linearDamping={0.8}
      angularDamping={0.8}
      restitution={0.3}
      friction={0.01}
      scale={1}
    >
      {objects.map((object, index) => (
        <primitive
          key={object.uuid}
          // eslint-disable-next-line react/no-unknown-property
          object={object}
          // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
          ref={(el: THREE.Mesh) => (meshRefs.current[index] = el)}
        />
      ))}
    </RigidBody>
  );
}
