/* eslint-disable react/no-unknown-property */
'use client';

import { useGLTF, Center } from '@react-three/drei';
import { MeshProps, Vector3, Euler, useLoader } from '@react-three/fiber';

import * as THREE from 'three';
import { SVGLoader, SVGResult } from 'three-stdlib';
import { PhysicsMesh } from './index';

/* glbs */
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

/* svgs */
import lightningSVG from './assets/lightning.svg';
import { useMemo } from 'react';
import { ExtrudeGeometryOptions } from 'three';

/* load draco locally (v1.5.7) */
useGLTF.setDecoderPath('draco/');

/* Constants */
export const blue = '#105eff';
const blackColor = new THREE.Color(0.08, 0.08, 0.08);

/* Models */
export function BlackMaterial() {
  return <meshPhysicalMaterial color={blackColor} metalness={0.5} roughness={0.5} />;
}

export function MetalMaterial() {
  return <meshPhysicalMaterial color="white" metalness={0.8} roughness={0.3} />;
}

export function BaseLogoModel() {
  const { nodes } = useGLTF(logoModel);
  const model = nodes.Base_Logo as THREE.Mesh;

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
  const extrudeArguments: [shapes: THREE.Shape[], options: ExtrudeGeometryOptions] = useMemo(
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
  const model = nodes.Controller as THREE.Mesh;
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
  const model = nodes.ETH as THREE.Mesh;
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
  const model = nodes.Globe as THREE.Mesh;

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
  const model = nodes.Cylinder as THREE.Mesh;
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
  const model = nodes.Headphones as THREE.Mesh;
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
  const model = nodes.Spikey as THREE.Mesh;
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
  const model = nodes.Play as THREE.Mesh;
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
  const model = nodes.Object_02 as THREE.Mesh;
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
  const cursor = nodes.Cursor as THREE.Mesh;
  const cursor1 = nodes.Cursor1 as THREE.Mesh;
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
