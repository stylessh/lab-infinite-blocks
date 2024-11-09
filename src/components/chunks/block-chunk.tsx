import { useMemo } from "react";
import { CHUNK_SIZE } from "./use-chunks";
import Box from "../box";

// Define gap size between boxes
const GAP = 0.04;

/**
 * This is a chunk of blocks that are used to build the world.
 * blocks are 1x1x1 with subtle height variations between adjacent blocks
 * and small gaps between them
 */
export const BlockChunk = () => {
  const { positions } = useMemo(() => {
    // Generate a height map first to ensure smooth transitions
    const map: number[][] = Array(CHUNK_SIZE)
      .fill(0)
      .map(() => Array(CHUNK_SIZE).fill(0));

    // Initialize with small random variations
    for (let x = 0; x < CHUNK_SIZE; x++) {
      for (let z = 0; z < CHUNK_SIZE; z++) {
        // Small random variation between -0.5 and 0.5
        map[x][z] = (Math.random() - 1.5) * 1.2;
      }
    }

    // Smooth the heights by averaging with neighbors
    for (let x = 1; x < CHUNK_SIZE - 1; x++) {
      for (let z = 1; z < CHUNK_SIZE - 1; z++) {
        map[x][z] =
          ((map[x - 1][z] + map[x + 1][z] + map[x][z - 1] + map[x][z + 1]) /
            4) *
            0.5 +
          map[x][z] * 0.5;
      }
    }

    // Calculate all positions at once
    const positions: [number, number, number][] = [];
    for (let x = 0; x < CHUNK_SIZE; x++) {
      for (let z = 0; z < CHUNK_SIZE; z++) {
        positions.push([
          x * (1 + GAP) - CHUNK_SIZE / 2,
          map[x][z],
          z * (1 + GAP * 2) - CHUNK_SIZE / 2,
        ]);
      }
    }

    return { positions };
  }, []);

  return <Box positions={positions} />;
};
