var PLAY=1
var END=0
var gameState=PLAY

var lion,lionimg
var bg,bgimg
var trafficimg,traffic
var rockimg,rock,invisibleGround,gameover,gameOverimg
var sadlionimg,sadlion
var restartimg,restart
var score=0 


function preload()
{
lionimg=loadAnimation("robot.gif")
bgimg=loadImage("lab.jpg")
rockimg=loadImage("bomb.png")
gameOverimg=loadImage("game.png")
restartimg=loadImage("restart.png")
sadlionimg=loadImage("sad robot.gif")
}

function setup() {
	createCanvas(800, 400);

bg=createSprite(300,200,400,100)  
bg.addImage(bgimg)
bgimg.resize(1600,400)
bg.velocityX=-3

lion=createSprite(100,330,100,100)
lion.addAnimation("running",lionimg)
lion.addAnimation("sad",sadlionimg)
lion.scale=0.4

invisibleGround=createSprite(100,330,100,10)
invisibleGround.visible=false

gameover=createSprite(400,200,100,100)
gameover.addImage(gameOverimg)
gameover.scale=0.2
gameover.visible=false

restart=createSprite(400,300,100,100)
restart.scale=0.1
restart.addImage(restartimg)
restart.visible=false

rockGroup=new Group()
lion.setCollider("rectangle",0,0,500,400);
lion.debug = false
 score=0 
}


function draw() {
background(255)
	drawSprites();
	fill ("white")
	textSize(20)
	text("Score: "+ score, 500,50);
if(gameState===PLAY){
	score=score+Math.round((getFrameRate()/60))
	bg.velocityX= -(6+3*score/100)

    if(keyDown("SPACE")&&lion.y>=80){
        lion.velocityY=-13
	}
	if(bg.x<0){
		bg.x=width/2
 	}
	lion.velocityY+=0.5
	
	lion.collide(invisibleGround)
	rocks()
	if(lion.isTouching(rockGroup)){
		gameState=END
	}
   }
else if(gameState===END){
gameover.visible=true
restart.visible=true
bg.velocityX=0
lion.changeAnimation("sad",sadlionimg)
rockGroup.setVelocityXEach(0)
rockGroup.setLifetimeEach(-1)

if(mousePressedOver(restart)){
	reset ()
}
}

	    
 
}
function rocks(){
	if(frameCount%200===0){
		rock=createSprite(800,300)
		rock.addImage(rockimg)
		rock.scale=0.1
		rock.lifetime=350
		rock.velocityX=-(6+3*score/100)
		rockGroup.add(rock)
	}

}
function reset(){
	gameState=PLAY
	gameover.visible=false
	restart.visible=false
	rockGroup.destroyEach()
	lion.changeAnimation("running",lionimg)
	score=0
}



