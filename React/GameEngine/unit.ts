import { Position } from './types.ts';

export abstract class Unit {
  constructor(
    public position: Position,
    public health: number,
    public attack: number
  ) {}

  public abstract update(): void;

  public takeDamage(amount: number): void {
    this.health = Math.max(0, this.health - amount);
  }
}