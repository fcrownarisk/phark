import { Unit } from './unit';
import { Position } from './types';

export class Operator extends Unit {
  constructor(
    position: Position,
    health: number,
    attack: number,
    public range: number
  ) {
    super(position, health, attack);
  }

  public update(): void {
    // Operators don't move, so no update needed
  }

  public (target: Unit): void {
    target.takeDamage;
  }
}