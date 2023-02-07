const app = useApp();
useEffect(() => {
  // create a bunch of random sprites
  const sprites = [];
  for (let i = 0; i < 50; i++) {
    const sprite = PIXI.Sprite.from('image.png');
    sprite.x = Math.random() * app.screen.width;
    sprite.y = Math.random() * app.screen.height;
    sprite.anchor.set(0.5);
    app.stage.addChild(sprite);
    sprites.push(sprite);
  }

  // animate the sprites
  app.ticker.add((delta) => {
    for (let i = 0; i < sprites.length; i++) {
      const sprite = sprites[i];
      sprite.x += Math.sin(delta / 10 + i) * 5;
      sprite.y += Math.cos(delta / 10 + i) * 5;
    }
  });

  return () => {
    app.destroy();
  };
}, []);
