export default class Environment {
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

    // Test si l'ensemble des checkers passés en paramètre sont de la même couleur
    test_line(checker_a, checker_b, checker_c, checker_d) {
        // Test si la première variable est un checker non-vide
        return (
            checker_a != "nothing" &&
            checker_a == checker_b &&
            checker_a == checker_c &&
            checker_a == checker_d
        );
    }

    // Test si un des joueurs à remporté la victoire
    Test_victory() {
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
                    // console.log("horizontal victory, row : ", j);
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
                    // console.log("vertical victory, column : ", i);
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
                    // console.log("diag gauche haut victory");
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
                    // console.log("diag droite haut victory");
                    return true;
                }
            }
        }
        return false;
    }

    // Test si la grille est complète
    Test_grid_complete() {
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

    // 1 -> jeton posé mais pas vainqueur
    // 2 -> jeton posé avec vainqueur
    // 3 -> jeton posé grille plein

    Test_end_game() {
        if (this.Test_victory()) {
            this.victorious_player = this.player_turn;
            this.finished = true;
            // console.log("FIN DE PARTIE - AVEC GAGNANT : ",this.player_turn);
            // return this.player_turn;
            return 2;
        }
        if (this.Test_grid_complete()) {
            this.finished = true;
            this.victorious_player = "none";
            // console.log("FIN DE PARTIE - PAS DE GAGNANT");
            // return true;
            return 3;
        }
        return 1;
    }

    // Ajout d'un Checker dans une list

    // 0 -> jeton pas posé
    // add_checker(column_number, displayedCell) {
    Add_checker(column_number, a_color) {
        for (var i = 0; i < 6; i++) {
            if (this.connect_4[column_number][i] == "nothing") {
                this.connect_4[column_number][i] = a_color;
                // displayedCell.classList.add(a_color);
                // displayedCell.classList.remove("nothing");
                // break;

                // Test de victoire
                let result = this.Test_end_game();
                return result;
            }
        }
        return 0;
    }

    Add_checker_render(column_number, displayedCell, a_color) {
        for (var i = 0; i < 6; i++) {
            if (this.connect_4[column_number][i] == "nothing") {
                this.connect_4[column_number][i] = a_color;
                displayedCell.classList.add(a_color);
                displayedCell.classList.remove("nothing");
                // break;

                // Test de victoire
                let result = this.Test_end_game();
                return result;
            }
        }
        return 0;
    }

    // Sélectionne aléatoirement une des 7 colonne
    Choose_random_column() {
        return Math.floor(Math.random() * 7);
    }

    // Reset la grille
    Reset_grid() {
        this.connect_4 = [
            ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
            ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
            ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
            ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
            ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
            ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
            ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
        ];
        this.finished = false;
        this.victorious_player = "none";
    }

    // Renvoie la ligne sur laquelle est le dernier pion en fonction de la colonne
    Get_line_of_checker(column) {
        for (var i = 5; i > -1; i--) {
            if (this.connect_4[column][i] != "nothing") {
                return i;
            }
        }
    }

    // Test si 3 jetons sont alignés
    // Test si l'ensemble de checkers passé en paramètre est de la même couleur
    Test_3_checkers(checker_a, checker_b, checker_c) {
        // Test si la première variable est un checker non-vide
        return (
            checker_a != "nothing" &&
            checker_a == checker_b &&
            checker_a == checker_c
        );
    }


    // Renvoie une récompense en fonction de l'action (alignement de 3 jetons)
    Evaluate_move(a_column) {

        // console.log("this.connect_4 : ", this.connect_4)
        // console.log("jeton joué : ", a_column)

        // La récompense a retourner
        let reward = 0;
        // récupération du dernier checker de la colonne
        let a_row = this.Get_line_of_checker(a_column);

        // Test en colonne
        for (let i = a_row - 2; i < a_row + 1; i++) {
            if ((i < 0) || ((i + 2) > 5) || ((i + 1) > 5)) {
                continue;
            }
            if (this.Test_3_checkers(this.connect_4[a_column][i], this.connect_4[a_column][i + 1], this.connect_4[a_column][i + 2])) {
                reward += 100;
                // console.log("3 checkers dans la colonne : ", a_column);
            }
        }

        // Test en ligne 
        for (let i = a_column - 2; i < a_column + 1; i++) {

            if ((i < 0) || ((i + 2) > 6) || ((i + 1) > 6)) {
                continue;
            }
            if (this.Test_3_checkers(this.connect_4[i][a_row], this.connect_4[i + 1][a_row], this.connect_4[i + 2][a_row])) {
                reward += 100;
                // console.log("3 checkers dans la ligne : ", a_row);
            }
        }
        // Test en diagonal gauche haut
        for (let i = -2; i < 1; i++) {

            // Test des colonnes
            if ((a_column + i < 0) || (a_column + i + 1 < 0) || (a_column + i + 1 > 6) || (a_column + i + 2 > 6)) {
                continue;
            }
            // Test des lignes
            if ((a_row + i < 0) || (a_row + i + 1 < 0) || (a_row + i + 1 > 5) || (a_row + i + 2 > 5)) {
                continue;
            }

            if (this.Test_3_checkers(this.connect_4[a_column + i][a_row + i], this.connect_4[a_column + i + 1][a_row + i + 1], this.connect_4[a_column + i + 2][a_row + i + 2])) {
                reward += 100;
                // console.log("3 checkers dans la diagonale -> column : ",a_column, " a_row : ", a_row);
            }
        }

        // Test en diagonale droite haut
        for (let i = -2; i < 1; i++) {
            // Test des colonnes
            if ((a_column + i < 0) || (a_column + i + 1 < 0) || (a_column + i + 1 > 6) || (a_column + i + 2 > 6)) {
                continue;
            }
            // Test des lignes
            if ((a_row - i > 5) || (a_row - i - 1 > 5) || (a_row - i - 1 < 0) || (a_row - i - 2 < 0)) {
                continue;
            }

            if (this.Test_3_checkers(this.connect_4[a_column + i][a_row - i], this.connect_4[a_column + i + 1][a_row - i - 1], this.connect_4[a_column + i + 2][a_row - i - 2])) {
                reward += 100;
                // console.log("3 checkers dans la diagonale -> column : ",a_column, " a_row : ", a_row);
            }
        }

        // console.log("La récompense est de : ", reward);
        return reward;
    }
}

var game = new Environment()