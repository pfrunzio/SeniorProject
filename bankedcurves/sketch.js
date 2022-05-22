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
var palms;
var pillars;
var rolling;
var slipping;
var slippedAmt;
var F_fs_real;

class Cactus{
  x;
  z;
  height;
  rot;
  constructor(x,z,height,rot){
    this.x = x;
    this.z = z;
    this.height = height;
    this.rot = rot;
  }
}
class Palm{
  x;
  z;
  size;
  angleList;
  fronds;
  rot;
  constructor(x,z,size,h,fronds,rot,p = p5.instance){
    this.x = x;
    this.z = z;
    this.size = size;
    this.fronds = fronds;
    this.rot = rot;
    this.angleList = [];
    let angle = 0;
    for (let i = 0; i < h; i++){
      this.angleList.push(p.random(-10,10) + angle);
      angle += p.random(-10,10);
      console.log("1");
    }

  }
}
class Pillar{
  x;
  z;
  size;
  height;
  rot;
  constructor(x,z,size,height,rot){
    this.x = x;
    this.z = z;
    this.size = size;
    this.height = height;
    this.rot = rot;
  }
}

var t = function(p) {
  p.setup = function() {
    // setup HTML elements
    let top = document.getElementById("top");
    let bottom = document.getElementById("bottom");
    let y = bottom.offsetTop - top.offsetHeight - 16;
    console.log(top.offsetHeight, bottom.offsetTop, y);
    p.createCanvas((y*6/5), y, p.WEBGL);
    trackResolution = 1;
    angle = 45;
    fcoeff = 0.2;
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
    rolling = false;
    slipping = 0;
    slippedAmt = 0;
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
    cactusTexture = p.loadImage(
      'https://thumbs.dreamstime.com/b/seamless-pattern-cactus-texture-cactus-spots-green-background-seamless-pattern-cactus-texture-119128236.jpg'
    );
    palmBarkTexture = p.loadImage(
      'https://thumbs.dreamstime.com/b/texture-bark-trunk-palm-tree-close-up-128090890.jpg'
    );
    palmFrondTexture = p.loadImage(
      'https://media.istockphoto.com/photos/banana-leaf-abstract-picture-id481560298?k=20&m=481560298&s=612x612&w=0&h=DypGgEgjBN4DdqoUzRVWss2yr0VmRyoNlagFTuCnHVM='
    );
    pillarTexture = p.loadImage(
      'http://www.textures4photoshop.com/tex/thumbs/dark-rock-wall-seamless-texture-free-105.jpg'
    );

    cameraMode = 0;
    environmentMode = 2;
    p.frustum(-5,5,4,-4,10,5000);

    cacti = [];
    for (let i = 0; i < 50; i++){
      cacti.push(new Cactus(p.random(-800,800),p.random(-800,800),p.random(10,30),p.random(0,360)));
    }
    palms = [];
    for (let i = 0; i < 20; i++){
      palms.push(new Palm(p.random(-800,800),p.random(-800,800),p.random(5,10),p.random(6,8),p.random(5,8),p.random(0,360),p));
    }
    pillars = [];
    for (let i = 0; i < 30; i++){
      pillars.push(new Pillar(p.random(-800,800),p.random(-800,800),p.random(8,14),p.random(2,8),p.random(0,360)));
    }

    loaded();
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
    if (rolling){
      carPos += 180 * speed / (p.PI*radius*fr);
      if (pf > 1){
        slipping = -pf + 1;
      }
      else if (pf < -1){
        slipping = -pf - 1;
      }
      if (slipping > 1){
        slipping = 1;
      }
      else if (slipping < -1){
        slipping = -1;
      }
      slippedAmt += slipping;
      if (Math.abs(slippedAmt) > trackAbove/2){
        stopPlay();
      }
    }

  };
};

function loaded(){
  document.getElementById('loaderWrapper').classList.add("loaderFade");
  console.log("A");
}
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
function togglePlay(){
  rolling = !rolling;
}
function stopPlay(){
  rolling = false;
  document.getElementById('play').checked = false;
  slippedAmt = 0;
  slipping = 0;
}
function changeAllDependents(){
  ra = radians(angle);
  F_G = mass * gravity;
  F_C = (mass * speed * speed)/radius;
  F_N = F_C * Math.sin(ra) + F_G * Math.cos(ra);
  //(F_G * Math.cos(ra)/Math.sin(ra) + F_C)/(Math.sin(ra)+Math.cos(ra)*Math.cos(ra)/Math.sin(ra));
  F_fs = F_G * Math.sin(ra) - F_C * Math.cos(ra);
  F_fs_real = F_fs;
  if (F_fs_real > fcoeff * F_N){
    F_fs_real = fcoeff * F_N;
  }
  else if (F_fs_real < -fcoeff * F_N){
    F_fs_real = -fcoeff * F_N;
  }
  gf = F_N / F_G;
  pf = F_fs / (fcoeff * F_N);
  document.getElementById('gforce').innerHTML = gf.toFixed(3);
  document.getElementById('pfriction').innerHTML = Math.abs((pf*100).toFixed(1))+"%";

  //display force values
  document.getElementById('F_fs').innerHTML = F_fs.toFixed(3);
  document.getElementById('F_N').innerHTML = F_N.toFixed(3);
  document.getElementById('F_g').innerHTML = F_G.toFixed(3);
  document.getElementById('F_c').innerHTML = F_C.toFixed(3);

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
  if (b == "sand"){
    environmentMode = 1;
  }
  if (b == "grass"){
    environmentMode = 2;
  }
  if (b == "dirt") {
    environmentMode = 3;
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
      p.translate(0,0,-800);
      p.plane(1500);
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

    if (environmentMode == 3){
      for (let i = 0; i < cacti.length; i++){
        p.push();
          p.translate(cacti[i].x,0,cacti[i].z);
          if (objectDrawn(p,10,p.sqrt(cacti[i].x*cacti[i].x+cacti[i].z*cacti[i].z),(bigradius-effectiveRadius),effectiveRadius)){
            drawCactus(p,cacti[i].height,2,-2,cacti[i].rot);
          }
        p.pop();
      }
    }
    else if (environmentMode == 1){
      for (let i = 0; i < palms.length; i++){
        p.push();
          p.translate(palms[i].x,0,palms[i].z);
          if (objectDrawn(p,10,p.sqrt(palms[i].x*palms[i].x+palms[i].z*palms[i].z),(bigradius-effectiveRadius),effectiveRadius)){
            drawPalm(p,palms[i].size,palms[i].angleList,palms[i].rot,palms[i].fronds);
          }
        p.pop();
      }
    }
    else if (environmentMode == 6){
      for (let i = 0; i < pillars.length; i++){
        p.push();
          p.translate(pillars[i].x,0,pillars[i].z);
          if (objectDrawn(p,30,p.sqrt(pillars[i].x*pillars[i].x+pillars[i].z*pillars[i].z),(bigradius-effectiveRadius),effectiveRadius)){
            drawPillar(p,pillars[i].height,pillars[i].size,pillars[i].rot);
          }
        p.pop();
      }
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
        p.translate(slippedAmt,0,0);
        p.rotateY(slippedAmt*(-1));
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
    p.texture(cactusTexture);
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
function drawPalm(p = p5.instance, size, angleList, angle, leaves){
  p.push();
    // trunk
    p.rotateY(angle);
    p.texture(palmBarkTexture);
    let topX = 0;
    for (let i = 0; i < angleList.length; i++){
      p.push();
        p.translate(topX,-i*size,0);
        p.rotateZ(angleList[i]);
        p.translate(0,-size/2,0);
        topX += p.sin(angleList[i])*(size*1.2);
        p.cylinder(size*0.4,size*1.2);
      p.pop();
    }
    // fronds
    p.texture(palmFrondTexture);
    p.push();
      p.translate(topX,-size*angleList.length,0);
      p.rotateX(90);
      p.rotateY(angleList[angleList.length-1]);
      for (let i = 0; i < leaves; i++){
        console.log(i);
        p.push();
          p.rotateZ(i/leaves * 360);
          p.translate(size * 0.34,0,size*.2);
          p.rotateY(-30);
          p.plane(size*0.8);
          p.rotateY(30);
          p.translate(size*0.6,0,size*.17);
          p.plane(size*0.7);
          p.rotateY(30);
          p.translate(size*0.52,0,size*.13);
          p.plane(size*0.6);
          p.rotateY(30);
          p.translate(size*0.44,0,size*.1);
          p.plane(size*0.5);
        p.pop();
      }
    p.pop();
  p.pop();
}
function drawPillar(p = p5.instance, height, size, rot){
  p.texture(pillarTexture);
  p.push();
    p.rotateY(rot);
    p.translate(0,-size/4,0);
    p.box(size*2.5,size/2,size*2.5);
    p.translate(0,size*1.6,0);
    for (let i = 0; i < height; i++){
      p.translate(0,-size*1.5,0);
      p.cylinder(size*0.8,size);
      p.translate(0,-size*1.6,0);
      p.cylinder(size,size*3);
    }
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
      p.strokeWeight(1);
      p.rect(-carLength/2,-carHeight*2-wheelRadius,carLength,carHeight*2);
      p.rect(-carLength)
      p.ellipseMode(p.CENTER);
      p.fill(200);
      p.circle(-carLength/2+wheelRadius+2,-wheelRadius,wheelRadius*2);
      p.circle(carLength/2-wheelRadius-2,-wheelRadius,wheelRadius*2);
    }
    p.strokeWeight(3);


    let F_Netx = F_N * p.sin(angle) - F_fs_real * p.cos(angle);
    let F_Nety = F_N * p.cos(angle) + F_fs_real * p.sin(angle) - F_G;
    let F_Net = p.sqrt(F_Netx * F_Netx + F_Nety * F_Nety);
    let F_Net_angle = p.atan(F_Nety / F_Netx);

    let values = [F_G,F_N,F_fs_real,F_Net];
    values = clamp(p,values,90);
    // arrows
    // positive x is down the slope, positive y is into the slope
    drawArrow(p,p.createVector(0,0),p.createVector(0,-values[1]),'purple',1,3); //normal force
    //label
    p.rotate(-angle);
    p.fill('white');
    p.stroke('purple');
    p.textSize(16);
    p.text('F', 125, -55);
    p.textSize(10);
    p.text('N', 135, -50);
    p.rotate(angle);

    drawArrow(p,p.createVector(0,0),p.createVector(-values[2],0),'orange',1,3); //frictional force
    //label
    p.rotate(-angle);
    p.fill('white');
    p.stroke('orange');
    p.textSize(16);
    p.text('F', 125, -80);
    p.textSize(10);
    p.text('fs', 135, -75);
    p.rotate(angle);

    p.rotate(-angle);
    drawArrow(p,p.createVector(0,0),p.createVector(0,values[0]),'green',1,3); //gravitational force
    //label
    p.fill('white');
    p.stroke('green');
    p.textSize(16);
    p.text('F', 125, -30);
    p.textSize(10);
    p.text('G', 135, -25);

    if (FcSwitch.checked == true) {
      p.rotate(-F_Net_angle);
      drawArrow(p,p.createVector(0,0),p.createVector(values[3],0),'red',1,3); // centripetal force
      //label
      p.rotate(F_Net_angle);
      p.fill('white');
      p.stroke('red');
      p.textSize(16);
      p.text('F', 115, -5);
      p.textSize(10);
      p.text('Net', 125, 0);

    }

  p.pop();

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
