import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

interface BoxProps {
  position: [number, number, number];
  isWireframe?: boolean;
}

const Box = ({ position, isWireframe = false }: BoxProps) => {
  const ref = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    ref.current.setMatrixAt(0, new THREE.Matrix4());
  }, [position]);

  return (
    <instancedMesh
      ref={ref}
      position={position}
      args={[undefined, undefined, 1]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="gray"
        wireframe={isWireframe}
        opacity={isWireframe ? 0.5 : 1}
        transparent={isWireframe}
      />
    </instancedMesh>
  );
};

export default Box;
