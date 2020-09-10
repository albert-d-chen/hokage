const NARUTO = {
    run1: [20, 291 , 50, 50],
    run2: [144, 291, 50, 50],
    run3: [260, 291, 50, 50],
    run4: [380, 291, 50, 50],
    run5: [500, 291, 50, 50],
    run6: [620, 291, 50, 50],
    hit: [852, 182, 50, 50]

}
class Player {
  constructor(options) {
    // this.position = options.position;
    this.vel = 0;
    this.x = 25;
    this.y = 300;
    this.jumping = false;
    this.jumpCount = 0;
    this.jumpTimer = 0;
    this.runCycle = 0;

    this.spriteSheet = new Image();
    this.spriteSheet.src = './assets/images/narutosprite.png';
  }

//   draw(ctx) {
//     ctx.beginPath();
//     ctx.fillStyle = "cyan";
//     ctx.fillRect(this.x, this.y, 50, 50);
//     ctx.closePath();
//   }

    draw(ctx) {
        const sprite = this.pickSprite();
        ctx.drawImage(this.spriteSheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y -20  , 70, 70)
    }


    pickSprite() {
        if (this.playerDown) {
            return NARUTO.hit;
        } else if (!this.grounded()) {
            return NARUTO.run6;
        } else if (this.runCycle < 10) {
            this.runCycle += 1;
            return NARUTO.run1;
        } else if (this.runCycle < 20) {
            this.runCycle += 1;
            return NARUTO.run2;
        } else if (this.runCycle < 30) {
            this.runCycle += 1;
            return NARUTO.run3;
        } else if (this.runCycle < 40) {
            this.runCycle += 1;
            return NARUTO.run4;
        } else if (this.runCycle < 50){
            this.runCycle += 1;
            return NARUTO.run5;
        } else if (this.runCycle < 60){
            this.runCycle += 1;
            return NARUTO.run6;
        } else if (this.runCycle < 70){
            this.runCycle = 0;
            return NARUTO.run1;
        }
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
        this.y = 300;
        this.jumpCount = 0;
        this.jumping = false;
        }
    }

    grounded() {
        return this.x === 25 && this.y >= 300;
    }

    animate(ctx) {
        this.jump(ctx);
        this.draw(ctx);
    }

    pickGameOverSprite(){
        return NARUTO.hit;
    }

    drawGameOverSprite(ctx){
        const sprite = this.pickGameOverSprite();
        ctx.drawImage(
          this.spriteSheet,
          sprite[0],
          sprite[1],
          sprite[2],
          sprite[3],
          this.x,
          this.y - 20,
          70,
          70
        );
    }

    playerHitBox() {
        return {
            left: this.x,
            right: this.x + 75,
            top: this.y,
            bottom: this.y + 50,
        }
    }
}

module.exports = Player;
