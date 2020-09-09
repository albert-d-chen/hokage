class Player {
  constructor(options) {
    // this.position = options.position;
    this.vel = 0;
    this.x = 25;
    this.y = 350;
    this.jumping = false;
    this.jumpCount = 0;
    this.jumpTimer = 0;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "cyan";
    ctx.fillRect(this.x, this.y, 50, 50);
    ctx.closePath();
  }

  jump(ctx) {
    const gravity = 0.4;
    const initialSpeed = 12;

    if (this.jumping) {
      ctx.clearRect(this.x, this.y, 40, 0);
      if (this.jumpCount === 0 || !this.grounded()) {
        this.y -= initialSpeed - gravity * this.jumpCount;
        this.jumpCount += 1;
      }
    }
    if (this.jumpCount > 60) {
      this.y = 350;
      this.jumpCount = 0;
      this.jumping = false;
    }
  }

  grounded() {
    return this.x === 25 && this.y >= 350;
  }

  animate(ctx) {
    this.jump(ctx);
    this.draw(ctx);
  }

  playerHitBox() {
      return {
          left: this.x,
          right: this.x + 50,
          top: this.y,
          bottom: this.y + 50,
      }
  }
}

module.exports = Player;
