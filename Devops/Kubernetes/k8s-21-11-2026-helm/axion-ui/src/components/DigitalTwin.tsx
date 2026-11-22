import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Text, Grid, QuadraticBezierLine } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

interface DigitalTwinProps {
  deviceId: string;
  deviceType: string;
  temperature: number; // Will drive the emissive color
  status?: string;
}

// Procedural abstract industrial model
function ProceduralDevice({ deviceId, deviceType, status = 'healthy' }: { deviceId: string, deviceType: string, status?: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const currentColor = useMemo(() => {
    if (status === 'critical') return new THREE.Color('#ef4444'); // Red
    if (status === 'warning') return new THREE.Color('#f59e0b'); // Yellow
    return new THREE.Color('#10b981'); // Green
  }, [status]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003; // Slow ambient rotation
    }
    
    if (coreRef.current) {
      if (status === 'critical') {
        const pulse = Math.sin(state.clock.elapsedTime * 8) * 0.5 + 0.5;
        (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 2 + pulse * 4;
      } else if (status === 'warning') {
        const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 0.5;
        (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1 + pulse * 2;
      } else {
        (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1;
      }
    }
  });

  const typeLower = deviceType.toLowerCase();

  return (
    <group ref={groupRef} scale={[0.9, 0.9, 0.9]}>
      
      {/* Text font for the painted labels */}
      {/* Moved text to individual models below */}

      {/* Base Platform (Shared) */}
      <mesh position={[0, -1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 0.2, 3.5]} />
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Nameplate on Base Platform */}
      <Text
        position={[0, -1.2, 1.76]}
        rotation={[0, 0, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
      >
        {deviceId}
      </Text>

      {/* Shared Environment Setup (Pipes & Cables) */}
      <group>
        {/* Main Feed Pipe */}
        <mesh position={[-1.5, -0.5, 1.2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.15, 0.15, 1.4, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.5} />
        </mesh>
        <mesh position={[-1.5, 0.2, 0.6]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.15, 0.15, 1.2, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.5} />
        </mesh>
        
        {/* Secondary Pipe */}
        <mesh position={[1.8, -0.7, -1]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.2, 1, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.4} />
        </mesh>
        
        {/* Power Cables */}
        <QuadraticBezierLine
          start={[-2, -1.1, -1]}
          end={[-0.5, 0.5, 0]}
          mid={[-1.5, -0.5, -0.5]}
          color="#ef4444"
          lineWidth={2}
        />
        <QuadraticBezierLine
          start={[-1.8, -1.1, -1.2]}
          end={[-0.5, 0.3, 0.2]}
          mid={[-1.3, -0.7, -0.6]}
          color="#3b82f6"
          lineWidth={2}
        />
      </group>

      {/* --- MOTOR GEOMETRY --- */}
      {typeLower.includes('motor') && (
        <group position={[0, -0.2, 0]}>
          {/* Motor Body */}
          <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[1, 1, 3, 32]} />
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.4} />
          </mesh>
          {/* Motor Fins */}
          {[...Array(6)].map((_, i) => (
            <mesh key={i} position={[-1.5 + i * 0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[1.1, 1.1, 0.1, 32]} />
              <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.5} />
            </mesh>
          ))}
          {/* Motor Shaft */}
          <mesh position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[0.2, 0.2, 2, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={1} roughness={0.1} />
          </mesh>
          {/* Glowing Core */}
          <mesh ref={coreRef} position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[1.05, 1.05, 2.8, 32]} />
            <meshStandardMaterial 
              color="#000000" emissive={currentColor} emissiveIntensity={1}
              transparent opacity={0.3} wireframe
            />
          </mesh>
        </group>
      )}

      {/* --- COMPRESSOR GEOMETRY --- */}
      {typeLower.includes('compressor') && (
        <group position={[0, -0.2, 0]}>
          {/* Main Block */}
          <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.5, 1.5, 1.5]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.5} />
          </mesh>
          {/* Vertical Pistons */}
          <mesh position={[-0.7, 0.8, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.4, 0.5, 1.2, 16]} />
            <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[0.7, 0.8, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.4, 0.5, 1.2, 16]} />
            <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.3} />
          </mesh>
          {/* Glowing Core inside block */}
          <mesh ref={coreRef} position={[0, -0.2, 0]}>
            <boxGeometry args={[2.6, 1.6, 1.6]} />
            <meshStandardMaterial 
              color="#000000" emissive={currentColor} emissiveIntensity={1}
              transparent opacity={0.3} wireframe
            />
          </mesh>
        </group>
      )}

      {/* --- PUMP GEOMETRY (Default/Fallback) --- */}
      {(!typeLower.includes('motor') && !typeLower.includes('compressor')) && (
        <group position={[0, -0.2, 0]}>
          {/* Pump Motor */}
          <mesh position={[-1, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[0.8, 0.8, 2.5, 32]} />
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.4} />
          </mesh>
          {/* Connection Shaft */}
          <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[0.2, 0.2, 1.5, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={1} roughness={0.1} />
          </mesh>
          {/* Volute / Pump Head */}
          <mesh position={[1.5, 0, 0]} castShadow receiveShadow>
            <sphereGeometry args={[1.1, 32, 32]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.5} />
          </mesh>
          {/* Top Flange */}
          <mesh position={[1.5, 1.1, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.8, 16]} />
            <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.4} />
          </mesh>
          {/* Glowing Core */}
          <mesh ref={coreRef} position={[1.5, 0, 0]}>
            <sphereGeometry args={[1.15, 32, 32]} />
            <meshStandardMaterial 
              color="#000000" emissive={currentColor} emissiveIntensity={1}
              transparent opacity={0.3} wireframe
            />
          </mesh>
        </group>
      )}

      {/* Shared Data Rings */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-1.5, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.6, 0.015, 16, 64]} />
          <meshBasicMaterial color={currentColor} transparent opacity={0.5} />
        </mesh>
        <mesh position={[1.5, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.6, 0.015, 16, 64]} />
          <meshBasicMaterial color={currentColor} transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

export function DigitalTwin({ deviceId, deviceType, status = 'healthy' }: DigitalTwinProps) {
  return (
    <div className="w-full h-full min-h-[300px] relative rounded-md overflow-hidden bg-gradient-to-b from-[#09090b] to-[#121212] border border-[#262626] group">
      {/* Overlay UI */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h3 className="text-white font-bold text-sm flex items-center gap-2 uppercase tracking-wide">
          <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] animate-pulse ${status === 'critical' ? 'bg-red-500 text-red-500' : status === 'warning' ? 'bg-amber-500 text-amber-500' : 'bg-green-500 text-green-500'}`}></div>
          {deviceType} Digital Twin
        </h3>
        <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Live Telemetry Sync</p>
      </div>

      <div className="absolute bottom-4 left-4 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-xs text-slate-400 uppercase tracking-widest bg-black/50 px-2 py-1 rounded">Drag to rotate</p>
      </div>

      <Canvas shadows camera={{ position: [5, 4, 6], fov: 45 }} gl={{ preserveDrawingBuffer: true }}>
        <color attach="background" args={['#09090b']} />
        <fog attach="fog" args={['#09090b', 10, 20]} />
        
        {/* Holographic Grid Floor */}
        <Grid 
          position={[0, -1.3, 0]}
          args={[20, 20]} 
          cellSize={0.5} 
          cellThickness={1} 
          cellColor="#262626" 
          sectionSize={2.5} 
          sectionThickness={1.5} 
          sectionColor="#333333" 
          fadeDistance={15} 
          fadeStrength={1}
        />

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[2048, 2048]}
          shadow-camera-top={5}
          shadow-camera-right={5}
          shadow-camera-bottom={-5}
          shadow-camera-left={-5}
        />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#38bdf8" />
        
        {/* Environment Reflections */}
        <Environment preset="city" />

        <ProceduralDevice deviceId={deviceId} deviceType={deviceType} status={status} />

        {/* Post Processing for Glow/Bloom */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
        </EffectComposer>

        {/* Controls */}
        <OrbitControls 
          enablePan={false}
          minDistance={4}
          maxDistance={12}
          maxPolarAngle={Math.PI / 2 - 0.05} // Prevent going below ground grid
        />
      </Canvas>
    </div>
  );
}
