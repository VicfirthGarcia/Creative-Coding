let trainX = 600;
let pass = 0;
let yLevels = [70, 180, 310];
let directions = [-1, 1, -1];
let flippedStates = [false, true, false];

function setup() {
  createCanvas(550, 400);
}

function draw() {
  background(230, 220, 200);

  if (pass >= yLevels.length) {
    pass = 0;
    trainX = directions[pass] === 1 ? -500 : 600;
  }

  let trainY = yLevels[pass];
  let direction = directions[pass];
  let flipped = flippedStates[pass];

  push();
  if (flipped) {
    translate(trainX + 500, 0);
    scale(-1, 1);
    drawEngine(0, trainY);
    drawCar(130, trainY);
    drawCar(250, trainY);
    drawCar(370, trainY, true);
  } else {
    drawEngine(trainX, trainY);
    drawCar(trainX + 130, trainY);
    drawCar(trainX + 250, trainY);
    drawCar(trainX + 370, trainY, true);
  }
  pop();

  trainX += direction * 2;

  if ((direction === -1 && trainX < -500) || (direction === 1 && trainX > width)) {
    pass++;
    trainX = directions[pass % 3] === 1 ? -500 : 600;
  }
}

function drawEngine(x, y) {
  let baseColor = color(181, 101, 29);
  let roofColor = color(110, 60, 20);
  let wheelColor = color(60, 40, 20);

  fill(baseColor);
  rect(x, y, 110, 50);

  fill(baseColor);
  rect(x + 15, y - 30, 20, 30); // Chimney
  rect(x + 50, y - 50, 40, 50); // Cabin
  fill(roofColor);
  rect(x + 40, y - 60, 60, 10); // Roof

  // Wheels
  fill(wheelColor);
  ellipse(x + 20, y + 50, 30, 30);
  ellipse(x + 55, y + 50, 30, 30);
  ellipse(x + 90, y + 50, 30, 30);

  // Connector
  stroke(0);
  strokeWeight(3);
  line(x + 110, y + 25, x + 130, y + 25);
  noStroke();
}

// Carts
function drawCar(x, y, isLast = false) {
  fill(205, 133, 63);
  rect(x, y, 100, 50);

  fill(70, 40, 20);
  ellipse(x + 20, y + 50, 30, 30);
  ellipse(x + 80, y + 50, 30, 30);

  if (!isLast) {
    stroke(0);
    strokeWeight(3);
    line(x + 100, y + 25, x + 120, y + 25);
    noStroke();
  }
}
