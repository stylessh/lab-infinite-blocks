import { Canvas } from "@react-three/fiber";
import { MainScene } from "./scenes/main";

function App() {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",
      }}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      camera={{ position: [0, 5, 10], fov: 25 }}
    >
      <MainScene />
    </Canvas>
  );
}

export default App;
