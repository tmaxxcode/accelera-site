/*
  The home hero's 3D scene: a snowy Twin Cities house at night. Three beats:
    0  2:14 a.m.  the window lights up and the phone rings
    1  2:19 a.m.  the call is answered and the job is booked
    2  7:30 a.m.  sunrise, the van is at the house
  Vanilla three.js on purpose (no React runtime). Loaded lazily by SceneHero.astro, so it never
  blocks the headline or the buttons. Everything is built from boxes and cones: no model files.
  All scene data is an example, labeled as one in the page.
*/
import {
  ACESFilmicToneMapping,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  ExtrudeGeometry,
  Group,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  Shape,
  SphereGeometry,
  TorusGeometry,
  Vector3,
  WebGLRenderer,
  type Material,
} from 'three';

export interface NightScene {
  setBeat(beat: number): void;
  setPaused(paused: boolean): void;
  dispose(): void;
}

interface Options {
  canvas: HTMLCanvasElement;
  /* Box the canvas fills (the whole hero); also holds the [data-anchor] label chips. */
  stage: HTMLElement;
  /* The part of the stage the lot should sit in (right column on wide screens, under the copy on phones). */
  fit: HTMLElement;
  reduceMotion: boolean;
  onReady?: () => void;
}

const NAVY = 0x0a1929;
const NAVY_2 = 0x1a2a47;
const ORANGE = 0xff6b00;
const SNOW = 0xeaf1ff;

/* What each beat asks the scene to be. Values ease toward these, so beats can be interrupted. */
const BEATS = [
  { dawn: 0, lit: 1, ring: 1, booked: 0, phone: 1, van: 0 },
  { dawn: 0, lit: 1, ring: 0, booked: 1, phone: 1, van: 0 },
  { dawn: 1, lit: 0.12, ring: 0, booked: 0, phone: 0, van: 1 },
];
type State = (typeof BEATS)[number];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

function glowTexture(inner: string, outer: string, core = 0.18): CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, inner);
  grad.addColorStop(core, inner);
  grad.addColorStop(core + 0.04, outer);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return new CanvasTexture(c);
}

/* Lets the browser handle input between the build steps: several short tasks instead of one long one. */
const breathe = () => new Promise<void>((r) => setTimeout(r, 0));

export async function mountNightScene({ canvas, stage, fit, reduceMotion, onReady }: Options): Promise<NightScene | null> {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    return null; // No WebGL: the still picture stays.
  }
  const small = matchMedia('(max-width: 767px)').matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, small ? 1.5 : 2));
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  await breathe();

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 120);
  const target = new Vector3(0, 1.7, 0);
  const world = new Group(); // everything the visitor can turn
  scene.add(world);

  const disposables: { dispose(): void }[] = [];
  const std = (color: number, extra: Partial<MeshStandardMaterial> = {}) => {
    const m = new MeshStandardMaterial({ color, roughness: 0.92, metalness: 0, flatShading: true });
    Object.assign(m, extra);
    disposables.push(m);
    return m;
  };
  const mesh = (geo: BufferGeometry, material: Material | Material[], x = 0, y = 0, z = 0, parent: Object3D = world) => {
    disposables.push(geo);
    const m = new Mesh(geo, material);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  };
  const box = (w: number, h: number, d: number, material: Material, x = 0, y = 0, z = 0, parent: Object3D = world) =>
    mesh(new BoxGeometry(w, h, d), material, x, y, z, parent);

  /* ---------- Materials ---------- */
  const snow = std(SNOW, { roughness: 1 });
  const wall = std(0xd6deea);
  const trim = std(0xf6f8fc);
  const roofSnow = std(0xf4f7ff, { roughness: 1 });
  const dark = std(0x16233b);
  const road = std(0x202d45, { roughness: 1 });
  const pine = std(0x1c4a48);
  const trunk = std(0x3d2f2a);
  const orange = std(ORANGE, { roughness: 0.6 });
  const glass = std(NAVY_2, { emissive: new Color(0xffb14a), emissiveIntensity: 0, roughness: 0.4 });
  const lampGlow = std(0xfff1d6, { emissive: new Color(0xffd9a0), emissiveIntensity: 2 });

  /* ---------- Ground: a round snowy lot ---------- */
  const island = mesh(new CylinderGeometry(9, 8.5, 0.9, 56), [std(0x2a4276, { roughness: 1 }), snow, dark], 0, -0.45, 0);
  island.castShadow = false;
  // Drifts
  [
    [-5.2, -3.4, 2.2, 0.5],
    [4.8, -4.2, 1.9, 0.42],
    [5.6, 1.2, 1.5, 0.3],
    [-6.2, 1.4, 1.3, 0.28],
  ].forEach(([x, z, r, h]) => {
    const d = mesh(new SphereGeometry(r, 14, 8), snow, x, 0, z);
    d.scale.y = h / r;
    d.castShadow = false;
  });
  const street = box(13.2, 0.05, 1.9, road, 0, 0.025, 4.9);
  street.castShadow = false;
  const path = box(0.8, 0.04, 2.3, road, -0.1, 0.02, 2.75);
  path.castShadow = false;

  /* ---------- House ---------- */
  const house = new Group();
  house.position.set(0.6, 0, -0.6);
  world.add(house);
  const W = 3.5;
  const H = 2.15;
  const D = 2.9;
  box(W, H, D, wall, 0, H / 2, 0, house);
  box(W + 0.12, 0.16, D + 0.12, dark, 0, 0.08, 0, house); // footing
  // Front-gable roof: the triangle faces the street, the slopes carry the snow.
  const tri = new Shape();
  tri.moveTo(-W / 2 - 0.3, 0);
  tri.lineTo(W / 2 + 0.3, 0);
  tri.lineTo(0, 1.55);
  tri.closePath();
  const roofGeo = new ExtrudeGeometry(tri, { depth: D + 0.5, bevelEnabled: false });
  roofGeo.translate(0, 0, -(D + 0.5) / 2);
  mesh(roofGeo, [wall, roofSnow], 0, H, 0, house);
  box(0.52, 1.15, 0.52, std(0x8f5a45), 1.0, H + 0.95, -0.5, house); // chimney
  box(0.64, 0.12, 0.64, roofSnow, 1.0, H + 1.56, -0.5, house);
  // Door and step
  const fz = D / 2;
  box(0.86, 1.45, 0.06, trim, -0.7, 0.78, fz + 0.02, house);
  box(0.7, 1.32, 0.08, orange, -0.7, 0.74, fz + 0.05, house);
  box(1.1, 0.12, 0.5, trim, -0.7, 0.06, fz + 0.3, house);
  // Windows (front, side, attic)
  box(1.06, 0.96, 0.06, trim, 0.78, 1.18, fz + 0.02, house);
  box(0.9, 0.8, 0.08, glass, 0.78, 1.18, fz + 0.04, house);
  box(0.05, 0.8, 0.1, trim, 0.78, 1.18, fz + 0.05, house);
  box(0.06, 0.96, 1.06, trim, W / 2 + 0.02, 1.18, 0.1, house);
  box(0.08, 0.8, 0.9, glass, W / 2 + 0.04, 1.18, 0.1, house);
  const attic = mesh(new CylinderGeometry(0.26, 0.26, 0.08, 20), glass, 0, H + 0.62, fz + 0.27, house);
  attic.rotation.x = Math.PI / 2;
  // Warm light spilling from the front window onto the snow
  const windowLight = new PointLight(0xffa850, 0, 9, 1.6);
  windowLight.position.set(0.78, 1.1, fz + 0.9);
  house.add(windowLight);

  await breathe();

  /* ---------- Yard ---------- */
  const tree = (x: number, z: number, s: number) => {
    const g = new Group();
    g.position.set(x, 0, z);
    g.scale.setScalar(s);
    world.add(g);
    mesh(new CylinderGeometry(0.14, 0.18, 0.7, 7), trunk, 0, 0.35, 0, g);
    [
      [1.15, 1.5, 1.2],
      [0.9, 1.3, 2.0],
      [0.62, 1.15, 2.75],
    ].forEach(([r, h, y]) => {
      mesh(new ConeGeometry(r, h, 8), pine, 0, y, 0, g);
      mesh(new ConeGeometry(r * 0.62, h * 0.52, 8), roofSnow, 0, y + h * 0.26, 0, g);
    });
  };
  tree(-4.6, -1.6, 1.25);
  tree(-3.1, -3.9, 0.95);
  tree(4.7, -2.3, 1.1);
  tree(-6.3, -0.2, 0.7);
  // Street lamp
  mesh(new CylinderGeometry(0.05, 0.07, 2.9, 8), dark, -4.1, 1.45, 3.55);
  box(0.6, 0.06, 0.06, dark, -3.85, 2.9, 3.55);
  mesh(new SphereGeometry(0.16, 12, 8), lampGlow, -3.6, 2.82, 3.55).castShadow = false;
  const lamp = new PointLight(0xffdcae, 0, 8, 1.7);
  lamp.position.set(-3.6, 2.7, 3.55);
  world.add(lamp);
  // Snowman
  const sm = new Group();
  sm.position.set(3.6, 0, 2.3);
  world.add(sm);
  mesh(new SphereGeometry(0.42, 12, 9), roofSnow, 0, 0.36, 0, sm);
  mesh(new SphereGeometry(0.3, 12, 9), roofSnow, 0, 0.92, 0, sm);
  mesh(new SphereGeometry(0.21, 12, 9), roofSnow, 0, 1.33, 0, sm);
  const nose = mesh(new ConeGeometry(0.045, 0.24, 6), orange, 0, 1.34, 0.28, sm);
  nose.rotation.x = Math.PI / 2;
  sm.rotation.y = 0.5;

  /* ---------- Work van (arrives at sunrise) ---------- */
  const van = new Group();
  van.position.set(-5.6, 0, 4.9);
  van.visible = false;
  world.add(van);
  const vanMats: MeshStandardMaterial[] = [];
  const vm = (color: number, extra: Partial<MeshStandardMaterial> = {}) => {
    const m = std(color, { transparent: true, opacity: 0, ...extra });
    vanMats.push(m);
    return m;
  };
  const vWhite = vm(0xf4f6fa, { roughness: 0.55 });
  const vDark = vm(0x111a2c, { roughness: 0.5 });
  const vOrange = vm(ORANGE, { roughness: 0.55 });
  const vLight = vm(0xfff3d0, { emissive: new Color(0xffe2a8), emissiveIntensity: 1.6 });
  box(2.35, 1.2, 1.08, vWhite, -0.2, 0.92, 0, van); // cargo
  box(0.82, 0.92, 1.04, vWhite, 1.36, 0.78, 0, van); // cab
  box(0.42, 0.5, 1.0, vWhite, 1.96, 0.57, 0, van); // hood
  box(2.37, 0.17, 1.1, vOrange, -0.2, 0.66, 0, van); // stripe
  box(0.84, 0.17, 1.06, vOrange, 1.36, 0.66, 0, van);
  box(0.05, 0.4, 0.88, vDark, 1.78, 1.0, 0, van); // windshield
  box(0.5, 0.36, 1.06, vDark, 1.42, 1.0, 0, van); // side glass
  box(0.04, 0.1, 0.2, vLight, 2.18, 0.6, 0.33, van);
  box(0.04, 0.1, 0.2, vLight, 2.18, 0.6, -0.33, van);
  box(0.1, 0.12, 1.04, vDark, 2.16, 0.36, 0, van); // bumper
  [-0.95, 1.5].forEach((x) =>
    [-0.5, 0.5].forEach((z) => {
      const w = mesh(new CylinderGeometry(0.28, 0.28, 0.2, 14), vDark, x, 0.28, z, van);
      w.rotation.x = Math.PI / 2;
    }),
  );
  // Ladder on the roof: the trade cue
  box(2.0, 0.05, 0.05, vOrange, -0.2, 1.6, 0.22, van);
  box(2.0, 0.05, 0.05, vOrange, -0.2, 1.6, -0.22, van);
  [-0.9, -0.2, 0.5].forEach((x) => box(0.05, 0.05, 0.44, vOrange, x, 1.6, 0, van));
  box(0.06, 0.1, 0.06, vDark, -0.9, 1.55, 0.22, van);
  box(0.06, 0.1, 0.06, vDark, 0.5, 1.55, -0.22, van);

  await breathe();

  /* ---------- The phone above the house (always faces the camera) ---------- */
  const phoneAnchor = new Object3D();
  phoneAnchor.position.set(0.6, 5.3, -0.6);
  world.add(phoneAnchor);
  const vanAnchor = new Object3D();
  vanAnchor.position.set(0, 2.25, 0);
  van.add(vanAnchor);
  const phone = new Group();
  scene.add(phone);
  const phoneBody = std(NAVY_2, { roughness: 0.4, flatShading: false });
  const phoneScreen = new MeshBasicMaterial({ color: ORANGE, transparent: true, toneMapped: false });
  const checkMat = new MeshBasicMaterial({ color: NAVY, transparent: true, toneMapped: false });
  const ringMat = [0, 1, 2].map(() => new MeshBasicMaterial({ color: ORANGE, transparent: true, opacity: 0, depthWrite: false, toneMapped: false }));
  disposables.push(phoneScreen, checkMat, ...ringMat);
  const pb = box(0.7, 1.22, 0.1, phoneBody, 0, 0, 0, phone);
  pb.castShadow = false;
  const ps = box(0.58, 1.04, 0.02, phoneScreen, 0, 0, 0.06, phone);
  ps.castShadow = false;
  const check = new Group();
  check.position.set(-0.02, -0.06, 0.08);
  phone.add(check);
  const c1 = box(0.09, 0.26, 0.02, checkMat, -0.13, -0.02, 0, check);
  c1.rotation.z = Math.PI / 4;
  const c2 = box(0.09, 0.46, 0.02, checkMat, 0.07, 0.06, 0, check);
  c2.rotation.z = -Math.PI / 4;
  c1.castShadow = c2.castShadow = false;
  const ringGeo = new TorusGeometry(1, 0.022, 8, 56);
  disposables.push(ringGeo);
  const rings = ringMat.map((m) => {
    const r = new Mesh(ringGeo, m);
    phone.add(r);
    return r;
  });

  /* ---------- Snowfall (the stars, moon and sunrise are CSS in SceneHero.astro) ---------- */
  const dot = glowTexture('rgba(255,255,255,1)', 'rgba(255,255,255,0.35)', 0.3);
  disposables.push(dot);
  const flakeCount = small ? 190 : 340;
  const flakePos = new Float32Array(flakeCount * 3);
  const flakeSeed = new Float32Array(flakeCount);
  for (let i = 0; i < flakeCount; i++) {
    const a = (i * 2.399963) % (Math.PI * 2);
    const r = Math.sqrt(((i * 0.754877) % 1) * 0.98 + 0.02) * 9.5;
    flakePos[i * 3] = Math.cos(a) * r;
    flakePos[i * 3 + 1] = ((i * 0.569840) % 1) * 9;
    flakePos[i * 3 + 2] = Math.sin(a) * r;
    flakeSeed[i] = (i * 0.324718) % 1;
  }
  const flakeGeo = new BufferGeometry();
  flakeGeo.setAttribute('position', new BufferAttribute(flakePos, 3));
  const flakeMat = new PointsMaterial({ map: dot, color: 0xffffff, size: 0.13, transparent: true, opacity: 0.9, depthWrite: false });
  disposables.push(flakeGeo, flakeMat);
  world.add(new Points(flakeGeo, flakeMat));

  /* ---------- Lights ---------- */
  const hemi = new HemisphereLight(0x5b78c4, 0x0a1220, 1.0);
  scene.add(hemi);
  const key = new DirectionalLight(0xa9c0ff, 1.5); // moon at night, sun at dawn
  key.castShadow = true;
  const sm2 = small ? 1024 : 2048;
  key.shadow.mapSize.set(sm2, sm2);
  key.shadow.camera.left = key.shadow.camera.bottom = -11;
  key.shadow.camera.right = key.shadow.camera.top = 11;
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 50;
  key.shadow.bias = -0.0006;
  key.shadow.normalBias = 0.03;
  // The lot never moves (the camera circles it), so shadows are redrawn only while the light or the van moves.
  key.shadow.autoUpdate = false;
  let shadowFrames = 3;
  world.add(key);
  world.add(key.target);

  const cHemiSkyN = new Color(0x5b78c4);
  const cHemiSkyD = new Color(0xffe6d6);
  const cHemiGndN = new Color(0x0a1220);
  const cHemiGndD = new Color(0x4a587a);
  const cKeyN = new Color(0xa9c0ff);
  const cKeyD = new Color(0xffb27a);
  const cScreenRing = new Color(ORANGE);
  const cScreenDone = new Color(0xffffff);

  /* ---------- State ---------- */
  const s: State = { dawn: 0, lit: 0, ring: 0, booked: 0, phone: 0, van: 0 };
  let goal: State = BEATS[0];
  let yaw = 0; // visitor's turn
  let yawVel = 0;
  let px = 0; // pointer parallax, -1..1
  let py = 0;
  let dragging = false;
  let lastX = 0;
  let t = 0;
  let raf = 0;
  let paused = false;
  let visible = true;
  let ready = false;
  let disposed = false;
  let started = false; // no frame is drawn until the shaders have compiled off the main thread
  const labels = [...stage.querySelectorAll<HTMLElement>('[data-anchor]')];
  const anchors: Record<string, Object3D> = { phone: phoneAnchor, van: vanAnchor };
  const v = new Vector3();
  let width = 1;
  let height = 1;
  let dist = 30;

  function apply() {
    const d = s.dawn;
    // Light: cool moonlight swings round and warms into a low sun
    hemi.color.lerpColors(cHemiSkyN, cHemiSkyD, d);
    hemi.groundColor.lerpColors(cHemiGndN, cHemiGndD, d);
    hemi.intensity = lerp(0.95, 2.15, d);
    key.color.lerpColors(cKeyN, cKeyD, d);
    key.intensity = lerp(1.5, 2.6, d);
    key.position.set(lerp(-5, -10, d), lerp(11, 4.6, d), lerp(6, 1.5, d));
    lamp.intensity = (1 - d) * 16;
    glass.emissiveIntensity = s.lit * 2.4;
    windowLight.intensity = s.lit * 26;
    flakeMat.opacity = lerp(0.9, 0.55, d);
    // Phone
    const ph = s.phone;
    phone.visible = ph > 0.01;
    phone.scale.setScalar(lerp(1, 1.7, ph));
    phoneBody.opacity = ph;
    phoneBody.transparent = ph < 0.99;
    phoneScreen.opacity = ph;
    phoneScreen.color.lerpColors(cScreenRing, cScreenDone, s.booked);
    check.scale.setScalar(s.booked);
    checkMat.opacity = s.booked * ph;
    // Van
    van.visible = s.van > 0.01;
    const vo = clamp(s.van * 2.2, 0, 1);
    vanMats.forEach((m) => {
      m.opacity = vo;
      m.transparent = vo < 0.99;
    });
    van.position.x = lerp(-5.6, 0.25, s.van);
  }

  function frame(dt: number) {
    t += dt;
    const k = reduceMotion ? 1 : 1 - Math.exp(-dt * 2.6);
    const kSlow = reduceMotion ? 1 : 1 - Math.exp(-dt * 1.35);
    s.dawn += (goal.dawn - s.dawn) * kSlow;
    s.van += (goal.van - s.van) * kSlow;
    s.lit += (goal.lit - s.lit) * k;
    s.ring += (goal.ring - s.ring) * k;
    s.booked += (goal.booked - s.booked) * k;
    s.phone += (goal.phone - s.phone) * k;
    apply();
    if (Math.abs(goal.dawn - s.dawn) > 0.002 || Math.abs(goal.van - s.van) > 0.002) shadowFrames = 3;
    if (shadowFrames > 0) {
      shadowFrames--;
      key.shadow.needsUpdate = true;
    }

    // Turning: drag with a little coast, plus a slow idle sway and pointer parallax
    if (!dragging) {
      yaw += yawVel;
      yawVel *= 0.92;
    }
    yaw = clamp(yaw, -0.85, 0.85);
    const sway = reduceMotion ? 0 : Math.sin(t * 0.32) * 0.07;

    // Camera: fit the lot in whatever shape the box is
    const az = 0.5 - (yaw + sway + px * 0.1);
    const el = 0.4 - py * 0.03;
    camera.position.set(
      target.x + Math.sin(az) * Math.cos(el) * dist,
      target.y + Math.sin(el) * dist,
      target.z + Math.cos(az) * Math.cos(el) * dist,
    );
    camera.lookAt(target);

    // Phone: hangs over the roof, faces the camera, shakes while ringing
    phoneAnchor.getWorldPosition(phone.position);
    phone.position.y += reduceMotion ? 0 : Math.sin(t * 1.6) * 0.07;
    phone.quaternion.copy(camera.quaternion);
    const shake = reduceMotion ? 0 : Math.sin(t * 46) * 0.13 * s.ring * (Math.sin(t * 3.1) > -0.2 ? 1 : 0);
    phone.rotateZ(shake);
    rings.forEach((r, i) => {
      const p = reduceMotion ? (i + 1) / 3.4 : (t * 0.55 + i / 3) % 1;
      r.scale.setScalar(lerp(0.85, 2.05, p));
      ringMat[i].opacity = (1 - p) * 0.85 * s.ring * s.phone;
    });

    // Snow
    if (!reduceMotion) {
      for (let i = 0; i < flakeCount; i++) {
        const j = i * 3;
        flakePos[j + 1] -= dt * (0.5 + flakeSeed[i] * 0.55);
        flakePos[j] += Math.sin(t * 0.7 + flakeSeed[i] * 40) * dt * 0.12;
        if (flakePos[j + 1] < 0) flakePos[j + 1] += 9;
      }
      flakeGeo.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);

    // Label chips ride on scene points
    labels.forEach((el) => {
      const a = anchors[el.dataset.anchor as string];
      if (!a) return;
      a.getWorldPosition(v).project(camera);
      el.style.transform = `translate3d(${((v.x + 1) / 2) * width}px, ${((1 - v.y) / 2) * height}px, 0)`;
    });

    if (!ready) {
      ready = true;
      onReady?.();
    }
  }

  let last = 0;
  let counted = 0;
  let slow = 0;
  function loop(now: number) {
    const raw = (now - last) / 1000 || 0.016;
    const dt = Math.min(0.05, raw);
    last = now;
    // A phone that cannot hold the frame rate gets the cheap version: no shadows, fewer pixels.
    if (counted < 46 && ++counted > 6) {
      if (raw > 0.045) slow++;
      if (counted === 46 && slow > 20) {
        key.castShadow = false;
        renderer.setPixelRatio(1);
        resize();
      }
    }
    frame(dt);
    if (running()) raf = requestAnimationFrame(loop);
    else raf = 0;
  }
  const running = () => !reduceMotion && !paused && visible && !document.hidden;
  function kick() {
    if (!started || disposed) return;
    if (reduceMotion) {
      frame(0.016); // one still frame on demand
    } else if (running()) {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    } else if (paused && visible) {
      // Paused: a beat picked now still has to show, so jump straight to it and draw once.
      Object.assign(s, goal);
      frame(0);
    }
  }

  function resize() {
    const sr = stage.getBoundingClientRect();
    const fr = fit.getBoundingClientRect();
    width = Math.max(1, Math.round(sr.width));
    height = Math.max(1, Math.round(sr.height));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Distance that fits the lot inside the fit box. The canvas is much bigger than that box, so the
    // camera sits far back: keep the near and far planes snug around the lot or it gets clipped.
    const tanV = Math.tan((camera.fov * Math.PI) / 360);
    const vFit = Math.atan(tanV * (Math.max(1, fr.height) / height));
    const hFit = Math.atan(tanV * (Math.max(1, fr.width) / height));
    dist = 7.7 / Math.sin(Math.min(vFit, hFit));
    camera.near = Math.max(0.1, dist - 22);
    camera.far = dist + 22;
    // Draw the lot centred on the fit box, not on the middle of the hero.
    const cx = fr.left - sr.left + fr.width / 2;
    const cy = fr.top - sr.top + fr.height / 2;
    camera.setViewOffset(width, height, width / 2 - cx, height / 2 - cy, width, height);
    if (started && !raf) frame(0);
  }
  const ro = new ResizeObserver(resize);
  ro.observe(stage);
  ro.observe(fit);
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    kick();
  });
  io.observe(stage);
  const onVis = () => kick();
  document.addEventListener('visibilitychange', onVis);

  /* ---------- Turn it: drag sideways. Up-and-down swipes still scroll the page (touch-action: pan-y). ---------- */
  const down = (e: PointerEvent) => {
    dragging = true;
    lastX = e.clientX;
    yawVel = 0;
    canvas.setPointerCapture(e.pointerId);
    stage.dataset.turned = 'true';
  };
  const move = (e: PointerEvent) => {
    const r = stage.getBoundingClientRect();
    px = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
    py = clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1);
    if (e.pointerType !== 'mouse' && !dragging) px = py = 0;
    if (!dragging) return;
    const dx = (e.clientX - lastX) * 0.008;
    lastX = e.clientX;
    yaw += dx;
    yawVel = dx;
    if (!raf) frame(0.016);
  };
  const up = () => {
    dragging = false;
  };
  const leave = () => {
    px = py = 0;
  };
  canvas.addEventListener('pointerdown', down);
  canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerup', up);
  canvas.addEventListener('pointercancel', up);
  canvas.addEventListener('pointerleave', leave);

  resize();
  // Compile shaders off the main thread where the browser can, then start.
  renderer
    .compileAsync(scene, camera)
    .catch(() => {})
    .then(() => {
      started = true;
      if (reduceMotion) Object.assign(s, goal);
      kick();
    });

  return {
    setBeat(beat) {
      goal = BEATS[clamp(beat, 0, BEATS.length - 1)];
      kick();
    },
    setPaused(p) {
      paused = p;
      kick();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
      canvas.removeEventListener('pointerleave', leave);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    },
  };
}
