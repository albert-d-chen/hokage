const KISAME = {
    run1: [409, 1, 70, 60],
    run2: [328, 3, 73, 60],
    run3: [248, 2, 73, 60],
    run4: [162, 1, 73, 60],
    run5: [82, 1, 73, 60],
    run6: [1, 2, 73, 60],
}

class Ninja {
  constructor() {
    this.x = 300;
    this.y = 230;
    this.speed = 8;
    this.ninjaHit = false;

    this.kisameCycle = 0;
    this.kisame = new Image();
    this.kisame.src = "./assets/images/kisame.png";

    const firstNinjaDistance = this.x + 600;
    this.ninjas = [
      this.createNinja(firstNinjaDistance + 200),
      this.createNinja(firstNinjaDistance * 2),
    ];
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

  pickSprite() {
    if (this.kisameCycle < 10) {
      this.kisameCycle += 1;
      return KISAME.run1;
    } else if (this.kisameCycle < 30) {
      this.kisameCycle += 1;
      return KISAME.run2;
    } else if (this.kisameCycle < 50) {
      this.kisameCycle += 1;
      return KISAME.run3;
    } else if (this.kisameCycle < 70) {
      this.kisameCycle += 1;
      return KISAME.run4;
    } else if (this.kisameCycle < 90) {
      this.kisameCycle += 1;
      return KISAME.run5;
    } else if (this.kisameCycle < 110) {
      this.kisameCycle += 1;
      return KISAME.run6;
    } else if (this.kisameCycle < 130) {
      this.kisameCycle = 0;
      return KISAME.run1;
    }
  }

  drawNinja(ctx) {
    this.eachNinja(function (ninja) {
        const sprite = this.pickSprite();
        ctx.drawImage(this.kisame, sprite[0], sprite[1], sprite[2], sprite[3], ninja.oneNinja.left, this.y + 30, 70, 70);
    });

    if (this.ninjas[0].oneNinja.left <= 0 || this.ninjaHit) {
      this.ninjas.shift();
      const newNinja = this.ninjas[0].oneNinja.left + 900;
      this.ninjas.push(this.createNinja(newNinja));
      this.ninjaHit = false;
    }
  }

  move() {
    this.eachNinja(function (ninja) {
      ninja.oneNinja.left -= this.speed;
    });
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
      if (ninjaBox.top > playerBox.bottom || ninjaBox.bottom < playerBox.top) {
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
      if (
        ninjaBox.left > rasenganBox.right ||
        ninjaBox.right < rasenganBox.left
      ) {
        return false;
      }
      if (
        ninjaBox.top > rasenganBox.bottom ||
        ninjaBox.bottom < rasenganBox.top
      ) {
        return false;
      }

      return true;
    };

    let onTarget = false;
    this.eachNinja((ninja) => {
      if (_collision(ninja.oneNinja, rasengan)) {
        onTarget = true;
      }
    });
    return onTarget;
  }
}

module.exports = Ninja;