import {
  Container,
  render,
  Sprite,
  Stage,
  useTick,
  _ReactPixi,
} from '@pixi/react';
import { useState } from 'react';

const MovingSprite = (props: { character: string }) => {
  // states
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [speed, setSpeed] = useState(0.01);
  const [target, setTarget] = useState({
    x: Math.random() * 800,
    y: Math.random() * 600,
  });
  const [targetLocked, setTargetLocked] = useState(false);

  // tick
  useTick((delta) => {
    setX((target.x - x) * (speed * delta) + x);
    setY((target.y - y) * (speed * delta) + y);

    if (Math.abs(target.x - x) + Math.abs(target.y - y) < 10) {
      if (!targetLocked) {
        setTargetLocked(true);
        setTimeout(() => {
          setTarget({ x: Math.random() * 850, y: Math.random() * 650 });
          setTargetLocked(false);
        }, Math.random() * 25000);
      }
    }
  });

  return (
    <Sprite
      image={props.character}
      anchor={0.5}
      x={x}
      y={y}
      width={100}
      height={100}
    />
  );
};

export default MovingSprite;
