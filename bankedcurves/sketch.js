var radius;
var angle;
var fcoeff;
var speed;
var gravity;
var trackResolution;
var trackAbove;
var carHeight;
var carLength;
var carWidth;
var carPos;

function setup() {
  createCanvas(400, 400, WEBGL);
  trackResolution = 1;
  angle = 60;
  speed = 100;
  radius = 140;
  trackAbove = 40;
  carHeight = 10;
  carLength = 25;
  carWidth = 15;
  carPos = 0;
  angleMode(DEGREES);
}

function draw() {
  background(220);
  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;

  ambientLight(100);
  pointLight(255, 255, 255, 0, 0, -100);
  drawTrack();
  let fr = 1;
  if (frameRate() != 0){
    fr = frameRate();
  }
  carPos += 180 * speed / (PI*radius*fr);
}
function drawTrack() {
  push();
  rotateZ(0*frameCount*0.5);
  rotateX(-70);
  rotateY(0);
  fill(255);
  noStroke();

  push();
  let habove = trackAbove*sin(angle);
  let bigradius = (trackAbove/2)*sin(90-angle) + radius;
  let h = bigradius * (sin(angle)/sin(90-angle));
  translate(0,h/2-habove,0);
  cone(bigradius,h,64,16,false);
  pop();

  push();
  translate(0,0,0);
  fill(0);
  rotateX(-90);
  plane(800);
  pop();

  push();
  translate(0,-habove/2,0);
  rotateY(carPos%360);


  push();
  //rotateZ(angle);
  translate(radius,0,0);
  rotateZ(-angle);
  translate(0,-carHeight/2-1,0);
  //translate(radius*sin(angle),-radius*sin(90-angle),0);
  //translate(radius*sin(90-angle),radius*sin(angle),0);
  fill(255,0,0);
  box(carWidth,carHeight,carLength);
  pop();

  pop();

  pop();
}
