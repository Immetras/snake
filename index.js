function main() {
  console.log("loaded");

  //* generate
  const size = 15;
  const board = document.getElementById("board");
  let boardArr = [];

  for (let i = 0; i < size + 2; i++) {
    const tr = document.createElement("tr");
    boardArr[i] = [];

    for (let j = 0; j < size + 2; j++) {
      const td = document.createElement("td");
      boardArr[i][j] = 0;
      i == 8 ? (j == 8 ? (boardArr[i][j] = 1) : null) : null;

      switch (true) {
        case i == 0:
        case j == 0:
        case i == size + 1:
        case j == size + 1:
          td.className = "border";
          break;
        default:
          td.id = `${i},${j}`;
          break;
      }
      tr.appendChild(td);
    }
    board.appendChild(tr);
  }

  //* snake move
  let direction = undefined;
  let started = false;
  let snakeLength = 1;

  function start() {
    let head = null;
    let headCell = [];

    for (let i = 0; i < boardArr.length; i++) {
      const row = boardArr[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        if (cell == 1) {
          head = document.getElementById(`${i},${j}`);
          headCell = [i, j];
        }
      }
    }

    let apple = placeApple();
    // console.log(apple);

    boardArr[apple[0]][apple[1]] = -1;
    document
      .getElementById(`${apple[0]},${apple[1]}`)
      .classList.add("snake", "apple");

    function placeApple() {
      let applePos = [];
      let apple = Math.floor(Math.random() * size * size);
      applePos[0] = Math.floor(apple / size) + 1;
      applePos[1] = (apple % size) + 1;
      if (boardArr[applePos[0]][applePos[1]] > 0) {
        console.log("snek here");
        applepos = placeApple();
      } else {
        return applePos;
      }
    }

    let refresh = setInterval(() => {
      console.log("updated,", `direction is: ${direction}`);
      // console.table(boardArr);

      // console.log(boardArr[headCell[0]][headCell[1]]);
      // boardArr[headCell[0]][headCell[1]] == -1 ? snakeLength++ : null;
      // console.log(snakeLength);

      //todo: change first line, i guess
      switch (direction) {
        case "up":
          boardArr[headCell[0]][headCell[1]] = 0;
          boardArr[headCell[0] - 1][headCell[1]] = 1;
          break;

        case "down":
          boardArr[headCell[0]][headCell[1]] = 0;
          boardArr[headCell[0] + 1][headCell[1]] = 1;
          break;

        case "right":
          boardArr[headCell[0]][headCell[1]] = 0;
          boardArr[headCell[0]][headCell[1] + 1] = 1;
          break;

        case "left":
          boardArr[headCell[0]][headCell[1]] = 0;
          boardArr[headCell[0]][headCell[1] - 1] = 1;
          break;

        default:
          break;
      }

      document.getElementById(`${headCell[0]},${headCell[1]}`).classList = "";

      for (let i = 0; i < boardArr.length; i++) {
        for (let j = 0; j < boardArr[i].length; j++) {
          boardArr[i][j] > 0 ? boardArr[i][j]++ : null;
          if (boardArr[i][j] == 2) {
            head = document.getElementById(`${i},${j}`);
            headCell = [i, j];
          }
        }
      }

      // console.log(head);
      head.classList = "";
      head.classList.add(`snake`, `head-${direction}`);
    }, 727);
  }

  document.addEventListener("keydown", move);
  function move(e) {
    // console.log(e.key);
    switch (e.key) {
      case "w":
      case "ArrowUp":
        !started ? start() : null;
        started = true;
        console.log("up");
        direction = "up";
        break;
      case "s":
      case "ArrowDown":
        !started ? start() : null;
        started = true;
        console.log("down");
        direction = "down";
        break;
      case "d":
      case "ArrowRight":
        !started ? start() : null;
        started = true;
        console.log("right");
        direction = "right";
        break;
      case "a":
      case "ArrowLeft":
        !started ? start() : null;
        started = true;
        console.log("left");
        direction = "left";
        break;

      default:
        break;
    }
  }

  //? snek
  const snakeParts = [
    "head-up",
    "head-down",
    "head-right",
    "head-left",
    "body-vert",
    "body-hor",
    "body-up-right",
    "body-up-left",
    "body-down-right",
    "body-down-left",
    "tail-up",
    "tail-down",
    "tail-right",
    "tail-left",
    "apple",
  ];
}
