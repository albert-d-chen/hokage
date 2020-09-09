const Player = require('./player');

class Game {
  constructor(ctx, gameCanvas) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;

    this.player = new Player();

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
    document.addEventListener('keydown', () => {
        this.player.jumping = true;
    })
  }
  
  animate() {
    this.player.animate(this.ctx);
    if (this.running) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  click(e) {
    if (!this.running) {
      this.play();
    }
  }

}

module.exports = Game;

