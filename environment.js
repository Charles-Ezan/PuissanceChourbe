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

  // Test si l'ensemble de checkers passé en paramètre est de la même couleur
  test_line(checker_a, checker_b, checker_c, checker_d) {
    // Test si la première variable est un checker non-vide
    // console.log(" A : " + checker_a + " B : " + checker_b + " C : " + checker_c + " D : " + checker_d);
    return (
      checker_a != "nothing" &&
      checker_a == checker_b &&
      checker_a == checker_c &&
      checker_a == checker_d
    );
  }

  // Test si un des joueurs à remporté la victoire
  test_victory() {
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
          console.log("horizontal victory, row : ", j);
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
          console.log("vertical victory, column : ", i);
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
          console.log("diag gauche haut victory");
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
          console.log("diag droite haut victory");
          return true;
        }
      }
    }
    return false;
  }

  // Test si la grille est complète
  test_grid_complete() {
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
  test_end_game() {
    if (this.test_victory()) {
      this.victorious_player = this.player_turn;
      this.finished = true;
      console.log("FIN DE PARTIE - AVEC GAGNANT");
      return true;
    }
    if (this.test_grid_complete()) {
      this.finished = true;
      this.victorious_player = "none";
      console.log("FIN DE PARTIE - PAS DE GAGNANT");
      return true;
    }
    return false;
  }

  // Ajout d'un Checker dans une list
  add_checker(column_number, displayedCell) {
    for (var i = 0; i < 6; i++) {
      if (this.connect_4[column_number][i] == "nothing") {
        this.connect_4[column_number][i] = this.player_turn;
        displayedCell.classList.add(this.player_turn);
        displayedCell.classList.remove("nothing");
        // break;
        return true;
      }
    }
    return false;
  }

  // Sélectionne aléatoirement une des 7 colonne
  choose_random_column() {
    return Math.floor(Math.random() * 7);
  }

  // Afficher le puissance 4
  diplay_connect_4() {
    console.log("display");
    console.log(JSON.stringify(this.connect_4));
    // let chercker_number = 0;
    // for (let i = 0; i < 7; i++) {
    //   for (let j = 0; j < 6; j++) {
    //     chercker_number++;
    //     console.log(this.connect_4[i][j]);
    //   }

    // console.log("chercker_number : ", chercker_number);
  }
}
