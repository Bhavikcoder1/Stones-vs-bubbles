const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1, pig3;
var backgroundImg, platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;
var birds = [];

function preload() {
  Day = loadImage("sprites/bg7.jpg");
  getBackgroundImg();
  Stonehit = loadSound("stone_hit.mp3");
  Bubblepop = loadSound("Popping-Sound-Effect.mp3");
  restart = loadImage("sprites/Restart.png");
 // birdSelectSound = loadSound("bird_select.mp3");
 // pigSnortSound = loadSound("pig_snort.mp3");
}

function setup() {
  var canvas = createCanvas(1200, 400);
  engine = Engine.create();
  world = engine.world;
  var button = createButton("refresh");
  button.mousePressed(()=>{
    location.reload();
  })

  //button = new Box(1100,300);

  ground = new Ground(600, height, 1200, 20);

  platform = new Ground(150, 305, 300, 170);

  box1 = new Box(700, 320, 70, 70);
  box2 = new Box(920, 320, 70, 70);
  box3 = new Box(700, 240, 70, 70);
  box4 = new Box(920, 240, 70, 70);
  box5 = new Box(810, 160, 70, 70);
  box6 = new Box(610, 300, 70, 70);
  box7 = new Box(330, 300, 70, 70);

  pig = new Pig(850, 360);
  pig1 = new Pig(500,360);
  pig2 = new Pig(810,360);
  pig3 = new Pig(810,220);
  pig4 = new Pig(810,220);
  pig5 = new Pig(850,220);
  pig6 = new Pig(550,360);
  pig7 = new Pig(450,360);
  

  log1 = new Log(810, 260, 300, PI / 2);
  log2 = new Log(450, 280, 300, PI / 2);
  log3 = new Log(810, 180, 300, PI / 2);
  log4 = new Log(760, 120, 150, PI / 7);
  log5 = new Log(870, 120, 150, -PI / 7);

  bird = new Bird(200, 50);
  bird2 = new Stone(150, 170);
  bird3 = new Bird(100, 170);
  bird4 = new Bird(50, 170);
  bird5 = new Stone(250, 170);
  

  birds.push(bird5);
  birds.push(bird4);
  birds.push(bird3);
  birds.push(bird2);
  birds.push(bird);

  //log6 = new Log(230,180,80, PI/2);
  slingshot = new SlingShot(bird.body, { x: 200, y: 50 });
}

function draw() {
  //if (backgroundImg) background(backgroundImg);
  background(Day);
 // restart.Position(1100,300);

  noStroke();
  textSize(35);
  fill("white");
  text("Score  " + score, width - 300, 50);



  Engine.update(engine);
  //strokeWeight(4);
 // button.display();

  box1.display();
  box2.display();
  box3.display();
  box4.display();
  box5.display();
  box6.display();
  box7.display();

  ground.display();

  pig.display();
  pig.score();
  pig1.display();
  pig1.score();
  pig2.display();
  pig2.score();
  pig3.display();
  pig3.score();
  pig4.display();
  pig4.score();
  pig5.display();
  pig5.score();
  pig6.display();
  pig6.score();
  pig7.display();
  pig7.score();

  log1.display();
  log2.display();
  log3.display();
  log4.display();
  log5.display();
  
  bird.display();
  bird2.display();
  bird3.display();
  bird4.display();
  bird5.display();


  platform.display();
  //log6.display();
  slingshot.display();
  //console.log(pig1.body.speed);
  if(bird||bird2||bird3||bird4){
    
  }
}

function mouseDragged() {
  if (gameState !== "launched") {
    Matter.Body.setPosition(birds[birds.length - 1].body, {
      x: mouseX,
      y: mouseY,
    });
    // Matter.Body.applyForce(
    //   birds[birds.length - 1].body,
    //   birds[birds.length - 1].body.position,
    //   { x: 5, y: -10 }
    // );
    
    // return false;
  }
}

function mouseReleased() {
  slingshot.fly();
 // birdFlySound.play();
 
  
  birds.pop();
  gameState = "launched";
  // return false;
}

function keyPressed() {
  if (keyCode === 32 && gameState === "launched") {
    if (birds.length >= 0) {
      bird.trajectory = [];
      Matter.Body.setPosition(birds[birds.length - 1].body, { x: 200, y: 50 });
      slingshot.attach(birds[birds.length - 1].body);
      gameState = "onSling";
      //birdSelectSound.play();
      Stonehit.play();
    }
  }
}

async function getBackgroundImg() {
  var response = await fetch(
    "http://worldtimeapi.org/api/timezone/Asia/Kolkata"
  );
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11, 13);

  if (hour >= 06 && hour <= 19) {
    bg = "sprites/bg.png";
  } else {
    bg = "sprites/bg2.jpg";
  }

  backgroundImg = loadImage(bg);
  console.log(backgroundImg);
}

function reloadButton(){
  if(mousePressed){
     bird.setPosition(200,50);
     bird2.setPosition(150,170);
     bird3.setPosition(100,170);
     bird4.setPosition(50,170);
     bird5.setPosition(250,170);

     pig1.setPosition(500,360);
     pig2.setPosition(810,360);
     pig3.setPosition(810,220);
  }
}

