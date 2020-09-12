var player;
var track,car1 , car2 , car3,playerImg;
var canvas;
var background2;
var edge1 , edge2;
var car;
var cars;
var cars1 , cars2 , cars3;
var carsGroup , carGroup;
var lives = 4;
var gameState = "PLAY";
var button;
var buttonImg;
var score = 0;

function preload(){
  track = loadImage("../images/track.jpg");
  car1 = loadImage("../images/car1.png");
  car2 = loadImage("../images/car2.png");
  car3 = loadImage("../images/car3.png");
  playerImg = loadImage("../images/car4.png");
  ground = loadImage("../images/ground.png");
  cars1 = loadImage("../images/cars1.png");
  cars2 = loadImage("../images/cars2.png");
  cars3 = loadImage("../images/cars3.png");
  buttonImg = loadImage("../images/button.png");
}

function setup() {
  canvas = createCanvas( 770, 800);

  background2 = createSprite(400,400,2000,1500);
  background2.addImage(track);
  background2.velocityY = 14.5;

  edge1 = createSprite(135,400,20,1500);
  edge1.visible = false;

  edge2 = createSprite(675,400,20,1500);
  edge2.visible = false;

  player = createSprite(200, 685,20,20);
  player.addImage(playerImg);
  carGroup = createGroup();
  carsGroup = createGroup();

  button = createSprite(400,400,40,40);
  
  button.addImage(buttonImg);
  button.visible = false;
}

function draw() {
  background("black");
  
 if(gameState === "PLAY"){ 
  background2.velocityY = 14.5;
  
player.collide(carGroup);
player.collide(edge1);
player.collide(edge2);
spawnCars();
spawnCars2();

if(keyDown(LEFT_ARROW)){
    changePosition(-10);
}
else if(keyDown(RIGHT_ARROW)){
    changePosition(10);
}

if(background2.y>=1500){
  background2.y = 400;
}

if(carGroup.isTouching(player)){
  carGroup.setVelocityYEach(0);
  carsGroup.setVelocityYEach(0);
  background2.velocityY = 0;
  carGroup.setLifetimeEach(-1);
  carsGroup.setLifetimeEach(-1);
  gameState = "END";
}
if(carsGroup.isTouching(player)){
  carsGroup.setVelocityYEach(0);
  carGroup.setVelocityYEach(0);
  background2.velocityY = 0;
  carsGroup.setLifetimeEach(-1);
  carGroup.setLifetimeEach(-1);
  gameState = "END";
}
if(player.y>685){
  player.y = 685;
  gamestate ="END";
}
 }
 
 if(gameState === "END"){
  
  carsGroup.setVelocityYEach(0);
  button.visible = true;
  carGroup.setVelocityYEach(0);
  background2.velocityY = 0;
  player.velocityY = 0;
  carsGroup.setLifetimeEach(-1);
  carGroup.setLifetimeEach(-1);
  
}
if(keyIsDown(UP_ARROW) && gameState === "END"){
  reset();
  score = score;
  

}  
//button.mousePressed(reset());

  
drawSprites();
if(lives === 0){
  score = 0;
  fill("RED");
strokeWeight(6);
textSize(15);
  text("GAME OVER" , 400,400);
  player.destroy();
  carsGroup.setVelocityYEach(0);
  carGroup.setVelocityYEach(0);
  background2.velocityY = 0;
  player.velocityY = 0;
  carsGroup.setLifetimeEach(-1);
  carGroup.setLifetimeEach(-1);
}

fill("RED");
strokeWeight(6);
textSize(15);
text("Lives left:" + lives , 200 , 200);
text("Score :" + score , 400,50);

}

function changePosition(x){
  player.x = player.x + x;
}
function spawnCars(){
  if(World.frameCount%30 === 0){
    car = createSprite(random(400,650),-200,20,20);
    //car.debug = true;
    car.velocityY = random(7.5 , 10);
     car.lifetime = 135;
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: car.addImage(car1);
              break;
      case 2: car.addImage(car2);
              break;
      case 3: car.addImage(car3);
              break;
     
      default: break;
    }
     carGroup.add(car);
  }
}
function spawnCars2(){
  if(World.frameCount%15===0){
    cars = createSprite(random(140,360),-200,20,20);
    score++;
    cars.velocityY = random(17.5 , 22);
    cars.lifetime = 60;
    var rand1 = Math.round(random(1,3));
    switch(rand1) {
      case 1: cars.addImage(cars1);
              break;
      case 2: cars.addImage(cars2);
              break;
      case 3: cars.addImage(cars3);
              break;
     
      default: break;
    }
    carsGroup.add(cars);
  }
}
function reset()
{
  carGroup.destroyEach();
  carsGroup.destroyEach();
gameState = "PLAY";
button.visible = false;
lives--;
}
