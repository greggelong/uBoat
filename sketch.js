let boat
let permissionGranted = false;
let x, y,z, xx, zz
let bsz
let yarr = []
let xarr =[]
let zarr =[]
let sz
let sky


function preload(){
  boat = loadImage("oboats.png")
  sky = loadImage("sky.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  angleMode(DEGREES)
  bsz = windowWidth/2
  boat.resize(bsz,0)
  sky.resize(windowHeight,0)
  x=0
  sz =width/200
  imageMode(CENTER)
  // added code for os phones
  if(typeof(DeviceOrientationEvent) !== 'undefined' && typeof (DeviceOrientationEvent.requestPermission) === 'function'){
    // ios 13 device
    DeviceOrientationEvent.requestPermission()
    .catch(() => {
      // show permissionn dialog only the first time
      let button = createButton("click to allow access to sensors");
      button.style("font-size", "24px");
      button.center();
      button.mousePressed(requestAccess);
      throw error;
    })
    .then(()=>{
     // on any subsequent visit
     permissionGranted = true;
    })
  } else{
    // non ios devise
    // grant access anyway
    console.log("went through the permessions checkcheck")
    permissionGranted = true;
  }
}

function requestAccess(){
  DeviceOrientationEvent.requestPermission()
    .then(response =>{
      if (response == 'granted'){
        permissionGranted = true;
      } else{
        permissionGranted = false;
      }
    })
    .catch(console.error)
    // remove the button
    this.remove()
}

function draw() {
  background(150,150,255);
  // y sky
  fill(0,0,130)
  push()
  translate(width/2,height/2)
  rotate((frameCount/5)%360)
  image(sky,0,0)
  pop()

  
  xx =accelerationX*10
  zz =accelerationZ*10
  y = accelerationY*10;
  yarr.unshift(y)
  zarr.unshift(zz)
  xarr.unshift(xx)
  if (yarr.length>200){
    yarr.pop()
    
  }
  stroke(255,255,0)
  strokeWeight(5)
  noFill();
// y line
  beginShape()
  for (let i =0; i<yarr.length; i++){
    //ellipse(i*sz,height/4+yarr[i],30,30 )
    vertex(i*sz,height/4+yarr[i])
  }
  endShape()
  // xline
  stroke(0,0,255)
  beginShape()

  for (let i =0; i<xarr.length; i++){

    //ellipse(i*sz,height/4+yarr[i],30,30 )

    vertex(i*sz,height/2+xarr[i])

  }

  endShape()
  // z line
  beginShape()
  stroke(0)
  for (let i =0; i<zarr.length; i++){
    //ellipse(i*sz,height/4+yarr[i],30,30 )
    vertex(i*sz,height/1.2+zarr[i])
  }
  endShape()


  
  
  
  push();
  translate(width/2,height/2)
  x=accelerationX*4;
    z = accelerationZ*0.05;

  scale(1+z)
  rotate(x)
  image(boat,0,0);
  pop()
  
  
  
}