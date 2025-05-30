var numbers = [12, 87, 98, 45, 32];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 100);
  
  for (var i = 0; i < numbers.length; i++) {
    var n = numbers[i];
    var w = width / numbers.length;
    var x = map(i, 0, numbers.length, 0, width);
    var h = map(n, 0, max(numbers), 0, height * 0.8);
    var y = height - h - 30;
    var c = map(n, 0, max(numbers), 0, 360);

    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
      fill((c + 180) % 360, 100, 100);
      rect(x, y, w, h);
      fill(0);
      textAlign(CENTER);
      textSize(16);
      text(n, x + w / 2, y - 10);
    } else {
      fill(c, 100, 100);
      rect(x, y, w, h);
    }
    
    fill(0);
    textAlign(CENTER);
    textSize(14);
    text("Data " + (i + 1), x + w / 2, height - 10);
  }
}
