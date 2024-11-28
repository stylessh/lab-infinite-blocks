import { useGLTF, createInstances } from "@react-three/drei";
import * as THREE from "three";
import { RenderTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const MODEL_PATH = "/models/monitor.glb";
useGLTF.preload(MODEL_PATH);

interface Props {
  positions: [number, number, number][];
}

interface MonitorNodes {
  nodes: {
    monitor: THREE.Mesh;
    pantalla: THREE.Mesh;
    cable: THREE.Mesh;
    Cube007: THREE.Mesh;
  };
}

export const InstancedMonitor = ({ positions }: Props) => {
  const { nodes } = useGLTF(MODEL_PATH) as unknown as MonitorNodes;
  const [MonitorInstances, MonitorInstance] = createInstances();
  const [ScreenInstances, ScreenInstance] = createInstances();

  // Create screen material with render texture
  // const screenMaterial = new THREE.MeshStandardMaterial({
  //   color: "#000",
  //   emissive: "#000",
  //   emissiveIntensity: 0.5,
  // });

  return (
    <>
      {/* Monitor frame instances */}
      <MonitorInstances
        limit={positions.length}
        geometry={nodes["Cube007"].geometry}
        material={nodes["Cube007"].material}
      >
        {positions.map((position, i) => (
          <MonitorInstance key={i} position={position} scale={[4, 4, 4]} />
        ))}
      </MonitorInstances>

      {/* Screen instances */}
      <ScreenInstances
        limit={positions.length}
        geometry={nodes.pantalla.geometry}
        // material={screenMaterial}
      >
        <meshStandardMaterial attach="material">
          <RenderTexture attach="map">
            <color attach="background" args={["#000000"]} />
            <InnerScene />
          </RenderTexture>
        </meshStandardMaterial>

        {positions.map((position, i) => (
          <ScreenInstance
            key={i}
            position={[position[0], position[1] + 0.25, position[2] + 0.45]}
            scale={[4, 4, 4]}
          />
        ))}
      </ScreenInstances>
    </>
  );
};

// Example scene to render on screens
const InnerScene = () => {
  const boxRef = useRef<THREE.Mesh>();

  useFrame(() => {
    if (boxRef.current?.rotation.x) boxRef.current.rotation.x += 0.1;
  });

  return (
    <>
      <mesh ref={boxRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="hotpink" />
      </mesh>
    </>
  );
};
