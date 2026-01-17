"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function ChromeLogo({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (meshRef.current) {
      targetRotation.current.x = mousePosition.y * 0.3;
      targetRotation.current.y = mousePosition.x * 0.3;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotation.current.x,
        delta * 3
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotation.current.y,
        delta * 3
      );
    }
  });

  return (
    <group ref={meshRef} scale={1.8}>
      <RoundedBox args={[2, 2, 0.4]} radius={0.2} smoothness={4}>
        <meshStandardMaterial
          color="#ffffff"
          metalness={1}
          roughness={0.05}
          envMapIntensity={2}
        />
      </RoundedBox>
      
      <mesh position={[0, 0, 0.25]}>
        <cylinderGeometry args={[0.25, 0.25, 0.15, 32]} />
        <meshStandardMaterial
          color="#FF6B35"
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>

      <mesh position={[0, 0.55, 0.22]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial
          color="#FF6B35"
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>

      <mesh position={[0, -0.55, 0.22]}>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial
          color="#FF6B35"
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>

      <mesh position={[0.55, 0, 0.22]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial
          color="#FF6B35"
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>

      <mesh position={[-0.55, 0, 0.22]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial
          color="#FF6B35"
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>
    </group>
  );
}

function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      <pointLight position={[0, 0, 4]} intensity={0.5} color="#FF6B35" />
      <Environment preset="studio" />
      <ChromeLogo mousePosition={mousePosition} />
    </>
  );
}

export function Chrome3DLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);
        
        setMousePosition({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] cursor-pointer"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene mousePosition={mousePosition} />
        </Suspense>
      </Canvas>
    </div>
  );
}
