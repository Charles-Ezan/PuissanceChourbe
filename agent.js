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


    Minimax_Decision(depth) {
        console.log(depth)
        depth--
        let column = this.Max_Value(this.beliefs, depth)
        console.log(column)
        // return column
    }

    Max_Value(grid, depth) {
        console.log("depth", depth)

        if (depth <= 0) {
            console.log("the end max")
            return 0
        }

        

        else {
            console.log("aprés", depth)
        // console.log(this.compteur)

            var score = -1000

            // console.log("max", grid)

            for (let action = 0; action < grid.length; action++) {
                // console.log(action)


                let tempGrid = this.Successors(this.NewGrid(grid), action)
                if (action == (3)) {
                    console.log("stack", tempGrid)
                }
                depth--
                score = Math.max(score, this.Min_Value(tempGrid, depth))
            }
            return score
        }
    }

    Min_Value(grid, depth) {

        if (this.depth <= 0) {
            return 0
        }

        else {

            var score = 1000

            // console.log("min", grid)

            for (let action = 0; action < grid.length; action++) {

                let tempGrid = this.Successors(this.NewGrid(grid), action)
                if (action == (3)) {
                    console.log(tempGrid)
                }
                depth--
                score = Math.min(score, this.Max_Value(tempGrid, depth))
            }
            return score
        }
    }

    //Renvoi une grille avec un checker supplementaire sur la colonne precisee
    Successors(grid, actionColumn) {
        // console.log("Successors()")
        // console.log(grid)
        let tempGrid = grid
        for (let index = 0; index < tempGrid[actionColumn].length; index++) {
            if (tempGrid[actionColumn][index] == "nothing") {
                tempGrid[actionColumn][index] = this.color
                // console.log(index)
                return tempGrid
            }
            else { 
                // console.log(index)
                return tempGrid
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

    test() {
        console.log("test", this.beliefs)
        this.Minimax_Decision(2)
    }
}

agent = new ExplorationAgent("red")
agent.test()
