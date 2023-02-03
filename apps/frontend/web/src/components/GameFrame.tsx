import { useState, useEffect } from 'react';
import { Stage, Sprite } from '@pixi/react';

const GameFrame = () => {
  // State to store character position
  const [characterPosition, setCharacterPosition] = useState({
    x: 400,
    y: 300,
  });

  // Listen for keydown events
  useEffect(() => {
    const handleKeyDown = (event) => {
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
        image="man1.png"
        width={50}
        height={50}
        x={characterPosition.x}
        y={characterPosition.y}
        anchor={0.5}
      />
    </Stage>
  );
};

export default GameFrame;
