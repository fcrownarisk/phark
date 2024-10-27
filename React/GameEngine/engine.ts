import { Map } from './map';
import { Operator } from './operator';
import { Enemy } from './enemy';
import { AILearner } from './ai-learner';
import  './types.ts';
import { Unit } from './unit.ts';

export class GameEngine {
  private map: Map;
  private operators: Operator[];
  private enemies: Enemy[];
  private aiLearner: AILearner;

  constructor() {
    this.map = new Map();
    this.operators = [];
    this.enemies = [];
    this.aiLearner = new AILearner();
  }

  public addOperator(operator: Operator): void {
    this.operators.push(operator);
    this.map.placeUnit;
  }

  public spawnEnemy(enemy: Enemy): void {
    this.enemies.push(enemy);
    this.map.placeUnit(enemy);
  }

  public update(): void {
    // Update operators
    this.operators.forEach(operator => operator.update());

    // Update and move enemies
    this.enemies.forEach(enemy => {
      const action = this.aiLearner.decideAction(enemy, this.map);
      enemy.performAction(action);
      enemy.update();
    });

    // Perform combat
    this.performCombat();

    // Clean up defeated units
    this.cleanupDefeatedUnits();

    // Learn from this turn
    this.aiLearner.learn(this.enemies, this.operators);
  }

  private performCombat(): void {
    this.operators.forEach(operator => {
      const targets = this.enemies.filter
      (unit => unit instanceof Enemy) as Enemy[];
      if (targets.length > 0) {
       return this.addOperator(operator);
      }
    });
  }

  private cleanupDefeatedUnits(): void {
    this.enemies = this.enemies.filter(enemy => {
      if (enemy.health <= 0) {
        this.map.removeUnit(enemy.position);
        return false;
      }
      return true;
    });

    this.operators = this.operators.filter(operator => {
      if (operator.health <= 0) {
        this.map.removeUnit(operator.position);
        return false;
      }
      return true;
    });
  }
}