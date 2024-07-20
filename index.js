const images = [
  "assets/aceClubs.png",
  "assets/aceClubs.png",
  "assets/aceDiamonds.png",
  "assets/aceDiamonds.png",
  "assets/aceHearts.png",
  "assets/aceHearts.png",
  "assets/aceSpades.png",
  "assets/aceSpades.png",
  "assets/jackDiamonds.png",
  "assets/jackDiamonds.png",
  "assets/jackSpades.png",
  "assets/jackSpades.png",
  "assets/kingDiamonds.png",
  "assets/kingDiamonds.png",
  "assets/kingSpades.png",
  "assets/kingSpades.png",
];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const setImages = () => {
  const cards = document.querySelectorAll("#card-parent > div > img");
  shuffle(images);
  cards.forEach((card, index) => {
    card.src = images[index];
  });
};

const showImage = (id) => {
  const card = document.getElementById(id);
  card.firstElementChild.classList.toggle("opacity-100");
};

const checkWin = () => {
  const cards = document.querySelectorAll("#card-parent > div > img");
  const unmatched = Array.from(cards).filter(
    (card) => !card.parentElement.classList.contains("opacity-0")
  );
  if (unmatched.length === 0) {
    const winMessage = document.getElementById("win-message");
    winMessage.classList.remove("hidden");

    document.getElementById("play-again").onclick = () => {
      location.reload();
    };

    document.getElementById("finish-game").onclick = () => {
      winMessage.innerHTML = "<h1>Thank you for playing!</h1>";
      winMessage.classList.add("text-3xl");
    };
  }
};

const compareImages = (id) => {
  showImage(id);
  const cards = document.querySelectorAll("#card-parent > div > img");
  const selected = Array.from(cards).filter((card) =>
    card.classList.contains("opacity-100")
  );

  if (selected.length === 2) {
    const [first, second] = selected;
    if (first.src === second.src) {
      setTimeout(() => {
        first.parentElement.classList.add("opacity-0");
        second.parentElement.classList.add("opacity-0");
        first.classList.remove("opacity-100");
        second.classList.remove("opacity-100");
        checkWin();
      }, 1000);
    } else {
      setTimeout(() => {
        first.classList.remove("opacity-100");
        second.classList.remove("opacity-100");
      }, 1000);
    }
  }
};

window.onload = setImages;
