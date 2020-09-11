const Player = require('./player.js')
const Game = require('./game.js')


document.addEventListener("DOMContentLoaded", function () {
    const gameCanvas = document.getElementById("game-canvas");
    const ctx = gameCanvas.getContext("2d");
    // gameCanvas.width = 700;
    // gameCanvas.height = 400;

    const game = new Game(ctx, gameCanvas);

    game.animate();

});
