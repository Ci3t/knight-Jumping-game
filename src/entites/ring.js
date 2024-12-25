import k from "../kaplayCtx";

export function makeRing(pos) {
  return k.add([
    k.sprite("ring", { anim: "spin" }),
    k.pos(pos),
    k.scale(4),
    k.anchor("center"),
    k.area({ shape: new k.Rect(k.vec2(0, 0), 50) }),
    k.offscreen(),
    "ring",
  ]);
}
