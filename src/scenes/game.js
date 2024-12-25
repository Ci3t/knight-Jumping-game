import { makeGoblin } from "../entites/goblin";
import { makeKnight } from "../entites/knight";
import { makeRing } from "../entites/ring";
import k from "../kaplayCtx";

export default function game() {
  k.setGravity(3100);
  const citySFX = k.play("city", { volume: 0.2, loop: true });
  const bgPieceWidth = 1792;

  const bgPieces = [
    k.add([k.sprite("town"), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
    k.add([
      k.sprite("town"),
      k.pos(bgPieceWidth, 0),
      k.scale(2),
      k.opacity(0.8),
    ]),
  ];
  const bgPlatformWidth = 1445;
  const bgPlatforms = [
    k.add([k.sprite("bridge"), k.pos(0, 740), k.scale(2)]),
    k.add([k.sprite("bridge"), k.pos(bgPlatformWidth, 740), k.scale(2)]),
  ];
  let score = 0;
  let scoreMultiplier = 0;

  const scoreText = k.add([
    k.text("SCORE: " + score, { font: "mania", size: 72 }),
    k.pos(20, 20),
  ]);
  const knight = makeKnight(k.vec2(200, 860));
  knight.setControls();
  knight.setEvents();

  knight.onCollide("goblinEnemy", (enemy) => {
    if (!knight.isGrounded()) {
      k.play("destroy", { volume: 0.5 });
      k.destroy(enemy);
      knight.play("jump");
      knight.jump();
      scoreMultiplier += 1;
      score += 10 * scoreMultiplier;
      scoreText.text = `SCORE: ${score}`;
      if (scoreMultiplier === 1) knight.ringCollectUi.text = "+10";
      if (scoreMultiplier > 1)
        knight.ringCollectUi.text = `x${scoreMultiplier}`;
      k.wait(1, () => (knight.ringCollectUi.text = ""));
      return;
    }

    k.play("hurt", { volume: 0.5 });
    k.setData("current-score", score);
    k.go("gameover", citySFX);
  });
  knight.onCollide("ring", (ring) => {
    k.play("ring", { volume: 0.5 });
    k.destroy(ring);

    score += 1;
    scoreText.text = `SCORE: ${score}`;
    scoreMultiplier += 1;
    knight.ringCollectUi.text = "+1";
    k.wait(1, () => (knight.ringCollectUi.text = ""));
  });
  let gameSpeed = 300;

  k.loop(1, () => {
    gameSpeed += 30;
  });
  const spawnGoblin = () => {
    const goblin = makeGoblin(k.vec2(1950, 800));
    goblin.onUpdate(() => {
      if (gameSpeed < 2000) {
        goblin.move(-gameSpeed + -200, 0);
        return;
      }
      goblin.move(-gameSpeed, 0);
    });
    goblin.onExitScreen(() => {
      if (goblin.pos.x < 0) goblin.destroy(goblin);
    });

    const waitTime = k.rand(0.8, 3.1);
    k.wait(waitTime, spawnGoblin);
  };
  spawnGoblin();

  const spawnRing = () => {
    const ring = makeRing(k.vec2(1950, 800));

    ring.onUpdate(() => {
      if (gameSpeed < 2000) {
        ring.move(-gameSpeed + -100, 0);
        return;
      }
      ring.move(-gameSpeed, 0);
    });
    ring.onExitScreen(() => {
      if (ring.pos.x < 0) {
        ring.destroy(ring);
      }
    });
    const waitTime = k.rand(0.4, 2.8);
    k.wait(waitTime, spawnRing);
  };
  spawnRing();
  k.add([
    k.rect(1920, 300),
    k.opacity(0),
    k.area(),
    k.body({ isStatic: true }),
    k.pos(0, 960),
  ]);

  k.onUpdate(() => {
    if (knight.isGrounded()) scoreMultiplier = 0;
    //!Background
    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
      bgPieces.push(bgPieces.shift());
    }

    bgPieces[0].move(-100, 0);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

    if (bgPlatforms[1].pos.x < 0) {
      bgPlatforms[0].moveTo(
        bgPlatforms[1].pos.x + bgPlatforms[1].width * 2,
        740
      );
      bgPlatforms.push(bgPlatforms.shift());
    }
    bgPlatforms[0].move(-gameSpeed, 0);
    bgPlatforms[1].moveTo(bgPlatforms[0].pos.x + bgPlatformWidth * 2, 740);
  });
}
