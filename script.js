<<<<<<< HEAD
import Environment from "./environment.js";
// const Environment = require("./environment");
=======
import {Agent, LearningAgent, ExplorationAgent} from './agent.js';

>>>>>>> 1af5371043663127e9349337551d184e9e9767a1
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
  const columnWithoutTop = column.slice(0, 6);

  for (const cell of columnWithoutTop) {
    const classList = getClassListArray(cell);
    if (!classList.includes("yellow") && !classList.includes("red")) {
      return cell;
    }
  }

  return null;
};

<<<<<<< HEAD
=======
class Environment {
  connect_4 = [];

  player_turn = "red";

  victorious_player = "none";

  finished = false;

  constructor() {
    this.connect_4 = [
      ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
      ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
      ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
      ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
      ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
      ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
      ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
    ];
  }

  // Test si l'ensemble de checkers passé en paramètre est de la même couleur
  test_line(checker_a, checker_b, checker_c, checker_d) {
    // Test si la première variable est un checker non-vide
    // console.log(" A : " + checker_a + " B : " + checker_b + " C : " + checker_c + " D : " + checker_d);
    return (
      checker_a != "nothing" &&
      checker_a == checker_b &&
      checker_a == checker_c &&
      checker_a == checker_d
    );
  }

  // Test si un des joueurs à remporté la victoire
  test_victory() {
    // Test horizontal
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 6; j++) {
        if (
          this.test_line(
            this.connect_4[i][j],
            this.connect_4[i + 1][j],
            this.connect_4[i + 2][j],
            this.connect_4[i + 3][j]
          )
        ) {
          console.log("horizontal victory, row : ", j);
          return true;
        }
      }
    }
    // Test vertical
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < 3; j++) {
        if (
          this.test_line(
            this.connect_4[i][j],
            this.connect_4[i][j + 1],
            this.connect_4[i][j + 2],
            this.connect_4[i][j + 3]
          )
        ) {
          console.log("vertical victory, column : ", i);
          return true;
        }
      }
    }
    // Test Diagonal gauche vers le haut
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        if (
          this.test_line(
            this.connect_4[i][j],
            this.connect_4[i + 1][j + 1],
            this.connect_4[i + 2][j + 2],
            this.connect_4[i + 3][j + 3]
          )
        ) {
          console.log("diag gauche haut victory");
          return true;
        }
      }
    }
    // Test Diagonal Droite vers le haut
    for (var i = 3; i < 7; i++) {
      for (var j = 0; j < 3; j++) {
        if (
          this.test_line(
            this.connect_4[i][j],
            this.connect_4[i - 1][j + 1],
            this.connect_4[i - 2][j + 2],
            this.connect_4[i - 3][j + 3]
          )
        ) {
          console.log("diag droite haut victory");
          return true;
        }
      }
    }
    return false;
  }

  // Test si la grille est complète
  test_grid_complete() {
    // console.log("test_grid_complete");
    var nothing_checker = false;
    this.connect_4.forEach((element) => {
      element.forEach((checker) => {
        if (checker == "nothing") {
          nothing_checker = true;
        }
      });
    });
    if (nothing_checker) {
      return false;
    }
    return true;
  }

  // Test de fin de partie
  test_end_game() {
    if (this.test_victory()) {
      this.victorious_player = this.player_turn;
      this.finished = true;
      console.log("FIN DE PARTIE - AVEC GAGNANT");
      return true;
    }
    if (this.test_grid_complete()) {
      this.finished = true;
      this.victorious_player = "none";
      console.log("FIN DE PARTIE - PAS DE GAGNANT");
      return true;
    }
    return false;
  }

  // Ajout d'un Checker dans une list
  add_checker(column_number) {
    for (var i = 0; i < 6; i++) {
      if (this.connect_4[column_number][i] == "nothing") {
        this.connect_4[column_number][i] = this.player_turn;
        const displayedCell = getFirstOpenCellForColumn(column_number);
        displayedCell.classList.add(this.player_turn);
        displayedCell.classList.remove("nothing");
        // break;
        return true;
      }
    }
    return false;
  }

  // Sélectionne aléatoirement une des 7 colonne
  choose_random_column() {
    return Math.floor(Math.random() * 7);
  }

  // Afficher le puissance 4
  diplay_connect_4() {
    console.log("display");
    let chercker_number = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 6; j++) {
        chercker_number++;
        console.log(this.connect_4[i][j]);
      }
    }
    // console.log("chercker_number : ", chercker_number);
  }

}
>>>>>>> 1af5371043663127e9349337551d184e9e9767a1
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

    console.log("iteration_number : ", iteration_number);
    // Une itération de jeu
<<<<<<< HEAD
    while (checker_added == false) {
      var col = game.choose_random_column();
      var renderedCell = getFirstOpenCellForColumn(col);
      checker_added = game.add_checker(col, renderedCell);
      console.log("checker_added : ", checker_added);
=======
    if (game.player_turn == "red" ) {
        while (checker_added == false) {
            miniMaxAgent1.UpdateBeliefs(game.connect_4);
            checker_added = game.add_checker(miniMaxAgent1.Minimax_Decision(3));
            console.log("red?", miniMaxAgent1.color)
        }
    }

    else {
        while (checker_added == false ) {
            miniMaxAgent2.UpdateBeliefs(game.connect_4);
            checker_added = game.add_checker(miniMaxAgent2.Minimax_Decision(6));
            console.log("yello?", miniMaxAgent2.color)
        }
>>>>>>> 1af5371043663127e9349337551d184e9e9767a1
    }
    checker_added = false;

    // Test de fin de partie
    game.test_end_game();
    // console.log("iteration_number : ", iteration_number);

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
