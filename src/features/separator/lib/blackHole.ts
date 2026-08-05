/**
 * Nothing here is drawn as a shape. There is no black circle for the horizon
 * and no stroked ring for the photon sphere: a geometric primitive sitting in
 * the middle of a particle system reads as a sticker pasted on top. The horizon
 * is the absence of particles plus a soft shadow, and the photon ring is just a
 * denser, faster population.
 */

const TAU = Math.PI * 2;

const INCLINATION = 0.13;
const HORIZON = 0.31;
const PHOTON_R = 0.355;
const DISK_INNER = 0.44;
const DISK_OUTER = 1.12;
const WING = 0.75;
/** Bands read as rings; a continuous distribution reads as a cloud. */
const LAYERS = 8;
/** Without infall the disk reads as spinning rather than as being pulled in. */
const INFALL = 0.055;
const ARC_BAND = 0.34;
const ARC_SQUASH = 0.92;

interface Orbiting {
  count: number;
  r: Float32Array;
  th: Float32Array;
  w: Float32Array;
  a: Float32Array;
  z: Float32Array;
}

interface Debris {
  count: number;
  x: Float32Array;
  y: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  a: Float32Array;
}

function emission(r: number) {
  const t = (r - DISK_INNER) / (DISK_OUTER - DISK_INNER);
  return Math.exp(-t * 2.05) * (1 - t * 0.15);
}

function makeOrbiting(
  count: number,
  rMin: number,
  rMax: number,
  concentration: number
): Orbiting {
  const r = new Float32Array(count);
  const th = new Float32Array(count);
  const w = new Float32Array(count);
  const a = new Float32Array(count);
  const z = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const layer = Math.floor(Math.random() * LAYERS);
    const band =
      rMin + (rMax - rMin) * Math.pow((layer + 0.5) / LAYERS, concentration);
    r[i] = band + (Math.random() - 0.5) * ((rMax - rMin) / LAYERS) * 0.34;
    th[i] = Math.random() * TAU;
    w[i] = 0.85 * Math.pow(r[i], -1.5);
    a[i] = 0.55 + Math.random() * 0.45;
    z[i] = (Math.random() - 0.5) * 0.03 * (0.4 + r[i]);
  }

  return { count, r, th, w, a, z };
}

function spawnDebris(i: number, d: Debris, initial: boolean) {
  // Biased sideways: the band is wide, so material entering from the flanks
  // reads better than material dropping in from above.
  const angle = Math.random() * TAU;
  const radius = initial
    ? 1.4 + Math.random() * 2.2
    : 2.4 + Math.random() * 1.4;
  d.x[i] = Math.cos(angle) * radius * 1.6;
  d.y[i] = Math.sin(angle) * radius * 0.42;

  const tangential = 0.13 + Math.random() * 0.1;
  d.vx[i] = -Math.sin(angle) * tangential - Math.cos(angle) * 0.05;
  d.vy[i] = Math.cos(angle) * tangential * 0.42 - Math.sin(angle) * 0.05;
  d.a[i] = 0.1 + Math.random() * 0.22;
}

function makeDebris(count: number): Debris {
  const d: Debris = {
    count,
    x: new Float32Array(count),
    y: new Float32Array(count),
    vx: new Float32Array(count),
    vy: new Float32Array(count),
    a: new Float32Array(count),
  };
  for (let i = 0; i < count; i++) spawnDebris(i, d, true);
  return d;
}

function stepOrbiting(set: Orbiting, dt: number) {
  for (let i = 0; i < set.count; i++) {
    set.th[i] += set.w[i] * dt;
    set.r[i] -= dt * INFALL * Math.pow(set.r[i], -0.6);

    if (set.r[i] < DISK_INNER) {
      // Reborn outermost, so the banding survives the infall.
      set.r[i] =
        DISK_OUTER -
        Math.random() * ((DISK_OUTER - DISK_INNER) / LAYERS) * 0.34;
      set.th[i] = Math.random() * TAU;
    }

    set.w[i] = 0.85 * Math.pow(set.r[i], -1.5);
  }
}

/**
 * The far half is reprojected into a thin arc above the horizon. Light from
 * behind grazes the hole, so the rays compress: the real arc is narrow, not a
 * dome over the shadow.
 */
function project(
  px: number,
  py: number,
  pz: number,
  radius: number,
  spanX: number,
  side: number,
  out: Float32Array
) {
  const flatY = py * Math.sin(INCLINATION) + pz;
  if (py >= 0) {
    out[0] = px;
    out[1] = flatY;
    out[2] = 0;
    return;
  }

  const u = Math.max(-1, Math.min(1, px / spanX));
  const angle = Math.PI * (0.5 - 0.5 * u);
  const norm = (radius - DISK_INNER) / (DISK_OUTER - DISK_INNER);
  const arcR = PHOTON_R + 0.02 + norm * ARC_BAND;

  const ax = Math.cos(angle) * arcR;
  const ay = -Math.sin(angle) * arcR * ARC_SQUASH * side;

  const edge = Math.max(0, (Math.abs(u) - 0.82) / 0.18);
  const k = 1 - edge * edge;

  out[0] = px * (1 - k) + ax * k;
  out[1] = flatY * (1 - k) + ay * k;
  out[2] = 1;
}

export interface Viewport {
  width: number;
  height: number;
  dpr: number;
  centerX: number;
  centerY: number;
  scale: number;
}

export function createViewport(
  rect: { width: number; height: number },
  devicePixelRatio: number
): Viewport {
  const dpr = Math.min(devicePixelRatio || 1, 1.5);
  const width = Math.round(rect.width * dpr);
  const height = Math.round(rect.height * dpr);
  return {
    width,
    height,
    dpr,
    centerX: width / 2,
    centerY: height / 2,
    // Width drives the size at every breakpoint, so the hole spans the screen
    // instead of shrinking into a full stop on a phone. The height term only
    // guards the lensed arcs against clipping if the band aspect changes.
    scale: Math.min(width * 0.25, height * 0.78),
  };
}

/**
 * Counts follow the square of the scale, not a breakpoint. Particles are one
 * device pixel each, so a fixed count in a smaller band raises the density per
 * pixel until the photon ring burns out into a solid white line.
 */
const REFERENCE_SCALE = 202;
const DENSITY = {
  disk: 15000 / (REFERENCE_SCALE * REFERENCE_SCALE),
  ring: 1600 / (REFERENCE_SCALE * REFERENCE_SCALE),
  debris: 340 / (REFERENCE_SCALE * REFERENCE_SCALE),
};

/** Past these counts the frame budget buys nothing the eye reads. */
const CEILING = { disk: 17000, ring: 1900, debris: 380 };

export function createScene(scale: number) {
  const area = scale * scale;
  const count = (density: number, min: number, max: number) =>
    Math.min(max, Math.max(min, Math.round(density * area)));

  return {
    disk: makeOrbiting(
      count(DENSITY.disk, 1200, CEILING.disk),
      DISK_INNER,
      DISK_OUTER,
      0.5
    ),
    ring: makeOrbiting(
      count(DENSITY.ring, 130, CEILING.ring),
      PHOTON_R - 0.014,
      PHOTON_R + 0.034,
      1
    ),
    debris: makeDebris(count(DENSITY.debris, 30, CEILING.debris)),
  };
}

export type Scene = ReturnType<typeof createScene>;

const projected = new Float32Array(3);

function renderOrbiting(
  ctx: CanvasRenderingContext2D,
  view: Viewport,
  set: Orbiting,
  gain: number,
  wantFar: boolean,
  side: number
) {
  for (let i = 0; i < set.count; i++) {
    const r = set.r[i];
    const th = set.th[i];
    const norm = (r - DISK_INNER) / (DISK_OUTER - DISK_INNER);
    const stretch = 1 + WING * norm * norm;
    // The tip sharpens because vertical thickness collapses while horizontal
    // reach grows. Thickness holds until ~70% of the radius, otherwise the
    // whole disk flattens into a line and the ellipse disappears.
    const flat = 1 - Math.pow(norm, 2.4);
    const spanX = r * stretch;

    project(
      Math.cos(th) * spanX,
      Math.sin(th) * r * flat,
      set.z[i] * flat,
      r,
      spanX,
      side,
      projected
    );

    const far = projected[2] === 1;
    if (far !== wantFar) continue;

    const sx = view.centerX + projected[0] * view.scale;
    const sy = view.centerY + projected[1] * view.scale;
    if (sx < -4 || sx > view.width + 4 || sy < -4 || sy > view.height + 4) {
      continue;
    }

    // Continuous Doppler. A binary test here splits the disk into two halves
    // with different brightness and a straight seam down the middle.
    const beam = 1 + 0.62 * -Math.cos(th);
    // The direct image is the brightest: it is light that arrived undeflected.
    // The lensed arc above and the secondary arc below took longer paths.
    const lensed = far ? (side < 0 ? 0.95 : 1.4) : 1.95;
    const taper = far ? 1 - 0.72 * norm * norm : 1 - 0.5 * norm * norm;
    const alpha = Math.min(
      1,
      set.a[i] * emission(r) * beam * gain * lensed * taper
    );
    if (alpha < 0.012) continue;

    ctx.globalAlpha = alpha;
    const size = (r < 0.62 ? 1.25 : 1) * view.dpr;
    ctx.fillRect(sx, sy, size, size);
  }
}

function renderDebris(
  ctx: CanvasRenderingContext2D,
  view: Viewport,
  d: Debris,
  dt: number
) {
  for (let i = 0; i < d.count; i++) {
    const dx = -d.x[i];
    const dy = -d.y[i] * 2.4;
    const dist = Math.hypot(d.x[i], d.y[i] * 2.4) + 1e-4;
    const pull = 0.42 / (dist * dist + 0.03);

    d.vx[i] += (dx / dist) * pull * dt;
    d.vy[i] += (dy / dist) * pull * dt * 0.42;
    d.x[i] += d.vx[i] * dt * 2.4;
    d.y[i] += d.vy[i] * dt * 2.4;

    if (dist < HORIZON * 0.85 || dist > 6) {
      spawnDebris(i, d, false);
      continue;
    }

    const sx = view.centerX + d.x[i] * view.scale;
    const sy = view.centerY + d.y[i] * view.scale;
    if (sx < -20 || sx > view.width + 20) continue;

    // Spaghettification: close to the horizon the tide stretches the debris
    // along its own fall.
    const stretch = 1 + 26 / (dist * dist * 9 + 1);
    const speed = Math.hypot(d.vx[i], d.vy[i]) + 1e-4;
    const length = Math.min(30, stretch) * view.dpr;

    ctx.globalAlpha = Math.min(0.85, d.a[i] * (0.5 + 1.6 / (dist + 0.6)));
    if (length > 2.2) {
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(Math.atan2(d.vy[i] / speed, d.vx[i] / speed));
      ctx.fillRect(-length / 2, 0, length, view.dpr);
      ctx.restore();
    } else {
      ctx.fillRect(sx, sy, view.dpr, view.dpr);
    }
  }
}

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  view: Viewport,
  scene: Scene,
  dt: number
) {
  const { disk, ring, debris } = scene;

  ctx.clearRect(0, 0, view.width, view.height);
  ctx.fillStyle = '#fff';

  renderDebris(ctx, view, debris, dt);

  stepOrbiting(disk, dt);
  stepOrbiting(ring, dt);

  renderOrbiting(ctx, view, disk, 1, true, -1);
  renderOrbiting(ctx, view, ring, 3.1, true, -1);
  renderOrbiting(ctx, view, disk, 1, true, 1);
  renderOrbiting(ctx, view, ring, 3.1, true, 1);

  const shadow = ctx.createRadialGradient(
    view.centerX,
    view.centerY,
    HORIZON * view.scale * 0.55,
    view.centerX,
    view.centerY,
    HORIZON * view.scale * 1.22
  );
  shadow.addColorStop(0, 'rgba(0,0,0,1)');
  shadow.addColorStop(0.72, 'rgba(0,0,0,0.96)');
  shadow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.globalAlpha = 1;
  ctx.fillStyle = shadow;
  ctx.fillRect(
    view.centerX - HORIZON * view.scale * 1.4,
    view.centerY - HORIZON * view.scale * 1.4,
    HORIZON * view.scale * 2.8,
    HORIZON * view.scale * 2.8
  );
  ctx.fillStyle = '#fff';

  // The near half passes in front of the hole, so it is painted after the
  // shadow. Discarding those particles inside the horizon radius was the bug
  // in the earlier version: they sit between the observer and the hole.
  renderOrbiting(ctx, view, disk, 1, false, 1);
  renderOrbiting(ctx, view, ring, 3.1, false, 1);

  const fade = ctx.createLinearGradient(0, 0, 0, view.height);
  fade.addColorStop(0, '#000');
  fade.addColorStop(0.3, '#0000');
  fade.addColorStop(0.7, '#0000');
  fade.addColorStop(1, '#000');
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = fade;
  ctx.fillRect(0, 0, view.width, view.height);
  ctx.globalCompositeOperation = 'source-over';
}

/** Without this the still frame shows pristine rings that never fell in. */
export function settle(scene: Scene, seconds: number, step = 1 / 60) {
  for (let t = 0; t < seconds; t += step) {
    stepOrbiting(scene.disk, step);
    stepOrbiting(scene.ring, step);
  }
}
