function main() {
  console.log("loaded");

  const size = parseInt(
    prompt(`Select grid size: \n(5-35 is recommended)`, 20)
  );

  //* generate10
  const board = document.getElementById("board");
  let boardArr = [];

  for (let i = 0; i < size + 2; i++) {
    const tr = document.createElement("tr");
    boardArr[i] = [];

    for (let j = 0; j < size + 2; j++) {
      const td = document.createElement("td");
      // boardArr[i][j] = 0;ds
      // i == Math.ceil(size / 2)
      //  ? j == Math.ceil(size / 2)
      //   ? (boardArr[i][j] = 1)
      //     : null
      //   : null;
      // i == 8 ? (j == 7 ? (boardArr[i][j] = 2) : null) : null;
      // i == 8 ? (j == 6 ? (boardArr[i][j] = 3) : null) : null;

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
  boardArr[Math.ceil(size / 2)][Math.ceil(size / 2)] = 1;

  //* snake move
  let direction = undefined;
  let started = false;
  let snakeLength = 2;

  function start() {
    if (direction == "left") {
      boardArr[Math.ceil(size / 2)][Math.ceil(size / 2) + 1] = 2;
    } else {
      boardArr[Math.ceil(size / 2)][Math.ceil(size / 2) - 1] = 2;
    }

    let head = null;
    let headCell = [];

    let tail = null;
    let tailDir = null;

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
    function lost() {
      alert(`You lost.\nYour score was: ${snakeLength}. \nPlay again?`);
      location.reload();
    }

    let refresh = setInterval(() => {
      console.log(
        "updated;",
        `direction is: ${direction}, length: ${snakeLength}`
      );
      // console.table(boardArr);

      switch (direction) {
        case "up":
          boardArr[headCell[0] - 1][headCell[1]] > 1 ? lost() : null;
          boardArr[headCell[0] - 1][headCell[1]] == "border" ? lost() : null;
          boardArr[headCell[0] - 1][headCell[1]] < 0 ? ateApple() : null;
          boardArr[headCell[0] - 1][headCell[1]] = 1;
          break;

        case "down":
          boardArr[headCell[0] + 1][headCell[1]] > 1 ? lost() : null;
          boardArr[headCell[0] + 1][headCell[1]] == "border" ? lost() : null;
          boardArr[headCell[0] + 1][headCell[1]] < 0 ? ateApple() : null;
          boardArr[headCell[0] + 1][headCell[1]] = 1;
          break;

        case "right":
          boardArr[headCell[0]][headCell[1] + 1] > 1 ? lost() : null;
          boardArr[headCell[0]][headCell[1] + 1] == "border" ? lost() : null;
          boardArr[headCell[0]][headCell[1] + 1] < 0 ? ateApple() : null;
          boardArr[headCell[0]][headCell[1] + 1] = 1;
          break;

        case "left":
          boardArr[headCell[0]][headCell[1] - 1] > 1 ? lost() : null;
          boardArr[headCell[0]][headCell[1] - 1] == "border" ? lost() : null;
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

      // console.table(body);
      for (part of body) {
        part.cell.classList = "";
        part.cell.classList.add(`snake`, `body-${part.dir}`);
      }
    }, 277);
  }

  document.addEventListener("keydown", move);
  function move(e) {
    // console.log(e.key);
    switch (e.key) {
      case "w":
      case "ArrowUp":
        console.log("up");
        direction = "up";
        !started ? start() : null;
        started = true;
        break;
      case "s":
      case "ArrowDown":
        console.log("down");
        direction = "down";
        !started ? start() : null;
        started = true;
        break;
      case "d":
      case "ArrowRight":
        console.log("right");
        direction = "right";
        !started ? start() : null;
        started = true;
        break;
      case "a":
      case "ArrowLeft":
        console.log("left");
        direction = "left";
        !started ? start() : null;
        started = true;
        break;

      default:
        break;
    }
  }
}
