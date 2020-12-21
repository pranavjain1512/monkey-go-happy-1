
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score;
var ground;
var PLAY = 1;
var END = 0;
var play=-1;
var gameState = play;
var restart;
var survivalTime=0;

function preload(){
  
  
  monkey_running =                        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
   
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600,600);
  
  monkey=createSprite(100,500,10,10);
  
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.2;

  ground=createSprite(1,560,600,10);
  ground.velocityX=-3;
  ground.x = ground.width/2;
 
  FoodGroup=new Group();
  obstaclesGroup=new Group();
  
  score=0;
  
}


function draw() {
  
background("cyan");
  console.log(survivalTime);
  ground.shapeColor="sienna";
  
  stroke("red");
  textSize(20);
  fill("red");
  text("Bananas: "+ score,490,30);
  
 
  
  
  monkey.setCollider("rectangle",0,0,400,600);
  monkey.collide(ground);
  
     if(ground.x<290){
       ground.x=ground.width/2;
     }
  
  if(gameState===play){
    stroke("green")
    textSize(20);
    fill("green");
    text("Press Space Bar To Jump",190,200);
    if(keyDown("space")){
      gameState=PLAY;
    }
    
  }
  
   if(gameState === PLAY){
         
     stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate());
    text("Survival Time :"+survivalTime,30,30);
     
     if(keyDown("space") && monkey.y>493){
       monkey.velocityY=-30;
     }
     monkey.velocityY = monkey.velocityY + 2;
     
     if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    FoodGroup.destroyEach();
       gameState=END;
   
  }
  if(FoodGroup.isTouching(monkey)){
    score=score+1;
    FoodGroup.destroyEach();
  }
     food();
     obstacles();
   }
   else if (gameState === END) {
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     ground.velocityX=0;
     
     stroke("red");
     textSize(20);
     text("GameOver!",250,300);
     
     stroke("red"); 
     textSize(20);
     text("Click Here To Restart",215,322);
        
     restart=createSprite(310,300,189,50);
     restart.visible=false;
            
     if(mousePressedOver(restart)){
       gameState=PLAY; 
       obstaclesGroup.destroyEach();
       FoodGroup.destroyEach();
       score=0;
     }
        
   }
  
   
   drawSprites();
 
  
  
}
function obstacles(){   
  if(frameCount%300===0){
  obstacle=createSprite(600,525,10,10);
  obstacle.velocityX=-12;
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.2;
  obstacle.lifetime=300;
  obstaclesGroup.add(obstacle);
  }
}

function food(){ 
  if(frameCount%80===0){
    banana=createSprite(600,135,10,10);
    banana.addImage(bananaImage);
    banana.velocityX=-8;
    banana.y = random(205,280);    
    banana.scale=0.1;
    banana.lifetime=300;
    FoodGroup.add(banana);
  }
  
}




