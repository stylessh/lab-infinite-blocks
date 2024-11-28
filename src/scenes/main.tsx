import Lights from "../components/lights";
import { ChunkManager } from "../components/chunks/chunk-manager";
import {
  EffectComposer,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { Pixelation } from "@react-three/postprocessing";
import { OrbitControls } from "@react-three/drei";

export const MainScene = () => {
  return (
    <>
      <Lights />
      <ChunkManager />
      {import.meta.env.DEV && <OrbitControls />}
      <EffectComposer enableNormalPass={false}>
        <Vignette eskil={false} offset={0.05} darkness={0.9} />
        <ToneMapping />
        <Pixelation granularity={2.5} />
      </EffectComposer>
    </>
  );
};
