import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float } from '@react-three/drei/core/Float.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SRGBColorSpace, TextureLoader } from 'three';
import type { Group, Mesh } from 'three';

gsap.registerPlugin(ScrollTrigger);

type ImmersiveSceneProps = { 'client:idle'?: boolean };
type NavigatorConnection = Navigator & {
  connection?: EventTarget & { saveData?: boolean; effectiveType?: string };
};

function getStaticFallbackReason(): string | null {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'reduced-motion';

  const connection = (navigator as NavigatorConnection).connection;
  if (connection?.saveData) return 'save-data';
  if (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') return 'slow-connection';

  const probe = document.createElement('canvas');
  const context = probe.getContext('webgl2') ?? probe.getContext('webgl');
  if (!context) return 'webgl-unavailable';
  context.getExtension('WEBGL_lose_context')?.loseContext();
  return null;
}

function ProductImage({
  src,
  position,
  size,
  rotation = 0,
}: {
  src: string;
  position: [number, number, number];
  size: [number, number];
  rotation?: number;
}) {
  const texture = useLoader(TextureLoader, src);
  texture.colorSpace = SRGBColorSpace;

  return (
    <mesh position={position} rotation={[0, 0, rotation]}>
      <planeGeometry args={size} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.04} toneMapped={false} />
    </mesh>
  );
}

function SceneContent({ reducedMotion }: { reducedMotion: boolean }) {
  const sceneRef = useRef<Group>(null);
  const glowRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!reducedMotion && glowRef.current) {
      glowRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.12) * 0.025;
    }
  });

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tween = gsap.to(scene.rotation, {
      y: 0.16,
      x: -0.035,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <>
      <ambientLight intensity={1.6} />
      <directionalLight position={[-5, 6, 8]} intensity={2.2} color="#fff1df" />
      <pointLight position={[3, 1, 2]} intensity={22} distance={10} color="#ff6b00" />
      <group ref={sceneRef}>
        <mesh ref={glowRef} position={[0, 0, -1.7]}>
          <torusGeometry args={[2.45, 0.012, 8, 120]} />
          <meshBasicMaterial color="#ff6b00" transparent opacity={0.72} />
        </mesh>
        <mesh position={[0, 0, -1.8]}>
          <torusGeometry args={[2.8, 0.006, 6, 120]} />
          <meshBasicMaterial color="#dce8f8" transparent opacity={0.28} />
        </mesh>
        <Float speed={0.45} rotationIntensity={reducedMotion ? 0 : 0.025} floatIntensity={reducedMotion ? 0 : 0.11}>
          <ProductImage src="/hero/night-call.webp" position={[0, -0.15, 0]} size={[5.5, 4.65]} />
        </Float>
        <Float speed={0.35} rotationIntensity={reducedMotion ? 0 : 0.035} floatIntensity={reducedMotion ? 0 : 0.16}>
          <ProductImage src="/hero/object-phone.webp" position={[-2.65, 1.15, 0.45]} size={[1.45, 1.85]} rotation={-0.09} />
        </Float>
        <Float speed={0.4} rotationIntensity={reducedMotion ? 0 : 0.025} floatIntensity={reducedMotion ? 0 : 0.12}>
          <ProductImage src="/hero/object-calendar.webp" position={[2.65, -1.05, 0.35]} size={[1.75, 1.5]} rotation={0.06} />
        </Float>
        <ProductImage src="/hero/object-browser.webp" position={[2.7, 1.2, -0.2]} size={[1.8, 1.38]} rotation={0.05} />
      </group>
    </>
  );
}

export default function ImmersiveScene(_props: ImmersiveSceneProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fallbackReason, setFallbackReason] = useState<string | null>('checking-capabilities');
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5]);
  const canvasEnabled = fallbackReason === null;

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as NavigatorConnection).connection;
    const updateDpr = () => {
      setDpr([1, matchMedia('(max-width: 767px), (pointer: coarse)').matches ? 1.25 : 1.5]);
    };
    const updateMotionPreference = () => {
      const reduce = motionPreference.matches;
      setReducedMotion(reduce);
      updateDpr();
      setFallbackReason(getStaticFallbackReason());
    };
    updateMotionPreference();
    motionPreference.addEventListener('change', updateMotionPreference);
    connection?.addEventListener('change', updateMotionPreference);
    window.addEventListener('resize', updateDpr, { passive: true });

    const stage = stageRef.current;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    if (stage) observer.observe(stage);

    return () => {
      motionPreference.removeEventListener('change', updateMotionPreference);
      connection?.removeEventListener('change', updateMotionPreference);
      window.removeEventListener('resize', updateDpr);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!canvasEnabled) return;
    const canvas = stageRef.current?.querySelector('canvas');
    if (!canvas) return;
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setContextLost(true);
      setReady(false);
    };
    const handleContextRestored = () => {
      setContextLost(false);
      setReady(true);
    };
    canvas?.addEventListener('webglcontextlost', handleContextLost);
    canvas?.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      canvas?.removeEventListener('webglcontextlost', handleContextLost);
      canvas?.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [canvasEnabled]);

  return (
    <div
      ref={stageRef}
      className={`ih__scene${ready ? ' is-ready' : ''}`}
      data-fallback-reason={fallbackReason ?? undefined}
      aria-hidden="true"
    >
      <img className="ih__fallback" src="/hero/night-call.webp" alt="" />
      {canvasEnabled && (
        <Canvas
          camera={{ position: [0, 0, 8.8], fov: 36 }}
          dpr={dpr}
          frameloop={active && !reducedMotion && !contextLost ? 'always' : 'demand'}
          fallback={null}
          gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            setReady(true);
          }}
        >
          <SceneContent reducedMotion={reducedMotion} />
        </Canvas>
      )}
    </div>
  );
}
