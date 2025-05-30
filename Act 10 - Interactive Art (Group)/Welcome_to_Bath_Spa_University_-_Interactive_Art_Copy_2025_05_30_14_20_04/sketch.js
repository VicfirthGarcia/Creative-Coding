let word = "Welcome to Bath Spa University";
let font;
let transitionColor = {
  strokeHue: 220,
  strokeWeight: 2,
  fillHue: 220
};

let pos = { x: 0, y: 0 };
let vel = { x: 4, y: 3 };
let isDragging = false;
let dragOffset = { x: 0, y: 0 };
let scaleFactor = 1;
let bgHueStart = 220;
let bgHueEnd = 240;

// Sparkling balls
let balls = [];
const numBalls = 50;

function preload() {
  font = loadFont('BebasNeue.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  textAlign(CENTER, CENTER);
  textFont(font);
  textSize(100);

  pos.x = random(100, width - 100);
  pos.y = random(100, height - 100);

  for (let i = 0; i < numBalls; i++) {
    balls.push({
      x: random(width),
      y: random(height),
      vx: random(-2, 2),
      vy: random(-2, 2),
      radius: random(5, 20),
      hue: random(220, 240),
      sparkle: random(20, 60),
      sparklePhase: random(TWO_PI),  // for brightness animation
      huePhase: random(TWO_PI),      // for hue animation
      popping: false,
      popSize: 0
    });
  }
}

function draw() {
  drawBackground();
  updateBalls();
  drawBalls();

  // Scale text to target width
  let actualWidth = textWidth(word);
  let actualHeight = textAscent() + textDescent();
  let targetWidth = 800;
  scaleFactor = targetWidth / actualWidth;

  let scaledWidth = actualWidth * scaleFactor;
  let scaledHeight = actualHeight * scaleFactor;

  if (!isDragging) {
    pos.x += vel.x;
    pos.y += vel.y;

    // Bounce on walls using scaled dimensions
    if (pos.x - scaledWidth / 2 < 0 || pos.x + scaledWidth / 2 > width) {
      vel.x *= -1;
    }
    if (pos.y - scaledHeight / 2 < 0 || pos.y + scaledHeight / 2 > height) {
      vel.y *= -1;
    }
  }

  drawWord(scaleFactor);
}

function drawWord(scaleFactor) {
  push();
  translate(pos.x, pos.y);
  scale(scaleFactor);

  // Shadow
  fill(0, 0, 0, 0.4);
  noStroke();
  text(word, 3, 3);

  // Main Text
  stroke(transitionColor.strokeHue, 50, 90);
  strokeWeight(transitionColor.strokeWeight / scaleFactor);
  fill(transitionColor.fillHue, 40, 100);
  text(word, 0, 0);
  pop();
}

function drawBackground() {
  for (let y = 0; y < height; y++) {
    let hue = map(y, 0, height, bgHueStart, bgHueEnd);
    stroke(hue, 30, 20);
    line(0, y, width, y);
  }
}

function mousePressed() {
  let actualWidth = textWidth(word);
  let actualHeight = textAscent() + textDescent();
  let targetWidth = 800;
  scaleFactor = targetWidth / actualWidth;

  let scaledWidth = actualWidth * scaleFactor;
  let scaledHeight = actualHeight * scaleFactor;

  // Text dragging
  if (
    mouseX > pos.x - scaledWidth / 2 &&
    mouseX < pos.x + scaledWidth / 2 &&
    mouseY > pos.y - scaledHeight / 2 &&
    mouseY < pos.y + scaledHeight / 2
  ) {
    isDragging = true;
    dragOffset.x = pos.x - mouseX;
    dragOffset.y = pos.y - mouseY;
  }

  // Trigger ball pop
  for (let ball of balls) {
    let d = dist(mouseX, mouseY, ball.x, ball.y);
    if (d < ball.radius && !ball.popping) {
      ball.popping = true;
      ball.popSize = ball.radius * 2;
    }
  }
}


function mouseDragged() {
  if (isDragging) {
    pos.x = mouseX + dragOffset.x;
    pos.y = mouseY + dragOffset.y;
  }
}

function mouseReleased() {
  isDragging = false;
}

function updateBalls() {
  for (let ball of balls) {
    // Animate hue from ~200 to 240 smoothly
    ball.hue = 220 + 20 * sin(frameCount * 0.05 + ball.huePhase);

    if (!ball.popping) {
      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.x < ball.radius || ball.x > width - ball.radius) {
        ball.vx *= -1;
      }
      if (ball.y < ball.radius || ball.y > height - ball.radius) {
        ball.vy *= -1;
      }

      // Animate brightness from 60 (dark blue) to 100 (white-ish)
      ball.sparkle = 60 + 40 * sin(frameCount * 0.05 + ball.sparklePhase);
    } else {
      ball.popSize += 4;
      if (ball.popSize > 80) {
        ball.popping = false;
        ball.popSize = 0;
        ball.radius = random(5, 20);
        ball.x = random(width);
        ball.y = random(height);
        ball.sparklePhase = random(TWO_PI);
        ball.huePhase = random(TWO_PI);  // reset hue phase on respawn
      }
    }
  }
}

function drawBalls() {
  noStroke();
  for (let ball of balls) {
    if (ball.popping) {
      fill(ball.hue, 100, 100, 0.6);  // bright blue-white
      ellipse(ball.x, ball.y, ball.popSize);
    } else {
      fill(ball.hue, 100, ball.sparkle);  // animated brightness
      ellipse(ball.x, ball.y, ball.radius * 2);
    }
  }
}
