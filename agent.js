//Recuperation de la grille => update des beliefs

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
    
    // Matrix Q learning
    Q = {}


    new_Q_2 = {}

    // constructor(){
    //     this.new_Q_2[grid_1] = {0: 1.0, 1: 2.0, 2: 3.0, 3: 4.0, 4: 5.0, 5: 6.0, 6:7.0}
    //     this.new_Q_2[grid_2] = {0: 1.0, 1: 2.0, 2: 10.0, 3: 4.0, 4: 5.0, 5: 6.0, 6: 7.0}
    //     this.new_Q_2[grid_3] = {0: 50.0, 1: 2.0, 2: 10.0, 3: 4.0, 4: 5.0, 5: 6.0, 6: 50.0}
    // }
    // Liste états - actions - Q_value
    // new_Q_table = [
    //     [connect_4_1,0, 0.0],
    //     [connect_4_2,1, 1.0],
    //     [connect_4_1,2, 0.0],
    //     [connect_4_1,3, 0.0]
    // ]

    new_Q_table = []

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

    // Changement de plan utilisation d'un réseau de neurones

    // constructor(new_epsilon_value, new_learning_rate){
    //     // Initialisation de toutes les actions possibles 
    //     epsilon = new_epsilon_value;
    //     lr = new_learning_rate;
    // }

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
        //    q_values.push(this.Q[(a_state,an_element)]);
            q_values.push(this.Get_Q_value(a_state,an_action));
        });

        // console.log("q_values : ", q_values);

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

    // Retourne une Q value en fonction du state et de l'action passé en paramètre
    // Get_Q_value(a_state, an_action){
    //     let q_value = 0;
    //     if(this.Q[(a_state, an_action)] != undefined){
    //         q_value = this.Q[(a_state, an_action)];
    //     }
    //     else{
    //         this.Q[(a_state, an_action)] = 1.0;
    //         q_value = 1.0;
    //     }
    //     return q_value;
    // }

    // NEW VERSION ------------------------------
    // Get_Q_value(a_state, an_action){
    //     // console.log("this.new_Q_table.length : ", this.new_Q_table);
    //     // if(this.new_Q_table.length !=0){
    //         for(let i=0 ; i<this.new_Q_table.length ; i++){
    //             // console.log("index i : ", i)
    //             if(this.Compare_lists(this.new_Q_table[i][0],a_state)){
    //                 if(this.new_Q_table[1] == an_action){

    //                     return this.new_Q_table[2];
    //                 }
    //             }
    //         }
    //     // }
    //     // Création de la valeur dans la Q_table
    //     this.new_Q_table.push([a_state,an_action,0.0]);
    //     return 0.0;
    // }

    Get_index_Q(a_state, an_action){
        let index_state_action = 0;
        for(let i=0 ; i<this.new_Q_table.length ; i++){
            if(this.Compare_lists(this.new_Q_table[i][0],a_state)){
                if(this.new_Q_table[1] == an_action){
                    index_state_action = i;
                    return index_state_action;
                }
            }
        }
        return 0.0;
    }
    // NEW VERSION ------------------------------

    // NEW VERSION 2 ------------------------------
    getSafe(fn, defaultVal) {
        try {
          return fn();
        } catch (e) {
          return defaultVal;
        }
      }
      

    Get_Q_value(a_state, an_action){

        let the_state = JSON.stringify(a_state);

        if(this.getSafe(() => this.new_Q_2[the_state][an_action])){
            // console.log("Existe");
            return this.new_Q_2[the_state][an_action];
        }
        else {
            // Si l'état n'existe pas alors on l'ajoute à la table avec des valeurs de 1
            // console.log("N'existe pas");
            this.new_Q_2[the_state] = {0: 0.0, 1: 0.0, 2: 0.0, 3: 0.0, 4: 0.0, 5: 0.0, 6: 0.0}
        }
        return this.new_Q_2[the_state][an_action];
    }

    Get_index_Q(a_state, an_action){
        let index_state_action = 0;
        for(let i=0 ; i<this.new_Q_table.length ; i++){
            if(this.Compare_lists(this.new_Q_table[i][0],a_state)){
                if(this.new_Q_table[1] == an_action){
                    index_state_action = i;
                    return index_state_action;
                }
            }
        }
        return 0.0;
    }
    // NEW VERSION 2 ------------------------------





    // Mettre à jour les beliefs
    Update_beliefs(a_connect_4){
        // console.log("Update_beliefs");
        // this.beliefs = [] 
        for(let i=0 ; i<a_connect_4.length ; i++){
            for(let j=0 ; j<a_connect_4[i].length ; j++ ){
                this.beliefs[i][j] = a_connect_4[i][j];
            }
        }
    }

    // Sauvegarde des beliefs
    Update_old_beliefs(){
        // console.log("Update Old Beliefs");
        // this.old_beliefs = [] 
        for(let i=0 ; i<this.beliefs.length ; i++){
            for(let j=0 ; j<this.beliefs[i].length ; j++ ){
                this.old_beliefs[i][j] = this.beliefs[i][j];
            }
        }
    }

    // Mise à jour de la Q value en fonction de l'action déroulée
    // Update_Q_value(an_action, a_reward){
    //     // Actions disponibles dans cette nouvelle grille
    //     let actions_after = this.Get_possible_actions(this.beliefs);

    //     // Meilleur actions à ce nouvel état
    //     let best_action_after = this.Max_action(this.beliefs, actions_after);

    //     // Etat
    //     let max_q_next = this.Get_Q_value(this.beliefs,best_action_after);

    //     // Etat avant l'action
    //     let q_before_action = this.Get_Q_value(this.old_beliefs,an_action);

    //     let index_Q = this.Get_index_Q(this.old_beliefs,an_action);
    //     // Equation de Bellman
    //     // this.Q[(this.old_beliefs,an_action)] = q_before_action + this.learning_rate * (a_reward + this.discount_rate *max_q_next - q_before_action);
    //     this.new_Q_table[index_Q][2] = q_before_action + this.learning_rate * (a_reward + this.discount_rate *max_q_next - q_before_action);
    //     this.Update_old_beliefs();
    // }

    // NEW VERSION 2222222222 ---------------------------
    Update_Q_value(an_action, a_reward){
        // console.log("Update Q-table");
        // Actions disponibles dans cette nouvelle grille
        let actions_after = this.Get_possible_actions(this.beliefs);

        // Meilleur actions à ce nouvel état
        let best_action_after = this.Max_action(this.beliefs, actions_after);

        // Etat
        let max_q_next = this.Get_Q_value(this.beliefs,best_action_after);

        // Etat avant l'action
        let q_before_action = this.Get_Q_value(this.old_beliefs,an_action);


        // Doit retourner un état
        // let index_Q = this.Get_index_Q(this.old_beliefs,an_action);

        // Etat dans lequel on ai
        let q_state = JSON.stringify(this.old_beliefs);
        // Equation de Bellman 
        // this.Q[(this.old_beliefs,an_action)] = q_before_action + this.learning_rate * (a_reward + this.discount_rate *max_q_next - q_before_action);
        this.new_Q_2[q_state][an_action] = q_before_action + this.learning_rate * (a_reward + this.discount_rate *max_q_next - q_before_action);
        this.Update_old_beliefs();
    }
    // NEW VERSION 2222222222 ---------------------------

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
        // console.log(depth)
        depth--
        let column = this.Max_Value(this.beliefs, depth)
        // console.log(column)
        // return column
    }

    Max_Value(grid, depth) {
        // console.log("MAX function", grid)
        // console.log("MAX depth", depth)

        if (depth <= 0) {
            // console.log("the end max")
            return 0
        }
        else {
            // console.log("aprés", depth)
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
        // console.log("MIN function", grid)
        // console.log("MIN depth", depth)
        if (this.depth <= 0) {
            return 0
        }
        else {
            var score = 1000

            // console.log("min", grid)

            for (let action = 0; action < grid.length; action++) {

                let tempGrid = this.Successors(this.NewGrid(grid), action)
                if (action == (3)) {
                    // console.log(tempGrid)
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
        // console.log("test", this.beliefs)
        this.Minimax_Decision(3)
    }
}

// let agent = new LearningAgent("red");
// let connect_4_1 = [
//     ["red","nothing","nothing","nothing","nothing","nothing"],
//     ["nothing","nothing","nothing","nothing","nothing","nothing"],
//     ["nothing","nothing","nothing","nothing","nothing","nothing"],
//     ["nothing","nothing","nothing","nothing","nothing","nothing"],
//     ["nothing","nothing","nothing","nothing","nothing","red"],
//     ["nothing","nothing","nothing","nothing","nothing","nothing"],
//     ["nothing","nothing","nothing","nothing","nothing","nothing"]
// ];
// let connect_4_2 = [
//     ["nothing","nothing","nothing","nothing","nothing","nothing"],
//     ["nothing","nothing","nothing","nothing","nothing","nothing"],
//     ["red","nothing","nothing","nothing","nothing","nothing"],
//     ["red","nothing","nothing","nothing","nothing","nothing"],
//     ["nothing","nothing","nothing","nothing","nothing","nothing"],
//     ["nothing","nothing","nothing","nothing","nothing","nothing"],
//     ["nothing","nothing","nothing","nothing","nothing","nothing"]
// ];
// let connect_4_3 = [
//     ["nothing","nothing","nothing","nothing","nothing","nothing"],
//     ["nothing","nothing","nothing","nothing","nothing","nothing"],
//     ["red","nothing","nothing","nothing","nothing","nothing"],
//     ["red","nothing","nothing","nothing","nothing","nothing"],
//     ["nothing","nothing","nothing","nothing","nothing","nothing"],
//     ["nothing","nothing","nothing","nothing","nothing","nothing"],
//     ["red","red","nothing","nothing","red","nothing"]
// ];

// let grid_1 = JSON.stringify(connect_4_1)
// let grid_2 = JSON.stringify(connect_4_2)
// let grid_3 = JSON.stringify(connect_4_3)

// let agent = new LearningAgent("red");

// console.log("agent.Get_Q_value(grid_1,0) : ", agent.Get_Q_value(connect_4_3,6))

// console.log("a_Q_table : ", a_Q_table);





// a_Q_table[grid_1] = {0: 1.0, 1: 2.0, 2: 3.0, 3: 4.0, 4: 5.0, 5: 6.0, 6:7.0}
// a_Q_table[grid_2] = {0: 1.0, 1: 2.0, 2: 10.0, 3: 4.0, 4: 5.0, 5: 6.0, 6: 7.0}
// a_Q_table[grid_3] = {0: 50.0, 1: 2.0, 2: 10.0, 3: 4.0, 4: 5.0, 5: 6.0, 6: 50.0}

// console.log("a_Q_table : ", a_Q_table);
// console.log("a_Q_table : ", a_Q_table[grid_1]);


// console.log("a_Q_table : ",getSafe(() => a_Q_table["grid_2"][5]));



// console.log("a_Q_table : ", agent.new_Q_2);

  // use it like this


//   function getSafe(fn, defaultVal) {
//     try {
//       return fn();
//     } catch (e) {
//       return defaultVal;
//     }
//   }

//   console.log("test de l'an 2000")
//   console.log("a_Q_table : ", a_Q_table);
//   console.log("a_Q_table[grid_1][0] : ", a_Q_table[grid_1][5])

//   console.log(getSafe(() => a_Q_table.a.lot.of.properties));

//   function getSafe(fn, defaultVal) {
//     try {
//       return fn();
//     } catch (e) {
//       return defaultVal;
//     }
//   }
  
//   // use it like this
//   console.log(" fefe : ", getSafe(() => a_Q_table[grid_1]));

