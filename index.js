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
      i == 8 ? (j == 7 ? (boardArr[i][j] = 2) : null) : null;
      i == 8 ? (j == 6 ? (boardArr[i][j] = 3) : null) : null;

      switch (true) {
        case i == 0:
        case j == 0:
        case i == size + 1:
        case j == size + 1:
          td.className = "border";
          boardArr[i][j] = "border";
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
  let snakeLength = 3;

  function start() {
    let head = null;
    let headCell = [];

    let tail = null;
    let tailDir = "right";

    let body = [];

    checkSnake();

    function checkSnake() {
      body = [];
      for (let i = 0; i < boardArr.length; i++) {
        for (let j = 0; j < boardArr[i].length; j++) {
          boardArr[i][j] > snakeLength ? (boardArr[i][j] = 0) : null;

          if (boardArr[i][j] == 1) {
            head = document.getElementById(`${i},${j}`);
            headCell = [i, j];
          }

          if (boardArr[i][j] == snakeLength) {
            tail = document.getElementById(`${i},${j}`);
            switch (true) {
              case boardArr[i - 1][j] == snakeLength - 1:
                tailDir = "up";
                break;
              case boardArr[i + 1][j] == snakeLength - 1:
                tailDir = "down";
                break;
              case boardArr[i][j + 1] == snakeLength - 1:
                tailDir = "right";
                break;
              case boardArr[i][j - 1] == snakeLength - 1:
                tailDir = "left";
                break;

              default:
                break;
            }
          }

          if (boardArr[i][j] > 1 && boardArr[i][j] < snakeLength) {
            body.push({
              pos: [i, j],
              dir: (function () {
                if (
                  boardArr[i - 1][j] == boardArr[i][j] - 1 ||
                  boardArr[i - 1][j] == boardArr[i][j] + 1
                ) {
                  if (
                    boardArr[i][j + 1] == boardArr[i][j] - 1 ||
                    boardArr[i][j + 1] == boardArr[i][j] + 1
                  ) {
                    return "up-right";
                  }
                  if (
                    boardArr[i][j - 1] == boardArr[i][j] - 1 ||
                    boardArr[i][j - 1] == boardArr[i][j] + 1
                  ) {
                    return "up-left";
                  }
                  if (
                    boardArr[i + 1][j] == boardArr[i][j] - 1 ||
                    boardArr[i + 1][j] == boardArr[i][j] + 1
                  ) {
                    return "vert";
                  }
                }
                if (
                  boardArr[i + 1][j] == boardArr[i][j] - 1 ||
                  boardArr[i + 1][j] == boardArr[i][j] + 1
                ) {
                  if (
                    boardArr[i][j + 1] == boardArr[i][j] - 1 ||
                    boardArr[i][j + 1] == boardArr[i][j] + 1
                  ) {
                    return "down-right";
                  }
                  if (
                    boardArr[i][j - 1] == boardArr[i][j] - 1 ||
                    boardArr[i][j - 1] == boardArr[i][j] + 1
                  ) {
                    return "down-left";
                  }
                  if (
                    boardArr[i + 1][j] == boardArr[i][j] - 1 ||
                    boardArr[i + 1][j] == boardArr[i][j] + 1
                  ) {
                    return "vert";
                  }
                }
                if (
                  boardArr[i][j - 1] == boardArr[i][j] - 1 ||
                  boardArr[i][j - 1] == boardArr[i][j] + 1
                ) {
                  if (
                    boardArr[i][j + 1] == boardArr[i][j] - 1 ||
                    boardArr[i][j + 1] == boardArr[i][j] + 1
                  ) {
                    return "hor";
                  }
                }
              })(),
              cell: document.getElementById(`${i},${j}`),
            });
          }
        }
      }

      for (let i = 0; i < boardArr.length; i++) {
        for (let j = 0; j < boardArr[i].length; j++) {
          boardArr[i][j] > 0 ? boardArr[i][j]++ : null;
        }
      }
    }

    placeApple();
    // console.log(apple);

    function placeApple() {
      let applePos = [];
      let apple = Math.floor(Math.random() * size * size);
      applePos[0] = Math.floor(apple / size) + 1;
      applePos[1] = (apple % size) + 1;
      if (boardArr[applePos[0]][applePos[1]] > 0) {
        console.log("snek here");
        applepos = placeApple();
      } else {
        boardArr[applePos[0]][applePos[1]] = -1;
        document
          .getElementById(`${applePos[0]},${applePos[1]}`)
          .classList.add("snake", "apple");
      }
    }
    function ateApple() {
      placeApple();
      snakeLength++;
    }
    // window.addEventListener("keydown", (e) =>
    //   e.key == "c" ? clearInterval(refresh) : null
    // );

    let refresh = setInterval(() => {
      console.log(
        "updated;",
        `direction is: ${direction}, length: ${snakeLength}`
      );
      // console.table(boardArr);

      switch (direction) {
        case "up":
          boardArr[headCell[0] - 1][headCell[1]] < 0 ? ateApple() : null;
          boardArr[headCell[0] - 1][headCell[1]] = 1;
          break;

        case "down":
          boardArr[headCell[0] + 1][headCell[1]] < 0 ? ateApple() : null;
          boardArr[headCell[0] + 1][headCell[1]] = 1;
          break;

        case "right":
          boardArr[headCell[0]][headCell[1] + 1] < 0 ? ateApple() : null;
          boardArr[headCell[0]][headCell[1] + 1] = 1;
          break;

        case "left":
          boardArr[headCell[0]][headCell[1] - 1] < 0 ? ateApple() : null;
          boardArr[headCell[0]][headCell[1] - 1] = 1;
          break;

        default:
          break;
      }

      head.classList = "";
      // typeof tail != null ? (tail.classList = "") : null;
      tail.classList = "";

      checkSnake();
      // console.table(boardArr);

      // console.log(head);
      head.classList = "";
      head.classList.add(`snake`, `head-${direction}`);

      // console.log(tail);
      tail.classList = "";
      tail.classList.add("snake", `tail-${tailDir}`);

      console.table(body);
      for (part of body) {
        part.cell.classList = "";
        part.cell.classList.add(`snake`, `body-${part.dir}`);
      }
    }, 331);
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
