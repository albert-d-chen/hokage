const Player = require('./player');
const Obstacle = require('./obstacle');
const Score = require('./score');
const Ninja = require('./ninja');

class Game {
  constructor(ctx, gameCanvas) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;

    this.player = new Player();
    this.obstacle = new Obstacle();
    this.ninja = new Ninja();

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
        // debugger
      if (event.code === "Space") {
        this.player.jumping = true;
      } 
      if (event.code === 'KeyQ') {
        //   debugger
          this.player.shooting = true;
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
    return (
      this.obstacle.checkCollision(this.player.playerHitBox()) || this.ninja.checkNinjaCollision(this.player.playerHitBox()) 
    );
  }

  rasenganHit() {
    return this.ninja.checkRasenganCollision(this.player.rasenganHitBox())
  }




  restartGame(e) {
    // debugger
    if (e.key === "l" && this.gameOver()) {
      this.score = new Score();
      this.player = new Player();
      this.obstacle = new Obstacle();
      this.ninja = new Ninja();
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
    if (this.rasenganHit() && this.player.shooting) {
        this.ninja.ninjaHit = true;
        this.player.ninjaHit = true;
    }
    this.obstacle.animate(this.ctx);
    this.player.animate(this.ctx);
    this.ninja.animate(this.ctx);
    
    if (!this.running ) {
        this.gameStartMenu(); 
    }
    
    if (this.gameOver()) {
      this.obstacle.animate(this.ctx);
      this.ninja.animate(this.ctx);
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

