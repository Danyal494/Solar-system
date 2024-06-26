import { Html, OrbitControls, Stars, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

const Solarsystem = () => {
  const { scene } = useGLTF('./Sun.glb')
  const desiredRadius = 0.08
  const scaleFactor = desiredRadius / 1  

  return (
    <div>
      <div className=''>
        <Canvas style={{ height: "100vh" }} 
          camera={{ position: [10, 0, -7.5], fov: "60" }}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls/>
          <directionalLight />
          <pointLight position={[-30, 0, -30]} power={10.0}/>
          <primitive scale={[scaleFactor, scaleFactor, scaleFactor]} object={scene}/>
          <pointLight intensity={5} distance={100} decay={2} color="orange" />
<Html>

          <h1 className='text-white'>Sun</h1>
</Html>
          <PlanetOne />
          <PlanetTwo />
          <PlanetThree />
          <PlanetFour />
          <PlanetFive />
          <PlanetSix />
          <PlanetSeven />
        </Canvas>
      </div>
    </div>
  )
}

const PlanetOne = () => {
  const { scene: Merc } = useGLTF('./Mercury.glb')
  const ref = useRef()

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.1
    ref.current.position.x = 5.1 * Math.cos(clock.getElapsedTime() * 0.5)
    ref.current.position.z = 5.1 * Math.sin(clock.getElapsedTime() * 0.5)
  })

  return (
    <group ref={ref} scale={[0.2, 0.2, 0.2]}>
      <primitive object={Merc} />
      <Html>

          <h1 className='text-white'>Sun</h1>
</Html>
    </group>
  )
}

const PlanetTwo = () => {
  const ref = useRef()
  const { scene: Ven } = useGLTF('./venus.glb')

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.5
    ref.current.position.x = 7.5 * Math.cos(clock.getElapsedTime() * 0.3)
    ref.current.position.z = 7.5 * Math.sin(clock.getElapsedTime() * 0.3)
  })

  return (
    <group ref={ref} scale={[0.3, 0.3, 0.3]}>
      <primitive object={Ven} />
      <Html>

          <h1 className='text-white'>Sun</h1>
</Html>
    </group>
  )
}

const PlanetThree = () => {
  const planetRef = useRef()
  const moonRef = useRef()
  const { scene: Earth } = useGLTF('./Earth.glb')
  const { scene: Moon } = useGLTF('./our_moon.glb')

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    planetRef.current.rotation.y = elapsedTime * 0.6
    planetRef.current.position.x = 10 * Math.cos(elapsedTime * 0.2)
    planetRef.current.position.z = 10 * Math.sin(elapsedTime * 0.2)
    moonRef.current.position.x = 2 * Math.cos(elapsedTime)
    moonRef.current.position.z = 2 * Math.sin(elapsedTime)
  })

  return (
    <group ref={planetRef} scale={[0.4, 0.4, 0.4]}>
      <primitive object={Earth} />
      <group ref={moonRef}>
        <primitive object={Moon} scale={[0.25, 0.25, 0.25]} />
        <Html>

          <h1 className='text-white'>Sun</h1>
</Html>
      </group>
    </group>
  )
}

const PlanetFour = () => {
  const ref = useRef()
  const { scene: Mars } = useGLTF('./Mars.glb')

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.3
    ref.current.position.x = 12 * Math.cos(clock.getElapsedTime() * 0.15)
    ref.current.position.z = 12 * Math.sin(clock.getElapsedTime() * 0.15)
  })

  return (
    <group ref={ref} scale={[0.35, 0.35, 0.35]}>
      <primitive object={Mars} />
      <Html>

          <h1 className='text-white'>Sun</h1>
</Html>
    </group>
  )
}

const PlanetFive = () => {
  const ref = useRef()
  const { scene: Jup } = useGLTF('./jupiter.glb')

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.05
    ref.current.position.x = 15 * Math.cos(clock.getElapsedTime() * 0.1)
    ref.current.position.z = 15 * Math.sin(clock.getElapsedTime() * 0.1)
  })

  return (
    <group ref={ref} scale={[0.7, 0.7, 0.7]}>
      <primitive object={Jup} />
      <Html>

          <h1 className='text-white'>Sun</h1>
</Html>
    </group>
  )
}

const PlanetSix = () => {
  const ref = useRef()
  const { scene: Sat } = useGLTF('./saturn.glb')

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.05
    ref.current.position.x = 18 * Math.cos(clock.getElapsedTime() * 0.08)
    ref.current.position.z = 18 * Math.sin(clock.getElapsedTime() * 0.08)
  })

  return (
    <group ref={ref} scale={[0.65, 0.65, 0.65]}>
      <primitive object={Sat} />
      <Html>

          <h1 className='text-white'>Sun</h1>
</Html>
    </group>
  )
}

const PlanetSeven = () => {
  const ref = useRef()
  const { scene: Ura } = useGLTF('./uranus.glb')

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.05
    ref.current.position.x = 20 * Math.cos(clock.getElapsedTime() * 0.06)
    ref.current.position.z = 20 * Math.sin(clock.getElapsedTime() * 0.06)
  })

  return (
    <group ref={ref} scale={[0.6, 0.6, 0.6]}>
      <primitive object={Ura} />
      <Html>

          <h1 className='text-white'>Sun</h1>
</Html>
    </group>
  )
}

const PlanetEight = () => {
  const ref = useRef()
  const { scene: Nep } = useGLTF('./Neptune.glb')

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.05
    ref.current.position.x = 22 * Math.cos(clock.getElapsedTime() * 0.05)
    ref.current.position.z = 22 * Math.sin(clock.getElapsedTime() * 0.05)
  })

  return (
    <group ref={ref} scale={[0.6, 0.6, 0.6]}>
      <primitive object={Nep} />
    </group>
  )
}

export default Solarsystem
