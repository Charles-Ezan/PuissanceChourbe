//Recuperation de la grille => update des beliefs

//Placer un element dans la grille

class Agent {
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

class LearningAgent extends Agent {
    
    // Matrix Q learning
    Q = {}
    epsilon = 1.0;
    learning_rate = 1.0 // AlPHA
    discount_rate = 0.0 // GAMMA

    // Changement de plan utilisation d'un réseau de neurones

    // constructor(new_epsilon_value, new_learning_rate){
    //     // Initialisation de toutes les actions possibles 
    //     epsilon = new_epsilon_value;
    //     lr = new_learning_rate;
    // }

    // Retourne l'action qui a le plus de valeur parmi les actions possibles
    max_action(a_state, possible_actions){
        let q_values = [];
        // Récupération des Q-values
        possible_actions.forEach(an_action => {
        //    q_values.push(this.Q[(a_state,an_element)]);
            q_values.push(this.Get_Q_value(a_state,an_action));
        });

        console.log("q_values : ", q_values);

        let index = q_values.indexOf(Math.max.apply(null, q_values));
        return possible_actions[index];
    }

    // Retourne la liste des actions possibles par rapport à l'état
    get_possible_actions(connect_4_state){
        let possible_actions = [];

        for(let i=0 ; i<connect_4_state.length; i++){
            if(connect_4_state[i][5] == "nothing"){
                possible_actions.push(i);
            }
        }
        return possible_actions;
    }


    // Retourne une Q value en fonction du state et de l'action passé en paramètre
    Get_Q_value(a_state, an_action){
        let q_value = 0;
        if(this.Q[(a_state, an_action)] != undefined){
            q_value = this.Q[(a_state, an_action)];
        }
        else{
            this.Q[(a_state, an_action)] = 0.0;
            q_value = 0.0;
        }
        return q_value;
    }

    // Mise à jour de la Q value en fonction de l'action déroulée
    Update_Q_value(a_state, an_action, a_reward){


        // MUTORERE
        // # Equation de Bellman
        // Q[observationInt, action] = Q[observationInt, action] + ALPHA * (reward + GAMMA * Q[observation_Int, action_] - Q[observationInt, action])
        // observationInt = observation_Int


        // L'autre
        // prev_state = board.get_prev_state()
        // prev = self.getQ(prev_state, chosen_action)
        // result_state = board.get_state()
        // maxqnew = max([self.getQ(result_state, a) for a in actions])
        // self.q[(prev_state, chosen_action)] = prev + self.alpha * ((reward + self.gamma*maxqnew) - prev)

        // Etat du puissance 4 après avoir joué
        let state_after = this.beliefs;

        // Actions disponibles dans cette nouvelle grille
        let actions_after = this.get_possible_actions(state_after);

        // Meilleur actions à ce nouvel état
        let best_action_after = this.max_action(state_after, actions_after);

        // Etat
        let max_q_next = this.Get_Q_value(state_after,best_action_after);

        // Etat avant l'action
        let q_before_action = this.Get_Q_value(a_state,an_action);
        
        console.log("max_q_next : ", max_q_next)
        console.log("q_before_action : ", q_before_action)

        // Equation de Bellman
        this.Q[(a_state,an_action)] = q_before_action + this.learning_rate * (a_reward + this.discount_rate *max_q_next - q_before_action);
    }
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
        console.log("MAX function", grid)
        console.log("MAX depth", depth)

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
                // if (action == (3)) {
                //     console.log("stack", tempGrid)
                // }
                depth--
                score = Math.max(score, this.Min_Value(tempGrid, depth))
            }
            return score
        }
    }

    Min_Value(grid, depth) {
        console.log("MIN function", grid)
        console.log("MIN depth", depth)
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
        this.Minimax_Decision(3)
    }
}

let agent = new LearningAgent("red");
let connect_4_1 = [
    ["nothing","nothing","nothing","nothing","nothing","nothing"],
    ["nothing","nothing","nothing","nothing","nothing","nothing"],
    ["nothing","nothing","nothing","nothing","nothing","nothing"],
    ["nothing","nothing","nothing","nothing","nothing","nothing"],
    ["nothing","nothing","nothing","nothing","nothing","red"],
    ["nothing","nothing","nothing","nothing","nothing","nothing"],
    ["nothing","nothing","nothing","nothing","nothing","nothing"]
];
let connect_4_2 = [
    ["nothing","nothing","nothing","nothing","nothing","nothing"],
    ["nothing","nothing","nothing","nothing","nothing","nothing"],
    ["nothing","nothing","nothing","nothing","nothing","nothing"],
    ["red","nothing","nothing","nothing","nothing","nothing"],
    ["nothing","nothing","nothing","nothing","nothing","nothing"],
    ["nothing","nothing","nothing","nothing","nothing","nothing"],
    ["nothing","nothing","nothing","nothing","nothing","nothing"]
];
console.log("connect_4 : ", connect_4_1);
let actions = agent.get_possible_actions(connect_4_1);

console.log("agent.Q before loop : ", agent.Q);

agent.Q[(connect_4_1,0)] = 10.0;
// console.log("test : ",agent.Get_Q_value(connect_4_1,0));
// agent.get_q_value(connect_4_1,0);

let max_action_value = agent.max_action(connect_4_1,actions);
console.log("max_action_value : ", max_action_value);

console.log("before the update of Q : ", agent.Q)
agent.Update_Q_value(connect_4_1,max_action_value,1000.0);
console.log("after the update of Q : ", agent.Q)

// console.log("agent.max_action(connect_4_1,actions) : ", agent.max_action(connect_4_1,actions));

// for(let i = 0 ; i<6 ;i++ ){
//     agent.Q[0][i] = 5;
// }
// for(let i = 0 ; i<6 ;i++ ){
//     agent.Q[connect_4_2][i] = i;
// // }
// agent.Q[0] = [0,1,2,3,4,5,6];
// console.log("agent.Q after loop : ", agent.Q);


