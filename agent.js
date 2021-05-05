//Recuperation de la grille => update des beliefs

// import { Sensor } from "./sensor";

//Placer un element dans la grille

export class Agent {
    constructor(color) {
        this.color = color
    }

    // Croyance du joueur
    beliefs = [
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"]
    ]

    // actions disponibles
    desire = [0,1,2,3,4,5,6]

    // addCheckers(color, column) {
    //     this.beliefs[column].push(color)
    // }


}

export class LearningAgent extends Agent {
    

    Q_table = {}

    epsilon = 1.0;
    learning_rate = 0.15 // AlPHA
    discount_rate = 0.8 // GAMMA


    old_beliefs = [
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"],
        ["nothing","nothing","nothing","nothing","nothing","nothing"]
    ]

    // Mettre à jour espilon
    Set_epsilon(new_epsilon){
        this.epsilon = new_epsilon
    }
    
    // Mettre à jour le learning rate
    Set_learning_rate(new_learning_rate){
        this.learning_rate = new_learning_rate
    }

    // Retourne l'action qui a le plus de valeur parmi les actions possibles
    Max_action(a_state, possible_actions){
        let q_values = [];
        // Récupération des Q-values
        possible_actions.forEach(an_action => {
            q_values.push(this.Get_Q_value(a_state,an_action));
        });

        let index = q_values.indexOf(Math.max.apply(null, q_values));
        return possible_actions[index];
    }


    // Retourne la liste des actions possibles par rapport à l'état
    Get_possible_actions(connect_4_state){
        let possible_actions = [];

        for(let i=0 ; i<connect_4_state.length; i++){
            if(connect_4_state[i][5] == "nothing"){
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
    Get_Q_value(a_state, an_action){

        let the_state = JSON.stringify(a_state);

        if(this.getSafe(() => this.Q_table[the_state][an_action])){
            // console.log("Existe");
            return this.Q_table[the_state][an_action];
        }
        else {
            // Si l'état n'existe pas alors on l'ajoute à la table avec des valeurs de 1
            // console.log("N'existe pas");
            this.Q_table[the_state] = {0: 0.0, 1: 0.0, 2: 0.0, 3: 0.0, 4: 0.0, 5: 0.0, 6: 0.0}
        }
        return this.Q_table[the_state][an_action];
    }

    // // Mettre à jour les beliefs
    Update_beliefs(a_connect_4){
        for(let i=0 ; i<a_connect_4.length ; i++){
            for(let j=0 ; j<a_connect_4[i].length ; j++ ){
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
    Update_old_beliefs(){
        for(let i=0 ; i<this.beliefs.length ; i++){
            for(let j=0 ; j<this.beliefs[i].length ; j++ ){
                this.old_beliefs[i][j] = this.beliefs[i][j];
            }
        }
    }

    // Mise à jour de la Q-table à l'aide de l'équation de Bellman
    Update_Q_value(an_action, a_reward){

        // Actions disponibles dans cette nouvelle grille
        let actions_after = this.Get_possible_actions(this.beliefs);

        // Meilleur actions à ce nouvel état
        let best_action_after = this.Max_action(this.beliefs, actions_after);

        // Etat
        let max_q_next = this.Get_Q_value(this.beliefs,best_action_after);

        // Etat avant l'action
        let q_before_action = this.Get_Q_value(this.old_beliefs,an_action);

        // Etat dans lequel nous sommes
        let q_state = JSON.stringify(this.old_beliefs);

                // this.Q[(this.old_beliefs,an_action)] = q_before_action + this.learning_rate * (a_reward + this.discount_rate *max_q_next - q_before_action);
        
        // Equation de Bellman 
        this.Q_table[q_state][an_action] = q_before_action + this.learning_rate * (a_reward + this.discount_rate *max_q_next - q_before_action);

        this.Update_old_beliefs();
    }

    // Comparaison 2 deux grilles
    Compare_lists(list_1, list_2){
        if(JSON.stringify(list_1)==JSON.stringify(list_2)){
            return true;
        }
        return false;
    }
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
                if (grid[index][5] == "nothing") {
                    score = Math.max(score, this.Min_Value(grid, depth))
                    if (previousScore < score) {
                        column = index
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

    test() {
        // console.log("test", this.beliefs)
        this.Minimax_Decision(3)
    }
}
