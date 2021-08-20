import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Effects from './Effects'
import Tunnel from './Tunnel'

export default function App() {

  return (
    <>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Canvas
          dpr={[1, 2]}
          camera={{ fov: 100, position: [0, 0, 500] }}
          gl={{ antialias: true }}
        >
          <color attach="background" args={['#d2fafc']} />
          <Suspense fallback={null}>
            <Tunnel/>
            <Effects/>
          </Suspense>
        </Canvas>
      </div>
      <footer>
        three.js sketch by <a target="_blank" href="https://liamlkh.github.io/" >liamlkh</a>
      </footer>
   </>
  )
}
