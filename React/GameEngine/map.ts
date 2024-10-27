import { Position, ChunkCoordinate, CHUNK_SIZE, CHUNK_HEIGHT, PositionUtils } from './types';
import { Unit } from './unit';

export class Map {
  private chunks: Record<string, (Unit | null)[][][]>;

  constructor() {
    this.chunks = {};
  }

  private getChunkKey(chunk: ChunkCoordinate): string {
    return `${chunk.x},${chunk.z}`;
  }

  private getOrCreateChunk(chunk: ChunkCoordinate): (Unit | null)[][][] {
    const key = this.getChunkKey(chunk);
    if (!this.chunks[key]) {
      this.chunks[key] = Array(CHUNK_SIZE).fill(null).map(() => 
        Array(CHUNK_HEIGHT).fill(null).map(() => 
          Array(CHUNK_SIZE).fill(null)
        )
      );
    }
    return this.chunks[key];
  }

  public placeUnit(unit: Unit): void {
    const chunk = this.getOrCreateChunk(unit.position.chunk);
    const { x, y, z } = unit.position.local;
    if (this.isValidPosition(unit.position) && !chunk[x][y][z]) {
      chunk[x][y][z] = unit;
    }
  }

  public moveUnit(unit: Unit, newPosition: Position): void {
    if (this.isValidPosition(newPosition) && !this.getUnitAt(newPosition)) {
      this.removeUnit(unit.position);
      const chunk = this.getOrCreateChunk(newPosition.chunk);
      unit.position = newPosition;
    }
  }

  public getUnitAt(position: Position): Unit | null {
    const chunk = this.chunks[this.getChunkKey(position.chunk)];
    if (!chunk) return null;
    const { x, y, z } = position.local;
    return chunk[x][y][z];
  }

  public removeUnit(position: Position): void {
    const chunk = this.chunks[this.getChunkKey(position.chunk)];
    if (chunk) {
      const { x, y, z } = position.local;
      chunk[x][y][z] = null;
    }
  }

  public getDistance(pos1: Position, pos2: Position): number {
    return PositionUtils.distance(pos1, pos2);
  }

  public isValidPosition(position: Position): boolean {
    return position.local.x >= 0 && position.local.x < CHUNK_SIZE &&
           position.local.y >= 0 && position.local.y < CHUNK_HEIGHT &&
           position.local.z >= 0 && position.local.z < CHUNK_SIZE;
  }

  public getAdjacentPositions(position: Position): Position[] {
    return PositionUtils.getAdjacentPositions(position).filter(pos => this.isValidPosition(pos));
  }

  public getAllUnits(): Unit[] {
    const units: Unit[] = [];
    for (const chunk of Object.values(this.chunks)) {
      for (let x = 0; x < CHUNK_SIZE; x++) {
        for (let y = 0; y < CHUNK_HEIGHT; y++) {
          for (let z = 0; z < CHUNK_SIZE; z++) {
            const unit = chunk[x][y][z];
            if (unit) units.push(unit);
          }
        }
      }
    }
    return units;
  }

  public getUnitsInChunk(chunkCoord: ChunkCoordinate): Unit[] {
    const chunk = this.chunks[this.getChunkKey(chunkCoord)];
    if (!chunk) return [];

    const units: Unit[] = [];
    for (let x = 0; x < CHUNK_SIZE; x++) {
      for (let y = 0; y < CHUNK_HEIGHT; y++) {
        for (let z = 0; z < CHUNK_SIZE; z++) {
          const unit = chunk[x][y][z];
          if (unit) units.push(unit);
        }
      }
    }
    return units;
  }

  public getUnitsInRadius(center: Position, radius: number): Unit[] {
    const centerGlobal = PositionUtils.chunkToGlobalPosition(center);
    const units: Unit[] = [];

    // Calculate the affected chunks
    const minChunkX = Math.floor((centerGlobal.x - radius) / CHUNK_SIZE);
    const maxChunkX = Math.floor((centerGlobal.x + radius) / CHUNK_SIZE);
    const minChunkZ = Math.floor((centerGlobal.z - radius) / CHUNK_SIZE);
    const maxChunkZ = Math.floor((centerGlobal.z + radius) / CHUNK_SIZE);

    for (let chunkX = minChunkX; chunkX <= maxChunkX; chunkX++) {
      for (let chunkZ = minChunkZ; chunkZ <= maxChunkZ; chunkZ++) {
        const chunkUnits = this.getUnitsInChunk({ x: chunkX, z: chunkZ });
        for (const unit of chunkUnits) {
          if (this.getDistance(center, unit.position) <= radius) {
            units.push(unit);
          }
        }
      }
    }

    return units;
  }
}