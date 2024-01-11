function main() {
  console.log("loaded");

  //* generate
  const size = 15;
  const board = document.getElementById("boardTable");

  for (let i = 0; i < size + 2; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < size; j++) {
      const td = document.createElement("td");

      switch ((i, j)) {
        case 0:
        case size + 1:
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
