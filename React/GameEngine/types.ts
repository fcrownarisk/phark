// Constants for chunk size
export const CHUNK_SIZE = 16;
export const CHUNK_HEIGHT = 256;

// Represents a position within a chunk
export interface LocalPosition {
  x: number;
  y: number;
  z: number;
}

// Represents a chunk coordinate
export interface ChunkCoordinate {
  x: number;
  z: number;
}

// Represents a global position in the world
export interface GlobalPosition {
  x: number;
  y: number;
  z: number;
}

// Represents a complete position, including chunk and local coordinates
export interface Position {
  chunk: ChunkCoordinate;
  local: LocalPosition;
}

// Utility functions for working with positions
export class PositionUtils {
  // Convert a global position to a chunk-based position
  static globalToChunkPosition(global: GlobalPosition): Position {
    return {
      chunk: {
        x: Math.floor(global.x / CHUNK_SIZE),
        z: Math.floor(global.z / CHUNK_SIZE)
      },
      local: {
        x: global.x % CHUNK_SIZE,
        y: global.y,
        z: global.z % CHUNK_SIZE
      }
    };
  }

  // Convert a chunk-based position to a global position
  static chunkToGlobalPosition(position: Position): GlobalPosition {
    return {
      x: position.chunk.x * CHUNK_SIZE + position.local.x,
      y: position.local.y,
      z: position.chunk.z * CHUNK_SIZE + position.local.z
    };
  }

  // Calculate the distance between two positions
  static distance(pos1: Position, pos2: Position): number {
    const global1 = this.chunkToGlobalPosition(pos1);
    const global2 = this.chunkToGlobalPosition(pos2);
    
    return Math.sqrt(
      Math.pow(global1.x - global2.x, 2) +
      Math.pow(global1.y - global2.y, 2) +
      Math.pow(global1.z - global2.z, 2)
    );
  }

  // Check if two positions are in the same chunk
  static isSameChunk(pos1: Position, pos2: Position): boolean {
    return pos1.chunk.x === pos2.chunk.x && pos1.chunk.z === pos2.chunk.z;
  }

  // Get adjacent positions (including diagonals)
  static getAdjacentPositions(position: Position): Position[] {
    const adjacent: Position[] = [];
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          if (dx === 0 && dy === 0 && dz === 0) continue;
          
          const newLocal: LocalPosition = {
            x: position.local.x + dx,
            y: position.local.y + dy,
            z: position.local.z + dz
          };

          let newChunk = { ...position.chunk };

          if (newLocal.x < 0) {
            newChunk.x--;
            newLocal.x += CHUNK_SIZE;
          } else if (newLocal.x >= CHUNK_SIZE) {
            newChunk.x++;
            newLocal.x -= CHUNK_SIZE;
          }

          if (newLocal.z < 0) {
            newChunk.z--;
            newLocal.z += CHUNK_SIZE;
          } else if (newLocal.z >= CHUNK_SIZE) {
            newChunk.z++;
            newLocal.z -= CHUNK_SIZE;
          }

          if (newLocal.y >= 0 && newLocal.y < CHUNK_HEIGHT) {
            adjacent.push({ chunk: newChunk, local: newLocal });
          }
        }
      }
    }
    return adjacent;
  }
}