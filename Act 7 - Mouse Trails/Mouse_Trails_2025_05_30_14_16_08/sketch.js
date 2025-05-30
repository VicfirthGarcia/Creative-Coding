let trail = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  colorMode(HSB, 360, 100, 100, 255);
}

function draw() {
  background(0, 40);

  trail.push({
    x: mouseX,
    y: mouseY,
    time: frameCount,
  });

  if (trail.length > 80) {
    trail.shift();
  }

  for (let i = 0; i < trail.length; i++) {
    let t = trail[i];
    let age = frameCount - t.time;
    let size = 10 + 5 * sin(age * 0.3);
    let lerpFactor = i / trail.length;
    let hue = 220; // Blue hue
    let sat = lerp(100, 0, lerpFactor);
    let bri = lerp(80, 100, lerpFactor);
    let alpha = map(age, 0, 40, 255, 0, true);

    fill(hue, sat, bri, alpha);
    ellipse(t.x, t.y, size);
  }
}

