import { useMemo } from "react";
import { CHUNK_SIZE } from "./use-chunks";
import { InstancedMonitor } from "../instanced-monitor";

// Define gap size between monitors
const GAP = 0.02;

export const BlockChunk = () => {
  const { positions } = useMemo(() => {
    // Generate a height map first to ensure smooth transitions
    const map: number[][] = Array(CHUNK_SIZE)
      .fill(0)
      .map(() => Array(CHUNK_SIZE).fill(0));

    // Initialize with small random variations
    for (let x = 0; x < CHUNK_SIZE; x++) {
      for (let z = 0; z < CHUNK_SIZE; z++) {
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

    const positions: [number, number, number][] = [];

    // Calculate positions for all monitors
    for (let x = 0; x < CHUNK_SIZE; x++) {
      for (let z = 0; z < CHUNK_SIZE; z++) {
        const xPos = x * (1 + GAP) - CHUNK_SIZE / 2;
        const yPos = map[x][z];
        const zPos = z * (1 + GAP * 2) - CHUNK_SIZE / 2;
        positions.push([xPos, yPos, zPos]);
      }
    }

    return { positions };
  }, []);

  return <InstancedMonitor positions={positions} />;
};
