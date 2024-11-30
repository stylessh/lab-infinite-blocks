import Lights from "../components/lights";
import { ChunkManager } from "../components/chunks/chunk-manager";
import {
  EffectComposer,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

export const MainScene = () => {
  const { vignetteEnabled } = useControls("Post Processing", {
    vignetteEnabled: true,
  });

  return (
    <>
      <Lights />
      <ChunkManager />
      {import.meta.env.DEV && <OrbitControls />}
      <EffectComposer enableNormalPass={false}>
        {vignetteEnabled ? (
          <Vignette eskil={false} offset={0.05} darkness={0.9} />
        ) : (
          <></>
        )}
        <ToneMapping />
      </EffectComposer>
    </>
  );
};
