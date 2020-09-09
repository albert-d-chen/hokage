class Player {
  constructor(options) {
    // this.position = options.position;
    this.vel = 0;
    this.x = 25;
    this.y = 350;
    this.jumping = false;
    this.jumpCount = 0;
  }

  draw(ctx) {
    console.log(this.y);
    ctx.beginPath();
    ctx.fillStyle = "cyan";
    ctx.fillRect(this.x, this.y, 50, 50);
    ctx.closePath();
  }

  jump(ctx) {
    //   ctx.clearRect(this.x, this.y, 400, 750);
    //   if (this.y < 200) {
    //       this.y = 350;
    //     } else {
    //         this.y -= 30;

    //   }

    const gravity = 0.4;
    const initialSpeed = 12;

    // if (this.jumpCount > 50) {
    //     this.jumping = false;
    // } else {
    //     this.jumping = true;
    // }
    if (this.jumping) {
        ctx.clearRect(this.x, this.y, 60, 60);
        if (this.jumpCount === 0 || !this.grounded()) {
            this.y -= initialSpeed - gravity * this.jumpCount;
            this.jumpCount += 1;
        }
    } 
    if (this.jumpCount > 60){
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

}

module.exports = Player;
