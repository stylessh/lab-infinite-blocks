import { useMemo } from "react";
import { CHUNK_SIZE } from "./use-chunks";
import { Computer } from "../monitor";
import Box from "../box";

// Define gap size between boxes
const GAP = 0.04;

const MONITOR_CHANCE = 0.05; // 5% chance for a monitor on top of a box
const CENTER_RANGE = 0.7;
const ROTATION_VARIATION = 0.3;
const MONITOR_MIN_DISTANCE = 3; // Minimum distance between monitors in grid units

/**
 * This is a chunk of monitors that are used to build the world.
 * monitors are 1x1x1 with subtle height variations between adjacent monitors
 * and small gaps between them
 */
export const BlockChunk = () => {
  const { positions, monitorPositions } = useMemo(() => {
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
    const monitorPositions: {
      position: [number, number, number];
      rotation: number;
    }[] = [];

    // Keep track of occupied positions
    const occupiedPositions: Set<string> = new Set();

    // Calculate center bounds
    const centerX = Math.floor(CHUNK_SIZE / 2);
    const radius = Math.floor((CHUNK_SIZE * CENTER_RANGE) / 2);

    // Helper function to check if a position is too close to existing monitors
    const isTooCloseToOtherMonitors = (x: number, z: number): boolean => {
      for (let dx = -MONITOR_MIN_DISTANCE; dx <= MONITOR_MIN_DISTANCE; dx++) {
        for (let dz = -MONITOR_MIN_DISTANCE; dz <= MONITOR_MIN_DISTANCE; dz++) {
          const checkPos = `${x + dx},${z + dz}`;
          if (occupiedPositions.has(checkPos)) {
            return true;
          }
        }
      }
      return false;
    };

    // First pass: collect all valid positions
    const validPositions: { x: number; z: number }[] = [];
    
    for (let x = 0; x < CHUNK_SIZE; x++) {
      for (let z = 0; z < CHUNK_SIZE; z++) {
        const distanceFromCenter = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(z - centerX, 2)
        );

        if (distanceFromCenter < radius && Math.random() < MONITOR_CHANCE) {
          validPositions.push({ x, z });
        }
      }
    }

    // Shuffle valid positions
    validPositions.sort(() => Math.random() - 0.5);

    // Second pass: place monitors with spacing
    for (const { x, z } of validPositions) {
      if (!isTooCloseToOtherMonitors(x, z)) {
        const xPos = x * (1 + GAP) - CHUNK_SIZE / 2;
        const yPos = map[x][z];
        const zPos = z * (1 + GAP * 2) - CHUNK_SIZE / 2;

        // Mark this position and surrounding area as occupied
        occupiedPositions.add(`${x},${z}`);

        const baseRotation = 0;
        const variation = (Math.random() * 2 - 1) * ROTATION_VARIATION;
        const finalRotation = baseRotation + variation;

        monitorPositions.push({
          position: [xPos, yPos + 0.5, zPos],
          rotation: finalRotation,
        });
      }
    }

    // Add boxes for all positions
    for (let x = 0; x < CHUNK_SIZE; x++) {
      for (let z = 0; z < CHUNK_SIZE; z++) {
        const xPos = x * (1 + GAP) - CHUNK_SIZE / 2;
        const yPos = map[x][z];
        const zPos = z * (1 + GAP * 2) - CHUNK_SIZE / 2;
        positions.push([xPos, yPos, zPos]);
      }
    }

    return { positions, monitorPositions };
  }, []);

  return (
    <>
      <Box positions={positions} />
      {monitorPositions.map((monitor, index) => (
        <group
          key={`monitor-${index}`}
          position={monitor.position}
          rotation={[0, monitor.rotation, 0]}
        >
          <Computer />
        </group>
      ))}
    </>
  );
};
