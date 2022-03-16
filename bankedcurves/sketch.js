var radius;
var angle;
var fcoeff;
var speed;
var gravity;

function setup() {
  createCanvas(400, 400, WEBGL);
}

function draw() {
  background(220);

  translate(-240, -100, 0);
  normalMaterial();
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  plane(70);
  pop();
}
