//variables
var bg1, bg1Img,bg2 ,bg2Img, start, startImg,boy,boyImg,boy_running,boy_Collided;
var End = 0
var back = 1
var con = 2
var Play = 3
var serve = 4
var gameState = serve;
var Protiens = 0
var life = 3
var corona,coronaImg,coronaGroup,mask,maskGroup,maskImg,sanitizer,sanitizerGroup,sanitizerImg,floor,floorGroup,floorImage,vaccine,vaccineGroup,vaccineImg,protien,protienGroup,protienImg
var invisibleGround;
var infected,infectedImg;
var continueB,continueImg
var reset,resetImg
var InvPro
var shield,shieldImg;
var timer = 20
var timerMask = 15
var timerText = 0


// preload function
function preload(){
bg2Img = loadImage("background.jpg");
bg1Img = loadImage("Go Carona Go.png")
startImg = loadImage("button.png")
boy_running = loadAnimation("walking0.png", "walking.png", "walking3.png", "walking4.png", "walking5.png", "walking7.png", "walking8.png", "walking1.png")
coronaImg = loadImage("Carona.png")
sanitizerImg = loadImage("Sanitizer.png")
maskImg = loadImage("Mask.png")
floorImage = loadImage("floor.png")
shieldImg = loadImage("Shield.png")
vaccineImg = loadImage("vaccine.png")
protienImg = loadImage("ProtienFood.png")
boy_Collided = loadAnimation("walking.png")
resetImg = loadImage("button_reset.png")
infectedImg = loadImage("Infected.jpg")
continueImg = loadImage("button_continue.png")

}

//setup function
function setup(){
createCanvas(1000, 900)

coronaGroup = new Group();
maskGroup = new Group();
floorGroup = new Group()
sanitizerGroup = new Group();
vaccineGroup = new Group();
protienGroup = new Group();

invisibleGround = createSprite(500,860,10000000000,10)
invisibleGround.visible = false


bg2 = createSprite(750,450)
bg2.addImage(bg2Img)
bg2.scale = 3


boy = createSprite(200,700)
//boy.addAnimation("collide",boy_Collided)
boy.addAnimation("running",boy_running)
boy.addAnimation("collide",boy_Collided)
boy.scale = 0.5
//boy.debug = true
boy.setCollider("rectangle",0,0,200,680)


bg1 = createSprite(500,450)
bg1.addImage(bg1Img)
bg1.scale = 0.75



start = createSprite(width/2,height/2)
start.addImage(startImg)
start.scale = 1.5


infected = createSprite(width/2,height/2)
infected.addImage(infectedImg)
infected.scale = 4.9
//infected.visible = false

continueB = createSprite(width/2, height/2)
continueB.addImage(continueImg)

reset = createSprite(500,500)
reset.addImage(resetImg)
reset.scale = 1;
reset.visible = false

InvPro = createSprite(-100000,450,10,100000000)
InvPro.visible = false




}

//draw function
function draw(){
boy.collide(invisibleGround);



  drawSprites()
  boy.velocityX = 0
  if(gameState === serve){
    infected.visible = false
    continueB.visible = false
  //start.onMousePressed =function(){ start.visible= false; bgScreen2.velocityX = -6}
  if(mousePressedOver(start) || touches.length){
    start.remove()
      gameState = Play
      bg2.velocityX = -5
      bg1.remove()
  }
  }
if(gameState === Play){
infected.visible = false
continueB.visible = false
boy.velocityX = 0

  text("You Infected")
      textSize(30)
    fill("lightgreen")
  text("Protiens = " + Protiens,50,50)
  fill("red")
  text("Life = " + life,width/2,50)

  bg2.velocityX = -5
  if(bg2.x < 90){
    bg2.x = bg2.width/1
  }


  if(life > 3){
    life -= 1
  }


if(boy.isTouching(coronaGroup)){
  life -= 1
  coronaGroup.destroyEach();
  infected.visible = true
  continueB.visible = true
 gameState = con


if(life < 1){
  gameState = End
}

}

if(InvPro.isTouching(coronaGroup)){
  coronaGroup.destroyEach()
}

if(boy.isTouching(maskGroup)){
  maskGroup.destroyEach()
  life += 1

}


if(boy.isTouching(vaccineGroup)){
  InvPro.x = 402
  shield = createSprite(402,700)
    shield.addImage(shieldImg)
    shield.scale = 0.5
    vaccineGroup.destroyEach()
    timerText = 5
  }

  if(timer < 1){
    shield.remove()
    InvPro.x = 3000
    timer = 20
  }

  if(InvPro.x === 402){
    timer -= 0.03
    textSize(30)
    fill("#ff35dc")
    text("This Shield will protect you only for 20 second",250,150)
  timerText -= 0.05
  }
  

    
  if(timerText > 0){
    fill(random(0,255),random(50,255),random(100,255))
    text("Wow!! You just caught the vaccine",250,height/2)
    }
   

if(boy.isTouching(protienGroup)){
  protienGroup.destroyEach()
  Protiens +=1
}

if(boy.isTouching(sanitizerGroup)){
  sanitizerGroup.destroyEach();
  life += 1
}




if(keyDown("space") && boy.y >= 550){
  boy.velocityY = -72
  
}

if(touches.length && boy.y >= 550){
  boy.velocityY = -72
  
}
boy.velocityY = boy.velocityY + 4

if(life < 1){
  gameState = End
}

  Objects()

boy.collide(floorGroup)

if(boy.x < 195){
  gameState = back
}



}

if(gameState === con){
  bg2.velocityX = 0
  if(mousePressedOver(continueB)){
    gameState = Play
   // boy.x = 200
  }
}

if(gameState === back){
  
 // bg2.velocityX = 0
 continueB.visible = true
  boy.changeAnimation("collide",boy_Collided)
  textSize(20)
  fill("yellow")
  text("Please don't do that again otherwise you will lose your life",300,300)
  bg2.velocityX = 0
  boy.velocityY = 0
  coronaGroup.setVelocityXEach(0)
  maskGroup.setVelocityXEach(0)
  sanitizerGroup.setVelocityXEach(0)
  vaccineGroup.setVelocityXEach(0)
  protienGroup.setVelocityXEach(0)
  floorGroup.setVelocityXEach(0)
  
 /* coronaGroup.destroyEach();
  maskGroup.destroyEach()
  sanitizerGroup.destroyEach()
  vaccineGroup.destroyEach()
  protienGroup.destroyEach()
  floorGroup.destroyEach()*/
  if(mousePressedOver(continueB)){
    gameState = Play
    boy.changeAnimation("running",boy_running)
boy.x = 200
boy.y = 500
coronaGroup.setVelocityXEach(-8)
maskGroup.setVelocityXEach(-7)
sanitizerGroup.setVelocityXEach(-7)
vaccineGroup.setVelocityXEach(-7)
protienGroup.setVelocityXEach(-7)
floorGroup.setVelocityXEach(-7)
  }
}


if(gameState===End){
  reset.visible = true


  boy.changeAnimation("collide",boy_Collided)
  infected.visible = false
  continueB.remove()
  bg2.velocityX = 0
  boy.velocityY = 0
  coronaGroup.setVelocityXEach(0)
  maskGroup.setVelocityXEach(0)
  sanitizerGroup.setVelocityXEach(0)
  vaccineGroup.setVelocityXEach(0)
  protienGroup.setVelocityXEach(0)
  floorGroup.setVelocityXEach(0)
  
  coronaGroup.setLifetimeEach(-1)
maskGroup.setLifetimeEach(-1)
sanitizerGroup.setLifetimeEach(-1)
vaccineGroup.setLifetimeEach(-1)
protienGroup.setLifetimeEach(-1)
floorGroup.setLifetimeEach(-1)

if(mousePressedOver(reset)){
  Reset()
}

}


}

// function for creating objects like carona, mask etc.
function Objects(){

// To display carona at random places
if(frameCount % 60 === 0){
corona = createSprite(1010,random(427,850))
corona.addImage(coronaImg)
// corona.debug = true
corona.scale = 0.2
corona.setCollider("rectangle",0,0,200,200)
corona.velocityX = -8
coronaGroup.add(corona)
}


if(frameCount % 500 ===0){
floor = createSprite(1000,50,100,30)
  floor.addImage(floorImage)
  floor.scale = 0.2
    floor.velocityX = -7
    floor.lifetime = 800; 
   // floor.debug = true
    floor.setCollider("rectangle",0,0,1500,270)
    floor.y = Math.round(random(756,800))
  floorGroup.add(floor)  
 
}

// To display mask at random places
if(frameCount % 779===0){                  
  mask = createSprite(1000,random(427,850))
 mask.addImage(maskImg)
 mask.scale = 0.1
   mask.velocityX = -7
   //mask.x = floor.x
   mask.lifetime = 800;
   maskGroup.add(mask)
 }

// To display sanitizers at random places
if(frameCount % 843===0){
  sanitizer = createSprite(1000,(427,850))
  sanitizer.addImage(sanitizerImg)
  sanitizer.scale = 0.3
  sanitizer.velocityX = -7
  sanitizer.lifetime = 800
  sanitizerGroup.add(sanitizer)
}

// To display vaccine at random places
if(frameCount % 1299=== 0){
  vaccine = createSprite(1000,(835,851))
  vaccine.addImage(vaccineImg)
  vaccine.scale = 0.1
  vaccine.velocityX = -7
  vaccineGroup.add(vaccine)
}


if(frameCount % 555 === 0){
  protien = createSprite(1000,random(835,851))
  protien.addImage(protienImg)
  protien.scale = 0.4
  protien.velocityX = -7
  protienGroup.add(protien)
}


}

function Reset(){
  gameState = Play
  reset.visible = false
  coronaGroup.destroyEach();
  maskGroup.destroyEach()
  sanitizerGroup.destroyEach()
  vaccineGroup.destroyEach()
  protienGroup.destroyEach()
  floorGroup.destroyEach()
bg2.velocityX = -6
life = 3
Protiens = 0
boy.changeAnimation("running",boy_running)
  coronaGroup.setVelocityXEach(-8)
maskGroup.setVelocityXEach(-7)
sanitizerGroup.setVelocityXEach(-7)
vaccineGroup.setVelocityXEach(-7)
protienGroup.setVelocityXEach(-7)
floorGroup.setVelocityXEach(-7)
}
