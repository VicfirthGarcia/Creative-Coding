function setup() {
  createCanvas(400, 400);
  background(30);
}

function draw() {
  background(30);

  // Body
  fill(255, 255, 0);
  ellipse(200, 280, 100, 120);

  // Head
  ellipse(200, 180, 80, 80);

  // Eyes
  fill(255);
  ellipse(185, 170, 20, 30);
  ellipse(215, 170, 20, 30);
  fill(0);
  ellipse(185, 170, 10, 15);
  ellipse(215, 170, 10, 15);

  // Beak
  fill(255, 165, 0);
  triangle(190, 190, 210, 190, 200, 205);

  // Antennae
  stroke(255, 255, 0);
  strokeWeight(4);
  line(185, 140, 170, 110);
  line(215, 140, 230, 110);
  noStroke();
  fill(255, 0, 200);
  ellipse(170, 110, 10, 10);
  ellipse(230, 110, 10, 10);

  // Feet
  fill(255, 165, 0);
  ellipse(180, 330, 20, 10);
  ellipse(220, 330, 20, 10);
}
