import Lights from "../components/lights";
import { ChunkManager } from "../components/chunks/chunk-manager";
import {
  EffectComposer,
  Bloom,
  ToneMapping,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

export function MainScene() {
  return (
    <>
      <Lights />
      <ChunkManager />

      <EffectComposer enableNormalPass={false}>
        <Bloom
          luminanceThreshold={0}
          mipmapBlur
          luminanceSmoothing={0.0}
          intensity={5}
        />
        <Noise opacity={0.04} />
        <Vignette eskil={false} offset={0.08} darkness={0.9} />
        <ToneMapping />
      </EffectComposer>
    </>
  );
}
