"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { StarBorderButton, SecondaryButton } from "./StarBorderButton";
import { ArrowRight, Play } from "lucide-react";

function Interactive3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    class Sphere {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      radius: number;
      color: string;
      speed: number;
      phase: number;

      constructor(x: number, y: number, z: number, radius: number, color: string) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = radius;
        this.color = color;
        this.speed = 0.5 + Math.random() * 0.5;
        this.phase = Math.random() * Math.PI * 2;
      }

      update(time: number, mouseX: number, mouseY: number) {
        const floatY = Math.sin(time * 0.001 * this.speed + this.phase) * 30;
        const floatX = Math.cos(time * 0.0008 * this.speed + this.phase) * 20;
        
        const mouseInfluenceX = (mouseX - 0.5) * 100 * (1 - this.z / 1000);
        const mouseInfluenceY = (mouseY - 0.5) * 100 * (1 - this.z / 1000);
        
        this.x = this.baseX + floatX + mouseInfluenceX;
        this.y = this.baseY + floatY + mouseInfluenceY;
      }

      draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        const scale = 1000 / (1000 + this.z);
        const screenX = this.x * scale + width / 2 * (1 - scale);
        const screenY = this.y * scale + height / 2 * (1 - scale);
        const screenRadius = this.radius * scale;

        const gradient = ctx.createRadialGradient(
          screenX - screenRadius * 0.3,
          screenY - screenRadius * 0.3,
          0,
          screenX,
          screenY,
          screenRadius
        );

        if (this.color === "orange") {
          gradient.addColorStop(0, "rgba(255, 143, 102, 0.9)");
          gradient.addColorStop(0.5, "rgba(255, 107, 53, 0.7)");
          gradient.addColorStop(1, "rgba(255, 107, 53, 0)");
        } else if (this.color === "white") {
          gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
          gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.4)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        } else {
          gradient.addColorStop(0, "rgba(26, 26, 26, 0.6)");
          gradient.addColorStop(0.5, "rgba(26, 26, 26, 0.3)");
          gradient.addColorStop(1, "rgba(26, 26, 26, 0)");
        }

        ctx.beginPath();
        ctx.arc(screenX, screenY, screenRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    const spheres: Sphere[] = [
      new Sphere(width * 0.15, height * 0.3, 200, 180, "orange"),
      new Sphere(width * 0.85, height * 0.25, 300, 150, "orange"),
      new Sphere(width * 0.75, height * 0.7, 100, 200, "orange"),
      new Sphere(width * 0.2, height * 0.75, 250, 120, "white"),
      new Sphere(width * 0.5, height * 0.15, 400, 100, "white"),
      new Sphere(width * 0.9, height * 0.5, 350, 80, "dark"),
      new Sphere(width * 0.1, height * 0.5, 150, 90, "dark"),
      new Sphere(width * 0.6, height * 0.85, 200, 110, "orange"),
    ];

    const drawGrid = () => {
      const gridSize = 60;
      const perspective = 800;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      ctx.strokeStyle = "rgba(255, 107, 53, 0.08)";
      ctx.lineWidth = 1;

      for (let x = 0; x < width + gridSize; x += gridSize) {
        const offsetX = (mouseX - 0.5) * 30;
        ctx.beginPath();
        ctx.moveTo(x + offsetX, 0);
        ctx.lineTo(x - offsetX, height);
        ctx.stroke();
      }

      for (let y = 0; y < height + gridSize; y += gridSize) {
        const offsetY = (mouseY - 0.5) * 30;
        ctx.beginPath();
        ctx.moveTo(0, y + offsetY);
        ctx.lineTo(width, y - offsetY);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const bgGradient = ctx.createRadialGradient(
        width * mouseRef.current.x,
        height * mouseRef.current.y,
        0,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      bgGradient.addColorStop(0, "rgba(255, 107, 53, 0.05)");
      bgGradient.addColorStop(0.5, "rgba(250, 250, 248, 0)");
      bgGradient.addColorStop(1, "rgba(250, 250, 248, 0)");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      drawGrid();

      spheres.sort((a, b) => b.z - a.z);
      spheres.forEach((sphere) => {
        sphere.update(time, mouseRef.current.x, mouseRef.current.y);
        sphere.draw(ctx, width, height);
      });

      time++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    />
  );
}

function Floating3DCard({ delay = 0 }: { delay?: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const variants = [
    { bg: "#FFFFFF", fg: "#1A1A1A" },
    { bg: "#1A1A1A", fg: "#FFFFFF" },
    { bg: "#FF6B35", fg: "#FFFFFF" },
    { bg: "#F5F5F3", fg: "#1A1A1A" },
    { bg: "linear-gradient(135deg, #FF6B35, #FF8F66)", fg: "#FFFFFF" },
    { bg: "#2D2D2D", fg: "#FF6B35" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: delay + 0.5, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="relative"
    >
      <div
        className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-[#E5E5E3] shadow-2xl shadow-black/10"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27CA3F]" />
          <span className="ml-2 text-xs text-[#737373] font-medium">Logotyps Plugin</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {variants.map((v, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: delay + 0.8 + i * 0.1 }}
              className="w-14 h-14 rounded-lg flex items-center justify-center"
              style={{ background: v.bg }}
            >
              <svg viewBox="0 0 40 40" className="w-7 h-7" fill={v.fg}>
                <circle cx="20" cy="20" r="5" />
                <path d="M20 8 L21 13 L20 12 L19 13 Z" />
                <path d="M20 32 L21 27 L20 28 L19 27 Z" />
              </svg>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-[#737373]">6 variations</span>
          <motion.div
            className="w-16 h-1 rounded-full bg-[#E5E5E3] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 1.2 }}
          >
            <motion.div
              className="h-full bg-[#FF6B35] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: delay + 1.3 }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#FAFAF8]" />
      <Interactive3DBackground />

      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/logotyps-horizontal-resized-1768677535430.webp?width=8000&height=8000&resize=contain"
              alt="Logotyps"
              className="h-8"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-6"
          >
            <a href="#pricing" className="text-sm font-medium hover:text-[#FF6B35] transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-[#FF6B35] transition-colors">
              FAQ
            </a>
            <SecondaryButton className="text-sm px-5 py-2.5">Get Started</SecondaryButton>
          </motion.div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#E5E5E3] text-sm">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse" />
              Adobe Illustrator Plugin
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight mb-6 leading-[1.05]"
          >
            Generate all your{" "}
            <span className="text-gradient-orange">logo variations</span> in seconds
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-[#737373] mb-10 leading-relaxed max-w-lg"
          >
            Stop wasting hours creating logo variations manually. Logotyps automatically generates
            colors, backgrounds, formats, and exports — all from a single design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <StarBorderButton>
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </StarBorderButton>
            <SecondaryButton className="gap-2">
              <Play className="w-4 h-4" /> Watch Demo
            </SecondaryButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex items-center gap-8"
          >
            <div>
              <div className="text-3xl font-normal text-[#1A1A1A]">150+</div>
              <div className="text-sm text-[#737373]">Variations per logo</div>
            </div>
            <div className="w-px h-10 bg-[#E5E5E3]" />
            <div>
              <div className="text-3xl font-normal text-[#1A1A1A]">&lt;30s</div>
              <div className="text-sm text-[#737373]">Generation time</div>
            </div>
            <div className="w-px h-10 bg-[#E5E5E3]" />
            <div>
              <div className="text-3xl font-normal text-[#1A1A1A]">7</div>
              <div className="text-sm text-[#737373]">Export formats</div>
            </div>
          </motion.div>
        </div>

        <div className="relative flex items-center justify-center lg:justify-end">
          <div style={{ perspective: "1000px" }}>
            <Floating3DCard delay={0} />
          </div>
          <motion.div
            className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#FF6B35]/20 to-transparent blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-bl from-[#FF6B35]/15 to-transparent blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-[#1A1A1A]/20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-[#FF6B35]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
