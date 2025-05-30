let bubbles = [];
let trail = [];
let pops = [];
let lightTexture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 20; i++) {
    bubbles.push(new Bubble());
  }
}

function draw() {
    background(10, 30, 60, 80);
    drawUnderwaterLight();

  if (lightTexture) {
    tint(255, 80);
    image(lightTexture, 0, 0, width, height);
    noTint();
  }

  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].display();
    if (bubbles[i].isOffScreen()) {
      bubbles.splice(i, 1);
      bubbles.push(new Bubble());
    }
  }

  trail.push(new TrailBubble(mouseX, mouseY));
  if (trail.length > 50) trail.splice(0, 1);
  for (let i = 0; i < trail.length; i++) {
    trail[i].update();
    trail[i].display();
  }

  // Pop animations
  for (let i = pops.length - 1; i >= 0; i--) {
    pops[i].update();
    pops[i].display();
    if (pops[i].finished()) {
      pops.splice(i, 1);
    }
  }
}

function mousePressed() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].contains(mouseX, mouseY)) {
      pops.push(new PopEffect(bubbles[i].x, bubbles[i].y));
      bubbles.splice(i, 1);
      bubbles.push(new Bubble());
      break;
    }
  }
}

class Bubble {
  constructor() {
    this.x = random(width);
    this.y = height + random(100);
    this.r = random(20, 40);
    this.speed = random(0.5, 2);
    this.offset = random(TWO_PI);
  }

  update() {
    this.y -= this.speed;
    this.x += sin(frameCount * 0.01 + this.offset) * 0.5;
  }

  display() {
    fill(255, 100);
    ellipse(this.x, this.y, this.r);
    fill(255, 50);
    ellipse(this.x - this.r / 4, this.y - this.r / 4, this.r / 3);
  }

  contains(px, py) {
    return dist(px, py, this.x, this.y) < this.r / 2;
  }

  isOffScreen() {
    return this.y < -this.r;
  }
}

class TrailBubble {
  constructor(x, y) {
    this.x = x + random(-5, 5);
    this.y = y + random(-5, 5);
    this.r = random(5, 12);
    this.alpha = 200;
  }

  update() {
    this.y -= 0.3;
    this.alpha -= 2;
  }

  display() {
    fill(200, this.alpha);
    ellipse(this.x, this.y, this.r);
  }
}

class PopEffect {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    for (let i = 0; i < 12; i++) {
      this.particles.push({
        x: this.x,
        y: this.y,
        angle: random(TWO_PI),
        speed: random(2, 5),
        r: random(4, 8),
        alpha: 255
      });
    }
  }

  update() {
    for (let p of this.particles) {
      p.x += cos(p.angle) * p.speed;
      p.y += sin(p.angle) * p.speed;
      p.alpha -= 10;
    }
  }

  display() {
    noStroke();
    for (let p of this.particles) {
      fill(255, p.alpha);
      ellipse(p.x, p.y, p.r);
    }
  }

  finished() {
    return this.particles.every(p => p.alpha <= 0);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawUnderwaterLight() {
  noStroke();
  for (let i = 0; i < width; i += 60) {
    let x = i + sin(frameCount * 0.01 + i * 0.01) * 20;
    let y = 0;
    let w = 40;
    let h = height;
    let alpha = map(sin(frameCount * 0.005 + i), -1, 1, 10, 40);
    fill(255, 255, 255, alpha);
    rect(x, y, w, h);
  }
}

