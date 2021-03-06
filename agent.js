//Recuperation de la grille => update des beliefs

// import { Sensor } from "./sensor";

//Placer un element dans la grille

export class Agent {
    constructor(color) {
        this.color = color
    }

    // Croyance du joueur
    beliefs = [
        ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
        ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
        ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
        ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
        ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
        ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
        ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"]
    ]

    // actions disponibles
    desire = [0, 1, 2, 3, 4, 5, 6]

    // addCheckers(color, column) {
    //     this.beliefs[column].push(color)
    // }


}

export class LearningAgent extends Agent {

    // Q_table
    Q_table = {}

    epsilon = 1.0;
    learning_rate = 0.15 // AlPHA
    discount_rate = 0.8 // GAMMA


    old_beliefs = [
        ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
        ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
        ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
        ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
        ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
        ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
        ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"]
    ]

    // Mettre à jour espilon
    Set_epsilon(new_epsilon) {
        this.epsilon = new_epsilon
    }

    // Mettre à jour le learning rate
    Set_learning_rate(new_learning_rate) {
        this.learning_rate = new_learning_rate
    }

    // Retourne l'action qui a le plus de valeur parmi les actions possibles
    Max_action(a_state) {
        let q_values = [];

        // On récupère les actions possibles
        let possible_actions = this.Get_possible_actions(a_state);

        // Récupération des Q-values
        possible_actions.forEach(an_action => {
            q_values.push(this.Get_Q_value(a_state, an_action));
        });

        let index = q_values.indexOf(Math.max.apply(null, q_values));
        return possible_actions[index];
    }


    // Retourne la liste des actions possibles par rapport à l'état
    Get_possible_actions(connect_4_state) {
        let possible_actions = [];

        for (let i = 0; i < connect_4_state.length; i++) {
            if (connect_4_state[i][5] == "nothing") {
                possible_actions.push(i);
            }
        }
        return possible_actions;
    }

    // Fonction permettant de tester si une valeur existe
    // Par "Str" sur stack overflow
    // https://stackoverflow.com/questions/14782232/how-to-avoid-cannot-read-property-of-undefined-errors
    getSafe(fn, defaultVal) {
        try {
            return fn();
        } catch (e) {
            return defaultVal;
        }
    }

    // Permet de récupérer une Q_value à partir d'un état et d'une action
    Get_Q_value(a_state, an_action) {

        let the_state = JSON.stringify(a_state);

        if (this.getSafe(() => this.Q_table[the_state][an_action])) {
            // console.log("Existe");
            return this.Q_table[the_state][an_action];
        } else {
            // Si l'état n'existe pas alors on l'ajoute à la table avec des valeurs de 1
            // console.log("N'existe pas");
            this.Q_table[the_state] = { 0: 0.0, 1: 0.0, 2: 0.0, 3: 0.0, 4: 0.0, 5: 0.0, 6: 0.0 }
        }
        return this.Q_table[the_state][an_action];
    }

    // // Mettre à jour les beliefs
    Update_beliefs(a_connect_4) {
        for (let i = 0; i < a_connect_4.length; i++) {
            for (let j = 0; j < a_connect_4[i].length; j++) {
                this.beliefs[i][j] = a_connect_4[i][j];
            }
        }
    }

    // // Mettre à jour les beliefs
    // Update_beliefs(){
    //     let grid_from_sensor = Sensor.Get_information_from_environment();
    //     for(let i=0 ; i<a_connect_4.length ; i++){
    //         for(let j=0 ; j<a_connect_4[i].length ; j++ ){
    //             this.beliefs[i][j] = a_connect_4[i][j];
    //         }
    //     }
    // }

    // Sauvegarde des beliefs
    Update_old_beliefs() {
        for (let i = 0; i < this.beliefs.length; i++) {
            for (let j = 0; j < this.beliefs[i].length; j++) {
                this.old_beliefs[i][j] = this.beliefs[i][j];
            }
        }
    }

    // Mise à jour de la Q-table à l'aide de l'équation de Bellman
    Update_Q_value(an_action, a_reward) {

        // Actions disponibles dans cette nouvelle grille
        // let actions_after = this.Get_possible_actions(this.beliefs);

        // Meilleur actions à ce nouvel état
        // let best_action_after = this.Max_action(this.beliefs, actions_after);
        let best_action_after = this.Max_action(this.beliefs);


        // Etat
        let max_q_next = this.Get_Q_value(this.beliefs, best_action_after);

        // Etat avant l'action
        let q_before_action = this.Get_Q_value(this.old_beliefs, an_action);

        // Etat dans lequel nous sommes
        let q_state = JSON.stringify(this.old_beliefs);

        // this.Q[(this.old_beliefs,an_action)] = q_before_action + this.learning_rate * (a_reward + this.discount_rate *max_q_next - q_before_action);

        // Equation de Bellman 
        this.Q_table[q_state][an_action] = q_before_action + this.learning_rate * (a_reward + this.discount_rate * max_q_next - q_before_action);

        this.Update_old_beliefs();
    }

    // Comparaison 2 deux grilles
    Compare_lists(list_1, list_2) {
        if (JSON.stringify(list_1) == JSON.stringify(list_2)) {
            return true;
        }
        return false;
    }
}

export class ExplorationAgent extends Agent {

    Minimax(grid, depth, AITurn, alpha, beta) {

        let possibilities = this.ColumnPossibilities(grid)
        let finalGrid = this.TerminalTest(grid)

        if (depth == 0 || finalGrid) {
            if (finalGrid) {
                if (this.WinningTest(grid, this.color)) {
                    return { column: null, score: 100000 }
                } else if (this.WinningTest(grid, this.OpponentColor(this.color))) {
                    return { column: null, score: -100000 }
                } else {
                    return { column: null, score: 0 }
                }
            } else {
                return { column: null, score: this.Utility(grid, this.color) }
            }
        }

        if (AITurn) {
            let score = -10000
            let column = possibilities[Math.floor((Math.random() * possibilities.length))]

            for (const tempColumn in possibilities) {
                let temptempColumn = parseInt(tempColumn)
                let checker = this.EmptyRow(grid, temptempColumn)
                let tempGrid = this.NewGrid(grid)
                tempGrid = this.AddCheckerToColumn(tempGrid, temptempColumn, checker, this.color)
                let tempResult = this.Minimax(tempGrid, depth - 1, false, alpha, beta)
                let tempScore = tempResult.score

                if (tempScore > score) {
                    score = tempScore
                    column = temptempColumn
                }
                alpha = Math.max(alpha, score)
                if (alpha >= beta) {
                    break
                }
                return { column: column, score: score }
            }
        } else {
            let score = 10000
            let column = possibilities[Math.floor((Math.random() * possibilities.length))]
            for (const tempColumn in possibilities) {
                let temptempColumn = parseInt(tempColumn)
                let checker = this.EmptyRow(grid, temptempColumn)
                let tempGrid = this.NewGrid(grid)
                tempGrid = this.AddCheckerToColumn(tempGrid, temptempColumn, checker, this.OpponentColor(this.color))
                let tempResult = this.Minimax(tempGrid, depth - 1, false, alpha, beta)
                let tempScore = tempResult.score
                if (tempScore < score) {
                    score = tempScore
                    column = temptempColumn
                }
                beta = Math.min(beta, score)
                if (alpha >= beta) {
                    break
                }
            }
            return { column: column, score: score }
        }
    }

    AddCheckerToColumn(grid, column, row, AIColor) {
        grid[column][row] = AIColor
        return grid
    }

    NewGrid(grid) {
        let newGrid = []
        for (let column = 0; column < grid.length; column++) {
            let newColumn = []
            for (let row = 0; row < grid[column].length; row++) {
                newColumn.push(grid[column][row])
            }
            newGrid.push(newColumn)
        }
        return newGrid
    }

    UpdateBeliefs(grid) {
        let newGrid = []
        this.beliefs = [];
        for (let column = 0; column < grid.length; column++) {
            let newColumn = []
            for (let row = 0; row < grid[column].length; row++) {
                newColumn.push(grid[column][row])
            }
            this.beliefs.push(newColumn)
        }
    }

    //Calcul un score pour une grille
    Utility(grid, color) {
        let score = 0
        let opponentColor = this.OpponentColor(this.color)

        if (color == opponentColor) {
            opponentColor = color
        }

        // Checkers de l'agent sur la colonne du milieu
        for (let checker = 0; checker < 6; checker++) {
            if (grid[3][checker] == color) {
                if (color == this.color) {
                    score = score + 100
                }
            }
        }

        // Recherche alignement de 2, 3 ou 4 checkers
        for (let column = 0; column < grid.length; column++) {
            for (let row = 0; row < grid[column].length; row++) {

                //Alignements horizontaux + droite vers le haut

                //Alignement de 4
                if (column < 4) {
                    if (this.test_alignement(color, grid[column][row], grid[column + 1][row], grid[column + 2][row], grid[column + 3][row])) {
                        score = score + 1000
                    }
                    if (this.test_alignement(opponentColor, grid[column][row], grid[column + 1][row], grid[column + 2][row], grid[column + 3][row])) {
                        score = score - 1000
                    }

                    if (row < 4) {
                        if (this.test_alignement(color, grid[column][row], grid[column + 1][row + 1], grid[column + 2][row + 2], grid[column + 3][row + 3])) {
                            score = score + 1000
                        }
                        if (this.test_alignement(opponentColor, grid[column][row], grid[column + 1][row + 1], grid[column + 2][row + 2], grid[column + 3][row + 3])) {
                            score = score - 1000
                        }
                    }
                }

                //Alignement de 3
                if (column < 5) {
                    if (this.test_alignement(color, grid[column][row], grid[column + 1][row], grid[column + 2][row])) {
                        if (color == this.color) {
                            score = score + 30
                        }
                        if (this.test_alignement(opponentColor, grid[column][row], grid[column + 1][row], grid[column + 2][row])) {
                            if (color == opponentColor) {
                                score = score - 30
                            }
                        }
                    }
                }

                //Alignements verticaux

                //Alignement de 4
                if (row < 3) {
                    if (this.test_alignement(color, grid[column][row], grid[column][row + 1], grid[column][row + 2], grid[column][row + 3])) {
                        if (color == this.color) {
                            score = score + 1000
                        }
                    }
                    if (this.test_alignement(opponentColor, grid[column][row], grid[column][row + 1], grid[column][row + 2], grid[column][row + 3])) {
                        if (color == opponentColor) {
                            score = score - 1000
                        }
                    }
                }

                //Alignement de 3
                if (row < 4) {
                    if (this.test_alignement(color, grid[column][row], grid[column][row + 1], grid[column][row + 2])) {
                        score = score + 30
                    }
                    if (this.test_alignement(opponentColor, grid[column][row], grid[column][row + 1], grid[column][row + 2])) {
                        score = score - 30
                    }
                }

                //Alignement droite vers bas

                //Alignement de 4
                if (column > 3) {
                    if (row < 4) {
                        if (this.test_alignement(color, grid[column][row], grid[column - 1][row + 1], grid[column - 2][row + 2], grid[column - 3][row + 3])) {
                            if (color == this.color) {
                                score = score + 1000
                            }
                        }
                        if (this.test_alignement(opponentColor, grid[column][row], grid[column - 1][row + 1], grid[column - 2][row + 2], grid[column - 3][row + 3])) {
                            if (color == opponentColor) {
                                score = score - 1000
                            }
                        }
                    }
                }
                //Alignements de 3
                if (column > 2) {
                    if (row < 5) {
                        if (this.test_alignement(color, grid[column][row], grid[column - 1][row + 1], grid[column - 2][row + 2])) {
                            if (color == this.color) {
                                score = score + 30
                            }
                        }
                        if (this.test_alignement(opponentColor, grid[column][row], grid[column - 1][row + 1], grid[column - 2][row + 2])) {
                            if (color == opponentColor) {
                                score = score - 30
                            }
                        }
                    }
                }
            }
        }
        return score
    }

    test_alignement(color, checker_a, checker_b, checker_c, checker_d) {
        if (arguments.length == 3) {
            return ((checker_a == color) && (checker_a == checker_b));
        } else if (arguments.length == 4) {
            return ((checker_a == color) && (checker_a == checker_b) && (checker_a == checker_c));
        } else if (arguments.length == 5) {
            return ((checker_a == color) && (checker_a == checker_b) && (checker_a == checker_c) && (checker_a == checker_d));
        }
    }

    OpponentColor(color) {
        let opponentColor
        if (color == "red") {
            opponentColor = "yellow"
        } else {
            opponentColor = "red"
        }
        return opponentColor
    }

    NbCheckersInGrid(grid) {
        let nbCheckers = 0
        for (let column = 0; column < 6; column++) {
            for (let row = 0; row < 5; row++) {
                if (grid[column][row] !== "nothing") {
                    nbCheckers++
                }
            }
        }
        return nbCheckers
    }

    ColumnPossibilities(grid) {
        let possibilities = []
        for (let column = 0; column < 7; column++) {
            if (grid[column][5] == "nothing") {
                possibilities.push(column)
            }
        }
        return possibilities
    }

    TerminalTest(grid) {
        return (this.ColumnPossibilities(grid) == [] || this.WinningTest(grid, this.color) || this.WinningTest(grid, this.OpponentColor(this.color)))
    }

    EmptyRow(grid, column) {
        for (let row = 0; row < 6; row++) {
            if (grid[column][row] == "nothing") {
                return row
            }
        }
    }

    WinningTest(grid, color) {
        for (var i = 0; i < 7; i++) {
            for (let j = 0; j < 6; j++) {
                //victoire verticale
                if (j < 4) {
                    if (
                        this.test_alignement(color,
                            grid[i][j],
                            grid[i][j + 1],
                            grid[i][j + 2],
                            grid[i][j + 3]
                        )
                    ) {
                        return true;
                    }
                }
                //victoire horizontale
                if (i < 3) {
                    if (
                        this.test_alignement(color,
                            grid[i][j],
                            grid[i + 1][j],
                            grid[i + 2][j],
                            grid[i + 3][j]
                        )
                    ) {
                        return true;
                    }
                }
                //victoire
                if (j < 4 && i < 3) {
                    if (
                        this.test_alignement(color,
                            grid[i][j],
                            grid[i + 1][j + 1],
                            grid[i + 2][j + 2],
                            grid[i + 3][j + 3]
                        )
                    ) {
                        return true;
                    }
                }
                //victoire
                if (i > 2 && j < 4) {
                    if (
                        this.test_alignement(color,
                            grid[i][j],
                            grid[i - 1][j + 1],
                            grid[i - 2][j + 2],
                            grid[i - 3][j + 3]
                        )
                    ) {
                        return true;
                    }
                }
                return false;
            }
        }
    }
}