const CONSTANTS = {
    OBSTACLE_WIDTH: 50,
    SPACING: 300,
    SPEED: 2,
}

class Obstacle {
    constructor(options) {
        this.x = 300;
        this.y = 270;
    }

    drawObstacle(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "orange";
        ctx.fillRect(this.x, this.y, 50, 130)
        ctx.closePath();
    }
 
    animate(ctx) {
        this.drawObstacle(ctx);
    }

}

module.exports = Obstacle;