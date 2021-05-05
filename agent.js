//Recuperation de la grille => update des beliefs

//Placer un element dans la grille

export class Agent {
  constructor(color) {
    this.color = color;
  }

  beliefs = [
    ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
    ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
    ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
    ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
    ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
    ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
    ["nothing", "nothing", "nothing", "nothing", "nothing", "nothing"],
  ];
}

export class LearningAgent extends Agent {}

export class ExplorationAgent extends Agent {
  //Calcul un score pour une grille
  Utility(grid, isMaximizing) {
    let score = 0;
    let color;
    let opponentColor;
    if (isMaximizing) {
      color = this.color;
      opponentColor = this.color == "red" ? "yellow" : "red";
    } else {
      color = this.color == "red" ? "yellow" : "red";
      opponentColor = this.color;
    }

    // Checkers de l'agent sur la colonne du milieu
    for (let checker = 0; checker < 6; checker++) {
      if (grid[3][checker] == color) {
        score = score + 4;
      }
    }

    //Recherche alignement de 2, 3 ou 4 checkers
    for (let column = 0; column < grid.length; column++) {
      for (let row = 0; row < grid[column].length; row++) {
        //Alignements horizontaux + droite vers le haut

        //Alignement de 4
        if (column < 4) {
          if (
            this.test_alignement(
              color,
              grid[column][row],
              grid[column + 1][row],
              grid[column + 2][row],
              grid[column + 3][row]
            )
          ) {
            score = score + 1000;
          }
          if (
            this.test_alignement(
              opponentColor,
              grid[column][row],
              grid[column + 1][row],
              grid[column + 2][row],
              grid[column + 3][row]
            )
          ) {
            score = score - 1000;
          }

          if (row < 4) {
            if (
              this.test_alignement(
                color,
                grid[column][row],
                grid[column + 1][row + 1],
                grid[column + 2][row + 2],
                grid[column + 3][row + 3]
              )
            ) {
              score = score + 1000;
            }
            if (
              this.test_alignement(
                opponentColor,
                grid[column][row],
                grid[column + 1][row + 1],
                grid[column + 2][row + 2],
                grid[column + 3][row + 3]
              )
            ) {
              score = score - 1000;
            }
          }
        }

        //Alignement de 3
        if (column < 5) {
          if (
            this.test_alignement(
              color,
              grid[column][row],
              grid[column + 1][row],
              grid[column + 2][row]
            )
          ) {
            if (color == this.color) {
              score = score + 30;
              //   score = score + 30 + Math.random() * 30;
            }
            if (
              this.test_alignement(
                opponentColor,
                grid[column][row],
                grid[column + 1][row],
                grid[column + 2][row]
              )
            ) {
              if (color == opponentColor) {
                score = score - 30;
                // score = score - 30 - Math.random() * 30;
              }
            }
          }
        }

        //Alignements verticaux

        //Alignement de 4
        if (row < 3) {
          if (
            this.test_alignement(
              color,
              grid[column][row],
              grid[column][row + 1],
              grid[column][row + 2],
              grid[column][row + 3]
            )
          ) {
            if (color == this.color) {
              score = score + 1000;
            }
          }
          if (
            this.test_alignement(
              opponentColor,
              grid[column][row],
              grid[column][row + 1],
              grid[column][row + 2],
              grid[column][row + 3]
            )
          ) {
            if (color == opponentColor) {
              score = score - 1000;
            }
          }
        }

        //Alignement de 3
        if (row < 4) {
          if (
            this.test_alignement(
              color,
              grid[column][row],
              grid[column][row + 1],
              grid[column][row + 2]
            )
          ) {
            score = score + 30;
            // score = score + 30 + Math.random() * 30;
          }
          if (
            this.test_alignement(
              opponentColor,
              grid[column][row],
              grid[column][row + 1],
              grid[column][row + 2]
            )
          ) {
            score = score - 30;
            // score = score - 30 - Math.random() * 30;
            console.log("Alignement de 3");
          }
        }

        //Alignement droite vers bas

        //Alignement de 4
        if (column > 3) {
          if (row < 4) {
            if (
              this.test_alignement(
                color,
                grid[column][row],
                grid[column - 1][row + 1],
                grid[column - 2][row + 2],
                grid[column - 3][row + 3]
              )
            ) {
              if (color == this.color) {
                score = score + 1000;
              }
            }
            if (
              this.test_alignement(
                opponentColor,
                grid[column][row],
                grid[column - 1][row + 1],
                grid[column - 2][row + 2],
                grid[column - 3][row + 3]
              )
            ) {
              if (color == opponentColor) {
                score = score - 1000;
              }
            }
          }
        }
        //Alignements de 3
        if (column > 2) {
          if (row < 5) {
            if (
              this.test_alignement(
                color,
                grid[column][row],
                grid[column - 1][row + 1],
                grid[column - 2][row + 2]
              )
            ) {
              if (color == this.color) {
                score = score + 30;
                // score = score + 30 + Math.random() * 30;
              }
            }
            if (
              this.test_alignement(
                opponentColor,
                grid[column][row],
                grid[column - 1][row + 1],
                grid[column - 2][row + 2]
              )
            ) {
              if (color == opponentColor) {
                score = score - 30;
                // score = score - 30 - Math.random() * 30;
              }
            }
          }
        }
      }
    }
    return score;
  }

  test_alignement(color, checker_a, checker_b, checker_c, checker_d) {
    if (arguments.length == 2) {
      return checker_a == color && checker_a == checker_b;
    } else if (arguments.length == 3) {
      return (
        checker_a == color && checker_a == checker_b && checker_a == checker_c
      );
    } else if (arguments.length == 4) {
      return (
        checker_a == color &&
        checker_a == checker_b &&
        checker_a == checker_c &&
        checker_a == checker_d
      );
    }
  }

  updateBeliefs(grid) {
    let newGrid = [];
    grid.forEach((col) => {
      let tempCol = [...col];
      newGrid.push(tempCol);
    });
    this.beliefs = newGrid;
  }

  minimax(grids, depth, isMaximizing) {
    var isTerminal = this.isGridTerminal(grids);
    let column;
    if (depth == 0 || isTerminal) {
      return { value: this.Utility(grids, isMaximizing), column: -1 };
    }
    // générer les enfants de la grids
    console.log("profondeur :" + depth);
    let children = this.Successors(grids, isMaximizing);
    if (isMaximizing) {
      let value = -1000;
      children.forEach((child, index) => {
        let new_value = this.minimax(child, depth - 1, false);
        value = this.max(value, new_value.value);
        if (value == new_value) {
          column = new_value.column;
        }
      });
      return value;
    } else {
      let value = 1000;
      children.forEach((child, index) => {
        let new_value = this.minimax(child, depth - 1, true).value;

        value = this.min(value, new_value);
        if (value == new_value) {
          column = index;
        }
      });
      return { value: value, column: column };
    }
  }

  //Indique si la grille passée en paramètre est remplie ou non
  isGridComplete(grid) {
    grid.forEach((col) => {
      if (col.includes("nothing")) {
        return false;
      }
    });
    return false;
  }
  //Indique si la grille passée en paramètre est terminée (match null ou victoire d'un des joueurs) ou non
  isGridTerminal(grid) {
    if (this.isThereIsAWinner(grid)) {
      return true;
    }
    if (this.isGridComplete(grid)) {
      return true;
    }
    return false;
  }

  Successors(grid, isMaximizing) {
    let color;
    let grids = [];
    if (isMaximizing) {
      color = this.color;
    } else {
      color = this.color == "red" ? "yellow" : "red";
    }
    for (let col = 0; col < grid.length; col++) {
      //   let tempGrid = [...grid];
      let tempGrid = [];
      grid.forEach((col) => {
        let tempCol = [...col];
        // console.log(col);
        tempGrid.push(tempCol);
      });
      //   console.log("child n°" + col + "\n");
      //   console.log(JSON.stringify(tempGrid));
      if (tempGrid[col].includes("nothing")) {
        for (let index = 0; index < tempGrid[col].length; index++) {
          if (tempGrid[col][index] == "nothing") {
            tempGrid[col][index] = color;
            break;
          }
        }
        grids.push(tempGrid);
      }
    }
    return grids;
  }

  //Indique si les cases passées en paramètres appartiennent à un même joueur
  isSameCells(cellA, cellB, cellC, cellD) {
    return (
      cellA != "nothing" && cellA == cellB && cellA == cellC && cellA == cellD
    );
  }

  isThereIsAWinner(grid) {
    // Test horizontal
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 6; j++) {
        if (
          this.isSameCells(
            grid[i][j],
            grid[i + 1][j],
            grid[i + 2][j],
            grid[i + 3][j]
          )
        ) {
          //   console.log("horizontal victory, row : ", j);
          return true;
        }
      }
    }
    // Test vertical
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < 3; j++) {
        if (
          this.isSameCells(
            grid[i][j],
            grid[i][j + 1],
            grid[i][j + 2],
            grid[i][j + 3]
          )
        ) {
          //   console.log("vertical victory, column : ", i);
          return true;
        }
      }
    }
    // Test Diagonal gauche vers le haut
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        if (
          this.isSameCells(
            grid[i][j],
            grid[i + 1][j + 1],
            grid[i + 2][j + 2],
            grid[i + 3][j + 3]
          )
        ) {
          //   console.log("diag gauche haut victory");
          return true;
        }
      }
    }
    // Test Diagonal Droite vers le haut
    for (var i = 3; i < 7; i++) {
      for (var j = 0; j < 3; j++) {
        if (
          this.isSameCells(
            grid[i][j],
            grid[i - 1][j + 1],
            grid[i - 2][j + 2],
            grid[i - 3][j + 3]
          )
        ) {
          //   console.log("diag droite haut victory");
          return true;
        }
      }
    }
    return false;
  }

  //Renvoie la valeur la plus élevé passée en paramètre
  max(value1, value2) {
    return value1 > value2 ? value1 : value2;
  }

  //Renvoie la valeur la plus faible passée en paramètre
  min(value1, value2) {
    return value1 < value2 ? value1 : value2;
  }
}
