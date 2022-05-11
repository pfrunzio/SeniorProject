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
var grassTexture;
var roadTexture;
var sandTexture;
var environmentMode; // 0 = dirt, 1 = sand, 2 = moon, 3 = hell, 4 = urban
var cameraMode; // 0 = overhead, 1 = behind car

var t = function(p) {
  p.setup = function() {
    // setup HTML elements

    p.createCanvas(600, 500, p.WEBGL);
    trackResolution = 1;
    angle = 77;
    fcoeff = 0.02;
    speed = 1;
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

    environmentMode = 0;
    // setup textures
    grassTexture = p.loadImage(
      'http://www.textures4photoshop.com/tex/thumbs/free-seamless-grass-texture-26.jpg'
    );
    roadTexture = p.loadImage(
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c2805822-5f5c-4ac4-983f-d1e57ebcbe8a/dbuyn4y-7ded5e1d-acb6-4399-aa5f-9fb6db58232a.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MyODA1ODIyLTVmNWMtNGFjNC05ODNmLWQxZTU3ZWJjYmU4YVwvZGJ1eW40eS03ZGVkNWUxZC1hY2I2LTQzOTktYWE1Zi05ZmI2ZGI1ODIzMmEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.D_agegq4Cxi1beRs5g-HNIXzPkVeEyXX3Xm_5Y94ZhY'
    );
    sandTexture = p.loadImage(
      'https://thumbs.dreamstime.com/b/k-seamless-sand-texture-surface-high-resolution-155924341.jpg'
    );

    cameraMode = 1;
    //p.frustum(50,-50,50,-50,40,900);
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
  effectiveRadius = radius * 10;
  //radius += 0.5;
  p.push(); // camera
    /*p.translate(0,-50,0);
    p.translate(0,-trackAbove*p.sin(angle)/2,0);
    p.rotateY(carPos%360);
    p.translate(effectiveRadius,0,0);
    p.rotateZ(-angle);
    p.translate(0,-carHeight/2-1-wheelRadius,0);
    */
    let camPos = carPos-4;
    if (cameraMode == 0){
      p.camera(0,-200,-150,0,0,0,0,1,0);
    }
    else if (cameraMode == 1){
      /*p.camera(
        p.cos(camPos%360)*(effectiveRadius-20),-trackAbove*p.sin(angle)/2,-p.sin(camPos%360)*(effectiveRadius-20),
        p.cos((carPos)%360)*(effectiveRadius-30),-trackAbove*p.sin(angle)/2,-p.sin((carPos)%360)*(effectiveRadius-30),
        p.sin(angle)*p.cos(camPos%360)*10,p.cos(angle)*10,-p.sin(angle)*p.sin(camPos%360)*10
      );*/
      let away = 20;
      let away2 = 5;
      p.camera(
        p.cos(camPos%360)*(effectiveRadius-10) + p.cos(camPos%360) * away,-trackAbove*p.sin(angle)/2 + p.cos(angle)/p.sin(angle) * away,-p.sin(camPos%360)*(effectiveRadius-10) -p.sin(camPos%360) * away,
        p.cos(carPos%360)*(effectiveRadius-10) + p.cos(carPos%360) * away2,-trackAbove*p.sin(angle)/2 + p.cos(angle)/p.sin(angle) * away2,-p.sin(carPos%360)*(effectiveRadius-10) -p.sin(carPos%360) * away2,
        p.cos(camPos%360),p.cos(angle)/p.sin(angle),-p.sin(camPos%360));
    }

    //p.ambientLight(255,255,255);
    p.directionalLight(160,160,160,0,-1,0);


    p.fill(255,0,0);
    p.push();
      p.translate(p.cos(camPos%360)*(effectiveRadius-10),-trackAbove*p.sin(angle)/2,-p.sin(camPos%360)*(effectiveRadius-10));
      p.sphere(1);
    p.pop();
    p.fill(0,255,0);
    p.push();
      p.translate(p.cos((carPos)%360)*(effectiveRadius-10),-trackAbove*p.sin(angle)/2-1,-p.sin((carPos)%360)*(effectiveRadius-10));
      p.box(1);
    p.pop();
    p.fill(0,0,255);
    p.push();
      p.translate(-p.sin(angle)*p.cos(camPos%360)*10,-p.cos(angle)*10,+p.sin(angle)*p.sin(camPos%360)*10);
      p.sphere(1);
    p.pop();

    //p.translate(-200,-100,0);



    p.fill(100);
    p.circle(0,0,0,0,0);

    p.noStroke();


    p.push(); // track
      p.texture(roadTexture);
      let habove = trackAbove*p.sin(angle);
      let bigradius = (trackAbove/2)*p.sin(90-angle) + effectiveRadius;
      let h = bigradius * (p.sin(angle)/p.sin(90-angle));
      p.translate(0,h/2-habove,0);
      p.cone(bigradius,h,64,16,false);
      p.fill(0);

      p.fill(20);
      p.cylinder(bigradius,h,64,16,false,false);
    p.pop();

    p.push(); // ground
      p.translate(-1100,0,1100);
      if (environmentMode == 0){
        p.texture(grassTexture);
      }
      else if (environmentMode == 1){
        p.texture(sandTexture);
      }
      p.rotateX(90);
      for (let i = 0; i < 10; i++){
        p.translate(0,-2000,0);
        p.translate(200,0,0);
        for (let z = 0; z < 10; z++){
          p.translate(0,200,0);
          p.plane(200);
        }
      }


    p.pop();
    drawCactus(p,20,2,-2,p.frameCount);
    p.push(); // car

      p.translate(0,-habove/2,0);
      p.rotateY(carPos%360);


      p.push(); // car body
        //rotateZ(angle);
        p.stroke(0);
        p.translate(effectiveRadius,0,0);
        p.rotateZ(-angle);
        p.translate(0,-carHeight/2-1-wheelRadius,0);
        //translate(radius*sin(angle),-radius*sin(90-angle),0);
        //translate(radius*sin(90-angle),radius*sin(angle),0);
        p.fill(255,0,0);
        p.strokeWeight(1);
        p.box(carWidth,carHeight,carLength);
        p.fill(200);
        p.strokeWeight(1);
        var rot = -(((effectiveRadius*(carPos*p.PI/180))%(2*p.PI*wheelRadius))/(2*p.PI*wheelRadius))*360;
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

function drawCactus(p = p5.instance, size, arm1, arm2, rotation){
  p.push();
    p.rotateY(rotation);
    p.translate(0,-size/2,0);
    p.fill(9,145,11);
    p.cylinder(size/8,size);
    p.push();
      p.translate(0,-size/2)
      p.sphere(size/8);
    p.pop();
    p.push();
      p.translate(-size/8,arm1,0);
      p.rotateZ(90);
      p.cylinder(size/12,size/4);
      p.rotateZ(-90);
      p.translate(-size/8,0,0);
      p.sphere(size/12);
      p.translate(0,-size/6,0);
      p.cylinder(size/12,size/3);
      p.translate(0,-size/6,0);
      p.sphere(size/12);
    p.pop();
    p.push();
      p.translate(size/8,arm2,0);
      p.rotateZ(90);
      p.cylinder(size/12,size/4);
      p.rotateZ(-90);
      p.translate(size/8,0,0);
      p.sphere(size/12);
      p.translate(0,-size/6,0);
      p.cylinder(size/12,size/3);
      p.translate(0,-size/6,0);
      p.sphere(size/12);
    p.pop();
  p.pop();
}
var f = function(p) {
  p.setup = function() {
    p.createCanvas(250, 200, p.P2D);
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
    p.text('Fn', 120, -60);
    p.rotate(angle);

    drawArrow(p,p.createVector(0,0),p.createVector(-values[2],0),'orange',1,3); //frictional force
    //label
    p.rotate(-angle);
    p.fill('white');
    p.stroke('orange');
    p.textSize(16);
    p.text('Ffs', 120, -80);
    p.rotate(angle);

    p.rotate(-angle);
    drawArrow(p,p.createVector(0,0),p.createVector(0,values[0]),'green',1,3); //gravitational force
    //label
    p.fill('white');
    p.stroke('green');
    p.textSize(16);
    p.text('Fg', 120, -40);

    drawArrow(p,p.createVector(0,0),p.createVector(values[3],0),'red',1,3); // centripetal force


  p.pop();

}

function drawArrow(p = p5.instance, start, end, color, width, size, name){
  p.push();
    p.stroke(color);
    p.strokeWeight(3);
    p.fill(color);
    p.translate(start.x,start.y);
    p.line(0,0,end.x,end.y);
    p.rotate(end.heading());
    p.translate(end.mag() - size, 0);
    p.triangle(0, size/2, 0, -size/2, size, 0);
    p.rotate(-angle);
    p.textSize(16);
    p.fill('white');
    p.text(name, 10, 20);
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
