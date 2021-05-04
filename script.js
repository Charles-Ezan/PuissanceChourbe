import { LearningAgent,ExplorationAgent, Agent } from "./agent.js";
import Environment from "./environment.js";
// const Environment = require("./environment");
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
    let game = new Environment();

    let learning_agent_color = "red";
    let learningAgent = new LearningAgent(learning_agent_color);
    let learning_agent_reward = 0;

    // game.diplay_connect_4();

    let iteration_number = 0;
    let checker_added = false;

    var column;

    var player_round = "yellow";

    var number_victory_red = 0;
    var number_victory_yellow = 0;
    var number_without_victory = 0;

    var yellow_win_after_train =0;
    var red_win_after_train =0; 
    var total_games = 1;
    var victory_list = [];

    console.log("beginning of the training");
    for(let game_number = 0 ; game_number<total_games ;game_number++ ){
        iteration_number = 0;
        game.Reset_grid();

        console.log("START");
        while (game.finished == false) {
            iteration_number++;
            // Random agent
            console.log("game after iterate : ", game.connect_4);
            while (player_round == "yellow"){
                var col = game.choose_random_column();
                var renderedCell_1 = getFirstOpenCellForColumn(col);
                checker_added = game.add_checker(col,renderedCell_1,player_round);

                // 0 -> jeton pas posé
                // 1 -> jeton posé mais pas vainqueur
                // 2 -> jeton posé avec vainqueur
                // 3 -> jeton posé grille plein
                if(checker_added != 0){
                    player_round = "red";
                }
                // en cas de victoire
                if(checker_added == 2){
                    learning_agent_reward = -1000;
                    number_victory_yellow++;
                    victory_list.push("yellow");
                }
                // else{
                //     learning_agent_reward = 0;
                // }
            
            }
            checker_added = false;


            // Learning agent
            // while (checker_added == false) {
            if(game.finished == false){
                while (player_round == "red"){
                    // ----------------------------------------------------------------------------------
                    // learningAgent
                    let random_value = Math.random()
                    // Détermination de l'action en fonction d'epsilon
                    column = (random_value < learningAgent.epsilon ) ? game.choose_random_column() : learningAgent.Max_action(Q, observationInt, possibleActions)
                    // Mise à jour visuelle après avoir joué
                    var renderedCell = getFirstOpenCellForColumn(column);
                    // Renvoi une récompense le nouvel état du jeu et si 
                    checker_added = game.add_checker(column, renderedCell,player_round);
                    // ----------------------------------------------------------------------------------

                    // Agent random 2 --------
                    // 0 -> jeton pas posé
                    // 1 -> jeton posé mais pas vainqueur
                    // 2 -> jeton posé avec vainqueur
                    // 3 -> jeton posé grille plein
                    if(checker_added != 0){
                        learning_agent_reward = game.Evaluate_move(column);
                        // console.log("reward : ", learning_agent_reward);
                        player_round = "yellow";

                    }
                    // en cas de victoire
                    if(checker_added == 2){
                        learning_agent_reward = 1000;
                        number_victory_red++;
                        victory_list.push("red");
                    }
                }
            }
            checker_added = false;

            // ----------------------------------------------------------------------------------
            // Update Beliefs
            learningAgent.Update_beliefs(game.connect_4);

            // Update Q table
            learningAgent.Update_Q_value(column,learning_agent_reward);
            // ----------------------------------------------------------------------------------
        }

        // Modification Epsilon
        if(game_number >(total_games/1.3)){
            game.epsilon = 0;
            if(player_round == "red"){
                yellow_win_after_train++;
            }
            else{
                red_win_after_train++;
            }
        }
        else{
            game.epsilon = 1 - game_number/(total_games/1.3)
        }
    }
console.log("Q table : ", learningAgent.new_Q_2)
console.log("number_victory_red : " , number_victory_red, " number_victory_yellow : ", number_victory_yellow);
console.log("learning_rate : ", learningAgent.learning_rate, "discount_rate : ",learningAgent.discount_rate, "epsilon : ", learningAgent.epsilon )
console.log("red_win_after_train : ", red_win_after_train, "yellow_win_after_train : ", yellow_win_after_train)
}
