import { Enemy, EnemyAction } from './enemy';
import { Operator } from './operator';
import { Map } from './map';

interface State {
  enemyHealth: number;
  nearestOperatorDistance: number;
  operatorsInRange: number;
}

export class AILearner {
  private qTable: Record<string, Record<EnemyAction, number>> = {};
  private learningRate = 0.1;
  private discountFactor = 0.9;
  private explorationRate = 0.1;

  public decideAction(enemy: Enemy, map: Map): EnemyAction {
    const state = this.getState(enemy, map);
    const stateKey = this.getStateKey(state);

    if (!this.qTable[stateKey]) {
      this.qTable[stateKey] = { move: 0, attack: 0, wait: 0 };
    }

    if (Math.random() < this.explorationRate) {
      return this.getRandomAction();
    } else {
      return this.getBestAction(stateKey);
    }
  }

  public learn(enemies: Enemy[], operators: Operator[]): void {
    enemies.forEach(enemy => {
      const oldState = this.getState(enemy, {} as Map); // We need the actual map here
      const oldStateKey = this.getStateKey(oldState);
      const action = this.getBestAction(oldStateKey);
      const newState = this.getState(enemy, {} as Map); // We need the actual map here
      const newStateKey = this.getStateKey(newState);
      const reward = this.calculateReward(enemy, operators);

      if (!this.qTable[newStateKey]) {
        this.qTable[newStateKey] = { move: 0, attack: 0, wait: 0 };
      }

      const oldQ = this.qTable[oldStateKey][action];
      const maxNewQ = Math.max(...Object.values(this.qTable[newStateKey]));
      const newQ = oldQ + this.learningRate * (reward + this.discountFactor * maxNewQ - oldQ);

      this.qTable[oldStateKey][action] = newQ;
    });
  }

  private getState(enemy: Enemy, map: Map): State {
    // In a real implementation, we would calculate these values based on the game state
    return {
      enemyHealth: enemy.health,
      nearestOperatorDistance: 1, // Placeholder
      operatorsInRange: 0, // Placeholder
    };
  }

  private getStateKey(state: State): string {
    return `${state.enemyHealth}-${state.nearestOperatorDistance}-${state.operatorsInRange}`;
  }

  private getRandomAction(): EnemyAction {
    const actions: EnemyAction[] = ['move', 'attack', 'wait'];
    return actions[Math.floor(Math.random() * actions.length)];
  }

  private getBestAction(stateKey: string): EnemyAction {
    const actions = Object.entries(this.qTable[stateKey]);
    return actions.reduce((best, current) => current[1] > best[1] ? current : best)[0] as EnemyAction;
  }

  private calculateReward(enemy: Enemy, operators: Operator[]): number {
    // In a real implementation, we would calculate the reward based on the game state
    // For example, positive reward for damaging operators, negative for taking damage
    return 0; // Placeholder
  }
}