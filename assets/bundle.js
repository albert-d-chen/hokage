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
    this.ctx.strokeText(gameover, 250, 150);
    this.ctx.fillText(gameover, 250, 150);
    this.ctx.font = "30px Naruto";
    this.ctx.strokeText(tryagain, 80, 200);
    this.ctx.fillText(tryagain, 80, 200);
  }

  gameStartMenu() {
    // this.count--;
    // if (this.count % 2 === 1) {
      const gameover = "CLICK TO PLAY";
      this.ctx.font = "50px Naruto";
      this.ctx.strokeStyle = "white";
      this.ctx.fillStyle = "white";
      this.ctx.strokeText(gameover, 190, 200);
      this.ctx.fillText(gameover, 190, 200);
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
    
    if (!this.running && !this.gameOver()) {
        this.gameStartMenu();
        // this.gameStartMenu();
    }
    
    if (this.gameOver()) {
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

class Obstacle {
    constructor(options) {
        this.x = 300;
        this.y = 270;
        this.speed = 5;
        const firstObstacleDistance = this.x + 200;

        this.obstacles = [this.createObstacle(firstObstacleDistance + 200), this.createObstacle(firstObstacleDistance * 3  )];
    }

    createObstacle(x) {
        const obstacle = {
            oneObstacle: {  
                left: x,
                right: CONSTANTS.OBSTACLE_WIDTH + x,
                top: this.y,
                bottom: this.y + 130
            },
            passed: false
        }
        return obstacle;
    }

    eachObstacle(callback){
        this.obstacles.forEach(callback.bind(this))
    }

    drawObstacle(ctx) {
        this.eachObstacle(function(obstacle) {
            ctx.beginPath();
            ctx.fillStyle = "orange";
            ctx.fillRect(obstacle.oneObstacle.left  , this.y, 30, 130);
            ctx.closePath();
        })
    }

    move(ctx) {
        this.eachObstacle(function(obstacle) {
            obstacle.oneObstacle.left -= this.speed;
        })

        if (this.obstacles[0].oneObstacle.left <= 0) {
            this.obstacles.shift();
            const newObstacle = this.obstacles[0].oneObstacle.left + CONSTANTS.SPACING;
            this.obstacles.push(this.createObstacle(newObstacle))
        }
        // this.x -= this.speed;
        // ctx.clearRect(25, 350, 400, 70  0);
    }

    drawBackground(ctx) {
        ctx.fillStyle = "black ";
        ctx.fillRect(0, 0, 800, 700);
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
            if (obstacleBox.top > playerBox.bottom || obstacleBox.bottom < playerBox.top) {
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