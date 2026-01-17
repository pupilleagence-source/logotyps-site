"use client";

import { useEffect, useRef } from "react";

export function RippleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const gridSize = 40;
    const dotRadius = 1.5;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;

          const dx = x - centerX;
          const dy = y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const wave = Math.sin(distance * 0.015 - time * 0.03) * 0.5 + 0.5;
          const opacity = 0.1 + wave * 0.25;

          const offsetX = Math.sin(distance * 0.01 - time * 0.02) * 3;
          const offsetY = Math.cos(distance * 0.01 - time * 0.02) * 3;

          ctx.beginPath();
          ctx.arc(x + offsetX, y + offsetY, dotRadius + wave * 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 107, 53, ${opacity})`;
          ctx.fill();
        }
      }

      time++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
