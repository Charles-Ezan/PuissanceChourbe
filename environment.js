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
      // console.log("FIN DE PARTIE - AVEC GAGNANT : ",this.player_turn);
      // return this.player_turn;
      return 2;
    }
    if (this.test_grid_complete()) {
      this.finished = true;
      this.victorious_player = "none";
      // console.log("FIN DE PARTIE - PAS DE GAGNANT");
      // return true;
      return 3;
    }
    return 1;
  }

  // Ajout d'un Checker dans une list
  // add_checker(column_number, displayedCell) {
    add_checker(column_number, displayedCell, a_color) {
    for (var i = 0; i < 6; i++) {
      if (this.connect_4[column_number][i] == "nothing") {
        this.connect_4[column_number][i] = a_color;
        // displayedCell.classList.add(a_color);
        // displayedCell.classList.remove("nothing");
        // break;

        // Test de victoire
        let result = this.test_end_game();
        return result;
      }
    }
    // return false;
    return 0;
  }

  // Sélectionne aléatoirement une des 7 colonne
  choose_random_column() {
    return Math.floor(Math.random() * 7);
  }

  // Afficher le puissance 4
  diplay_connect_4() {
    // console.log("display");
    let chercker_number = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 6; j++) {
        chercker_number++;
        // console.log(this.connect_4[i][j]);
      }
    }
    // console.log("chercker_number : ", chercker_number);
  }

  // Reset la grille
  Reset_grid(){
    // console.log("connect 4 in the reset before : ", this.connect_4);
    // for(let i=0 ; i<this.connect_4.length ; i++){
    //   for(let j=0 ; j<this.connect_4[i].length ; j++){
    //     this.connect_4[i][j] = "nothing";
    //     console.log("this.connect_4[i][j] : ", this.connect_4[i][j]);
    //   }
    // }

    // this.connect_4 = [];
    this.connect_4 = [
      ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
      ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
      ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
      ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
      ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
      ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
      ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
    ];

    // console.log("connect 4 in the reset after : ", this.connect_4);
    this.finished = false;
    this.victorious_player = "none";
  }

}
