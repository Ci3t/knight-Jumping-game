import k from "../kaplayCtx";

export function makeKnight(pos) {
  const knight = k.add([
    k.sprite("knight", { anim: "run" }),

    k.scale(2),
    k.area({ shape: new k.Rect(k.vec2(7, 0), 55, 100) }),
    k.anchor("center"),
    k.pos(pos),
    k.body({
      jumpForce: 1500,
    }),
    {
      ringCollectUi: null,
      //   jump: () => {
      //     knight.vel.y = -500;
      //   },
      setControls() {
        k.onButtonPress("jump", () => {
          if (this.isGrounded()) {
            this.play("jump");
            this.jump();
            k.play("jump", { volume: 0.5 });
          }
        });
      },
      setEvents() {
        this.onGround(() => {
          this.play("run");
        });
      },
    },
    "knight",
  ]);

  knight.ringCollectUi = knight.add([
    k.text("", { font: "mania", size: 24 }),
    k.pos(60, -10),
    k.color(255, 255, 0),
    k.scale(2),
    k.anchor("center"),
  ]);
  return knight;
}
