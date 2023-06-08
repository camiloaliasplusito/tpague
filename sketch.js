


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png"); 
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");

  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  restartImg=loadImage("restart.png")
  gameOverImg=loadImage("gameOver.png")
  Sound=loadSound("jump.mp3")
  Sound1=loadSound("die.mp3")
  Sound2=loadSound("checkpoint.mp3")
  
   
}

function setup() {
  var message="Esto es un mensaje";
  console.log(message)
//------------------------------PRIMERO AJUSTAR LA POSICIÓN DE LOS SPRITES CON LA PANTALLA
  createCanvas(windowWidth,windowHeight);

  
//------------------------------SEGUNDO MODIFICAR EJE Y HEIGHT
  trex = createSprite(50,height-40 ,20,50);

  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided",trex_collided)
//------------------------------TERCERO MODIFICAR EL GAMEOVER
  gameOver=createSprite(width/2,height/2-50);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible=false;
//-------------------------------CUARTO MODIFICAR RESTART
  restart=createSprite(width/2,height/2)
  restart.addImage(restartImg)
  restart.scale=0.5;
  restart.visible=false;
//------------------------------QUINTO MODIFICAR EL PISO  
  ground = createSprite(width/2,height-10,width,125);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
//----------------------------SEXTO MODIFICAR EL PISO INVISIBLR 
  invisibleGround = createSprite(width/2,height-5,width,1);
  invisibleGround.visible = false  ;

  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
  
  score=0;
  // CAMBIAR COLISIONADOR
 trex.setCollider("circle",0,0,40);
 trex.debug=false
    

}

function draw() {
  

//------------------------------------------SÉPTIMO MODIFICAR LA PUNTUACIÓN

  
  if(gameState===PLAY){
    ground.velocityX = -(4+3*score/100)
    score=score+Math.round(getFrameRate()/60)
    if(score>0 && score%100===0){
      Sound2.play();
    }

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
//---------------------------------------OCTAVO IMPLEMENTAR TOUCHES
    if((touches.length>0 || keyDown("space"))&& trex.y >= height-100) {
      trex.velocityY = -10;
      Sound.play();
      touches=[];
    }
    
    trex.velocityY = trex.velocityY + 0.8
    
    spawnClouds();
    spawnObstacles(); 

if(obstaclesGroup.isTouching(trex)){
  gameState=END;
  Sound1.play();
}    
    
  }
  else if(gameState===END){

    ground.velocityX=0;
    trex.velocityY=0;
    trex.changeAnimation("collided",trex_collided);
    gameOver.visible=true;
    restart.visible=true;
  //------------------------------------------------NOVENO IMPLEMENTAR TOUCHES RESTART PARA COMPUTADOR Y CELULAR
     
    if (mousePressedOver(restart)){
      reset();
    }
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
// --------------------------------------------------DECIMO SUBIR A GITHUB

obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);

obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);
  }
 
  
  trex.collide(invisibleGround);
  //console.log(score)
  drawSprites();
  
}
function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  trex.changeAnimation("running",trex_running)
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score=0;
 

}

function spawnClouds(){
  
  if(frameCount%60===0){
    // ------------------------------------------DECIMO MODIFICAR APARECER POSICIÓN X
     cloud =createSprite(500,100,40,10);
     cloud.addImage(cloudImage)
    //---------------------------------------------ONCE MODIFICAR LA POSICIÓN EN Y
    cloud.y=Math.round(random(10,height-200))
    cloud.scale=0.9;
    cloud.velocityX=-3
    cloud.lifetime=134;
    cloud.depth=trex.depth
    trex.depth=trex.depth + 1
    cloudsGroup.add(cloud);
  }
}

  function spawnObstacles(){
    if(frameCount%60==0){
          //---------------------------------------------DOCE MODIFICAR LA POSICIÓN EN Y

      var obstacle=createSprite(width/2,height-20,width,125);
      obstacle.velocityX=-(6+score/100);
      var rand=Math.round(random(1,6))
   
  
 switch(rand){
  case 1: obstacle.addImage(obstacle1);
          break;
  case 2: obstacle.addImage(obstacle2);
          break;
  case 3: obstacle.addImage(obstacle3);
          break; 
  case 4: obstacle.addImage(obstacle4);
          break;  
  case 5: obstacle.addImage(obstacle5);
          break;   
  case 6: obstacle.addImage(obstacle6);
          break;  
  default:break;        
 }

 obstacle.scale=0.5;
 obstacle.lifetime=300;
 obstaclesGroup.add(obstacle);
    }
    
  }
 




