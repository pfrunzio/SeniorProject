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
var nightTexture;
var environmentMode; // 0 = dirt, 1 = sand, 2 = moon, 3 = hell, 4 = urban
var cameraMode; // 0 = overhead, 1 = behind car parallel to track, 2 = behind car parallel to ground
var cacti;

class Cactus{
  x;
  z;
  height;
  constructor(x,z,height){
    this.x = x;
    this.z = z;
    this.height = height;
  }
}

var t = function(p) {
  p.setup = function() {
    // setup HTML elements

    p.createCanvas(600, 500, p.WEBGL);
    trackResolution = 1;
    angle = 45;
    fcoeff = 0.02;
    speed = 10;
    mass = 100;
    gravity = 9.81;
    radius = 15;
    trackAbove = 40;
    carHeight = 5;
    carLength = 30;
    carWidth = 15;
    carPos = 0;
    wheelRadius = 3;
    changeAllDependents();
    p.angleMode(p.DEGREES);

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
    nightTexture = p.loadImage(
      'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'
    );
    dayTexture = p.loadImage(
      'https://media.istockphoto.com/photos/blue-sky-with-close-up-white-fluffy-tiny-clouds-background-and-picture-id1148851197?b=1&k=20&m=1148851197&s=170667a&w=0&h=IcfH92jxtpjVkQbatmPpa4PHHbcnX0XcsQckRXKN_OU='
    );
    moltenTexture = p.loadImage(
      'https://media.istockphoto.com/photos/seamless-magma-or-lava-texture-melting-flow-red-hot-molten-lava-flow-picture-id1208163567?k=20&m=1208163567&s=170667a&w=0&h=fRona60YIQ-IutCvS47bMQTVsFaxYbO4striJbXsvUY='
    );
    hellTexture = p.loadImage(
      'https://thumbs.dreamstime.com/b/seamless-pattern-beautiful-flame-background-seamless-texture-fire-hell-background-148158207.jpg'
    );
    desertTexture = p.loadImage(
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/983d5aea-ba23-4e43-a697-d32a53deac25/ddty47l-04078173-88d4-49fc-8c02-eb0bbf18ce4f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk4M2Q1YWVhLWJhMjMtNGU0My1hNjk3LWQzMmE1M2RlYWMyNVwvZGR0eTQ3bC0wNDA3ODE3My04OGQ0LTQ5ZmMtOGMwMi1lYjBiYmYxOGNlNGYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.d8IksyWLJuibXcwh9yoERlsYLWr9QF8cPyuJHrABuwM'
    );
    carTexture = p.loadImage(
      'https://media.istockphoto.com/photos/grunge-red-background-picture-id1131429835?b=1&k=20&m=1131429835&s=170667a&w=0&h=uWJekGgrp4tutizcH3-DB1f0YJGHzI-8Np7Gig07WjA='
    );


    cameraMode = 0;
    environmentMode = 3;
    p.frustum(-5,5,4,-4,10,5000);

    cacti = [];
    for (let i = 0; i < 10; i++){
      cacti.push(new Cactus(p.random(-200,200),p.random(-200,200),p.random(10,30)));
    }
  };
  p.draw = function() {
    p.background(220);
    let locX = p.mouseX - p.height / 2;
    let locY = p.mouseY - p.width / 2;

    if (environmentMode == 0){
      p.ambientLight(120,120,140);
    }
    else if (environmentMode == 1 || environmentMode == 2){
      p.ambientLight(200,200,190);
    }
    else if (environmentMode == 6){
      p.ambientLight(200,120,120);
    }
    else if (environmentMode == 3){
      p.ambientLight(180,160,150);
    }
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
  document.getElementById('radiusSlider').value = radius;
  document.getElementById('radiusNum').value = radius;
}

function changeAngleSlider(i){
  angle = Number(i);
  changeAllDependents();
  document.getElementById('angleSlider').value = angle;
  document.getElementById('angleNum').value = angle;
}
function changeFrictionSlider(i){
  fcoeff = Number(i);
  changeAllDependents();
  document.getElementById('frictionSlider').value = fcoeff;
  document.getElementById('frictionNum').value = fcoeff;
}
function changeSpeedSlider(i){
  speed = Number(i);
  changeAllDependents();
  document.getElementById('speedSlider').value = speed;
  document.getElementById('speedNum').value = speed;
}
function changeGravitySlider(i){
  gravity = Number(i);
  changeAllDependents();
  document.getElementById('gravitySlider').value = gravity;
  document.getElementById('gravityNum').value = gravity;
}
function changeMassSlider(i){
  mass = Number(i);
  changeAllDependents();
  document.getElementById('massSlider').value = mass;
  document.getElementById('massNum').value = mass;
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
  document.getElementById('gforce').innerHTML = gf.toFixed(3);
  document.getElementById('pfriction').innerHTML = pf.toFixed(3);

  if (radius == 66 && angle == 66 && fcoeff == 0.66 && speed == 66 && gravity == 66.6 && mass == 666){
    environmentMode = 6;
  }
}
function radians(a){
  return a * Math.PI/180;
}

function changePOV(pov){
  if (pov == "abovePOV") {
    cameraMode = 0;
  }
  if (pov == "behindPOV"){
    cameraMode = 1;
  }
  if (pov == "behindPOV2"){
    cameraMode = 2;
  }
}

function changeBackground(b){
  if (b == "dirt") {
    environmentMode = 3;

  }
  if (b == "sand"){
    environmentMode = 1;
  }
  if (b == "moon"){
    environmentMode = 2;
  }
  if (b == "urban"){
    environmentMode = 4;
  }
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
    if (cameraMode == 0){
      p.camera(0,-200 * radius/12 - 100,-150 * radius/12 - 75,0,radius*3,0,0,1,0);
      //skybox(p,0,-200,-150,0,0,0,0,1,0);
    }
    else if (cameraMode == 1 || cameraMode == 2){
      /*p.camera(
        p.cos(camPos%360)*(effectiveRadius-20),-trackAbove*p.sin(angle)/2,-p.sin(camPos%360)*(effectiveRadius-20),
        p.cos((carPos)%360)*(effectiveRadius-30),-trackAbove*p.sin(angle)/2,-p.sin((carPos)%360)*(effectiveRadius-30),
        p.sin(angle)*p.cos(camPos%360)*10,p.cos(angle)*10,-p.sin(angle)*p.sin(camPos%360)*10
      );*/
      p.noStroke();
      p.fill(0);
      if (environmentMode == 0){
        p.texture(nightTexture);
      }
      else if (environmentMode == 1 || environmentMode == 2){
        p.texture(dayTexture);
      }
      else if (environmentMode == 6){
        p.texture(hellTexture);
      }
      else if (environmentMode == 3){
        p.texture(dayTexture);
      }
      p.push();
      p.translate(0,0,-500);
      p.plane(1000);
      p.pop();

      let behind = 80;
      let above1 = 35;
      let above2 = 20;

      let carx = p.cos(carPos%360)*effectiveRadius;
      let cary = -trackAbove*p.sin(angle)/2;
      let carz = -p.sin(carPos%360)*effectiveRadius;

      let forwardx = -p.sin(carPos%360);
      let forwardy = 0;
      let forwardz = -p.cos(carPos%360);

      let awayx = -p.cos(carPos%360) * p.sin(angle);
      let awayy = -p.cos(angle);
      let awayz = p.sin(carPos%360) * p.sin(angle);

      let finalx = carx - forwardx * behind + awayx * above1;
      let finaly = cary - forwardy * behind + awayy * above1;
      let finalz = carz - forwardz * behind + awayz * above1;

      let headingx = carx + awayx * above2;
      let headingy = cary + awayy * above2;
      let headingz = carz + awayz * above2;

      if (cameraMode == 2){
        awayx = 0;
        awayy = -1;
        awayz = 0;
      }
      p.camera(finalx,finaly,finalz,headingx,headingy,headingz,-awayx,-awayy,-awayz);
    }

    //p.ambientLight(255,255,255);
    p.directionalLight(160,160,160,0,-1,0);


    /*p.fill(255,0,0);
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
    */

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
      p.translate(-1600,0,1600);
      if (environmentMode == 0){
        p.texture(grassTexture);
      }
      else if (environmentMode == 1){
        p.texture(sandTexture);
      }
      else if (environmentMode == 2){
        p.texture(grassTexture);
      }
      else if (environmentMode == 6){
        p.texture(moltenTexture);
      }
      else if (environmentMode == 3){
        p.texture(desertTexture);
      }
      p.rotateX(90);
      for (let i = 0; i < 15; i++){
        p.translate(0,-3000,0);
        p.translate(200,0,0);
        for (let z = 0; z < 15; z++){
          p.translate(0,200,0);
          p.plane(200);
        }
      }



    p.pop();
    for (let i = 0; i < cacti.length; i++){
      p.push();
        p.translate(cacti[i].x,0,cacti[i].z);
        if (objectDrawn(p,10,p.sqrt(cacti[i].x*cacti[i].x+cacti[i].z*cacti[i].z),(bigradius-effectiveRadius),effectiveRadius)){
          drawCactus(p,cacti[i].height,2,-2,0);
        }
      p.pop();
    }
    //drawCactus(p,20,2,-2,p.frameCount);
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
        drawCar(p,carWidth,carHeight,carLength);
        p.fill(100);
        p.strokeWeight(1);
        var rot = -(((effectiveRadius*(carPos*p.PI/180))%(2*p.PI*wheelRadius))/(2*p.PI*wheelRadius))*360;
        p.push(); // wheel 1
          p.translate(carWidth/2,carHeight/2,carLength/2-wheelRadius-2);
          p.rotateZ(90);
          p.rotateY(rot);
          p.cylinder(wheelRadius,2,8,1,true,true);
        p.pop();
        p.push(); // wheel 2
          p.translate(carWidth/2,carHeight/2,-carLength/2+wheelRadius+2);
          p.rotateZ(90);
          p.rotateY(rot);
          p.cylinder(wheelRadius,2,8,1,true,true);
        p.pop();
        p.push(); // wheel 3
          p.translate(-carWidth/2,carHeight/2,carLength/2-wheelRadius-2);
          p.rotateZ(90);
          p.rotateY(rot);
          p.cylinder(wheelRadius,2,8,1,true,true);
        p.pop();
        p.push(); // wheel 4
          p.translate(-carWidth/2,carHeight/2,-carLength/2+wheelRadius+2);
          p.rotateZ(90);
          p.rotateY(rot);
          p.cylinder(wheelRadius,2,8,1,true,true);
        p.pop();
      p.pop();

    p.pop();
  p.pop();
};
function skybox(p = p5.instance,x,y,z,hx,hy,hz,ux,uy,uz){

}
function drawCar(p = p5.instance,w,h,l){
  p.texture(carTexture);
  p.noStroke();
  p.box(w,h,l);
  p.push();
    p.translate(0,-h/6,l/3);
    p.rotateX(-10);
    p.box(w-0.5,h,l*(5/16));
  p.pop();
  p.push();
    p.translate(0,-h,l/6);
    p.rotateX(-70);
    p.box(w-1,h,l*(3/16));
  p.pop();
  p.push();
    p.translate(0,-h,l/12);
    p.box(w-0.5,h*(3/2),l/4);
  p.pop();
  p.push();
    p.translate(0,-h,0);
    p.rotateX(70);
    p.box(w-1,h,l*(3/16));
  p.pop();
  p.push();
    p.translate(0,-h/6,-l*(4/16));
    p.rotateX(10);
    p.box(w-0.2,h,l*(7/16));
  p.pop();
  p.stroke(0);
}
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
    p.text('FN', 120, -60);
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

    if (FcSwitch.checked == true) {
      drawArrow(p,p.createVector(0,0),p.createVector(values[3],0),'red',1,3); // centripetal force
    }

  p.pop();

}
var f = function(p) {
  p.setup = function() {
    p.createCanvas(600, 500, p.P2D);
    p.angleMode(p.DEGREES);
    document.getElementById("defaultCanvas2").classList.add('layered');
  };
  p.draw = function() {
    p.background(220);

    drawOverlay(p);

  };
};
var myp5 = new p5(f, 'overlay');
function drawOverlay(p = p5.instance){
  p.clear();
  p.fill(100);

  if (cameraMode == 1){
    //p.ellipse(300,350,10,10);
  }
}
function objectDrawn(p = p5.instance, radius, distance, width,fullrad){
  if (distance + radius < fullrad - width || distance - radius > fullrad + width){
    return true;
  }
  return false;
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
