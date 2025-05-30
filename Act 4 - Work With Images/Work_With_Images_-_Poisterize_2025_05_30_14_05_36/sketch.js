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
background(0);
image(img, 0, 0);
var v = map(mouseX, 0, width, 2, 20);
filter(POSTERIZE, v);
}