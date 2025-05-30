let hexSize = 40;

function setup() {
  createCanvas(800, 600);
  noLoop();
  noStroke();
}

function draw() {
  background(15);

  let dx = hexSize * 3 / 2;
  let dy = sqrt(3) * hexSize;

  for (let y = 0; y < height + hexSize; y += dy) {
    for (let x = 0; x < width + hexSize; x += dx) {
      let offsetX = (y / dy) % 2 === 0 ? 0 : dx / 2;
      let posX = x + offsetX;
      let posY = y;

      let c = color(random(100, 255), random(100, 255), random(100, 255), random(100, 255));
      fill(c);

      // Random distortion factors
      let r = hexSize * random(0.7, 1.3);
      let wobble = random(-PI / 12, PI / 12);
      let scaleX = random(0.7, 1.3);
      let scaleY = random(0.7, 1.3);

      drawDistortedHexagon(posX, posY, r, wobble, scaleX, scaleY);
    }
  }
}

function drawDistortedHexagon(x, y, r, rotationOffset, scaleX, scaleY) {
  beginShape();
  for (let i = 0; i < 6; i++) {
    let angle = TWO_PI / 6 * i + rotationOffset;
    let vx = x + cos(angle) * r * scaleX;
    let vy = y + sin(angle) * r * scaleY;
    vertex(vx, vy);
  }
  endShape(CLOSE);
}
