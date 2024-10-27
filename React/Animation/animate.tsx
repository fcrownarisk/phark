import React, { useState, useEffect, useRef } from React;

type AnimationState = 'idle' | 'attack' | 'skill';

interface Character {
  name: string;
  class: string;
  animations: {
    [key in AnimationState]: string[];
  };
}

const characters: Character[] = [
  {
    name: 'Amiya',
    class: 'Caster',
    animations: {
      idle: ['/amiya-idle-1.png', '/amiya-idle-2.png', '/amiya-idle-3.png'],
      attack: ['/amiya-attack-1.png', '/amiya-attack-2.png', '/amiya-attack-3.png'],
      skill: ['/amiya-skill-1.png', '/amiya-skill-2.png', '/amiya-skill-3.png'],
    },
  },
  {
    name: 'SilverAsh',
    class: 'Guard',
    animations: {
      idle: ['/silverash-idle-1.png', '/silverash-idle-2.png', '/silverash-idle-3.png'],
      attack: ['/silverash-attack-1.png', '/silverash-attack-2.png', '/silverash-attack-3.png'],
      skill: ['/silverash-skill-1.png', '/silverash-skill-2.png', '/silverash-skill-3.png'],
    },
  },
];

const AnimateGenerator: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(characters[0]);
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const [animationSpeed, setAnimationSpeed] = useState<number>(500);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const animationInterval = useRef<number | null>(null);

  useEffect(() => {
    if (animationInterval.current) {
      clearInterval(animationInterval.current);
    }

    animationInterval.current = window.setInterval(() => {
      setCurrentFrame((prevFrame) => 
        (prevFrame + 1) % selectedCharacter.animations[animationState].length
      );
    }, animationSpeed);

    return () => {
      if (animationInterval.current) {
        clearInterval(animationInterval.current);
      }
    };
  }, [selectedCharacter, animationState, animationSpeed]);

  const handleCharacterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCharacter = characters.find(char => char.name === event.target.value);
    if (newCharacter) {
      setSelectedCharacter(newCharacter);
      setCurrentFrame(0);
    }
  };

  const handleAnimationStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAnimationState(event.target.value as AnimationState);
    setCurrentFrame(0);
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnimationSpeed(Number(event.target.value));
  };

const AnimateGenerator = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(characters[0]);
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const [animationSpeed, setAnimationSpeed] = useState<number>(100);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
}
}