//Recuperation de la grille => update des beliefs

//Placer un element dans la grille

export class Agent {
    constructor(color) {
        this.color = color
    }

    beliefs = [
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"]
    ]

    emptyGrid = [
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"]
    ]

    // addCheckers(color, column) {
    //     this.beliefs[column].push(color)
    // }


}

export class LearningAgent extends Agent {

}

export class ExplorationAgent extends Agent {

    Minimax_Decision(depth) {
        depth--
        let score = this.Max_Value(this.beliefs, depth).score
        let columnAction = this.Max_Value(this.beliefs, depth).column
        console.log("next action from ", this.color, ": ", columnAction, "\nscore:", score)
        return columnAction
    }

    Max_Value(grid, depth) {
        depth--
        let column = 0

        if (depth <= 0) {
            return {score: this.Utility(grid, this.color)}
        }

        else {
            var score = -1000
            let grids = this.Successors(grid, this.color)

            grids.forEach((grid, index) => {
                let previousScore = score
                //Suprime les colonnes completes
                for (let c = 0; c < grid.length; c++) {
                    if (grid[c][5] == "nothing") {
                        score = Math.max(score, this.Min_Value(grid, depth))
                        if (previousScore < score) {
                            column = index
                        }
                    }
                }
            })
        }
        return {score: score, column: column}
    }

    Min_Value(grid, depth) {
        depth--

        if (depth <= 0) {
            return this.Utility(grid, this.color)
        }

        else {
            var score = 1000
            let grids = this.Successors(grid, this.OpponentColor(this.color))

            grids.forEach(grid => {
                score = Math.min(score, this.Max_Value(grid, depth).score)
            })
        }
        return score
    }

    //Renvoi les grilles possibles au prochain coup
    Successors(grid, color) {
        let grids = []
        for (let column = 0; column < grid.length; column++) {            
            let tempGrid = this.NewGrid(grid)
            for (let index = 0; index < grid[column].length; index++) {
                if (tempGrid[column][index] == "nothing") {
                    tempGrid[column][index] = color
                    index = grid[column][index]
                }
                else {
                    tempGrid = this.emptyGrid
                }
            }
        grids.push(tempGrid)
        }  
        return grids
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

    UpdateBeliefs(grid){
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

        // Checkers de l'agent sur la colonne du milieu
        for (let checker = 0; checker < 6; checker++) {
            if (grid[3][checker] == color) {
                score = score + 4
            }
        }

        //Recherche alignement de 2, 3 ou 4 checkers
        for (let column = 0; column < grid.length; column++) {
            for (let row = 0; row < grid[column].length; row++) {
                
                //Alignements horizontaux + droite vers le haut

                    //Alignement de 4
                if (typeof grid[column + 3] !== 'undefined') {
                    if (this.test_alignement(color, grid[column][row], grid[column+1][row], grid[column+2][row], grid[column+3][row])) {
                        score = score + 1000
                    }

                    if (typeof grid[column][row + 3] !== 'undefined') {
                        if (this.test_alignement(color, grid[column][row], grid[column+1][row+1], grid[column+2][row+2], grid[column+3][row+3])) {
                            score = score + 1000
                        } 
                    }
                }
                
                    //Alignement de 3
                else if(typeof grid[column + 2] !== 'undefined') {
                    if (this.test_alignement(color, grid[column][row], grid[column+1][row], grid[column+2][row])) {
                        score = score + 5
                    }
                }

                //Alignements verticaux

                    //Alignement de 4
                if (typeof grid[column][row+3] !== 'undefined') {
                    if (this.test_alignement(color, grid[column][row], grid[column][row+1], grid[column][row+2], grid[column][row+3])) {
                        score = score + 1000
                    }
                }

                    //Alignement de 3
                else if(typeof grid[column + 2] !== 'undefined') {
                    if (this.test_alignement(color, grid[column][row], grid[column][row+1], grid[column][row+2])) {
                        score = score + 5
                    }
                }

                //Alignement droite vers bas

                    //Alignement de 4
                if ((typeof grid[column-1] && typeof grid[column-2] && typeof grid[column-3]) !== 'undefined') {
                    if (typeof grid[column][row + 3] !== 'undefined') {
                        if (this.test_alignement(color, grid[column][row], grid[column-1][row+1], grid[column-2][row+2], grid[column-3][row+3])) {
                            score = score + 1000
                        }
                    }
                }
                    //Alignements de 3
                else if ((typeof grid[column-1] && typeof grid[column-2]) !== 'undefined') {
                    if (typeof grid[column][row + 2] !== 'undefined') {
                        if (this.test_alignement(color, grid[column][row], grid[column-1][row+1], grid[column-2][row+2])) {
                            score = score + 5
                        }
                    }
                }
            }
        }
        return score
    }

    test_alignement(color, checker_a, checker_b, checker_c, checker_d){
        if (arguments.length == 2) {
            return((checker_a == color) && (checker_a == checker_b));
        }
        else if (arguments.length == 3) {
            return((checker_a == color) && (checker_a == checker_b) && (checker_a == checker_c));
        }
        else if (arguments.length == 4) {
            return((checker_a == color) && (checker_a == checker_b) && (checker_a == checker_c) && (checker_a == checker_d));
        }
    }

    OpponentColor(color) {
        let opponentColor
        if (color == "red") {
            opponentColor = "yellow"
        }
        else {
            opponentColor = "red"
        }
        return opponentColor
    }

    // test() {
    //     let t0= performance.now(); //start time
    //     this.Minimax_Decision(9)
    //     let t1= performance.now(); //end time
    //     console.log('Time taken to execute add function: '+ (t1-t0) +' milliseconds');
    // }
}


