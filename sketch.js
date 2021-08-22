var spaceImg, space;
var spaceshipImg, spaceship;
var meteorImg, meteor, meteorGroup;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
spaceshipImg = loadImage("spaceship.jpg");
meteorImg = loadImage("meteor.jpg");
spaceImg = loadImage("space.jpg");
}

function setup() {
createCanvas(600,600)
space = createSprite(300,300);
space.addImage("space", spaceImg);
space.velocityY = 1;

meteorGroup = new Group();
 invisibleBlockGroup = new Group();

 spaceship = createSprite(200,200,50,50);
 spaceship.scale = 0.1
 spaceship.addImage("spaceship", spaceshipImg);
}

function draw() {
 background(0);
 if(gameState === "play"){
     if(space.y > 400){
         space.y = 300
     }
     if(keyDown("left_arrow")){
         spaceship.x = spaceship.x -3
     }
     if(keyDown("right_arrow")){
         spaceship.x = spaceship.x +3
     }
     if(keyDown("space")){
         spaceship.velocityY = -5
     }
     spaceship.velocityY =  spaceship.velocityY + 0.8
     spawnMeteors();

if(meteorGroup.isTouching(spaceship)){
    meteor.velocityY = 0
}

if(invisibleBlockGroup.isTouching(spaceship)|| spaceship.y>600){
    spaceship.destroy();
    gameState = "end"
}

 }

drawSprites();
}
if(gameState === "end"){
    stroke("yellow")
    fill("yellow")
    textSize(30)
    text("Game Over",230,250)
}

function spawnMeteors(){
    if(frameCount %240 === 0){
      var meteor  = createSprite(200,-50);
        meteor.addImage(meteorImg)
        meteor.scale = 0.5

        var invisibleBlock = createSprite (200,15)
        invisibleBlock.width = meteor.width;
        invisibleBlock.height = 2;

        meteor.x = Math.round(random(120,400))
        meteor.velocityY = 1

        invisibleBlock.x = meteor.x
        invisibleBlock.velocityY = 1

        meteor.lifetime = 600

        meteorGroup.add(meteor);

        invisibleBlock.debug = false;
        invisibleBlockGroup.add(invisibleBlock);
        spaceship.depth = meteor.depth;
        spaceship.depth +=1
    }
}