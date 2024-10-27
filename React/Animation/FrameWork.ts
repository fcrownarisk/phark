interface Unit {
    id: number;
    health: number;
    attack: number;
    defense: number;
    cost: number;
    position: [number, number];
  }
  
  interface Enemy {
    id: number;
    health: number;
    attack: number;
    path: [String[],BigIntToLocaleStringOptions];
    currentPosition: [number, number];
  }
  const gridSize = 10;
const grid: (Unit | null)[][] = Array.from({ length: gridSize }, () =>
  Array.from({ length: gridSize }, () => null)
);
let resources = 0;
const resourceGainPerTick = 1;
  
  function tick() {
    // Gain resources
    resources += resourceGainPerTick;
  
    // Enemy turns
    // Assuming enemies array is defined somewhere
    // enemies.forEach(enemyTurn);
  }
  