import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo } from 'react';

export const GameFrame = () => {
  const blurFilter = useMemo(() => new BlurFilter(4), []);

  return (
    <Stage>
      <Sprite
        image="/man1.png"
        x={400}
        y={270}
        anchor={{ x: 0.5, y: 0.5 }}
        width={100}
        height={100}
      />

      <Container x={400} y={330}>
        <Text
          text="Hello World"
          anchor={{ x: 0.5, y: 0.5 }}
          filters={[blurFilter]}
        />
      </Container>
    </Stage>
  );
};
