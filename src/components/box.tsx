import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

interface BoxProps {
  position: [number, number, number];
  isWireframe?: boolean;
}

const Box = ({ position }: BoxProps) => {
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
      <meshStandardMaterial color="#998b8a" />
    </instancedMesh>
  );
};

export default Box;
