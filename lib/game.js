const Player = require('./player');
const Obstacle = require('./obstacle');
const Score = require('./score');

class Game {
    constructor(ctx, gameCanvas) {
        this.ctx = ctx;
        this.gameCanvas = gameCanvas;

        this.player = new Player();
        this.obstacle = new Obstacle();

        this.score = new Score();

        this.registerEvents();
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
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space'){
                this.player.jumping = true;
            } 
        })
        this.restart = this.restartGame.bind(this);
        document.addEventListener('keydown', this.restart)
    }
    
    click(e) {
        if (!this.running) {
        this.play();
        }
    }
    
    gameOver() {
        return (
            this.obstacle.checkCollision(this.player.playerHitBox())
        )
    }

    restartGame(e) {
            // debugger
            if (e.key === 'l' && this.gameOver()) {
                    this.score = new Score();
                    this.player = new Player();
                    this.obstacle = new Obstacle();
                    e.preventDefault();
                    this.animate();
                }
            
    }

    gameOverMenu() {
        const gameover = 'GAME OVER';
        const tryagain = 'Press L to accept defeat and try again';
        this.ctx.font = '50px Helvetica';
        this.ctx.strokeStyle = 'cyan';
        this.ctx.fillStyle = 'white';
        this.ctx.strokeText(gameover, 230, 150);
        this.ctx.fillText(gameover, 230, 150);
        this.ctx.font = '30px Helvetica';
        this.ctx.strokeText(tryagain, 130, 180);
        this.ctx.fillText(tryagain, 130, 180);
    }

    animate() {
        this.obstacle.animate(this.ctx);
        this.player.animate(this.ctx);

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

