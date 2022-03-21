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
var wheelRadius;
var ui;

function setup() {
  createCanvas(800, 600, WEBGL);
  ui = createGraphics(800,600,P2D);
  trackResolution = 1;
  angle = 60;
  speed = 500;
  radius = 140;
  trackAbove = 40;
  carHeight = 10;
  carLength = 30;
  carWidth = 15;
  carPos = 0;
  wheelRadius = 5;
  angleMode(DEGREES);
}

function draw() {
  background(220);
  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;


  ambientLight(140);
  //pointLight(2550, 2550, 2550, 0, 0, -1*frameCount);

  drawTrack();

  ui.stroke(0);
  ui.fill(0);
  ui.circle(500,250,100);
  image(ui,-400,-300);

  let fr = 1;
  if (frameRate() != 0){
    fr = frameRate();
  }
  carPos += 180 * speed / (PI*radius*fr);
}
function drawTrack() {
  push();
  translate(-200,-100,0);
  rotateZ(0*frameCount*0.5);
  rotateX(-70);
  rotateY(0);

  directionalLight(160,160,160,0,-1,0);
  fill(100);
  circle(0,0,0,0,0);

  noStroke();


  push();
  let habove = trackAbove*sin(angle);
  let bigradius = (trackAbove/2)*sin(90-angle) + radius;
  let h = bigradius * (sin(angle)/sin(90-angle));
  translate(0,h/2-habove,0);
  cone(bigradius,h,64,16,false);
  fill(20);
  cylinder(bigradius,h,64,16,false,false);
  pop();

  push();
  translate(0,10,0);
  fill(255);
  rotateX(0);
  cylinder(149,20);
  pop();

  push();

  translate(0,-habove/2,0);
  rotateY(carPos%360);


  push();
  //rotateZ(angle);
  stroke(0);
  translate(radius,0,0);
  rotateZ(-angle);
  translate(0,-carHeight/2-1-wheelRadius,0);
  //translate(radius*sin(angle),-radius*sin(90-angle),0);
  //translate(radius*sin(90-angle),radius*sin(angle),0);
  fill(255,0,0);
  box(carWidth,carHeight,carLength);
  fill(200);
  strokeWeight(1);
  var rot = -(((radius*(carPos*PI/180))%(2*PI*wheelRadius))/(2*PI*wheelRadius))*360;
  push();
  translate(carWidth/2,carHeight/2,carLength/2-wheelRadius-2);
  rotateZ(90);
  rotateY(rot);
  cylinder(wheelRadius,2,8,4,true,true);
  pop();
  push();
  translate(carWidth/2,carHeight/2,-carLength/2+wheelRadius+2);
  rotateZ(90);
  rotateY(rot);
  cylinder(wheelRadius,2,8,4,true,true);
  pop();
  push();
  translate(-carWidth/2,carHeight/2,carLength/2-wheelRadius-2);
  rotateZ(90);
  rotateY(rot);
  cylinder(wheelRadius,2,8,4,true,true);
  pop();
  push();
  translate(-carWidth/2,carHeight/2,-carLength/2+wheelRadius+2);
  rotateZ(90);
  rotateY(rot);
  cylinder(wheelRadius,2,8,4,true,true);
  pop();
  pop();

  pop();

  pop();
}
