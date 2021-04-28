//Recuperation de la grille => update des beliefs

//Placer un element dans la grille

class Agent {
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

    // addCheckers(color, column) {
    //     this.beliefs[column].push(color)
    // }


}

class LearningAgent extends Agent {

}

class ExplorationAgent extends Agent {

    compteur = 0

    Minimax_Decision(depth) {
        column = this.Max_Value(this.beliefs, depth)
        // console.log(column)
        // return column
    }

    Max_Value(grid, depth) {

        if (depth == this.compteur) {
            console.log("the end max")
            this.compteur = 0
            return 0
        }

        else {
        // console.log(this.compteur)

            var score = -1000

            // console.log("max", grid)

            for (let action = 0; action < grid.length; action++) {

                // console.log(action)
                if (action == (0 || 3)) {
                    // console.log("tempGrid")
                }

                let tempGrid = this.Successors(grid, action)
                // console.log("temp", tempGrid)
                score = Math.max(score, this.Min_Value(tempGrid))

            }
            return score
        }
    }

    Min_Value(grid) {

        if (this.depth == this.compteur) {
            this.compteur = 0
            console.log("the end min")
            return 0
        }

        else {

            var score = 1000

            // console.log("min", grid)

            for (let action = 0; action < grid.length; action++) {

                let tempGrid = this.Successors(grid, action)
                score = Math.min(score, this.Max_Value(tempGrid))
            }

            return score
        }
    }

    //Renvoi une grille avec un checker supplementaire sur la colonne precisee
    Successors(grid, actionColumn) {
        // console.log("Successors()")
        // console.log(grid)
        for (let index = 0; index < grid[actionColumn].length; index++) {
            if (grid[actionColumn][index] == "nothing") {
                grid[actionColumn][index] = this.color
                return grid
            }
            else { 
                return grid
            }
        }
    }

    test() {
        // console.log("test", this.beliefs)
        this.Minimax_Decision(2)
    }
}

agent = new ExplorationAgent("red")
agent.test()
