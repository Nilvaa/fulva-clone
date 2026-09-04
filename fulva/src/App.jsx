import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import HalwaMorph from './components/HalwaMorph'

export default function App() {
  return (
    <main className="relative w-screen h-screen overflow-hidden studio-backdrop">
      {/* Full-Viewport React Three Fiber Canvas */}
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 3.8], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        {/* Soft Ambient Light for overall studio visibility */}
        <ambientLight intensity={1.0} color="#FFF9F2" />

        {/* The 3D Image Dissolve & Particle Morph Hero Scene */}
        <Suspense fallback={null}>
          <HalwaMorph />
        </Suspense>

        {/* Post-Processing Bloom for Dissolve Edge Sparkles */}
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom
            luminanceThreshold={0.65}
            luminanceSmoothing={0.35}
            intensity={1.15}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </main>
  )
}
