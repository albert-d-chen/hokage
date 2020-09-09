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
        this.gameCanvas.addEventListener('keydown', this.restartGame(event))

    }
    
    click(e) {
        if (!this.running) {
        // this.score.score = 0;
        this.play();
        }
    }
    
    gameOver() {
        return (
            this.obstacle.checkCollision(this.player.playerHitBox())
        )
    }

    restartGame() {
            this.running = false;
            this.score = new Score();
            this.player = new Player();
            this.obstacle = new Obstacle();
            this.animate();
    }

    gameOverMenu() {
        const gameover = 'GAME OVER';
        const tryagain = 'Press L to accept defeat and try again';
        this.ctx.font = '50px Helvetica';
        this.ctx.strokeStyle = 'cyan';
        this.ctx.fillStyle = 'white';
        this.ctx.strokeText(gameover, 250, 150);
        this.ctx.fillText(gameover, 250, 150);
        this.ctx.font = '30px Helvetica';
        this.ctx.strokeText(tryagain, 130, 180);
        this.ctx.fillText(tryagain, 130, 180);
    }

    animate() {
        this.obstacle.animate(this.ctx);
        this.player.animate(this.ctx);

        if (this.gameOver()) {
            this.gameOverMenu();
            this.restartGame();
        }

        this.score.draw(this.ctx);

        if (this.running) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }


}

module.exports = Game;

