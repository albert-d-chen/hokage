class Ninja {
    constructor() {
        this.x = 300;
        this.y = 230;
        this.speed = 8;
        this.ninjaHit = false;

        const firstNinjaDistance = this.x + 600
        this.ninjas = [this.createNinja(firstNinjaDistance + 200), this.createNinja(firstNinjaDistance * 2)];
    }

    createNinja(x) {
        const ninja = {
        oneNinja: {
            left: x,
            right: x + 30,
            top: 300,
            bottom: 400,
        },
        };

        return ninja;
    }

    eachNinja(callback) {
        this.ninjas.forEach(callback.bind(this));
    }

    drawNinja(ctx) {
        this.eachNinja(function(ninja) {
                ctx.beginPath();
                ctx.fillStyle = "orange";
                ctx.fillRect(ninja.oneNinja.left, this.y + 50, 60, 60);
                ctx.closePath();
            }
        )
        
        if (this.ninjas[0].oneNinja.left <= 0 || this.ninjaHit) {
            this.ninjas.shift();
            const newNinja = this.ninjas[0].oneNinja.left + 700;
            this.ninjas.push(this.createNinja(newNinja));
            this.ninjaHit = false;
        }
    }

    move() {
       
            this.eachNinja(function(ninja) {
                ninja.oneNinja.left -= this.speed;
                // if (this.ninjaHit) {
                //     // ninja.oneNinja.left = 300;
                //     this.ninjaHit = false;
                // }
            })
        // this.x -= this.speed;
    }

    animate(ctx) {
        this.move();
        this.drawNinja(ctx);
    }

    checkNinjaCollision(player) {
        const _collision = (ninjaBox, playerBox) => {
            if (ninjaBox.left > playerBox.right || ninjaBox.right < playerBox.left) {
                return false;
            }
            if (ninjaBox.top  > playerBox.bottom || ninjaBox.bottom < playerBox.top) {
                return false;
            }

            return true;
        };

        let hit = false;
        this.eachNinja((ninja) => {
            if (_collision(ninja.oneNinja, player)) {
                hit = true;
            }
        });
        return hit;
    }

    checkRasenganCollision(rasengan) {
        const _collision = (ninjaBox, rasenganBox) => {
            if (ninjaBox.left > rasenganBox.right || ninjaBox.right < rasenganBox.left) {
                return false;
            }
            if (ninjaBox.top  > rasenganBox.bottom || ninjaBox.bottom < rasenganBox.top) {
                return false;
            }

            return true;
        };

        let hit = false;
        this.eachNinja((ninja) => {
            if (_collision(ninja.oneNinja, rasengan)) {
                hit = true;
            }
        });
        return hit;
    }


}

module.exports = Ninja;