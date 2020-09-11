/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(/*! ./player */ "./lib/player.js");
const Obstacle = __webpack_require__(/*! ./obstacle */ "./lib/obstacle.js");
const Score = __webpack_require__(/*! ./score */ "./lib/score.js");

class Game {
  constructor(ctx, gameCanvas) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;

    this.player = new Player();
    this.obstacle = new Obstacle();

    this.score = new Score();

    this.playerDown = false;

    this.count = 1000;
    this.registerEvents();
    this.gameStartMenu = this.gameStartMenu.bind(this);
    // this.restartGame();
    // this.restartGame = this.restartGame.bind(this);
  }

  play() {
    console.log("play");
    this.running = true;
    this.animate();
  }

  registerEvents() {
    this.boundClickHandler = this.click.bind(this);
    this.gameCanvas.addEventListener("mousedown", this.boundClickHandler);
    document.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        this.player.jumping = true;
      }
    });
    this.restart = this.restartGame.bind(this);
    document.addEventListener("keydown", this.restart);
  }

  click(e) {
    if (!this.running && !this.gameOver()) {
      this.play();
    }
  }

  gameOver() {
    return this.obstacle.checkCollision(this.player.playerHitBox());
  }

  restartGame(e) {
    // debugger
    if (e.key === "l" && this.gameOver()) {
      this.score = new Score();
      this.player = new Player();
      this.obstacle = new Obstacle();
      e.preventDefault();
      this.animate();
    }
  }

  gameOverMenu() {
    const gameover = "GAME OVER";
    const tryagain = "Press L to accept defeat and try again";
    this.ctx.font = "50px Naruto";
    this.ctx.strokeStyle = "red";
    this.ctx.fillStyle = "red";
    this.ctx.strokeText(gameover, 230, 150);
    this.ctx.fillText(gameover, 230, 150);
    this.ctx.font = "30px Naruto";
    this.ctx.strokeText(tryagain, 60, 200);
    this.ctx.fillText(tryagain, 60, 200);
  }

  gameStartMenu() {
    // this.count--;
    // if (this.count % 2 === 1) {
      const gameover = "CLICK TO PLAY";
      this.ctx.font = "50px Naruto";
      this.ctx.strokeStyle = "white";
      this.ctx.fillStyle = "white";
      this.ctx.strokeText(gameover, 170, 200);
      this.ctx.fillText(gameover, 170, 200);
    // } else {
    //     this.ctx.fillStyle = 'black'
    //     this.ctx.fillRect(100, 100, 500, 200)
    // }
}

drawBackground() {
    this.ctx.fillStyle = "black ";
    this.ctx.fillRect(190, 200, 300, 300);
}

animate() {
    this.obstacle.animate(this.ctx);
    this.player.animate(this.ctx);
    
    if (!this.running ) {
        this.gameStartMenu(); 
        // this.gameStartMenu();
    }
    
    if (this.gameOver()) {
      this.obstacle.animate(this.ctx);
      this.player.drawGameOverSprite(this.ctx);
      this.gameOverMenu();
      this.running = false;
    }

    this.score.draw(this.ctx);

    if (this.running) {  
      requestAnimationFrame(this.animate.bind(this));
    }
  } 
}

module.exports = Game;



/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(/*! ./player.js */ "./lib/player.js")
const Game = __webpack_require__(/*! ./game.js */ "./lib/game.js")


document.addEventListener("DOMContentLoaded", function () {
    const gameCanvas = document.getElementById("game-canvas");
    const ctx = gameCanvas.getContext("2d");
    // gameCanvas.width = 700;
    // gameCanvas.height = 400;

    const game = new Game(ctx, gameCanvas);

    game.animate();

});


/***/ }),

/***/ "./lib/obstacle.js":
/*!*************************!*\
  !*** ./lib/obstacle.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

const CONSTANTS = {
    OBSTACLE_WIDTH: 30,
    SPACING: 500,
}

const TREE = {
    tree1: [10, 103, 150, 150],
    tree2: [380, 21, 130, 280]
}

const ROCK = {
    rock1: [0, 0, 80, 80]
}

const WATER = {
    water1: [294, 140, 100, 30]
}
class Obstacle {
    constructor(options) {
        this.x = 300;
        this.y = 230;
        this.speed = 5;
        this.backgroundx = 0;
        this.backgroundy = -50;

        this.background = new Image();
        this.background.src =  './assets/images/forest.png';
        
        this.tree = new Image();
        this.tree.src = './assets/images/trees.png'
        this.water = new Image();
        this.water.src = './assets/images/water.png'
        this.rock = new Image();
        this.rock.src = './assets/images/boulder1.png'

        const firstObstacleDistance = this.x + 200;
        this.obstacles = [this.createObstacle(firstObstacleDistance + 210), this.createObstacle(firstObstacleDistance * 2.5 )];
    }

    createObstacle(x) {
        // const obstacle = {
        //     oneObstacle: {  
        //         left: x,
        //         right: CONSTANTS.OBSTACLE_WIDTH + x,
        //         top: this.y,
        //         bottom: this.y + 130,
        //         type: this.randomObstacle(2)
        //     },
        // }
        const obstacle = {
            oneObstacle: {  
                left: x,
                right: CONSTANTS.OBSTACLE_WIDTH + x,
                top: 230,
                bottom: 360,
                type: this.randomObstacle(3)
            },
        }


        return obstacle;
    }

    eachObstacle(callback){
        this.obstacles.forEach(callback.bind(this))
    }

    drawObstacle(ctx) {
        this.eachObstacle(function(obstacle) {
           
            if (obstacle.oneObstacle.type === 0) {
                obstacle.oneObstacle.top = 230;
                obstacle.oneObstacle.bottom = 360;
                ctx.drawImage(this.tree, TREE.tree1[0], TREE.tree1[1], TREE.tree1[2], TREE.tree1[3], obstacle.oneObstacle.left, this.y - 50, 140, 150)
            } else if (obstacle.oneObstacle.type === 1) {
                obstacle.oneObstacle.top = 350;
                obstacle.oneObstacle.bottom = 450;
                ctx.drawImage(this.water, WATER.water1[0], WATER.water1[1], WATER.water1[2], WATER.water1[3], obstacle.oneObstacle.left, this.y + 99, 100, 20)
            } else if (obstacle.oneObstacle.type === 2) {
                obstacle.oneObstacle.top = 300;
                obstacle.oneObstacle.bottom = 400;
                ctx.drawImage(this.rock, ROCK.rock1[0], ROCK.rock1[1], ROCK.rock1[2], ROCK.rock1[3], obstacle.oneObstacle.left, this.y + 30, 100, 80)
            }
        })
    }

    drawObstacle2(ctx) {
        this.eachObstacle(function(obstacle) {
                ctx.beginPath();
                ctx.fillStyle = "orange";
                ctx.fillRect(obstacle.oneObstacle.left, this.y, 30, 130);
                ctx.closePath();
            }
        )
    }

    randomObstacle(max) {
        return Math.floor(Math.random() * Math.floor(max))
    }

    move() {
        this.eachObstacle(function(obstacle) {
            obstacle.oneObstacle.left -= this.speed;
        })

        if (this.obstacles[0].oneObstacle.left <= 0) {
            this.obstacles.shift();
            const newObstacle = this.obstacles[0].oneObstacle.left + CONSTANTS.SPACING;
            this.obstacles.push(this.createObstacle(newObstacle))
        }

    }

    drawBackground(ctx) {
        ctx.drawImage(this.background, this.backgroundx, this.backgroundy);
        ctx.drawImage(this.background, this.backgroundx + 700, this.backgroundy);
        if (this.backgroundx <= -700) {
            this.backgroundx = 0;
        }

        this.moveBackground();
    }

    moveBackground() {
        this.backgroundx -= this.speed;
    }

    animate(ctx) { 
        this.drawBackground(ctx);
        this.move(ctx);
        this.drawObstacle(ctx);


    }

    checkCollision(player) {
        const _collision = (obstacleBox, playerBox) => {
            if (obstacleBox.left > playerBox.right || obstacleBox.right < playerBox.left) {
                return false;
            }
            if (obstacleBox.top  > playerBox.bottom || obstacleBox.bottom < playerBox.top) {
                return false;
            }

            return true;
        };

        let hit = false;
        this.eachObstacle((obstacle) => {
            if (_collision(obstacle.oneObstacle, player)) {
                hit = true;
            }
        });
        return hit;
    }

}

module.exports = Obstacle;

/***/ }),

/***/ "./lib/player.js":
/*!***********************!*\
  !*** ./lib/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

const NARUTO = {
    run1: [20, 291 , 50, 50],
    run2: [144, 291, 50, 50],
    run3: [260, 291, 50, 50],
    run4: [380, 291, 50, 50],
    run5: [500, 291, 50, 50],
    run6: [620, 291, 50, 50],
    hit: [852, 182, 60, 60]

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
        this.y = 280;
        this.jumpCount = 0;
        this.jumping = false;
        }
    }

    grounded() {
        return this.x === 25 && this.y >= 280;
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
            right: this.x + 60,
            top: this.y,
            bottom: this.y + 70,
        }
    }
}

module.exports = Player;


/***/ }),

/***/ "./lib/score.js":
/*!**********************!*\
  !*** ./lib/score.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Score { 
    constructor() {
        this.score = 0;
    }

    draw(ctx) {
        const yourScore = `${this.score}`;
        ctx.font = "30px Naruto";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.strokeText(yourScore, 10, 40);
        ctx.fillText(yourScore, 10, 40);
        this.increaseScore();
    }

    increaseScore() {
        this.score += 1;
    }
}

module.exports = Score;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map