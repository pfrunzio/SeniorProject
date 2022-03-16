var radius;
var angle;
var fcoeff;
var speed;
var gravity;
var trackResolution;

function setup() {
  createCanvas(400, 400, WEBGL);
  trackResolution = 1;
}

function draw() {
  background(220);
  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;

  ambientLight(180);
  //pointLight(255, 255, 255, locX, locY, 100);
  drawTrack();

}
function drawTrack() {
  push();
  rotateZ(0);
  rotateX(-1);
  rotateY(0);
  normalMaterial();
  noStroke();

  cone(70,20,16,16,false);

  push();
  translate(0,0,-10);
  fill(0);
  rotateX(-PI/2);
  plane(800);
  pop();

  push();
  rotateY(frameCount * 0.01);


  push();
  rotateZ(1);
  translate(0,-40,0);
  box(20);
  pop();

  pop();

  pop();
}
