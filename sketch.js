var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkeyAnimation, obstacleImage, bananaImage,monkeyImage;
var monkey, obstacle, banana, ground;
var bananaGroup, obstacleGroup;
var score, survivaltime;
var survivaltime = 0;
var score = 0;
function preload(){
  
//create animation for monkey
monkeyAnimation = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");  
monkeyImage = loadImage("sprite_0.png");

//create image for obstacle
obstacleImage = loadImage("obstacle.png");
 
//create image for banana
bananaImage = loadImage("banana.png");
}

function setup() {
//creating the size of the canvas
createCanvas(600,200)  

//creating monkey and ground
monkey = createSprite(150,180,20,20);
monkey.addAnimation("monkey_jumping",monkeyAnimation);
monkey.addImage("monkey_collided",monkeyImage)
monkey.scale = 0.09;

ground = createSprite(200,190,1200,10);
ground.x = ground.width/2;
ground.shapecolour = ("brown");

//creating the groups
bananaGroup = createGroup();
obstacleGroup = createGroup();
  
}


function draw() {
background("white");

//displaying the score and the survivaltime
  text("Score:"+score,500,40);
  text("Survival time:"+survivaltime,500,20);
  
  
//making different functions in the play and end mode
if(gameState === PLAY){
  
//making the ground move
  ground.velocityX = -(4+3* score/15);
//calculating the score
 if(bananaGroup.isTouching(monkey)){
   score = score+2;
   bananaGroup.destroyEach();
 }
   //scoring
 survivaltime = survivaltime + Math.round(getFrameRate()/60);
  
 //making the monkey jump when space key is pressed
if(keyDown("space")){
  monkey.velocityY = -12; 
}
//adding the gravity to the monkey
monkey.velocityY = monkey.velocityY + 0.8;
//making the game infinite
if (ground.x < 0){
  ground.x = ground.width/2;
}
 
//making the game end when the monkey touching the obstacle
if(obstacleGroup.isTouching(monkey)){
  gameState = END;
}
//spawn the obstacle
Obstacle();
  
//spawn the food
food();
}else if(gameState === END){

//making the ground stop when the game is in end mode
ground.velocityX = 0;

//making the monkey freezed in end mode
  monkey.changeAnimation("monkey_collided",monkeyImage);
  
//destroying the food and the obstacles in end mode
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
}
  
//making the monkey collide the ground
monkey.collide(ground);

  
  
drawSprites(); 
}

function food(){
if (frameCount % 80 === 0){
banana = createSprite(300,Math.round(random(10,50)),20,20);
banana.addAnimation("bana",bananaImage); 
banana.velocityX = -(4+3* score/15);
banana.lifetime = -150
banana.scale = 0.06;
bananaGroup.add(banana);
  
}  
}

function Obstacle(){
if(frameCount % 300 === 0){
obstacle = createSprite(450,180,20,20);
obstacle.addAnimation("obs",obstacleImage);
obstacle.velocityX = -(4+3* score/15);
obstacle.lifetime = -150;
obstacle.scale = 0.1;
obstacleGroup.add(obstacle);
}  
}


