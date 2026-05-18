const puzzle = document.getElementById("puzzle");
const message = document.getElementById("message");

let pieces = [];
let selectedPiece = null;

function createPuzzle() {
  puzzle.innerHTML = "";
  pieces = [];

  for (let i = 0; i < 9; i++) {
    const piece = document.createElement("div");

    piece.classList.add("piece");

    const row = Math.floor(i / 3);
    const col = i % 3;

    piece.style.backgroundPosition =
      `-${col * 120}px -${row * 120}px`;

    piece.dataset.correct = i;

    piece.addEventListener("click", () => {
      selectPiece(piece);
    });

    pieces.push(piece);
  }

  shufflePuzzle();
}

function shufflePuzzle() {
  message.innerHTML = "";
  selectedPiece = null;

  let shuffled = [...pieces].sort(() => Math.random() - 0.5);

  puzzle.innerHTML = "";

  shuffled.forEach((piece) => {
    piece.classList.remove("selected");
    puzzle.appendChild(piece);
  });
}

function selectPiece(piece) {

  if (!selectedPiece) {

    selectedPiece = piece;
    piece.classList.add("selected");

  } else {

    swapPieces(selectedPiece, piece);

    selectedPiece.classList.remove("selected");
    selectedPiece = null;

    checkWin();
  }
}

function swapPieces(piece1, piece2) {

  const temp = document.createElement("div");

  puzzle.insertBefore(temp, piece1);
  puzzle.insertBefore(piece1, piece2);
  puzzle.insertBefore(piece2, temp);

  puzzle.removeChild(temp);
}

function checkWin() {

  const currentPieces = Array.from(puzzle.children);

  const isSolved = currentPieces.every((piece, index) => {
    return Number(piece.dataset.correct) === index;
  });

  if (isSolved) {

    message.innerHTML = `
      <div class="love-note">

        <h2>I love you, my love 💖</h2>

        <p>
          I am so happy to have you and so excited to be with you very soon.
          We are one day closer to moving onto the next chapter of our lives.
        </p>

        <p>
          I wanna let you know I am 100% on this and it’s only you who I wanna
          spend the rest of my life with.
        </p>

        <p>
          You always have me, my love. You will never be alone.
        </p>

        <p>
          Thank you for always being there for me and for loving me.
        </p>

        <h3>Forever yours, Nali 💕</h3>

      </div>
    `;
  }
}

createPuzzle();
