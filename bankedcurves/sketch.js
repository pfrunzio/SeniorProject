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
var tempRadius;
var F_N;
var F_G;
var F_C;
var F_fs;
var gf; //gforce
var pf; //percent friction

var t = function(p) {
  p.setup = function() {
    // setup HTML elements

    p.createCanvas(600, 500, p.WEBGL);
    trackResolution = 1;
    angle = 77;
    fcoeff = 0.02;
    speed = 20;
    mass = 100;
    gravity = 9.81;
    radius = 8;
    trackAbove = 40;
    carHeight = 10;
    carLength = 30;
    carWidth = 15;
    carPos = 0;
    wheelRadius = 5;
    changeAllDependents();
    p.angleMode(p.DEGREES);
  };
  p.draw = function() {
    p.background(220);
    let locX = p.mouseX - p.height / 2;
    let locY = p.mouseY - p.width / 2;

    p.ambientLight(140);
    //pointLight(2550, 2550, 2550, 0, 0, -1*frameCount)

    drawTrack(p);

    let fr = 1;
    if (p.frameRate() != 0) {
      fr = p.frameRate();
    }
    carPos += 180 * speed / (p.PI*radius*fr);

  };
};

function changeRadiusSlider(i){
  radius = Number(i);
  changeAllDependents();
  document.getElementById('radiusValue').innerHTML = radius;
}
function changeAngleSlider(i){
  angle = Number(i);
  changeAllDependents();
  document.getElementById('angleValue').innerHTML = angle;
}
function changeFrictionSlider(i){
  fcoeff = Number(i)/100;
  changeAllDependents();
  document.getElementById('frictionValue').innerHTML = fcoeff;
}
function changeSpeedSlider(i){
  speed = Number(i);
  changeAllDependents();
  document.getElementById('speedValue').innerHTML = speed;
}
function changeGravitySlider(i){
  gravity = Number(i)/10;
  changeAllDependents();
  document.getElementById('gravityValue').innerHTML = gravity;
}
function changeMassSlider(i){
  mass = Number(i);
  changeAllDependents();
  document.getElementById('massValue').innerHTML = mass;
}

function changeAllDependents(){
  ra = radians(angle);
  F_G = mass * gravity;
  F_C = (mass * speed * speed)/radius;
  F_N = F_C * Math.sin(ra) + F_G * Math.cos(ra);
  //(F_G * Math.cos(ra)/Math.sin(ra) + F_C)/(Math.sin(ra)+Math.cos(ra)*Math.cos(ra)/Math.sin(ra));
  F_fs = F_G * Math.sin(ra) - F_C * Math.cos(ra);
  gf = F_N / F_G;
  pf = F_fs / (fcoeff * F_N);
  document.getElementById('gforce').innerHTML = gf;
  document.getElementById('pfriction').innerHTML = pf;

}
function radians(a){
  return a * Math.PI/180;
}

var myp5 = new p5(t, "track");


function drawTrack(p = p5.instance) {
  //radius += 0.5;
  p.push(); // camera
    //p.translate(-200,-100,0);
    p.rotateZ(0*p.frameCount*0.5);
    p.rotateX(-50);
    p.rotateY(0);
    p.translate(0,-50,0);

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
      p.fill(255);
      p.rotateX(90);
      p.plane(2000);
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
  p.stroke(0);
  p.strokeWeight(3);
  p.triangle(100-w/2,100-h/2,100-w/2,100+h/2,100+w/2,100+h/2);

  //fbd
  p.push();
    p.translate(100-w/2,100-h/2);
    p.rotate(angle);
    p.translate(hyp/2,0);

    //cart
    if (cartSwitch.checked == true) {
      p.fill(255,0,0);
      p.rect(-carLength/2,-carHeight-wheelRadius,carLength,carHeight);
      p.ellipseMode(p.CENTER);
      p.fill(200);
      p.circle(-carLength/2+wheelRadius+2,-wheelRadius,wheelRadius*2);
      p.circle(carLength/2-wheelRadius-2,-wheelRadius,wheelRadius*2);
    }


    let values = [F_G,F_N,F_fs,F_C];
    values = clamp(p,values,90);
    // arrows
    // positive x is down the slope, positive y is into the slope
    drawArrow(p,p.createVector(0,0),p.createVector(0,-values[1]),'purple',1,3); //normal force
    //label
    p.rotate(-angle);
    p.fill('white');
    p.stroke('purple');
    p.textSize(16);
    p.text('Fn', 10, -10);
    p.rotate(angle);

    drawArrow(p,p.createVector(0,0),p.createVector(-values[2],0),'orange',1,3); //frictional force
    //label
    p.rotate(-angle);
    p.fill('white');
    p.stroke('orange');
    p.textSize(16);
    p.text('Ffs', -50, -10);
    p.rotate(angle);

    p.rotate(-angle);
    drawArrow(p,p.createVector(0,0),p.createVector(0,values[0]),'green',1,3); //gravitational force
    //label
    p.fill('white');
    p.stroke('green');
    p.textSize(16);
    p.text('Fg', 10, 30);

    drawArrow(p,p.createVector(0,0),p.createVector(values[3],0),'red',1,3); // centripetal force


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

function clamp(p = p5.instance, floatList, toClamp){
  let max = 0;
  for (let i = 0; i < floatList.length; i++){
    if (p.abs(floatList[i]) > max){
      max = p.abs(floatList[i]);
    }
  }
  let ret = [];
  let ratio = toClamp/max;
  for (let i = 0; i < floatList.length; i++){
    ret[i] = floatList[i] * ratio;
  }
  return ret;
}
