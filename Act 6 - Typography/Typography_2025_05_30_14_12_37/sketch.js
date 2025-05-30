let baseText = "Vicfirth Garcia";
let glitchAmount = 10;
let fontSize = 64;

function setup() {
  createCanvas(800, 400);
  textFont('monospace');
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  noStroke();
}

function draw() {
background(10);

  let x = width / 2;
  let y = height / 2;

  fill(255);
  text(baseText, x, y);

  for (let i = 0; i < 5; i++) {
    let offsetX = random(-glitchAmount, glitchAmount);
    let offsetY = random(-glitchAmount / 2, glitchAmount / 2);
    let r = random([255, 0]);
    let g = random([255, 0]);
    let b = random([255, 0]);

    fill(r, g, b, 150);
    text(baseText, x + offsetX, y + offsetY);
  }

  if (random() < 0.1) {
    let sliceY = random(y - fontSize, y + fontSize);
    let sliceHeight = random(5, 20);
    let glitchOffset = random(-20, 20);

    copy(
      width / 2 - 200, sliceY,
      400, sliceHeight,
      width / 2 - 200 + glitchOffset, sliceY,
      400, sliceHeight
    );
  }
}
