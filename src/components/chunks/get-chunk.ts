import { Chunk } from "./use-chunks";
import { BlockChunk } from "./block-chunk";

export const getNewChunk = (): Chunk => {
  const randomId = crypto.randomUUID();

  return {
    id: randomId,
    Component: BlockChunk,
  };
};
