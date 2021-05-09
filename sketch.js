var path,mainRacer;

var pathImg,mainRacerImg1;

var cash,cashImg,cashG;

var END =0;
var PLAY =1;
var gameState = PLAY;

var points=0;
var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png");
  mainRacerImg2 = loadAnimation("boy1.png");
  cashImg = loadImage("cash.png");

  swordImg = loadImage("omg.png");
  
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(1200,600);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainRacer  = createSprite(70,150);
mainRacer.addAnimation("SahilRunning",mainRacerImg1);
mainRacer.scale=0.77;
  
//set collider for mainCyclist

  mainRacer.setCollider("rectangle",0,0,300,400);
  mainRacer.debug = true;
  
gameOver = createSprite(300,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  


  cashG = new Group();
  swordGroup = new Group();
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  text("points: "+ points,1100,30);
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainRacer.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainRacer.collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
  createCash();
  createKnife();

  if(cashG.isTouching(mainRacer)){

  cashG.destroyEach();
  points = points + 3;

  }
   
  if(swordGroup.isTouching(mainRacer)){

    swordGroup.destroyEach();
    gameState = END;

    
  }

}else if (gameState === END) {
    gameOver.visible = true;
    //Add code to show restart game instrution in text here
  
  textSize(20);
  fill(255);
  text("Press Up Arrow Key To Restart",150,190);
  
    path.velocityX = 0
    //mainRacer.velocityY = 0;
    mainRacer.addAnimation("SahilRunning",mainRacerImg2);
  
    
  if (keyDown ("UP_ARROW")){
    
    reset();
    
  }
}
}


//create reset function here
 function reset(){
   
   gameState = PLAY;
   
   gameOver.visible = false;
   
   mainRacer.addAnimation("SahilRunning",mainRacerImg1);
   
 
   distance = 0;
   points = 0;
   
 }

 function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(width-50,Math.round(random(50, height-50), 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.5;
  cash.velocityX = -(7 + 2*distance/200);
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createKnife(){
  if (World.frameCount % 530 == 0) {
    var sword = createSprite(width-50,Math.round(random(50, height-50), 10, 10));
    sword.addImage(swordImg);
    sword.scale=0.2;
    sword.velocityX = -(7 + 2*distance/530);
    sword.lifetime = 200;
    swordGroup.add(sword);
    }


  
}






