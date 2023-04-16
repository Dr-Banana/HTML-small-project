const puppyWrapper = document.querySelector(".puppy-wrapper");
const puppyImg = document.getElementById("puppy-img");

let isMouseOver = false;
let isMouseOverDisabled = false;
let mouseOverTimer = null;

async function playPuppy2() {
  const duration = 500;
  puppyImg.src = "./frame/puppy2.gif";
  setTimeout(() => {
    puppyImg.src = "./frame/puppy_box.jpg";
    isMouseOverDisabled = false;
  }, duration);
}

puppyWrapper.addEventListener("mouseover", () => {
  if (isMouseOverDisabled) return;

  isMouseOver = true;
  puppyImg.src = "./frame/puppy1.gif";
  isMouseOverDisabled = true;

  mouseOverTimer = setTimeout(() => {
    if (isMouseOver) {
      puppyImg.src = "./frame/puppy_open.jpg";
    }
    mouseOverTimer = null;
  }, 2200);
});

puppyWrapper.addEventListener("mouseout", () => {
  isMouseOver = false;

  if (mouseOverTimer !== null) {
    clearTimeout(mouseOverTimer);
    mouseOverTimer = null;
    playPuppy2();
  } else {
    playPuppy2();
  }
});
