import { Environment, OrbitControls, Stars, useGLTF, useTexture } from '@react-three/drei'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import React, { Suspense, useRef, useState } from 'react'
import { DoubleSide, RepeatWrapping, TextureLoader } from 'three'
import Loader from './Loader'

const MeshSolarSystem = () => {
  return (
   <Suspense fallback={<Loader/>}>
<Canvas style={{ height: '100vh' }} camera={{ position: [500, 10, -7.5], fov: 60 }}>
<CameraControl/>
{/* <CameraControls/> */}
<Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
<OrbitControls minDistance={4} maxDistance={350} />
{/* <Environment preset='city'/> */}

<ambientLight intensity={1} />

<Sun/>
<Mercury/>
<Venus/>
<EarthMoon/>
<Mars/>
<Jupiter/>
<Saturn/>
<Uranus/>
<Neptune/>
<Pluto/>
</Canvas>
   </Suspense>
  )
}

export default MeshSolarSystem


const CameraControl = () => {
    const ref = useRef();
    const [animationComplete, setAnimationComplete] = useState(false);
  
    useFrame(({ camera, clock }) => {
      if (animationComplete) return; // Stop updating if the animation is complete
  
      const elapsedTime = clock.getElapsedTime(); // Get the elapsed time in seconds
      const duration = 10; // 50 seconds
      const startX = 400;
      const endX = 10;
      const progress = Math.min(elapsedTime / duration, 1); // Ensure progress doesn't exceed 1
  
      // Linearly interpolate the camera's x position from startX to endX over the duration
      camera.position.x = startX + (endX - startX) * progress;
  
      // Optionally, adjust the camera's target (if needed)
      if (ref.current) {
        camera.lookAt(ref.current.position);
      }
  
      // Stop rendering after the animation is complete
      if (progress >= 1) {
        setAnimationComplete(true);
      }
    });
  
    return <group ref={ref} />;
  };


  const Sun = () =>{
    const suntexture = useLoader(TextureLoader,"/Texture/2k_sun.jpg")
    return(
        <mesh position={[0,0,0]}>
          <pointLight 
        intensity={9} 
        position={[0, 0, 0]} 
        color="#FDB813" 
        decay={2} 
      />
            <sphereGeometry args={[1,62,62]}/>

            <meshStandardMaterial map={suntexture} emissive={"#FDB813"} emissiveIntensity={0.1}/>
        </mesh>
    )
  }



  const Mercury = () =>{
    const ref = useRef()
    const mercurytexture = useLoader(TextureLoader,"/Texture/mercurymap.jpg")
    const mercurybumptexture = useLoader(TextureLoader,"/Texture/mercurybump.jpg")
    const orbitRadius= 3.4
    const  orbitSpeed= 1.5
    useFrame(({ clock }) => {
      const elapsedTime = clock.getElapsedTime() * orbitSpeed;
      ref.current.position.x = orbitRadius * Math.cos(elapsedTime);
      ref.current.position.z = orbitRadius * Math.sin(elapsedTime);
      ref.current.rotation.y = elapsedTime;
    });
    return(
      <mesh ref={ref} >
        <sphereGeometry args={[1,62,62]}/>
        <meshStandardMaterial map={mercurytexture}  emissiveMap={mercurybumptexture}   emissiveIntensity={4.0}/>

      </mesh>
    )
  }


  const Venus = () =>{
    const ref = useRef()
    const venustexture = useLoader(TextureLoader,"/Texture/2k_venus_surface.jpg")
    const venusatmospheretexture = useLoader(TextureLoader,"/Texture/2k_venus_atmosphere.jpg")
    const orbitRadius= 5.9
    const  orbitSpeed= 1.2
    useFrame(({ clock }) => {
      const elapsedTime = clock.getElapsedTime() * orbitSpeed;
      ref.current.position.x = orbitRadius * Math.cos(elapsedTime);
      ref.current.position.z = orbitRadius * Math.sin(elapsedTime);
      ref.current.rotation.y = elapsedTime;
    });
    return(
      <mesh ref={ref} >
        <sphereGeometry args={[1,62,62]}/>
        <meshStandardMaterial map={venustexture}  emissiveMap={venusatmospheretexture}   emissiveIntensity={0}/>

      </mesh>
   
    )
  }

  const EarthMoon = () =>{
    const earthRef = useRef();
  const moonRef = useRef();
 

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const earthOrbitRadius = 10.3;
    const earthOrbitSpeed = 0.5;
    const moonOrbitRadius = 0.23;
    const moonOrbitSpeed = 2;

    earthRef.current.position.x = earthOrbitRadius * Math.cos(elapsedTime * earthOrbitSpeed);
    earthRef.current.position.z = earthOrbitRadius * Math.sin(elapsedTime * earthOrbitSpeed);
    earthRef.current.rotation.y = elapsedTime * earthOrbitSpeed;

    moonRef.current.position.x = moonOrbitRadius * Math.cos(elapsedTime * moonOrbitSpeed);
    moonRef.current.position.z = moonOrbitRadius * Math.sin(elapsedTime * moonOrbitSpeed);
  });
  const earthtexture = useLoader(TextureLoader, '/Texture/earthmap1k.jpg');
  const eathlightmap = useLoader(TextureLoader, "/Texture/earthlights1k.jpg")
  const moontexture = useLoader(TextureLoader,"/Texture/moonmap2k.jpg")
  const moonbumptexture = useLoader(TextureLoader,"/Texture/moonbump2k.jpg")
    return(
        <group ref={earthRef}>
            <mesh>
                <sphereGeometry args={[1,62,62]} />
                <meshStandardMaterial map={earthtexture} 
  emissiveMap={eathlightmap} 
  emissive={'white'} 
  emissiveIntensity={1.0}  />
            </mesh>
<group ref={moonRef}>
    <mesh  position={[4,0,0]} scale={0.3}>
        <sphereGeometry  args={[1,62,62]} />
        <meshStandardMaterial map={moontexture} 
  emissiveMap={moonbumptexture} 
//   emissive={'white'} 
  emissiveIntensity={4.0}/>
    </mesh>
</group>

        </group>
    )
  }

  const Mars = () =>{
    const ref = useRef()
    const Marstexture = useLoader(TextureLoader,"/Texture/2k_mars.jpg")
    const topo = useLoader(TextureLoader,"/Texture/topo.jpg")
    const orbitRadius= 12.4
    const  orbitSpeed= 0.8
    useFrame(({ clock }) => {
      const elapsedTime = clock.getElapsedTime() * orbitSpeed;
      ref.current.position.x = orbitRadius * Math.cos(elapsedTime);
      ref.current.position.z = orbitRadius * Math.sin(elapsedTime);
      ref.current.rotation.y = elapsedTime;
    });
    return(
      <mesh ref={ref} >
        <sphereGeometry args={[1,62,62]}/>
        <meshStandardMaterial map={Marstexture} emissiveMap={topo}  />

      </mesh>
   
    )
  }

  const Jupiter = () =>{
    const ref = useRef()
    const jupitertexture = useLoader(TextureLoader,"/Texture/jupiter2_4k.jpg")
    // const topo = useLoader(TextureLoader,"/Texture/topo.jpg")
    const orbitRadius= 16.4
    const  orbitSpeed= 0.6
    useFrame(({ clock }) => {
      const elapsedTime = clock.getElapsedTime() * orbitSpeed;
      ref.current.position.x = orbitRadius * Math.cos(elapsedTime);
      ref.current.position.z = orbitRadius * Math.sin(elapsedTime);
      ref.current.rotation.y = elapsedTime;
    });
    return(
      <mesh ref={ref} >
        <sphereGeometry args={[1,62,62]}/>
        <meshStandardMaterial map={jupitertexture}  />

      </mesh>
   
    )
  }
  const Saturn = () => {
    const ref = useRef();
  
    // Orbit parameters
    const orbitRadius = 18.9;
    const orbitSpeed = 0.5;
  
    const {scene} = useGLTF("/Texture/SRing.glb")

    // Animate Saturn's orbit
    useFrame(({ clock }) => {
      const elapsedTime = clock.getElapsedTime() * orbitSpeed;
      ref.current.position.x = orbitRadius * Math.cos(elapsedTime);
      ref.current.position.z = orbitRadius * Math.sin(elapsedTime);
      ref.current.rotation.y = elapsedTime;
    });
  
    // Load textures
    const saturnTexture = useLoader(TextureLoader, "/Texture/2k_saturn.jpg");
    const saturnRingTexture = useLoader(TextureLoader, "/Texture/2k_saturn_ring_alpha.jpg");
  
    // Repeat and align the ring texture
    saturnRingTexture.repeat.set(1, 1); // Use 1 repeat to align naturally with the ring
    saturnRingTexture.wrapS = RepeatWrapping;
    saturnRingTexture.wrapT = RepeatWrapping;
  
    return (
      <group ref={ref}>
  
        <group>
          <mesh>
            <sphereGeometry args={[1, 62, 62]} />
            <meshStandardMaterial map={saturnTexture} />
          </mesh>
        </group>
  

        <group scale={0.03}>
          <primitive object={scene}/>
          {/* <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.7}>
            <ringGeometry args={[1.1, 1.5, 128]} /> 
            <meshStandardMaterial
              map={saturnRingTexture}
              side={DoubleSide}
              transparent={true} 
            />
          </mesh> */}
        </group>
      </group>
    );
  };
  const Uranus = () =>{
    const ref = useRef()
    const orbitRadius= 21.6
    const  orbitSpeed= 0.4
    useFrame(({ clock }) => {
      const elapsedTime = clock.getElapsedTime() * orbitSpeed;
      ref.current.position.x = orbitRadius * Math.cos(elapsedTime);
      ref.current.position.z = orbitRadius * Math.sin(elapsedTime);
      ref.current.rotation.y = elapsedTime;
    });
    const uranustexture = useLoader(TextureLoader,"/Texture/2k_uranus.jpg")
    // const uranusRtexture = useLoader(TextureLoader,"/Texture/uranusringtrans.gif")
    const uranusringtexture = useLoader(TextureLoader,"/Texture/uranusringcolour.jpg")
    const uranusRtranstexture = useLoader(TextureLoader,"/Texture/uranusringtrans.gif")
    const {scene} = useGLTF('/Texture/URings.glb')
    return(
      <group ref={ref}>
<group>
<mesh>

  <sphereGeometry args={[1,62,62]}/>
  <meshStandardMaterial  emissiveIntensity={0.1} map={uranustexture}/>

</mesh>
</group>
<group scale={0.03}>
  <primitive object={scene}/>
{/* 
      <mesh rotation={[40, 0, 0]} scale={1}>
        <ringGeometry args={[1.2,1.9,62]} />
        <meshStandardMaterial map={uranusringtexture} emissiveMap={uranusRtranstexture}  side={DoubleSide} />
      </mesh> */}
</group>
      </group>
    )
  }



  const Neptune = () =>{
    const ref = useRef()
    const Neptunetexture = useLoader(TextureLoader,"/Texture/2k_neptune.jpg")
    // const topo = useLoader(TextureLoader,"/Texture/topo.jpg")
    const orbitRadius= 26.4
    const  orbitSpeed= 0.3
    useFrame(({ clock }) => {
      const elapsedTime = clock.getElapsedTime() * orbitSpeed;
      ref.current.position.x = orbitRadius * Math.cos(elapsedTime);
      ref.current.position.z = orbitRadius * Math.sin(elapsedTime);
      ref.current.rotation.y = elapsedTime;
    });
    return(
      <mesh ref={ref} >
        <sphereGeometry args={[1,62,62]}/>
        <meshStandardMaterial map={Neptunetexture}  />

      </mesh>
   
    )
  }
  const Pluto = () =>{
    const ref = useRef()
    const Plutotexture = useLoader(TextureLoader,"/Texture/plutomap2k.jpg")
    const plutobump = useLoader(TextureLoader,"/Texture/plutobump2k.jpg")
    const orbitRadius= 29.4
    const  orbitSpeed= 0.1
    useFrame(({ clock }) => {
      const elapsedTime = clock.getElapsedTime() * orbitSpeed;
      ref.current.position.x = orbitRadius * Math.cos(elapsedTime);
      ref.current.position.z = orbitRadius * Math.sin(elapsedTime);
      ref.current.rotation.y = elapsedTime;
    });
    return(
      <mesh ref={ref} >
        <sphereGeometry args={[1,62,62]}/>
        <meshStandardMaterial map={Plutotexture} roughnessMap={plutobump} metalness={0}  roughness={1} />

      </mesh>
   
    )
  }


  