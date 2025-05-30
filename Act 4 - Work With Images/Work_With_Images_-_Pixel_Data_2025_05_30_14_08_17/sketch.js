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
x = mouseX;
y = mouseY;
image( img, 0, 0);
var c = get(x, y);
fill(c);
ellipse (x, y, 100, 100);
}