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

class Game {
    constructor(ctx, gameCanvas) {
        this.ctx = ctx;
        this.gameCanvas = gameCanvas;

        this.player = new Player();
        this.obstacle = new Obstacle();

        this.obstacles = [];

        
        this.registerEvents();
    }

    play() {
        console.log("play");
        this.running = true;
        this.animate();
    }

    start() {
        this.player.draw(this.ctx);
        //   requestAnimationFrame(this.update);
    }

    registerEvents() {
        this.boundClickHandler = this.click.bind(this);
        this.gameCanvas.addEventListener("mousedown", this.boundClickHandler);
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space'){
                this.player.jumping = true;
            } 
        })

    }
    
    click(e) {
        if (!this.running) {
        this.play();
        }
    }

    animate() {
        this.obstacle.animate(this.ctx);
        this.player.animate(this.ctx);
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

    new Game(ctx, gameCanvas);

    // game.play();

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
}

module.exports = Player;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map