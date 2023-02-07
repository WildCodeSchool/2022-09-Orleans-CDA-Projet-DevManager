import { Container, render, Sprite, Stage, useTick } from '@pixi/react';
import { useState } from 'react';

let i = 0;

const MovingSprite = () => {
  // states
  const [x, setX] = useState(330);
  const [y, setY] = useState(330);

  // custom ticker
  useTick((delta) => {
    i += 0.11 * delta;

    setX(Math.sin(delta / 10 + i) * 55);
    setY(Math.cos(delta / 10 + i) * 55);
  });

  return (
    <Sprite
      image="man1.png"
      anchor={0.5}
      x={x}
      y={y}
      width={120}
      height={120}
    />
  );
};

export default MovingSprite;
