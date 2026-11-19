/*
  One small 3D object for an inner page hero (cinematic upgrade, 2026-11-18): a ringing phone
  (after-hours answering), a calendar with a booked day (online booking) or a browser window (websites).
  Vanilla three.js, built from boxes like the home scene: no model files. Loaded lazily by PageHero.astro.
  It floats, tilts toward the pointer on desktop, turns a little with the scroll, and stops drawing
  when it is off screen or the tab is hidden.
*/
import {
  BoxGeometry,
  CylinderGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  TorusGeometry,
  WebGLRenderer,
  type BufferGeometry,
  type Material,
  type MeshStandardMaterialParameters,
} from 'three';

export type ObjectKind = 'phone' | 'calendar' | 'browser';
export interface ObjectScene {
  setPaused(paused: boolean): void;
  dispose(): void;
}

const NAVY = 0x1a2a47;
const NIGHT = 0x0a1929;
const ORANGE = 0xff6b00;
const WHITE = 0xf7f8fa;
const LINE = 0xd9dee8;

export async function mountObjectScene(opts: { canvas: HTMLCanvasElement; kind: ObjectKind; reduceMotion: boolean }): Promise<ObjectScene | null> {
  const { canvas, kind, reduceMotion } = opts;
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    return null; // No WebGL: the still picture stays.
  }
  const small = matchMedia('(max-width: 767px)').matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, small ? 1.5 : 2));
  renderer.shadowMap.enabled = false;

  const scene = new Scene();
  const camera = new PerspectiveCamera(28, 1, 0.1, 50);
  camera.position.set(0, 0.4, 11);
  camera.lookAt(0, 0, 0);
  scene.add(new HemisphereLight(0xdfe8ff, 0x1a2a47, 1.6));
  const key = new DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 6, 8);
  scene.add(key);
  const rim = new DirectionalLight(0xffb27a, 1.1);
  rim.position.set(-6, 2, -4);
  scene.add(rim);

  const disposables: { dispose(): void }[] = [];
  // Options go through the constructor: it turns hex numbers into Colors (Object.assign would not).
  const mat = (color: number, extra: MeshStandardMaterialParameters = {}) => {
    const m = new MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.05, ...extra });
    disposables.push(m);
    return m;
  };
  const obj = new Group();
  scene.add(obj);
  const add = (geo: BufferGeometry, m: Material, x = 0, y = 0, z = 0, parent: Group = obj) => {
    disposables.push(geo);
    const mesh = new Mesh(geo, m);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };
  const box = (w: number, h: number, d: number, m: Material, x = 0, y = 0, z = 0, parent: Group = obj) => add(new BoxGeometry(w, h, d), m, x, y, z, parent);

  const navy = mat(NAVY);
  const night = mat(NIGHT, { roughness: 0.3 });
  const white = mat(WHITE);
  const line = mat(LINE);
  const orange = mat(ORANGE, { emissive: ORANGE, emissiveIntensity: 0.35 });
  const glow = mat(ORANGE, { emissive: ORANGE, emissiveIntensity: 0.9, transparent: true, opacity: 0.8 });

  const rings: Mesh[] = [];
  if (kind === 'phone') {
    box(2.3, 4.5, 0.32, navy);
    box(2.02, 4.0, 0.05, night, 0, 0.05, 0.17);
    box(1.6, 0.55, 0.06, orange, 0, 0.9, 0.2); // incoming call banner
    box(1.1, 0.12, 0.06, white, 0, 0.3, 0.2);
    box(0.8, 0.12, 0.06, line, 0, 0.05, 0.2);
    add(new CylinderGeometry(0.32, 0.32, 0.08, 32), orange, -0.55, -1.25, 0.22).rotation.x = Math.PI / 2; // answer
    add(new CylinderGeometry(0.32, 0.32, 0.08, 32), mat(0x2e7d5b), 0.55, -1.25, 0.22).rotation.x = Math.PI / 2;
    for (let i = 0; i < 3; i++) {
      const r = add(new TorusGeometry(1.3 + i * 0.45, 0.035, 8, 64), glow, 0, 0.3, -0.2); // stays inside the frame at full swell
      rings.push(r);
    }
  } else if (kind === 'calendar') {
    box(4.6, 4.0, 0.3, white);
    box(4.6, 0.8, 0.34, navy, 0, 1.6, 0.02);
    for (const x of [-1.4, 1.4]) add(new CylinderGeometry(0.1, 0.1, 0.5, 12), line, x, 2.05, 0.1);
    for (let r = 0; r < 4; r++)
      for (let c = 0; c < 5; c++) {
        const booked = r === 2 && c === 3;
        const cell = box(0.66, 0.56, booked ? 0.32 : 0.12, booked ? orange : line, -1.68 + c * 0.84, 0.75 - r * 0.72, booked ? 0.3 : 0.18);
        if (booked) rings.push(cell);
      }
  } else {
    // A night-mode site in a browser window, in the home scene's colours: navy shell, white headline, orange button.
    const shell = mat(0x13233e, { roughness: 0.35 });
    const slate = mat(0x2b4470, { roughness: 0.4 });
    const dim = mat(0x4a5f84);
    box(5.4, 3.7, 0.24, shell);
    box(5.4, 0.5, 0.28, navy, 0, 1.6, 0.02);
    for (let i = 0; i < 3; i++) add(new CylinderGeometry(0.08, 0.08, 0.05, 16), i === 0 ? orange : dim, -2.4 + i * 0.3, 1.6, 0.18).rotation.x = Math.PI / 2;
    box(2.6, 0.32, 0.08, white, -1.1, 0.85, 0.15);
    box(2.2, 0.16, 0.06, dim, -1.3, 0.35, 0.14);
    box(2.2, 0.16, 0.06, dim, -1.3, 0.05, 0.14);
    const cta = box(1.4, 0.42, 0.16, orange, -1.7, -0.6, 0.2);
    rings.push(cta);
    box(1.9, 2.0, 0.1, slate, 1.45, -0.05, 0.15); // hero picture block
    box(0.9, 0.9, 0.12, glow, 1.45, -0.05, 0.2); // the picture's warm light
    box(1.5, 0.14, 0.06, dim, 1.45, -1.35, 0.14);
  }
  obj.rotation.set(-0.08, -0.35, 0);

  let width = 1;
  let height = 1;
  const resize = () => {
    const r = canvas.getBoundingClientRect();
    width = Math.max(1, Math.round(r.width));
    height = Math.max(1, Math.round(r.height));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Keep the object inside the box whatever its shape.
    const z = kind === 'browser' ? 9.6 : 11; // the wide browser window fills its frame a little more
    camera.position.z = width / height < 1 ? z / Math.max(0.55, width / height) : z;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  let px = 0;
  let py = 0;
  const fine = matchMedia('(pointer: fine)').matches;
  const onPointer = (e: PointerEvent) => {
    px = (e.clientX / innerWidth) * 2 - 1;
    py = (e.clientY / innerHeight) * 2 - 1;
  };
  if (fine && !reduceMotion) addEventListener('pointermove', onPointer, { passive: true });

  let raf = 0;
  let paused = false;
  let visible = true;
  let t = 0;
  let last = 0;
  let tiltX = 0;
  let tiltY = 0;
  const draw = () => renderer.render(scene, camera);
  const frame = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;
    t += dt;
    const k = 1 - Math.exp(-dt * 4);
    tiltX += (py * 0.18 - tiltX) * k;
    tiltY += (px * 0.32 - tiltY) * k;
    const scroll = Math.min(1, scrollY / Math.max(1, innerHeight));
    obj.rotation.x = -0.08 + tiltX + scroll * 0.12;
    obj.rotation.y = -0.35 + tiltY + Math.sin(t * 0.5) * 0.08 + scroll * 0.5;
    obj.position.y = Math.sin(t * 1.1) * 0.12;
    rings.forEach((r, i) => {
      if (kind === 'phone') {
        const s = 1 + ((t * 0.6 + i / 3) % 1) * 0.25;
        r.scale.setScalar(s);
        ((r.material as MeshStandardMaterial).opacity = 0.8 * (1 - ((t * 0.6 + i / 3) % 1)));
      } else r.position.z = (kind === 'calendar' ? 0.3 : 0.2) + Math.max(0, Math.sin(t * 2)) * 0.12;
    });
    draw();
    raf = running() ? requestAnimationFrame(frame) : 0;
  };
  const running = () => !reduceMotion && !paused && visible && !document.hidden;
  const kick = () => {
    if (!raf && running()) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  };
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    kick();
  });
  io.observe(canvas);
  const onVis = () => kick();
  document.addEventListener('visibilitychange', onVis);

  await renderer.compileAsync(scene, camera).catch(() => {});
  draw();
  kick();

  return {
    setPaused(p) {
      paused = p;
      kick();
    },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVis);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    },
  };
}
