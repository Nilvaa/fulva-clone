import { useMemo, useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { dissolveVertexShader, dissolveFragmentShader } from '../shaders/dissolveShader'

import strawberryImg from '../assets/images/strawberry.jpg'
import halwaImg from '../assets/images/strawberry_halwa.png'

// Cycle timeline constants (in seconds)
// 2.0s (strawberry hold) + 1.5s (dissolve) + 2.0s (halwa hold) + 1.5s (reverse) = 7.0s total
const STRAWBERRY_HOLD = 2.0
const DISSOLVE_DURATION = 1.5
const HALWA_HOLD = 2.0
const TOTAL_CYCLE = STRAWBERRY_HOLD + DISSOLVE_DURATION + HALWA_HOLD + DISSOLVE_DURATION // 7.0s

// Smoothstep interpolation helper
function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)))
  return x * x * (3 - 2 * x)
}

// Deterministic hash & noise functions matching the GLSL shader for particle alignment
function hash(x, y) {
  const px = 50.0 * (((x * 0.3183099 + 0.71) % 1 + 1) % 1)
  const py = 50.0 * (((y * 0.3183099 + 0.113) % 1 + 1) % 1)
  const v = px * py * (px + py)
  return -1.0 + 2.0 * (((v) % 1 + 1) % 1)
}

function noise(x, y) {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const fx = x - ix
  const fy = y - iy
  const ux = fx * fx * (3.0 - 2.0 * fx)
  const uy = fy * fy * (3.0 - 2.0 * fy)
  const a = hash(ix, iy)
  const b = hash(ix + 1, iy)
  const c = hash(ix, iy + 1)
  const d = hash(ix + 1, iy + 1)
  return (a * (1 - ux) + b * ux) * (1 - uy) + (c * (1 - ux) + d * ux) * uy
}

function fbm(x, y) {
  let f = 0.0
  f += 0.5 * noise(x, y); x *= 2.02; y *= 2.02
  f += 0.25 * noise(x, y); x *= 2.03; y *= 2.03
  f += 0.125 * noise(x, y); x *= 2.01; y *= 2.01
  f += 0.0625 * noise(x, y)
  return f * 0.5 + 0.5
}

/**
 * GPU Instanced Dissolve Edge Particle Emitter
 * Spawns glowing particle shards along the active dissolve contour
 */
function EdgeParticles({ progressRef, planeWidth, planeHeight }) {
  const instancedRef = useRef()
  const PARTICLE_COUNT = 600
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Pre-generate particle distribution and attributes
  const { geometry, material, particleData } = useMemo(() => {
    const geo = new THREE.TetrahedronGeometry(0.038, 0)
    const mat = new THREE.MeshBasicMaterial({
      toneMapped: false,
    })

    const palette = [
      new THREE.Color('#FF1744'), // Radiant strawberry red
      new THREE.Color('#FF5252'), // Coral candy
      new THREE.Color('#C2185B'), // Deep halwa rose
      new THREE.Color('#FF4081'), // Hot pink
      new THREE.Color('#FFD700'), // Golden seed sparkle
      new THREE.Color('#FFE082'), // Warm amber
      new THREE.Color('#66BB6A'), // Leaf emerald
      new THREE.Color('#FFFFFF'), // Pure diamond sparkle
    ]

    const data = []
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Vogel spiral distribution across UV space for even, non-grid sampling
      const theta = i * 2 * Math.PI * goldenRatio
      const r = Math.sqrt((i + 0.5) / PARTICLE_COUNT) * 0.44
      const u = 0.5 + r * Math.cos(theta)
      const v = 0.5 + r * Math.sin(theta)

      // Compute exact noise value at this UV position matching the fragment shader
      const noiseVal = fbm(u * 5.5, v * 5.5)

      // Base spatial coordinates on plane
      const baseX = (u - 0.5) * planeWidth
      const baseY = (v - 0.5) * planeHeight

      // Outward burst trajectory
      const burstAngle = Math.atan2(baseY, baseX) + (Math.sin(i * 1.5) * 0.5)
      const burstSpeed = 0.3 + (i % 7) * 0.08
      const maxZ = 0.35 + (i % 5) * 0.12

      // Assign palette color matching strawberry & halwa hues
      const color = palette[i % palette.length]
      const baseScale = 0.8 + (i % 4) * 0.25

      data.push({
        u,
        v,
        noiseVal,
        baseX,
        baseY,
        burstAngle,
        burstSpeed,
        maxZ,
        color,
        baseScale,
      })
    }

    return { geometry: geo, material: mat, particleData: data }
  }, [planeWidth, planeHeight])

  // Initialize instance colors
  useLayoutEffect(() => {
    if (!instancedRef.current) return
    particleData.forEach((p, i) => {
      instancedRef.current.setColorAt(i, p.color)
    })
    if (instancedRef.current.instanceColor) {
      instancedRef.current.instanceColor.needsUpdate = true
    }
  }, [particleData])

  // Animate particle burst along the dissolve edge in useFrame
  useFrame(() => {
    if (!instancedRef.current) return

    const progress = progressRef.current
    const edgeWindow = 0.14 // Dissolve threshold proximity window

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particleData[i]
      const dist = Math.abs(progress - p.noiseVal)

      if (dist < edgeWindow && progress > 0.02 && progress < 0.98) {
        // Lifecycle progression [0 to 1] inside edge window
        const life = 1.0 - (dist / edgeWindow)
        const curve = Math.sin(life * Math.PI) // Arch curve for elevation and scale

        // Displace along burst trajectory and lift forward in Z
        const curX = p.baseX + Math.cos(p.burstAngle) * (1 - life) * p.burstSpeed
        const curY = p.baseY + Math.sin(p.burstAngle) * (1 - life) * p.burstSpeed
        const curZ = curve * p.maxZ

        dummy.position.set(curX, curY, curZ)
        dummy.rotation.set(life * 6 + i, life * 5, life * 4)

        const s = curve * p.baseScale * 1.15
        dummy.scale.set(s, s, s)
      } else {
        // Dormant particle (hidden)
        dummy.scale.set(0, 0, 0)
      }

      dummy.updateMatrix()
      instancedRef.current.setMatrixAt(i, dummy.matrix)
    }

    instancedRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={instancedRef}
      args={[geometry, material, PARTICLE_COUNT]}
      frustumCulled={false}
    />
  )
}

/**
 * Main HalwaMorph Component
 * Renders textured plane with custom dissolve shader, particle burst, and ambient motion
 */
export default function HalwaMorph({ onTransitionChange }) {
  const groupRef = useRef()
  const shaderMaterialRef = useRef()
  const currentProgressRef = useRef(0)

  // Dimensions of the 3D plane
  const planeWidth = 3.6
  const planeHeight = 2.4

  // Load both images as textures using Drei's useTexture
  const [texStrawberry, texHalwa] = useTexture([strawberryImg, halwaImg])

  // Custom Shader Uniforms
  const uniforms = useMemo(
    () => ({
      uTexStrawberry: { value: texStrawberry },
      uTexHalwa: { value: texHalwa },
      uProgress: { value: 0.0 },
      uEdgeWidth: { value: 0.075 },
      uEdgeColor: { value: new THREE.Color('#FF1E56') }, // Vibrant glowing ruby
      uTime: { value: 0.0 },
      uPlaneAspect: { value: planeWidth / planeHeight }, // 1.5
      uAspectStrawberry: { value: 323 / 360 }, // ~0.897
      uAspectHalwa: { value: 1408 / 768 }, // ~1.833
    }),
    [texStrawberry, texHalwa, planeWidth, planeHeight]
  )

  // Animation Loop: Timing, Shader Uniforms, and Subtle 3D Ambient Tilt
  useFrame((state) => {
    const totalTime = state.clock.getElapsedTime()
    const t = totalTime % TOTAL_CYCLE

    let progress

    // Phase 1: Hold on strawberry (0.0s to 2.0s)
    if (t < STRAWBERRY_HOLD) {
      progress = 0.0
    }
    // Phase 2: Dissolve from strawberry to halwa (2.0s to 3.5s)
    else if (t < STRAWBERRY_HOLD + DISSOLVE_DURATION) {
      const dissolveT = (t - STRAWBERRY_HOLD) / DISSOLVE_DURATION
      progress = smoothstep(0, 1, dissolveT)
    }
    // Phase 3: Hold on halwa (3.5s to 5.5s)
    else if (t < STRAWBERRY_HOLD + DISSOLVE_DURATION + HALWA_HOLD) {
      progress = 1.0
    }
    // Phase 4: Reverse transition back to strawberry (5.5s to 7.0s)
    else {
      const reverseT =
        (t - (STRAWBERRY_HOLD + DISSOLVE_DURATION + HALWA_HOLD)) / DISSOLVE_DURATION
      progress = 1.0 - smoothstep(0, 1, reverseT)
    }

    currentProgressRef.current = progress

    // Update custom shader uniforms
    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.uniforms.uProgress.value = progress
      shaderMaterialRef.current.uniforms.uTime.value = totalTime
    }

    // Gentle ambient rotation of plane group (±4.5 degrees) for 3D depth
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(totalTime * 0.65) * 0.075
      groupRef.current.rotation.x = Math.cos(totalTime * 0.45) * 0.04
    }

    // Optional callback for parent bloom modulation
    if (onTransitionChange) {
      onTransitionChange(progress)
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Main Dissolve Textured Plane */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[planeWidth, planeHeight, 1, 1]} />
        <shaderMaterial
          ref={shaderMaterialRef}
          vertexShader={dissolveVertexShader}
          fragmentShader={dissolveFragmentShader}
          uniforms={uniforms}
          transparent={true}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* 2. GPU Instanced Dissolve Edge Particle Emitter */}
      <EdgeParticles
        progressRef={currentProgressRef}
        planeWidth={planeWidth}
        planeHeight={planeHeight}
      />
    </group>
  )
}
