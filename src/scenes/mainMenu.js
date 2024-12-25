import { makeKnight } from "../entites/knight";
import k from "../kaplayCtx";

export default function mainMenu() {
  //local storage
  if (!k.getData("best-score")) k.setData("best-score", 0);

  k.onButtonPress("jump", () => k.go("game"));

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
  const gamespeed = 1000;

  k.add([
    k.text("Knight Survive and Collect", { font: "mania", size: 96 }),
    k.pos(k.center().x, 200),
    k.anchor("center"),
  ]);
  k.add([
    k.text("Press Space / Left Mouse Click", { font: "mania", size: 32 }),
    k.pos(k.center().x, k.center().y - 200),
    k.anchor("center"),
  ]);

  makeKnight(k.vec2(200, 860));

  k.onUpdate(() => {
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
    bgPlatforms[0].move(-gamespeed, 0);
    bgPlatforms[1].moveTo(bgPlatforms[0].pos.x + bgPlatformWidth * 2, 740);
  });
}
