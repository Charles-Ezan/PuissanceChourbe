import Environment from "./environment.js";
// const Environment = require("./environment");
import {Agent, LearningAgent, ExplorationAgent} from './agent.js';

// DOM Elements
const allCells = document.querySelectorAll(".cell");
document.getElementById("start").onclick = launch_game;

// columns
const column0 = [
  allCells[35],
  allCells[28],
  allCells[21],
  allCells[14],
  allCells[7],
  allCells[0],
];
const column1 = [
  allCells[36],
  allCells[29],
  allCells[22],
  allCells[15],
  allCells[8],
  allCells[1],
];
const column2 = [
  allCells[37],
  allCells[30],
  allCells[23],
  allCells[16],
  allCells[9],
  allCells[2],
];
const column3 = [
  allCells[38],
  allCells[31],
  allCells[24],
  allCells[17],
  allCells[10],
  allCells[3],
];
const column4 = [
  allCells[39],
  allCells[32],
  allCells[25],
  allCells[18],
  allCells[11],
  allCells[4],
];
const column5 = [
  allCells[40],
  allCells[33],
  allCells[26],
  allCells[19],
  allCells[12],
  allCells[5],
];
const column6 = [
  allCells[41],
  allCells[34],
  allCells[27],
  allCells[20],
  allCells[13],
  allCells[6],
];
const columns = [column0, column1, column2, column3, column4, column5, column6];

// Functions
const getClassListArray = (cell) => {
  const classList = cell.classList;
  return [...classList];
};

const getFirstOpenCellForColumn = (colIndex) => {
  const column = columns[colIndex];

  for (const cell of column) {
    const classList = getClassListArray(cell);
    if (classList.includes("nothing")) {
      return cell;
    }
  }

  return null;
};

function resetBoard() {
  allCells.forEach((cell) => {
    cell.classList.add("nothing");
    cell.classList.remove("yellow");
    cell.classList.remove("red");
  });
}

function launch_game() {
  resetBoard();
  console.log("NEW GAME")
  let game = new Environment();

  game.diplay_connect_4();

  let miniMaxAgent1 = new ExplorationAgent("red")
  let miniMaxAgent2 = new ExplorationAgent("yellow")

  let iteration_number = 0;
  let checker_added = false;

  while (game.finished == false) {
    iteration_number++;

    // console.log("iteration_number : ", iteration_number);
    // Une itération de jeu
    while (checker_added == false) {
      if (game.player_turn == "red") {
        var col = game.choose_random_column();
        checker_added = game.add_checker(col, getFirstOpenCellForColumn(col));
      } else {
        let alpha = -10000000000
        let beta = 10000000000
        let minimaxresults = miniMaxAgent2.Minimax(game.connect_4, 5, false, alpha, beta)
        let col2 = minimaxresults.column
        let score2 = minimaxresults.score
        checker_added = game.add_checker(col2, getFirstOpenCellForColumn(col2));
      }
    }
    checker_added = false;

    // Test de fin de partie
    game.test_end_game();

    // Changement de joueur si la partie n'est pas finie
    if (game.finished == false) {
      if (game.player_turn == "red") {
        game.player_turn = "yellow";
      } else {
        game.player_turn = "red";
      }
    }
  }
  console.log("finished");
  console.log("Winner : ", game.victorious_player);
  console.log("iteration_number : ", iteration_number);
  console.log("connect_4 : ", game.connect_4);
}
