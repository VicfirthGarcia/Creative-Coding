var img, x, y;
function preload() {
img = loadImage("Johnny.png");
}

function setup() {
createCanvas (640, 640);
background(0);
noStroke();
}

function draw() {
x = random(width);
y = random(height);
var c = img.get(x, y);
fill(c[1], c[1], c[2], 50);
ellipse (x, y, 30, 30);
}