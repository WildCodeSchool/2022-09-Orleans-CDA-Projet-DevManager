import { useState, useEffect } from 'react';
import { Stage, Sprite, useApp, Text, Container } from '@pixi/react';
import MovingSprite from './movingSprite';
import { TextStyle } from 'pixi.js';

const GameFrame = () => {
  // State to store character position
  const [characterPosition, setCharacterPosition] = useState({
    x: 400,
    y: 300,
  });

  // Listen for keydown events
  useEffect(() => {
    const handleKeyDown = (event: { keyCode: any }) => {
      switch (event.keyCode) {
        case 37: // left arrow key
          setCharacterPosition((prev) => ({ ...prev, x: prev.x - 10 }));
          break;
        case 38: // up arrow key
          setCharacterPosition((prev) => ({ ...prev, y: prev.y - 10 }));
          break;
        case 39: // right arrow key
          setCharacterPosition((prev) => ({ ...prev, x: prev.x + 10 }));
          break;
        case 40: // down arrow key
          setCharacterPosition((prev) => ({ ...prev, y: prev.y + 10 }));
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Stage width={800} height={600} options={{ backgroundColor: 0x999999 }}>
      <Sprite
        image="desk-no-bg.png"
        width={100}
        height={100}
        x={500}
        y={400}
        anchor={0.5}
      />
      <Sprite
        image="desk-no-bg.png"
        width={100}
        height={100}
        x={400}
        y={400}
        anchor={0.5}
      />
      <Sprite
        image="desk-no-bg.png"
        width={100}
        height={100}
        x={600}
        y={400}
        anchor={0.5}
      />
      <Sprite
        image="elevator.png"
        width={200}
        height={200}
        x={100}
        y={300}
        anchor={0.5}
      />
      <Sprite
        image="toilet.png"
        width={100}
        height={100}
        x={750}
        y={50}
        anchor={0.5}
      />
      <Sprite
        image="directeur.png"
        width={120}
        height={120}
        x={characterPosition.x}
        y={characterPosition.y}
        anchor={0.5}
      />
      <Container position={[150, 150]}>
        <MovingSprite />
      </Container>
      <Text
        text="Coding Room"
        anchor={0.5}
        x={440}
        y={100}
        style={
          new TextStyle({
            align: 'center',
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            fontSize: 50,
            fontWeight: 400,
            fill: ['#ffffff', 'blue'], // gradient
            stroke: 'black',
            strokeThickness: 5,
            letterSpacing: 20,
            dropShadow: true,
            dropShadowColor: '#ccced2',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
          })
        }
      />
    </Stage>
  );
};

export default GameFrame;
