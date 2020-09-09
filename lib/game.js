const Player = require('./player');
const Obstacle = require('./obstacle');

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

