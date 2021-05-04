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

    testGrid = [
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["yellow","yellow","yellow","yellow","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"]
    ]
}

export class LearningAgent extends Agent {

}

export class ExplorationAgent extends Agent {

    Minimax_Decision(depth) {
        depth--
        console.log("NBBBBBBBBBBBBB AU DEBUT:", this.NombreCheckersDansGrille(this.beliefs))
        // let score = this.Max_Value(this.beliefs, depth).score
        let columnAction = this.Max_Value(this.beliefs, depth).column
        // if(this.beliefs[columnAction][5] !== "nothing"){
        //     columnAction = 4
        // }
        console.log("next action from ", this.color, ": ", columnAction)
        return columnAction
    }

    Max_Value(grid, depth) {
        depth--
        let column
        let previousScore = -1000

        if (depth == 0) {
            // console.log("AAAAAAAAAXXXXXXX", this.NombreCheckersDansGrille(grid))
            return {score: this.Utility(grid, this.color)}
        }

        else {
            var score = -10000000
            let grids = this.Successors(grid, this.color)

            grids.forEach((grid, index) => {
                // console.log("indexxxxxxxxxxxx", index)
                score = Math.max(score, this.Min_Value(grid, depth))
                if (previousScore < score) {
                    column = index
                    previousScore = score
                }
            })
        }
        return {score: score, column: column}
    }

    Min_Value(grid, depth) {
        depth--

        if (depth <= 0) {
            // if(Math.random()<0.001){
            // // console.log("THE GRIDSSSSSSSS", grids)
            // console.log("THE PREVIOUS GRIDDDDDDDDDDDDDD", grid, "\nvalue =", this.Utility(grid, this.color) )
            // }
            // console.log("value =", this.Utility(grid, this.color) )
            return this.Utility(grid, this.color)
        }

        else {
            var score = 10000000
            let grids = this.Successors(grid, this.color)

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
            tempGrid[column] = this.AddCheckerToColumn(tempGrid[column], color)
            grids.push(tempGrid)
            }

        
        // if(Math.random()<0.001){
        //     console.log("THE GRIDSSSSSSSS", grids)
        //     console.log("THE PREVIOUS GRIDDDDDDDDDDDDDD", grid, "\nvalue =", this.Utility(grid, this.color) )
        // }
        return grids
    }

    AddCheckerToColumn(column, color) {
        if (column[5] != "nothing") {
            return column
        }
        else {
            for (let index = 0; index < column.length; index++) {
                if(column[index] == "nothing") {
                    column[index] = color
                    return column
                }        
            }
        }
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
        let opponentColor = this.OpponentColor(this.color)

        // Checkers de l'agent sur la colonne du milieu
        for (let checker = 0; checker < 6; checker++) {
            if (grid[3][checker] == color) {
                if (color == this.color) {
                    score = score + 100 + Math.random()*30
                }
            }
        }

        //Recherche alignement de 2, 3 ou 4 checkers
        for (let column = 0; column < grid.length; column++) {
            for (let row = 0; row < grid[column].length; row++) {

                //Alignements horizontaux + droite vers le haut

                    //Alignement de 4
                if (column < 4) {
                    if (this.test_alignement(color, grid[column][row], grid[column+1][row], grid[column+2][row], grid[column+3][row])) {
                        score = score + 1000
                    }
                    if (this.test_alignement(opponentColor, grid[column][row], grid[column+1][row], grid[column+2][row], grid[column+3][row])) {
                        score = score - 1000
                    }

                    if (row < 4) {
                        if (this.test_alignement(color, grid[column][row], grid[column+1][row+1], grid[column+2][row+2], grid[column+3][row+3])) {
                                score = score + 1000
                        } 
                        if (this.test_alignement(opponentColor, grid[column][row], grid[column+1][row+1], grid[column+2][row+2], grid[column+3][row+3])) {
                                score = score - 1000
                        } 
                    }
                }
                
                    //Alignement de 3
                if(column < 5) {
                    if (this.test_alignement(color, grid[column][row], grid[column+1][row], grid[column+2][row])) {
                        if (color == this.color) {
                            score = score + 30 + Math.random()*30
                        }
                        if (this.test_alignement(opponentColor, grid[column][row], grid[column+1][row], grid[column+2][row])) {
                            if (color == opponentColor) {
                                score = score - 30 - Math.random()*30
                            }
                        }
                    }
                }

                //Alignements verticaux

                    //Alignement de 4
                if (row < 3) {
                    if (this.test_alignement(color, grid[column][row], grid[column][row+1], grid[column][row+2], grid[column][row+3])) {
                        if (color == this.color) {
                            score = score + 1000
                        }
                    }
                    if (this.test_alignement(opponentColor, grid[column][row], grid[column][row+1], grid[column][row+2], grid[column][row+3])) {
                        if (color == opponentColor) {
                            score = score - 1000
                        }
                    }
                }

                    //Alignement de 3
                if(row < 4) {
                    if (this.test_alignement(color, grid[column][row], grid[column][row+1], grid[column][row+2])) {
                            score = score + 30 + Math.random()*30
                    }
                    if (this.test_alignement(opponentColor, grid[column][row], grid[column][row+1], grid[column][row+2])) {
                            score = score - 30 - Math.random()*30
                            console.log("yoooooooooooOOOOOOOOOOOOOOOOOOOOO")
                    }
                }

                //Alignement droite vers bas

                    //Alignement de 4
                if (column > 3) {
                    if (row < 4) {
                        if (this.test_alignement(color, grid[column][row], grid[column-1][row+1], grid[column-2][row+2], grid[column-3][row+3])) {
                            if (color == this.color) {
                                score = score + 1000
                            }
                        }
                        if (this.test_alignement(opponentColor, grid[column][row], grid[column-1][row+1], grid[column-2][row+2], grid[column-3][row+3])) {
                            if (color == opponentColor) {
                                score = score - 1000
                            }
                        }
                    }
                }
                    //Alignements de 3
                if (column > 2) {
                    if (row < 5) {
                        if (this.test_alignement(color, grid[column][row], grid[column-1][row+1], grid[column-2][row+2])) {
                            if (color == this.color) {
                                score = score + 30 + Math.random()*30
                            }
                        }
                        if (this.test_alignement(opponentColor, grid[column][row], grid[column-1][row+1], grid[column-2][row+2])) {
                            if (color == opponentColor) {
                                score = score - 30 - Math.random()*30
                            }
                        }
                    }
                }
            }
        }
        return score
    }

    test_alignement(color, checker_a, checker_b, checker_c, checker_d){
        if (arguments.length == 3) {
            return((checker_a == color) && (checker_a == checker_b));
        }
        else if (arguments.length == 4) {
            return((checker_a == color) && (checker_a == checker_b) && (checker_a == checker_c));
        }
        else if (arguments.length == 5) {
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

    NombreCheckersDansGrille(grid) {
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

    // test() {
    //     let t0= performance.now(); //start time
    //     let scoreUti = this.Utility(this.testGrid, "yellow")
    //     console.log("scoreAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", scoreUti)
    //     let t1= performance.now(); //end time
    //     console.log('Time taken to execute add function: '+ (t1-t0) +' milliseconds');
    // }
}
