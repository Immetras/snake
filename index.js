function main() {
  console.log("loaded");

  //* generate
  const size = 15;
  const board = document.getElementById("board");

  for (let i = 0; i < size + 2; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < size + 2; j++) {
      const td = document.createElement("td");

      switch (true) {
        case i == 0:
        case j == 0:
        case i == size + 1:
        case j == size + 1:
          td.className = "border";
          break;
        default:
          break;
      }
      tr.appendChild(td);
    }
    board.appendChild(tr);
  }
}
