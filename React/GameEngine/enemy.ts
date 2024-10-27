import { Unit } from './unit';
import { Position } from './types';

export type EnemyAction = 'move' | 'attack' | 'wait';

export class Enemy extends Unit {
  constructor(
    position: Position,
    health: number,
    attack: number,
    public speed: number
  ) {
    super(position, health, attack);
  }

  public update(): void {
    // Enemy behavior is controlled by AI
  }

  public performAction(action: EnemyAction): void {
    switch (action) {
      case 'move':
        // Movement is handled by the Map class
        break;
      case 'attack':
        // Attack is handled by the GameEngine
        break;
      case 'wait':
        // Do nothing
        break;
    }
  }
}