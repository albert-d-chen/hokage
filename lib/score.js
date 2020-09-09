class Score { 
    constructor() {
        this.score = 0;
    }

    draw(ctx) {
        const yourScore = `Score: ${this.score}`;
        ctx.font = "25px Helvetica";
        ctx.strokeStyle = "cyan";
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