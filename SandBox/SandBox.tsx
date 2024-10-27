'use client'
import React, { useState, useEffect, useRef } from `React`
import { Button } from "@/components/ui/button"
declare module X{}
declare module Y{}
declare module Z{}
const GRID_SIZE = 8
const CELL_SIZE = 50
const ENEMY_SPEED = 0.5
const OPERATOR_COST = 10
const INITIAL_DP = 30
const DP_GAIN_RATE = 1

type Operator = {
  x: number
  y: number
  attack: number
  range: number
}

type Enemy = {
  x: number
  y: number
  health: number
}

export default function Component() {
  const [operators, setOperators] = useState<Operator[]>([])
  const [enemies, setEnemies] = useState<Enemy[]>([])
  const [deploymentPoints, setDeploymentPoints] = useState(INITIAL_DP)
  const [isRunning, setIsRunning] = useState(false)
  const [selectedCell, setSelectedCell] = useState<{ x: number; y: number } | null>(null)
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()

  const spawnEnemy = () => {
    const newEnemy: Enemy = { x: 0, y: Math.floor(Math.random() * GRID_SIZE), health: 100 }
    setEnemies(prev => [...prev, newEnemy])
  }

  const placeOperator = (x: number, y: number) => {
    if (deploymentPoints >= OPERATOR_COST) {
      const newOperator: Operator = { x, y, attack: 10, range: 2 }
      setOperators(prev => [...prev, newOperator])
      setDeploymentPoints(prev => prev - OPERATOR_COST)
    }
  }

  const removeOperator = (x: number, y: number) => {
    setOperators(prev => prev.filter(op => op.x !== x || op.y !== y))
    setDeploymentPoints(prev => prev + OPERATOR_COST / 2)
  }

  const updateGame = (time: number) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current

      // Move enemies
      setEnemies(prev => prev.map(enemy => ({
        ...enemy,
        x: enemy.x + ENEMY_SPEED * deltaTime / 1000
      })).filter(enemy => enemy.x < GRID_SIZE && enemy.health > 0))

      // Operators attack
      setEnemies(prev => prev.map(enemy => {
        operators.forEach(op => {
          const distance = Math.sqrt(Math.pow(op.x - enemy.x, 2) + Math.pow(op.y - enemy.y, 2))
          if (distance <= op.range) {
            enemy.health -= op.attack * deltaTime / 1000
          }
        })
        return enemy
      }))

      // Gain DP over time
      setDeploymentPoints(prev => Math.min(prev + DP_GAIN_RATE * deltaTime / 1000, 99))

      // Spawn new enemy occasionally
      if (Math.random() < 0.002 * deltaTime) {
        spawnEnemy()
      }
    }

    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(updateGame)
  }

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(updateGame)
    } else {
      cancelAnimationFrame(requestRef.current!)
    }
    return () => cancelAnimationFrame(requestRef.current!)
  }, [isRunning])

  const handleCellClick = (x: number, y: number) => {
    const existingOperator = operators.find(op => op.x === x && op.y === y)
    if (existingOperator) {
      removeOperator(x, y)
    } else if (selectedCell?.x === x && selectedCell?.y === y) {
      setSelectedCell(null)
    } else {
      setSelectedCell({ x, y })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Arknights Sandbox</h1>
      <div className="mb-4">
        <Button onClick={() => setIsRunning(!isRunning)} className="mr-2">
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={() => {
          setOperators([])
          setEnemies([])
          setDeploymentPoints(INITIAL_DP)
          setIsRunning(false)
        }}>
          Reset
        </Button>
      </div>
      <div className="mb-4">Deployment Points: {Math.floor(deploymentPoints)}</div>
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          gap: '1px',
          backgroundColor: '#4a5568',
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE
          const y = Math.floor(index / GRID_SIZE)
          const operator = operators.find(op => op.x === x && op.y === y)
          const enemy = enemies.find(e => Math.floor(e.x) === x && Math.floor(e.y) === y)
          const isSelected = selectedCell?.x === x && selectedCell?.y === y

          return (
            <div
              key={index}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                backgroundColor: isSelected ? '#4299e1' : '#2d3748',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={() => handleCellClick(x, y)}
            >
              {operator && (
                <div className="bg-blue-500 rounded-full w-4/5 h-4/5 flex items-center justify-center">
                  OP
                </div>
              )}
              {enemy && (
                <div className="bg-red-500 rounded-full w-4/5 h-4/5 flex items-center justify-center">
                  {Math.ceil(enemy.health)}
                </div>
              )}
            </div>
          )
        })}
      </div>
      {selectedCell && (
        <Button 
          onClick={() => {
            placeOperator(selectedCell.x, selectedCell.y)
            setSelectedCell(null)
          }}
          className="mt-4"
          disabled={deploymentPoints < OPERATOR_COST}
        >
          Place Operator (Cost: {OPERATOR_COST} DP)
        </Button>
      )}
    </div>
  )
}