'use client';

import { useErrors } from 'apps/web/contexts/Errors';
import { useCallback, useRef, useEffect, useState, useMemo } from 'react';
import Card from 'apps/web/src/components/base-org/Card';
import Text from 'apps/web/src/components/base-org/typography/Text';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Canvas, useFrame } from '@react-three/fiber';
//import { EffectComposer, Bloom, SMAA } from '@react-three/postprocessing';
import { Environment, Lightformer, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

//import environmentLight from 'apps/web/src/components/ThreeHero/assets/environmentLight.jpg';
import modelToUse from 'apps/web/src/components/ThreeHero/assets/babylon_optimize_1.glb';

const blue = '#105eff';

type VideoCardProps = { title: string; description: string; scene: string };

export default function VideoCard({ title, description, scene }: VideoCardProps) {
  const playAnimation = () => {};
  return (
    <div onMouseEnter={playAnimation} className="w-full">
      <Card innerClassName="p-6 transition-all bg-[#0A0B0C] group-hover:bg-[#111111]">
        <div className="min-h-[12rem]">
          <Title level={TitleLevel.Headline} className="mb-4">
            {title}
          </Title>

          <Text className="text-[#e3e7e9]">{description}</Text>
        </div>
        <hr className="border-t border-white/20" />
        <ThreeCardScene scene={scene} />
      </Card>
    </div>
  );
}

function ThreeCardScene({ scene }: { scene: string }) {
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
    <div className="aspect-square" ref={containerRef}>
      <Canvas frameloop={isActive ? 'always' : 'never'} camera={{ position: [0, 0, 5] }}>
        {/*<EffectComposer multisampling={0} stencilBuffer={false}>
          <Bloom mipmapBlur luminanceThreshold={1} intensity={1.5} />
          <SMAA />
        </EffectComposer>*/}
        <EnvironmentSetup />
        <ambientLight intensity={1} />
        <directionalLight intensity={0.5} position={[0, 0, 10]} />
        <ThreeModel scene={scene} />
      </Canvas>
    </div>
  );
}

function EnvironmentSetup() {
  return (
    <Environment>
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

function ThreeModel({ scene }: { scene: string }) {
  const [over, setOver] = useState(false);
  const { nodes } = useGLTF(modelToUse);
  const groupRef = useRef<THREE.Group>();

  const geo = useMemo(() => {
    switch (scene) {
      case 'chain':
        return nodes.Boole.geometry;
      case 'globe':
        return nodes.Globe.geometry;
      case 'eth':
      default:
        return nodes.ETH.geometry;
    }
  }, []);

  useFrame(({ clock }) => {
    //if (groupRef.current) {
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime());
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      over ? -0.5 : 0,
      0.1,
    );
    //}
  });

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setOver(true)}
      onPointerLeave={() => setOver(false)}
    >
      <mesh geometry={geo} scale={2}>
        <meshPhysicalMaterial
          color="white"
          metalness={0.8}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}
