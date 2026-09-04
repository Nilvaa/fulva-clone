export const dissolveVertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const dissolveFragmentShader = `
precision highp float;

uniform sampler2D uTexStrawberry;
uniform sampler2D uTexHalwa;
uniform float uProgress;
uniform float uEdgeWidth;
uniform vec3 uEdgeColor;
uniform float uTime;
uniform float uPlaneAspect;
uniform float uAspectStrawberry;
uniform float uAspectHalwa;

varying vec2 vUv;
varying vec3 vPosition;

// 2D Simplex / Perlin-like FBM noise functions
float hash(vec2 p) {
  p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));
  return -1.0 + 2.0 * fract(p.x * p.y * (p.x + p.y));
}

float noise(in vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float f = 0.0;
  f += 0.5000 * noise(p); p *= 2.02;
  f += 0.2500 * noise(p); p *= 2.03;
  f += 0.1250 * noise(p); p *= 2.01;
  f += 0.0625 * noise(p);
  return f * 0.5 + 0.5; // [0, 1]
}

// Object-fit: contain UV calculation
vec2 getContainedUV(vec2 uv, float planeAspect, float texAspect) {
  vec2 centered = uv - 0.5;
  if (planeAspect > texAspect) {
    centered.x *= (planeAspect / texAspect);
  } else {
    centered.y *= (texAspect / planeAspect);
  }
  return centered + 0.5;
}

void main() {
  // UV containment mapping so neither image is stretched
  vec2 uv1 = getContainedUV(vUv, uPlaneAspect, uAspectStrawberry);
  vec2 uv2 = getContainedUV(vUv, uPlaneAspect, uAspectHalwa);

  // Sample 1: Strawberry texture
  vec4 col1 = vec4(0.0);
  if (uv1.x >= 0.0 && uv1.x <= 1.0 && uv1.y >= 0.0 && uv1.y <= 1.0) {
    col1 = texture2D(uTexStrawberry, uv1);
    
    // High-precision white background discard (luminance + low saturation)
    float lum1 = dot(col1.rgb, vec3(0.299, 0.587, 0.114));
    float sat1 = max(col1.r, max(col1.g, col1.b)) - min(col1.r, min(col1.g, col1.b));
    float isWhiteBg = smoothstep(0.85, 0.95, lum1) * (1.0 - smoothstep(0.04, 0.16, sat1));
    col1.a *= (1.0 - isWhiteBg);
  }

  // Sample 2: Halwa texture
  vec4 col2 = vec4(0.0);
  if (uv2.x >= 0.0 && uv2.x <= 1.0 && uv2.y >= 0.0 && uv2.y <= 1.0) {
    col2 = texture2D(uTexHalwa, uv2);
    
    // Warm cream background discard rgb(243, 229, 201)
    vec3 creamBg = vec3(0.953, 0.898, 0.788);
    float distCream = distance(col2.rgb, creamBg);
    float isCreamBg = 1.0 - smoothstep(0.06, 0.18, distCream);
    col2.a *= (1.0 - isCreamBg);
  }

  // Procedural organic noise pattern
  vec2 noiseCoord = vUv * 5.5 + vec2(sin(uTime * 0.15) * 0.05, cos(uTime * 0.15) * 0.05);
  float n = fbm(noiseCoord);

  // Transition threshold mapped so progress 0 is 100% strawberry and 1 is 100% halwa
  float threshold = uProgress * (1.0 + uEdgeWidth * 2.0) - uEdgeWidth;

  float diff = n - threshold;
  float isHalwa = 1.0 - smoothstep(0.0, 0.015, diff);

  // Base texture blend
  vec4 baseCol = mix(col1, col2, isHalwa);

  // Glowing burn/sparkle edge along dissolve boundary
  float edgeDist = abs(diff);
  float edgeGlow = 1.0 - smoothstep(0.0, uEdgeWidth, edgeDist);
  edgeGlow *= smoothstep(0.005, 0.05, uProgress) * (1.0 - smoothstep(0.95, 0.995, uProgress));

  // Shimmering sparkle intensity
  float shimmer = 0.85 + 0.4 * sin(vUv.x * 70.0 + vUv.y * 70.0 + uTime * 14.0);
  vec3 glowingColor = uEdgeColor * (2.4 * shimmer);

  // Final compositing
  vec3 finalRgb = mix(baseCol.rgb, glowingColor, edgeGlow * 0.95);
  float finalAlpha = max(baseCol.a, edgeGlow * 0.85);

  if (finalAlpha < 0.015) {
    discard;
  }

  gl_FragColor = vec4(finalRgb, finalAlpha);
}
`
