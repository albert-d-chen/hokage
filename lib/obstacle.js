const CONSTANTS = {
    OBSTACLE_WIDTH: 30,
    SPACING: 500,
}

const TREE = {
    tree1: [10, 103, 150, 150],
    tree2: [380, 21, 130, 280]
}

const ROCK = {
    rock1: [0, 0, 395, 400]
}

const WATER = {
    water1: [294, 140, 100, 30]
}
class Obstacle {
    constructor(options) {
        this.x = 300;
        this.y = 230;
        this.speed = 5;
        this.backgroundx = 0;
        this.backgroundy = -50;

        this.background = new Image();
        this.background.src =  './assets/images/forest.png';
        
        this.tree = new Image();
        this.tree.src = './assets/images/trees.png'
        this.water = new Image();
        this.water.src = './assets/images/water.png'
        this.rock = new Image();
        this.rock.src = './assets/images/rock1.png'

        const firstObstacleDistance = this.x + 200;
        this.obstacles = [this.createObstacle(firstObstacleDistance + 210), this.createObstacle(firstObstacleDistance * 2.5 )];
    }

    createObstacle(x) {
        // const obstacle = {
        //     oneObstacle: {  
        //         left: x,
        //         right: CONSTANTS.OBSTACLE_WIDTH + x,
        //         top: this.y,
        //         bottom: this.y + 130,
        //         type: this.randomObstacle(2)
        //     },
        // }
        const obstacle = {
            oneObstacle: {  
                left: x,
                right: CONSTANTS.OBSTACLE_WIDTH + x,
                top: 230,
                bottom: 360,
                type: this.randomObstacle(3)
            },
        }


        return obstacle;
    }

    eachObstacle(callback){
        this.obstacles.forEach(callback.bind(this))
    }

    drawObstacle(ctx) {
        this.eachObstacle(function(obstacle) {
            // ctx.beginPath();
            // ctx.fillStyle = "orange";
            // ctx.fillRect(obstacle.oneObstacle.left  , this.y, 30, 130);
            // ctx.closePath();

           
            if (obstacle.oneObstacle.type === 0) {
                obstacle.oneObstacle.top = 230;
                obstacle.oneObstacle.bottom = 360;
                ctx.drawImage(this.tree, TREE.tree1[0], TREE.tree1[1], TREE.tree1[2], TREE.tree1[3], obstacle.oneObstacle.left, this.y - 50, 140, 150)
            } else if (obstacle.oneObstacle.type === 1) {
                obstacle.oneObstacle.top = 350;
                obstacle.oneObstacle.bottom = 450;
                ctx.drawImage(this.water, WATER.water1[0], WATER.water1[1], WATER.water1[2], WATER.water1[3], obstacle.oneObstacle.left, this.y + 99, 100, 20)
            } else if (obstacle.oneObstacle.type === 2) {
                obstacle.oneObstacle.top = 300;
                obstacle.oneObstacle.bottom = 400;
                ctx.drawImage(this.rock, ROCK.rock1[0], ROCK.rock1[1], ROCK.rock1[2], ROCK.rock1[3], obstacle.oneObstacle.left, this.y + 30, 100, 80)
            }
        })
    }

    drawObstacle2(ctx) {
        this.eachObstacle(function(obstacle) {
                ctx.beginPath();
                ctx.fillStyle = "orange";
                ctx.fillRect(obstacle.oneObstacle.left, this.y, 30, 130);
                ctx.closePath();
            }
        )
    }

    randomObstacle(max) {
        return Math.floor(Math.random() * Math.floor(max))
    }

    move() {
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
        ctx.drawImage(this.background, this.backgroundx, this.backgroundy);
        ctx.drawImage(this.background, this.backgroundx + 700, this.backgroundy);
        if (this.backgroundx <= -700) {
            this.backgroundx = 0;
        }
        // ctx.drawImage(this.background, this.x + 700, this.y);

        this.moveBackground();
    }

    moveBackground() {
        this.backgroundx -= this.speed;
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
            if (obstacleBox.top  > playerBox.bottom || obstacleBox.bottom < playerBox.top) {
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