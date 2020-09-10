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