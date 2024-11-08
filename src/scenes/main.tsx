import Lights from "../components/lights";
import { ChunkManager } from "../components/chunks/chunk-manager";
import {
  EffectComposer,
  ToneMapping,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { Pixelation } from "@react-three/postprocessing";

export const MainScene = () => {
  return (
    <>
      <Lights />
      <ChunkManager />

      <EffectComposer enableNormalPass={false}>
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.05} darkness={0.9} />
        <ToneMapping />
        <Pixelation granularity={3.5} />
      </EffectComposer>
    </>
  );
};
