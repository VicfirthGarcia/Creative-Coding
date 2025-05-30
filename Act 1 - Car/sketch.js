function setup() {
  createCanvas(400, 200);
  background(220);
}

function draw() {
  background(220);

  // Body of the Car
  fill(250, 0, 0);
  rect(100, 100, 200, 50);
  rect(140, 70, 120, 40);

  // Wheels of the Car
  fill(0);
  ellipse(130, 150, 40, 40);
  ellipse(270, 150, 40, 40);

  // Rims of the Car
  fill(180);
  ellipse(130, 150, 30, 30);
  ellipse(270, 150, 30, 30);

  // Window
  fill(135, 206, 250);
  rect(150, 75, 100, 30);

  // Headlights
  fill(255, 255, 100);
  ellipse(100, 115, 10, 10);
}
