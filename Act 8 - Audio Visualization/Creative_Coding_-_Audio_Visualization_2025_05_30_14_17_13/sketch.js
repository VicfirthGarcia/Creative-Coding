let song, fft, peakDetect, amp, centerImage;
let shapes = [];
let started = false;

function preload() {
  song = loadSound('BABYBABYBABYBABY.mp3'); // Put your own music
  centerImage = loadImage('Makoto.jpg'); // Put your own image
}

function setup() {
  createCanvas(1080, 720);
  angleMode(DEGREES);

  fft = new p5.FFT();
  amp = new p5.Amplitude();
  peakDetect = new p5.PeakDetect();
}

function draw() {
  background(0);

  if (!started) {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    // Change starting message if you want
    text("It's Going Down Now", width / 2, height / 2);
    return;
  }

  translate(width / 2, height / 2);

  fft.analyze();
  peakDetect.update(fft);

  let level = amp.getLevel(); // 0.0 - 1.0
  let mappedLevel = map(level, 0, 0.5, 0, 1);

  if (peakDetect.isDetected) {
    let numShapes = int(map(level, 0, 0.5, 6, 20));
    for (let i = 0; i < numShapes; i++) {
      let angle = i * (360 / numShapes) + random(-5, 5);
      shapes.push(new MovingShape(angle, mappedLevel));
    }
  }

  // Calculate reactive image size
  let imageSize = 200 + mappedLevel * 50;
  push();
  rotate(frameCount * 0.5);
  imageMode(CENTER);
  image(centerImage, 0, 0, imageSize, imageSize);
  pop();

  for (let i = shapes.length - 1; i >= 0; i--) {
    shapes[i].update();
    shapes[i].display();
    if (shapes[i].isOffscreen()) {
      shapes.splice(i, 1);
    }
  }
}

function mousePressed() {
  if (!started) {
    song.play();
    fft.setInput(song);
    amp.setInput(song);
    started = true;
  }
}

class MovingShape {
  constructor(angle, level) {
    this.angle = angle;
    this.radius = 100;
    this.pos = p5.Vector.fromAngle(radians(this.angle)).mult(this.radius);
    this.vel = p5.Vector.fromAngle(radians(this.angle)).mult(map(level, 0, 1, 2, 8));
    this.shapeType = random(['circle', 'square', 'triangle']);
    this.size = random(10, 20) + level * 30;

    // Color from light blue to white
    let lightBlue = color(100, 200, 255);
    let white = color(255, 255, 255);
    let t = random(0.3, 1);
    this.color = lerpColor(lightBlue, white, t);

    this.rotation = random(360);
    this.rotationSpeed = random(-5, 5);
  }

  update() {
    this.pos.add(this.vel);
    this.rotation += this.rotationSpeed;
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.rotation);
    fill(this.color);
    noStroke();

    switch (this.shapeType) {
      case 'circle':
        ellipse(0, 0, this.size);
        break;
      case 'square':
        rectMode(CENTER);
        rect(0, 0, this.size, this.size);
        break;
      case 'triangle':
        triangle(
          -this.size / 2, this.size / 2,
           this.size / 2, this.size / 2,
           0, -this.size / 2
        );
        break;
    }

    pop();
  }

  isOffscreen() {
    return (
      this.pos.x < -width / 2 || this.pos.x > width / 2 ||
      this.pos.y < -height / 2 || this.pos.y > height / 2
    );
  }
}
