var radius;
var angle;
var fcoeff;
var speed;
var mass;
var gravity;
var trackResolution;
var trackAbove;
var carHeight;
var carLength;
var carWidth;
var carPos;
var wheelRadius;
var ui;

var t = function(p) {
  p.setup = function() {
    p.createCanvas(800, 600, p.WEBGL);
    trackResolution = 1;
    angle = 40;
    speed = 50;
    mass = 10;
    gravity = 9.81;
    radius = 140;
    trackAbove = 40;
    carHeight = 10;
    carLength = 30;
    carWidth = 15;
    carPos = 0;
    wheelRadius = 5;
    p.angleMode(p.DEGREES);
  };
  p.draw = function() {
    p.background(220);
    let locX = p.mouseX - p.height / 2;
    let locY = p.mouseY - p.width / 2;

    p.ambientLight(140);
    //pointLight(2550, 2550, 2550, 0, 0, -1*frameCount);

    //red dots
    p.strokeWeight(10);
    p.stroke(255,0,0);
    p.quad(0,0,0,0,0,0,0,0,0,0,0,0);
    p.point(10,-90,0);
    p.point(-10,-90,0);

    drawTrack(p);

    let fr = 1;
    if (p.frameRate() != 0) {
      fr = p.frameRate();
    }
    carPos += 180 * speed / (p.PI*radius*fr);
  };
};
var myp5 = new p5(t, "track");

var u = function(p) {
  p.setup = function() {
    p.createCanvas(100, 600, p.P2D);
  };
  p.draw = function() {
    p.background(50,50,50);

    drawUI(p);
  };
};
var myp5 = new p5(u, 'ui');

var f = function(p) {
  p.setup = function() {
    p.createCanvas(200, 200, p.P2D);
    p.angleMode(p.DEGREES);
  };
  p.draw = function() {
    p.background(220);

    drawFBD(p);
  };
};
var myp5 = new p5(f, 'fbd');

function drawTrack(p = p5.instance) {

  p.push(); // camera
    p.translate(-200,-100,0);
    p.rotateZ(0*p.frameCount*0.5);
    p.rotateX(-70);
    p.rotateY(0);

    p.directionalLight(160,160,160,0,-1,0);

    p.fill(100);
    p.circle(0,0,0,0,0);

    p.noStroke();


    p.push(); // track
      let habove = trackAbove*p.sin(angle);
      let bigradius = (trackAbove/2)*p.sin(90-angle) + radius;
      let h = bigradius * (p.sin(angle)/p.sin(90-angle));
      p.translate(0,h/2-habove,0);
      p.cone(bigradius,h,64,16,false);
      p.fill(0);

      p.fill(20);
      p.cylinder(bigradius,h,64,16,false,false);
    p.pop();

    p.push(); // ground
      p.translate(0,10,0);
      p.fill(255);
      p.rotateX(0);
      p.cylinder(149,20);
    p.pop();

    p.push(); // car

      p.translate(0,-habove/2,0);
      p.rotateY(carPos%360);


      p.push(); // car body
        //rotateZ(angle);
        p.stroke(0);
        p.translate(radius,0,0);
        p.rotateZ(-angle);
        p.translate(0,-carHeight/2-1-wheelRadius,0);
        //translate(radius*sin(angle),-radius*sin(90-angle),0);
        //translate(radius*sin(90-angle),radius*sin(angle),0);
        p.fill(255,0,0);
        p.strokeWeight(1);
        p.box(carWidth,carHeight,carLength);
        p.fill(200);
        p.strokeWeight(1);
        var rot = -(((radius*(carPos*p.PI/180))%(2*p.PI*wheelRadius))/(2*p.PI*wheelRadius))*360;
        p.push(); // wheel 1
          p.translate(carWidth/2,carHeight/2,carLength/2-wheelRadius-2);
          p.rotateZ(90);
          p.rotateY(rot);
          p.cylinder(wheelRadius,2,8,4,true,true);
        p.pop();
        p.push(); // wheel 2
          p.translate(carWidth/2,carHeight/2,-carLength/2+wheelRadius+2);
          p.rotateZ(90);
          p.rotateY(rot);
          p.cylinder(wheelRadius,2,8,4,true,true);
        p.pop();
        p.push(); // wheel 3
          p.translate(-carWidth/2,carHeight/2,carLength/2-wheelRadius-2);
          p.rotateZ(90);
          p.rotateY(rot);
          p.cylinder(wheelRadius,2,8,4,true,true);
        p.pop();
        p.push(); // wheel 4
          p.translate(-carWidth/2,carHeight/2,-carLength/2+wheelRadius+2);
          p.rotateZ(90);
          p.rotateY(rot);
          p.cylinder(wheelRadius,2,8,4,true,true);
        p.pop();
      p.pop();
    p.pop();
  p.pop();
};

function drawUI(p = p5.instance) {
  p.fill(255);
  p.rect(20,20,50,50);
};

function drawFBD(p = p5.instance){

  // track
  let tSize = 150;
  let h = tSize;
  let w = tSize * p.sin(90-angle) / p.sin(angle);
  if (w > tSize){
    h = h * tSize / w;
    w = tSize;
  }
  let hyp = p.sqrt(h*h+w*w);
  p.fill(0);
  p.triangle(100-w/2,100-h/2,100-w/2,100+h/2,100+w/2,100+h/2);

  // cart
  p.push();
    p.translate(100-w/2,100-h/2);
    p.rotate(angle);
    p.translate(hyp/2,0);
    p.fill(255,0,0);
    p.rect(-carLength/2,-carHeight-wheelRadius,carLength,carHeight);
    p.ellipseMode(p.CENTER);
    p.fill(200);
    p.circle(-carLength/2+wheelRadius+2,-wheelRadius,wheelRadius*2);
    p.circle(carLength/2-wheelRadius-2,-wheelRadius,wheelRadius*2);

    // vector lengths
    let F_G = mass * gravity;
    let F_N = 

    // arrows
    // positive x is down the slope, positive y is into the slope
    drawArrow(p,p.createVector(0,0),p.createVector(0,-40),'green',3,7);
    p.rotate(-angle);
    drawArrow(p,p.createVector(0,0),p.createVector(0,mass*gravity),'green',3,7);
  p.pop();
}

function drawArrow(p = p5.instance, start, end, color, width, size){
  p.push();
  p.stroke(color);
  p.strokeWeight(3);
  p.fill(color);
  p.translate(start.x,start.y);
  p.line(0,0,end.x,end.y);
  p.rotate(end.heading());
  p.translate(end.mag() - size, 0);
  p.triangle(0, size/2, 0, -size/2, size, 0);
  p.pop();
}
