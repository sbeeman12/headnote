require('babel-register');
var readline = require('readline');
var GameOfLife = require('./gameOfLife').default;

game = new GameOfLife(20, 20);
game.set(0, 2, 1);
game.set(1, 2, 1);
game.set(2, 2, 1);
game.set(2, 1, 1);
game.set(1, 0, 1);

console.log(game.display());

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.prompt();

rl.on('line', function (line) {
  console.log('--------\n');
  game.step();
  console.log(game.display());
});

rl.on('close', function () {
  process.exit(0);
});
