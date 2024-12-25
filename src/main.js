import k from "./kaplayCtx";
import game from "./scenes/game";
import gameOver from "./scenes/gameover";
import mainMenu from "./scenes/mainMenu";

// ! sprites load
k.loadSprite("chemical-bg", "./graphics/chemical-bg.png");
k.loadSprite("town", "./graphics/town.webp");
k.loadSprite("platform", "./graphics/platforms.png");
k.loadSprite("bridge", "./graphics/bridge.png");

let p = k.loadSprite("knight", "./graphics/knight2.png", {
  sliceX: 12,
  sliceY: 1,
  anims: {
    jump: { from: 0, to: 3, loop: true },
    run: { from: 4, to: 11, loop: true },
  },
});
k.loadSprite("ring", "/graphics/ring.png", {
  sliceX: 16,
  sliceY: 1,
  anims: {
    spin: { from: 0, to: 15, loop: true },
  },
});
k.loadSprite("slime", "/graphics/slime.png", {
  sliceX: 8,
  sliceY: 3,
  anims: {
    walk: { from: 0, to: 7, loop: true },
  },
});
k.loadSprite("goblin", "/graphics/goblin.png", {
  sliceX: 6,
  sliceY: 1,

  anims: {
    run: { from: 0, to: 5, loop: true },
  },
});

console.log(p);
//!font load
k.loadFont("mania", "/fonts/mania.ttf", {});

//!sounds
k.loadSound("destroy", "sounds/Destroy.wav");
k.loadSound("hurt", "sounds/Hurt.wav");
k.loadSound("hyper-ring", "sounds/HyperRing.wav");
k.loadSound("jump", "sounds/Jump.wav");
k.loadSound("ring", "sounds/Ring.wav");
k.loadSound("city", "sounds/city.mp3");
// !scene
k.scene("main-menu", mainMenu);
k.scene("game", game);
k.scene("gameover", gameOver);

k.go("main-menu");
