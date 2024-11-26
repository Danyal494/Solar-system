import { CameraControls, Stars, useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import React, { Suspense, useRef, useState } from 'react';
import { TextureLoader } from 'three';
import Loader from './Loader';

const MeshSolarSystem = () => {
  const planets = [
    { name: "Mercury", textures: ["/Texture/mercurymap.jpg", "/Texture/mercurybump.jpg"], orbitRadius: 3.4, orbitSpeed: 1.5 },
    { name: "Venus", textures: ["/Texture/2k_venus_surface.jpg", "/Texture/2k_venus_atmosphere.jpg"], orbitRadius: 5.9, orbitSpeed: 1.2 },
    { name: "Earth", textures: ["/Texture/earthmap1k.jpg", "/Texture/earthlights1k.jpg"], orbitRadius: 10.3, orbitSpeed: 0.5, hasMoon: true },
    { name: "Mars", textures: ["/Texture/2k_mars.jpg", "/Texture/topo.jpg"], orbitRadius: 12.4, orbitSpeed: 0.8 },
    { name: "Jupiter", textures: ["/Texture/jupiter2_4k.jpg"], orbitRadius: 16.4, orbitSpeed: 0.6 },
    { name: "Saturn", textures: ["/Texture/2k_saturn.jpg"], orbitRadius: 18.9, orbitSpeed: 0.5, rings: "/Texture/SRing.glb" },
    { name: "Uranus", textures: ["/Texture/2k_uranus.jpg"], orbitRadius: 21.6, orbitSpeed: 0.4, rings: "/Texture/URings.glb" },
    { name: "Neptune", textures: ["/Texture/2k_neptune.jpg"], orbitRadius: 26.4, orbitSpeed: 0.3 },
    { name: "Pluto", textures: ["/Texture/plutomap2k.jpg", "/Texture/plutobump2k.jpg"], orbitRadius: 29.4, orbitSpeed: 0.1 }
  ];

  return (
    <Suspense fallback={<Loader />}>
      <Canvas style={{ height: '100vh' }} camera={{ position: [500, 10, -7.5], fov: 60 }}>
        <CameraControls minDistance={4} maxDistance={350} />
        <CameraControl/>
        <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={1} />
        <Sun />
        {planets.map((planet) => (
          <Planet key={planet.name} {...planet} />
        ))}
      </Canvas>
    </Suspense>
  );
};

const CameraControl = () => {
  const ref = useRef();
  const [animationStartTime, setAnimationStartTime] = useState(null); // Track when to start animating
  const delay = 3 ; // Delay in seconds
  const duration = 10; // Duration of animation in seconds
  const startX = 400;
  const endX = 10;

  useFrame(({ camera, clock }) => {
    if (animationStartTime === null) {
      // Initialize the animation start time after the delay
      setAnimationStartTime(clock.getElapsedTime() + delay);
      return;
    }

    const elapsedTime = clock.getElapsedTime();
    const startAnimationTime = animationStartTime; 

    if (elapsedTime < startAnimationTime) {
      // Do nothing during the delay
      return;
    }

    const progress = Math.min((elapsedTime - startAnimationTime) / duration, 1); // Ensure progress doesn't exceed 1

    // Linearly interpolate the camera's x position from startX to endX over the duration
    camera.position.x = startX + (endX - startX) * progress;

    // Optionally, adjust the camera's target (if needed)
    if (ref.current) {
      camera.lookAt(ref.current.position);
    }

    // Stop updating if the animation is complete
    if (progress >= 1) {
      return;
    }
  });

  return <group ref={ref} />;
};



const Sun = () => {
  const sunTexture = useLoader(TextureLoader, "/Texture/2k_sun.jpg");
  return (
    <mesh position={[0, 0, 0]}>
      <pointLight intensity={9} position={[0, 0, 0]} color="#FDB813" decay={2} />
      <sphereGeometry args={[1, 62, 62]} />
      <meshStandardMaterial map={sunTexture} emissive="#FDB813" emissiveIntensity={0.1} />
    </mesh>
  );
};

const Planet = ({ name, textures, orbitRadius, orbitSpeed, hasMoon, rings }) => {
  const ref = useRef();
  const texture = useLoader(TextureLoader, textures[0]);
  const emissiveTexture = textures[1] && useLoader(TextureLoader, textures[1]);
  const { scene: ringScene } = rings ? useGLTF(rings) : {};

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() * orbitSpeed;
    ref.current.position.x = orbitRadius * Math.cos(elapsedTime);
    ref.current.position.z = orbitRadius * Math.sin(elapsedTime);
    ref.current.rotation.y = elapsedTime;
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1, 62, 62]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={emissiveTexture}
          // emissive="white"
          emissiveIntensity={0.5}
        />
      </mesh>
      {rings && <primitive object={ringScene} scale={0.03} />}
      {hasMoon && <Moon />}
    </group>
  );
};

const Moon = () => {
  const ref = useRef();

  const moonTexture = useLoader(TextureLoader, "/Texture/moonmap2k.jpg");
  const moonBump = useLoader(TextureLoader, "/Texture/moonbump2k.jpg");

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() * 2; // Moon's faster orbit
    ref.current.position.x = 2 * Math.cos(elapsedTime); // Radius of Moon's orbit
    ref.current.position.z = 2 * Math.sin(elapsedTime);
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.3, 62, 62]} />
        <meshStandardMaterial map={moonTexture} bumpMap={moonBump} />
      </mesh>
    </group>
  );
};

export default MeshSolarSystem;
