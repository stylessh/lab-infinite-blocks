const Lights = () => {
  return (
    <>
      <hemisphereLight intensity={0.1} color={"red"} />
      <directionalLight intensity={0.02} position={[-4.5, 5, 4.5]} />
      <spotLight
        decay={0}
        position={[-20, 10, 20]}
        angle={0.4}
        penumbra={0.9}
        intensity={1}
        castShadow
        shadow-mapSize={2048}
      />
    </>
  );
};

export default Lights;
