const NARUTO = {
    run1: [20, 291 , 50, 50],
    run2: [144, 291, 50, 50],
    run3: [260, 291, 50, 50],
    run4: [380, 291, 50, 50],
    run5: [500, 291, 50, 50],
    run6: [620, 291, 50, 50],
    hit: [852, 182, 60, 60],
    shoot: [620, 20, 100, 100]
}

const SHURIKEN = {
    throw1: [2, 39, 100, 100],
    throw2: [135, 25, 100, 100],
    throw3: [264, 15, 100, 100],
    throw4: [398, 7, 100, 100],
}
class Player {
    constructor(options) {
        // this.position = options.position;
        this.vel = 0;
        this.x = 25;
        this.y = 280;
        this.jumping = false;
        this.jumpCount = 0;
        this.jumpTimer = 0;
        this.runCycle = 0;
        this.ninjaHit = false;


        this.shootX = 70;
        this.shootY = 300;
        this.shooting = false;
        this.count = 0;
        this.throwCycle = 0;

        this.spriteSheet = new Image();
        this.spriteSheet.src = './assets/images/narutosprite.png';
        this.shuriken = new Image();
        this.shuriken.src = './assets/images/rasengan.png'
    }


    draw(ctx) {
        const sprite = this.pickSprite();
        if (sprite === NARUTO.shoot) {
            ctx.drawImage(this.spriteSheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y -50  , 120, 120)
        } else {
            ctx.drawImage(this.spriteSheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y -20  , 70, 70)
        }
    }


    pickSprite() {
        
        if (this.playerDown) {
            return NARUTO.hit;
        } else if (this.shooting && this.shootX < 180) {
            return NARUTO.shoot;
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
        // ctx.clearRect(this.x, this.y, 40, 0);
        if (this.jumpCount === 0 || !this.grounded()) {
            this.y -= initialSpeed - gravity * this.jumpCount;
            this.jumpCount += 1;
        }
        }
        if (this.jumpCount > 60) {
        this.y = 280;
        this.jumpCount = 0;
        this.jumping = false;
        }
    }

    grounded() {
        return this.x === 25 && this.y >= 280;
    }

    shoot() {
        this.shootX += 5;
    }

    drawRasengan(ctx) {
        if (this.shooting) {
            if (this.count === 0) {
                this.shootY = this.y + 20;
            }
                // ctx.beginPath();
                // ctx.arc(this.shootX, this.shootY, 10, 0, 2 * Math.PI, true);
                // ctx.stroke();
                // ctx.fillStyle = "lightblue";
                // ctx.fill();
                const rasengan = this.pickShuriken();
                ctx.drawImage(this.shuriken, rasengan[0], rasengan[1], rasengan[2], rasengan[3], this.shootX, this.shootY - 30, 50, 50);
                this.count++;
                this.shoot();
        } 
        if (this.shootX > 650 || this.ninjaHit) {
            this.ninjaHit = false;
            this.shooting = false;
            this.shootX = 100;
            this.count = 0;
        }

    }

    pickShuriken() {
        if (this.throwCycle < 10) {
            this.throwCycle += 1;
            return SHURIKEN.throw1;
        } else if (this.throwCycle < 20) {
            this.throwCycle += 1;
            return SHURIKEN.throw2;
        } else if (this.throwCycle < 30) {
            this.throwCycle += 1;
            return SHURIKEN.throw3;
        } else if (this.throwCycle < 40) {
            this.throwCycle += 1;
            return SHURIKEN.throw4;
        } else if (this.throwCycle < 50) {
            this.throwCycle = 0;
            return SHURIKEN.throw1;
        }
    }



    animate(ctx) {
        this.jump(ctx);
        this.drawRasengan(ctx);
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
            right: this.x + 60,
            top: this.y,
            bottom: this.y + 70,
        }
    }

    rasenganHitBox() {
        return {
            left: this.shootX,
            right: this.shootX + 20,
            top: this.shootY,
            bottom: this.shootY + 20
        }
    }
}

module.exports = Player;
