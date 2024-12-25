import k from "../kaplayCtx";

export function makeGoblin(pos) {
  return k.add([
    k.sprite("goblin", { anim: "run" }),
    k.pos(pos),

    k.area({ shape: new k.Rect(k.vec2(-5, 20), 45, 45) }),
    k.anchor("center"),
    k.scale(-4, 4),
    k.offscreen(),
    "goblinEnemy",
  ]);
}
