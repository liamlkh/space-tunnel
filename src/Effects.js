import * as THREE from 'three'
import React, { useRef, useMemo, useEffect } from 'react'
import { extend, useThree, useFrame } from '@react-three/fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { isMobile } from 'react-device-detect'

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass })

export default function Effects() {
    const composerRef = useRef()

    const aspect = useMemo(() => new THREE.Vector2(512, 512), [])
    const { scene, gl, size, camera } = useThree()

    useEffect(() => {
      composerRef.current.setSize(size.width, size.height)
    }, [size])

    useFrame(() => {
      composerRef.current.render()
    }, 1)

  return (
    <effectComposer ref={composerRef} args={[gl]} renderTarget1-type={THREE.HalfFloatType} renderTarget2-type={THREE.HalfFloatType}>
      <renderPass attachArray="passes" args={[scene, camera]} />
      <unrealBloomPass attachArray="passes" args={[aspect, 1, 1, isMobile ? 0.9308 : 0.929]} /> 
    </effectComposer>
  )
}
