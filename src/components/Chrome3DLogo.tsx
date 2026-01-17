"use client";

import { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three-stdlib";

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="111.59" height="161.48" viewBox="0 0 111.59 161.48">
  <g>
    <path d="M40.41,87.36c2.53,19.43,19.51,35.17,38.25,39.34,3.18.71,6.46,1.15,9.82,1.31.61.03,1.11.43,1.19.98l7.59,27.56c.28,1.93-4.83,4.49-6.77,4.33l-4.81.6c-1.08-.09-1.96-.91-2.11-1.99l-3.36-22.05c-.07-.49-.48-.87-1.01-.96-3.18-.55-6.28-1.32-9.28-2.28,0,0-.02,0-.03-.01l-7.72,20.73c-.44,1.18-1.68,1.86-2.91,1.6-1.96-.42-3.89-.92-5.79-1.49-1.15-.34-1.76-1.59-1.34-2.71l7.92-21.27c.17-.47-.03-.99-.47-1.22-2.1-1.11-4.13-2.34-6.06-3.67-.01,0-.03-.01-.04-.03l-17.43,18.99c-.74.81-1.96.95-2.88.34-1.63-1.09-3.22-2.24-4.76-3.45-.94-.74-1.05-2.12-.24-3l16.98-18.5c.36-.39.34-.99-.03-1.37-1.33-1.33-3.44-5.11-5.16-5.71-1.86-.65-5.57,2.22-7.24,3.07-5.66,2.89-11.32,5.77-16.97,8.66-.75.38-1.62.77-2.4.47-.61-.24-.99-.84-1.33-1.4-.77-1.27-1.54-2.54-2.3-3.81-.34-.56-.7-1.19-.58-1.84.15-.83.98-1.32,1.73-1.7,7.13-3.64,14.26-7.28,21.39-10.92.6-.3,1.23-.64,1.54-1.24.4-.77.13-1.7-.14-2.52-.89-2.7-1.79-5.41-2.68-8.11-8.79,1.69-17.57,3.38-26.36,5.07-.8.15-1.69.3-2.39-.12-.82-.48-1.08-1.53-1.27-2.46-.26-1.31-.52-2.63-.78-3.94-.15-.78-.3-1.61,0-2.34.54-1.31,2.18-1.69,3.58-1.88,8.61-1.22,17.22-2.44,25.83-3.66.16-3.4.31-6.79.47-10.19.02-.36.03-.75-.17-1.06-.26-.41-.79-.53-1.26-.62-8.15-1.54-16.3-3.09-24.44-4.63-.8-.15-1.72-.39-2.08-1.12-.24-.5-.15-1.09-.06-1.63.25-1.43.5-2.86.75-4.28.16-.89.36-1.86,1.08-2.41.82-.63,1.99-.45,3-.24,7.85,1.64,15.7,3.27,23.56,4.91.76.16,1.59.31,2.27-.07.53-.29.85-.85,1.15-1.39,1.39-2.55,2.69-5.14,3.89-7.78-7-4.25-14-8.5-21.01-12.75-.81-.49-1.71-1.11-1.84-2.05-.09-.71.29-1.39.66-2,.74-1.23,1.48-2.46,2.21-3.68.42-.7.93-1.46,1.73-1.6.67-.12,1.31.25,1.89.6,7.4,4.46,14.8,8.91,22.19,13.37,1.59-1.62,3.18-3.24,4.78-4.87-4.5-6.16-9-12.33-13.5-18.49-.36-.5-.74-1.04-.79-1.65-.07-1.02.76-1.84,1.53-2.51,1.8-1.58,4.18-3.26,6.38-2.32,1.05.45,1.77,1.4,2.45,2.32,3.61,4.9,7.22,9.81,10.83,14.71.37.5.81,1.04,1.42,1.11.46.05.89-.18,1.3-.41,1.75-.98,3.51-1.96,5.26-2.95.45-.25.93-.54,1.17-1,.3-.59.11-1.3-.09-1.93-2.2-7.19-4.4-14.38-6.59-21.58-.2-.64-.39-1.34-.19-1.98.22-.7.87-1.17,1.49-1.56,2.41-1.49,5.11-2.48,7.91-2.91,1.36-.21,2.96-.2,3.86.84.57.66.72,1.57.84,2.43,1.46,10.18,2.92,20.37,4.38,30.55.09.62.17,1.3-.17,1.83-.33.52-.96.74-1.54.93-19.38,6.53-34.88,25.72-34.22,46.59.04,1.37.15,2.73.33,4.09Z"/>
    <path d="M76.84,55.89c-11.67,4.41-18.53,16.88-16,29.09,3.21,15.53,19.41,24.44,34.23,18.84,11.68-4.4,18.54-16.89,16-29.09-3.19-15.51-19.4-24.44-34.23-18.84ZM97.54,78.73l-.58.26c-6.26,2.83-10.31,9.44-9.55,16.67-.11-1-.3-1.94-.57-2.89-1.7-5.85-6.51-10.23-12.37-11.48-.44-.08-.46-.09-.46-.09-1.5-.27-3.05-.36-4.65-.18,1-.09,1.94-.29,2.89-.56,7.48-2.17,12.55-9.46,11.73-17.48.11,1,.29,1.94.56,2.88,2.17,7.48,9.47,12.58,17.5,11.74-1.59.16-3.09.54-4.48,1.13Z"/>
  </g>
</svg>`;

function ChromeLogo({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const baseRotation = { x: 0.15, y: -0.3 };

  const geometry = useMemo(() => {
    const loader = new SVGLoader();
    const svgData = loader.parse(LOGO_SVG);
    const shapes: THREE.Shape[] = [];
    
    svgData.paths.forEach((path) => {
      const pathShapes = SVGLoader.createShapes(path);
      shapes.push(...pathShapes);
    });

    const extrudeSettings = {
      depth: 8,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 1.5,
      bevelOffset: 0,
      bevelSegments: 12,
    };

    const geo = new THREE.ExtrudeGeometry(shapes, extrudeSettings);
    geo.center();
    geo.computeVertexNormals();
    
    return geo;
  }, []);

  const chromeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#ffffff",
      metalness: 1,
      roughness: 0.35,
      envMapIntensity: 2,
    });
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      targetRotation.current.x = baseRotation.x + mousePosition.y * 0.4;
      targetRotation.current.y = baseRotation.y + mousePosition.x * 0.4;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotation.current.x,
        delta * 4
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotation.current.y,
        delta * 4
      );
    }
  });

  return (
    <group ref={meshRef} scale={0.022} rotation={[Math.PI + baseRotation.x, baseRotation.y, 0]}>
      <mesh geometry={geometry} material={chromeMaterial} />
    </group>
  );
}

function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <directionalLight position={[-10, -10, -5]} intensity={0.4} />
      <directionalLight position={[0, 10, 10]} intensity={0.8} color="#ffffff" />
      <pointLight position={[5, 5, 10]} intensity={0.6} color="#FF6B35" />
      <pointLight position={[-5, -5, 10]} intensity={0.4} color="#8888ff" />
      <Environment preset="sunset" background={false} blur={0.8} />
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