import { OrbitControls, Stars, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import Loader from './Loader';



const Solarsystem = () => {
  const { scene: sun } = useGLTF('./Sun.glb');
  const sunScale = 0.03;

  const [loading, setLoading] = useState(true);
  const [opacity, setOpacity] = useState(0); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 2000 milliseconds (2 seconds)

    return () => clearTimeout(timer);
  }, []);

useEffect(() =>{
  if (!loading){
 // Animate fade-in effect
 let opacityVal = 0;
 const fadeDuration = 500; // 0.5 seconds
 const fadeStart = performance.now();

 const fadeIn = (time) => {
   const elapsed = time - fadeStart;
   opacityVal = Math.min(elapsed / fadeDuration, 1);
   setOpacity(opacityVal);

   if (opacityVal < 1) {
     requestAnimationFrame(fadeIn);
   }
 };

 requestAnimationFrame(fadeIn);
  }
},[loading])

  return (
    <div>
      {loading ? (<Loader/>): (
      <div className=''>
        <Canvas style={{ height: "100vh" }} camera={{ position: [10, 0, -7.5], fov: 60 }}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls minDistance={4}  maxDistance={150}/>
          <directionalLight />
          <pointLight position={[0, 0, 0]} power={10.0} />
          <primitive scale={[sunScale, sunScale, sunScale]} object={sun} />
          <pointLight intensity={10} distance={900} decay={2} color="orange" />
          <Mercury />
          <Venus />
          <Earth />
          <Mars />
          <Jupiter />
          <Saturn />
          <Uranus />
          <Neptune />
        </Canvas>
      </div>
      )}
    </div>
  );
}

const Planet = ({ glbPath, scale, orbitRadius, orbitSpeed }) => {
  const { scene } = useGLTF(glbPath);
  const ref = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() * orbitSpeed;
    ref.current.position.x = orbitRadius * Math.cos(elapsedTime);
    ref.current.position.z = orbitRadius * Math.sin(elapsedTime);
    ref.current.rotation.y = elapsedTime;
  });

  return (
    <group ref={ref} scale={scale}>
      <primitive object={scene} />
    </group>
  );
};

const Mercury = () => <Planet glbPath="./Mercury.glb" scale={[0.01, 0.01, 0.01]} orbitRadius={2.4} orbitSpeed={1.5} />;
const Venus = () => <Planet glbPath="./venus.glb" scale={[0.02, 0.02, 0.02]} orbitRadius={3.4} orbitSpeed={1.2} />;
const Earth = () => {
  const earthRef = useRef();
  const moonRef = useRef();
  const { scene: earth } = useGLTF("./Earth.glb");
  const { scene: moon } = useGLTF("./our_moon.glb");

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const earthOrbitRadius = 4.3;
    const earthOrbitSpeed = 0.5;
    const moonOrbitRadius = 0.1;
    const moonOrbitSpeed = 2;

    earthRef.current.position.x = earthOrbitRadius * Math.cos(elapsedTime * earthOrbitSpeed);
    earthRef.current.position.z = earthOrbitRadius * Math.sin(elapsedTime * earthOrbitSpeed);
    earthRef.current.rotation.y = elapsedTime * earthOrbitSpeed;

    moonRef.current.position.x = moonOrbitRadius * Math.cos(elapsedTime * moonOrbitSpeed);
    moonRef.current.position.z = moonOrbitRadius * Math.sin(elapsedTime * moonOrbitSpeed);
  });

  return (
    <group ref={earthRef} scale={[0.02, 0.02, 0.02]}>
      <primitive object={earth} />
      <group ref={moonRef}>
        <primitive object={moon} scale={[0.5, 0.5, 0.5]} />
      </group>
    </group>
  );
};

const Mars = () => <Planet glbPath="./Mars.glb" scale={[0.015, 0.015, 0.015]} orbitRadius={7} orbitSpeed={0.8} />;
const Jupiter = () => <Planet glbPath="./jupiter.glb" scale={[0.07, 0.07, 0.07]} orbitRadius={3.5} orbitSpeed={0.6} />;
const Saturn = () => <Planet glbPath="./saturn.glb" scale={[0.06, 0.06, 0.06]} orbitRadius={4.5} orbitSpeed={0.5} />;
const Uranus = () => <Planet glbPath="./uranus.glb" scale={[0.05, 0.05, 0.05]} orbitRadius={5.5} orbitSpeed={0.4} />;
const Neptune = () => <Planet glbPath="./neptune.glb" scale={[0.05, 0.05, 0.05]} orbitRadius={6.5} orbitSpeed={0.3} />;

export default Solarsystem;
