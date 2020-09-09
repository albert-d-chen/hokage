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