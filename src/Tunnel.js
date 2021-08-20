import * as THREE from 'three'
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const RADIUS = 60
const INTERIOR_ANGLE = Math.PI * 5 / 7
const LENGTH = 2 * RADIUS / Math.tan(INTERIOR_ANGLE * 0.5)
const OFFSET_ANGLE = 0.225
const DEPTH = 1000
const LIGHTS_COUNT = 5

export default function Tunnel() {
  const curve = new THREE.EllipseCurve(
    0, 0,  // xCenter, yCenter
    RADIUS, RADIUS, // xRadius, yRadius
    0, Math.PI * 2, // startAngle, endAngle
    true,  // clockwise
    0 // rotation
  )
  const curvePoints = curve.getPoints(7).slice(0, -1)
  const Rect = ({ index, pos }) => {
    const order = (index + 5) % 7
    return (
      <group rotation={[Math.PI * 0.5, -Math.PI * 2 / 7 * order - OFFSET_ANGLE, 0]} position={[pos.x, pos.y, 0]}>
        <mesh position={[0, 0, 0.05]}> 
          <planeBufferGeometry args={[LENGTH + 5, DEPTH]}/>
          <meshPhysicalMaterial color='#538ca3' side={THREE.DoubleSide}/>
        </mesh>
      </group>
    )
  }

  const lightsRef = useRef()
  const randLightPos = () => THREE.MathUtils.randFloat(20, 40) * (Math.random() < 0.5 ? -1 : 1)

  const mainLightRef = useRef()

  useFrame((state) => {
    for (let i = 0; i < LIGHTS_COUNT; i ++) {
      const light = lightsRef.current.children[i]
      light.position.z += 10
      if (light.position.z >= DEPTH * 0.5) {
        light.position.x = randLightPos()
        light.position.y = randLightPos()
        light.position.z = - DEPTH * 0.5 - Math.random() * DEPTH
        light.distance = THREE.MathUtils.randFloat(60, 130)
      }
    }

    mainLightRef.current.position.x = state.mouse.x * -12
    mainLightRef.current.position.y = state.mouse.x * -12
  })

  return (
    <group rotation={[0, 0, OFFSET_ANGLE]}>
      {curvePoints.map((pos, i) => <Rect key={i} index={i} pos={pos}/>)}
      <pointLight ref={mainLightRef} color="#ebfeff" castShadow position={[0, 0, -DEPTH]} intensity={2.6}/> 
      <group ref={lightsRef}>
        {Array(6).fill(
          <pointLight position={[0, 0, DEPTH]} castShadow intensity={1} distance={100} decay={2} />
        )}
      </group>
    </group>
  )
}
