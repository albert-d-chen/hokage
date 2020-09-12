const KISAME = {
    run1: [7, 72, 73, 80],
    run2: [87, 73, 73, 80],
    run3: [170, 74, 73, 80],
    run4: [252, 76, 73, 80],
    run5: [331, 81, 73, 80],
    run6: [413, 82, 73, 80],
    strike1: [252, 2, 73, 80],
    strike2: [330, 6, 73, 80],
}

const DEIDARA = {
    fly1: [25, 13, 150, 120],
    fly2: [169, 17, 150, 120],
    fly3: [320, 15, 150, 120],
    fly4: [462, 10, 150, 120],
    fly5: [614, 3, 150, 120],
    fly6: [764, 9, 150, 120],
}

const OROCHI = {
    run1: [3, 55, 50, 45],
    run2: [51, 57, 50, 45],
    run3: [106, 54, 50, 45],
    run4: [153, 55, 50, 45],
    run5: [256, 56, 50, 45],
    strike1: [258, 1, 50, 45],
    strike2: [82, 0, 70, 45],
    strike3: [2, 1, 70, 45]
};

class Ninja {
  constructor() {
    this.x = 300;
    this.y = 230;
    this.speed = 8;
    this.ninjaHit = false;

    this.kisameCycle = 0;
    this.kisame = new Image();
    this.kisame.src = "./assets/images/kisame1.png";
    this.deidaraCycle = 0;
    this.deidara = new Image();
    this.deidara.src = './assets/images/deidara.png';
    this.orochiCycle = 0;
    this.orochi = new Image();
    this.orochi.src = './assets/images/orochimaru.png';

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
        type: this.randomNinja(5)
      },
    };

    return ninja;
  }

  eachNinja(callback) {
    this.ninjas.forEach(callback.bind(this));
  }

  pickKisame() {
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
    } else if (this.kisameCycle < 140) {
      this.kisameCycle += 1;
      return KISAME.strike1;
    } else if (this.kisameCycle < 170) {
      this.kisameCycle += 1;
      return KISAME.strike2;
    } else if (this.kisameCycle < 200) {
      this.kisameCycle += 1;
      return KISAME.strike1;
    } else if (this.kisameCycle < 220) {
      this.kisameCycle = 0;
      return KISAME.run1;
    }
  }

  pickDeidara() {
      if (this.deidaraCycle < 10) {
        this.deidaraCycle += 1;
        return DEIDARA.fly1;
      } else if (this.deidaraCycle < 30) {
        this.deidaraCycle += 1;
        return DEIDARA.fly2;
      } else if (this.deidaraCycle < 50) {
        this.deidaraCycle += 1;
        return DEIDARA.fly3;
      } else if (this.deidaraCycle < 70) {
        this.deidaraCycle += 1;
        return DEIDARA.fly4;
      } else if (this.deidaraCycle < 90) {
        this.deidaraCycle += 1;
        return DEIDARA.fly5;
      } else if (this.deidaraCycle < 110) {
        this.deidaraCycle += 1;
        return DEIDARA.fly6;
      } else if (this.deidaraCycle < 130) {
        this.deidaraCycle = 0;
        return DEIDARA.fly1;
      }
  }

  pickOrochi() {
      if (this.orochiCycle < 20) {
        this.orochiCycle += 1;
        return OROCHI.run1;
      } else if (this.orochiCycle < 50) {
        this.orochiCycle += 1;
        return OROCHI.run2;
      } else if (this.orochiCycle < 80) {
        this.orochiCycle += 1;
        return OROCHI.run3;
      } else if (this.orochiCycle < 110) {
        this.orochiCycle += 1;
        return OROCHI.run4;
      } else if (this.orochiCycle < 140) {
        this.orochiCycle += 1;
        return OROCHI.strike1;
      } else if (this.orochiCycle < 170) {
        this.orochiCycle += 1;
        return OROCHI.strike2;
      } else if (this.orochiCycle < 200) {
        this.orochiCycle += 1;
        return OROCHI.strike3;
      } else if (this.orochiCycle < 230) {
        this.orochiCycle += 1;
        return OROCHI.strike1;
      } else if (this.orochiCycle < 260) {
        this.orochiCycle = 0;
        return OROCHI.run1;
      }
  }

  drawNinja(ctx) {
    this.eachNinja(function (ninja) {
        if (ninja.oneNinja.type === 0 || ninja.oneNinja.type === 1) {
            ninja.oneNinja.top = 300;
            ninja.oneNinja.bottom = 400;
            const sprite = this.pickKisame();
            ctx.drawImage(this.kisame, sprite[0], sprite[1], sprite[2], sprite[3], ninja.oneNinja.left, this.y + 30, 80, 80);
        } else if (ninja.oneNinja.type === 4) {
            ninja.oneNinja.top = 100;
            ninja.oneNinja.bottom = 200;
            const sprite = this.pickDeidara();
            ctx.drawImage(this.deidara, sprite[0], sprite[1], sprite[2], sprite[3], ninja.oneNinja.left, this.y - 150, 100, 100);
        } else if (ninja.oneNinja.type === 2 || ninja.oneNinja.type === 3) {
            ninja.oneNinja.top = 300;
            ninja.oneNinja.bottom = 400;
            const sprite = this.pickOrochi();
            ctx.drawImage(this.orochi, sprite[0], sprite[1], sprite[2], sprite[3], ninja.oneNinja.left, this.y + 35, 80, 80);
        }
    });

    if (this.ninjas[0].oneNinja.left <= 0 || this.ninjaHit) {
      this.ninjas.shift();
      const newNinja = this.ninjas[0].oneNinja.left + 1300;
      this.ninjas.push(this.createNinja(newNinja));
      this.ninjaHit = false;
    }
  }

  randomNinja(max) {
        return Math.floor(Math.random() * Math.floor(max))
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