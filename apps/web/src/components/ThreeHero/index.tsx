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
  Noise,
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

const RotationContext = createContext<RotationContextType>({ rotationSpeed: 0 });

/* 
  The Main Scene
  - Keeps track of window focus, intersection observer
  - Listen to Mouse event for rotation context
  - Global setup such as gravity, dpr & Physics
*/
const dprSettings: Dpr = [1, 1.5];
const glSettings = { antialias: true };
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
          <Noise opacity={0.3} premultiply />
          <Vignette eskil={false} offset={0.01} darkness={0.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

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
  - Apply centrifugal force
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

  // Store initial properties
  const initialPropsRef = useRef<
    { position: THREE.Vector3; quaternion: THREE.Quaternion; scale: THREE.Vector3; size: number }[]
  >([]);

  // Store initial properties and calculate object size
  useEffect(() => {
    initialPropsRef.current = objects.map((object) => {
      const box = new THREE.Box3().setFromObject(object);
      const size = box.getSize(new THREE.Vector3()).length();
      return {
        position: object.position.clone(),
        quaternion: object.quaternion.clone(),
        scale: object.scale.clone(),
        size: size,
      };
    });

    objects.forEach((object, index) => {
      const initialProps = initialPropsRef.current[index];
      object.position.copy(initialProps.position);
      object.quaternion.copy(initialProps.quaternion);
      object.scale.copy(initialProps.scale);
    });
  }, [objects]);

  useFrame((state) => {
    const rigidBody = rigidBodyRef.current;
    console.log({ state });
    if (rigidBody && meshRefs.current.length > 0 && !isBaseIcon) {
      const time = state.clock.getElapsedTime();
      const currentPosition = rigidBody.translation();
      const currentRotation = rigidBodyRef.current.rotation();

      const objectSize = initialPropsRef.current[0].size;

      // Adjust forces based on object size
      const sizeAdjustment = Math.max(0.1, Math.min(objectSize, 1));

      // Convert Rapier Vector to Three.js Vector3
      const position = new THREE.Vector3(currentPosition.x, currentPosition.y, currentPosition.z);

      // Convert Rapier Rotation to Three.js Quaternion
      const rotation = new THREE.Quaternion(
        currentRotation.x,
        currentRotation.y,
        currentRotation.z,
        currentRotation.w,
      );

      // Floating motion
      const floatOffset = Math.sin(time + objects[0].position.x * 0.5) * 0.005 * sizeAdjustment;

      // Center attraction
      const towardsCenter = new THREE.Vector3(
        centerPosition.x - currentPosition.x,
        centerPosition.y - currentPosition.y,
        centerPosition.z - currentPosition.z,
      );
      const distanceToCenter = towardsCenter.length();
      const centerAttractionStrength = Math.min(distanceToCenter * 0.005, 0.05) * sizeAdjustment;

      const centerAttraction = towardsCenter.normalize().multiplyScalar(centerAttractionStrength);

      // Centrifugal force
      const centrifugalForceFactor = 0.005 * sizeAdjustment; // Further reduced and adjusted for size

      const centrifugalForce = new THREE.Vector3(currentPosition.x, 0, currentPosition.z)
        .normalize()
        .multiplyScalar(Math.abs(rotationSpeed) * centrifugalForceFactor);

      // Random movement
      const randomMovement = new THREE.Vector3(
        (Math.random() - 0.5) * 0.00005,
        (Math.random() - 0.5) * 0.00005,
        (Math.random() - 0.5) * 0.00005,
      );

      // Combine forces
      const totalForce = new THREE.Vector3()
        .addScaledVector(centerAttraction, 1)
        .addScaledVector(centrifugalForce, 1)
        .add(randomMovement);

      // Apply forces
      rigidBody.applyImpulse(totalForce, true);

      // Update position with floating effect
      rigidBody.setTranslation(
        {
          x: currentPosition.x,
          y: currentPosition.y + floatOffset,
          z: currentPosition.z,
        },
        true,
      );

      meshRefs.current.forEach((mesh, index) => {
        if (mesh) {
          const initialProps = initialPropsRef.current[index];

          // Apply physics position while preserving initial offset
          mesh.position.copy(position).add(initialProps.position);

          // Combine physics rotation with initial rotation
          mesh.quaternion.multiplyQuaternions(rotation, initialProps.quaternion);

          // Preserve initial scale
          mesh.scale.copy(initialProps.scale);

          // If it's a cursor, apply the specific offset to the second part
          if (isCursor && index === 1) {
            const offset = new THREE.Vector3(0, 0.1, 0);
            mesh.position.add(offset);
          }
        }
      });
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      type={isBaseIcon ? 'fixed' : 'dynamic'}
      mass={0.1}
      linearDamping={0.8}
      angularDamping={0.8}
      colliders="ball"
      restitution={0.3}
      friction={0.2}
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
