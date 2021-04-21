var player;
var bike, carb, cary, coin, truckb, truckw, truckg;
var road, road2;

var playeri;
var bikei, carbi, caryi, coini, truckbi, truckwi, truckgi;
var roadi, road2i;

var obstacle;

var Play = 1;
var End = 0;
var gamestate = Play;
var score = 0;

var ObsG;
var coinG;

var over, overi;
var resi,res;
var life = 0;
var hearti, heart1, heart2, heart3;
var lifetext;
var lifesprite;

var roof;
var lside, rside, bside;

var lifelostSound,coinSound,overSound;



function preload() {
  playeri = loadImage("car.png");
  bikei = loadImage("bike.png");
  carbi = loadImage("carb.png");
  caryi = loadImage("cary.png");
  coini = loadImage("coin.png");
  roadi = loadImage("road.jpg");
  truckbi = loadImage("truckb.png");
  truckwi = loadImage("tuckw.png");
  truckgi = loadImage("truckg.png");
  overi = loadImage("game over.png");
  road2i = loadImage("road-1.jpg");
  lifetext = loadImage("extra life.png");
  hearti = loadImage("heart.png");
  lifelostSound=loadSound("life lost.wav");
  coinSound=loadSound("coin collected.wav");
  resi=loadImage("RESTART.png");
}

function setup() {
  createCanvas(600, 400);
  player = createSprite(300, 350);
  player.addImage(playeri);
  player.scale = 0.15;
  player.depth = 1;

  road = createSprite(200, 145, 400, 400);
  road.addImage(roadi);
  road.scale = 0.5;
  road.depth = 0;
  road.velocityY = +4;

  road2 = createSprite(400, 145, 400, 400);
  road2.addImage(road2i);
  road2.scale = 0.5;
  road2.depth = 0;
  road2.velocityY = +4;

  score = 0;

  life = 0;

  over = createSprite(300, 130);
  over.addImage(overi);
  over.scale = 0.2;
  over.visible = false;
  
  res=createSprite(300,250);
  res.addImage(resi);
  res.scale=0.10;
  res.visible = false;
  

  ObsG = createGroup();
  coinG = createGroup();

  roof = createSprite(300, 35, 600, 5);
  roof.shapeColor = "green";

  lside = createSprite(4, 200, 5, 400);
  lside.visible = false;

  rside = createSprite(597, 200, 5, 400);
  rside.visible = false;

  bside = createSprite(300, 397, 600, 5);
  bside.visible = false;

  lifesprite = createSprite(50, 25);
  lifesprite.addImage(lifetext);
  lifesprite.scale = 0.3;

  heart1 = createSprite(110, 22);
  heart1.addImage(hearti);
  heart1.scale = 0.07;
  heart1.visible = false;

  heart2 = createSprite(150, 22);
  heart2.addImage(hearti);
  heart2.scale = 0.07;
  heart2.visible = false;

  heart3 = createSprite(190, 22);
  heart3.addImage(hearti);
  heart3.scale = 0.07;
  heart3.visible = false;



}

function draw() {
  background(1);
  if (gamestate === Play) {
    spawnvehicles();
    coinp();

    if (road.y > 210) {
      road.y = 160;
    }
    if (road2.y > 210) {
      road2.y = 160
    }

    //coin.visible=false; 

    //extra life code
    //if player touches the coin
    if (player.isTouching(coinG)) {
      life = life + 1;
      coinG.destroyEach();
      coinSound.play();
    }
    //visiblity of the lifes
    if (life === 1) {
      heart1.visible = true;
    }
    if (life === 2) {
      heart2.visible = true;
    }
    if (life === 3) {
      heart3.visible = true;
    }
    //use of life
    if (life === 3 && player.isTouching(ObsG)) {
      gamestate = Play
      heart3.visible = false;
      life = life - 1
      ObsG.destroyEach();
      lifelostSound.play();
    }
    if (life === 2 && player.isTouching(ObsG)) {
      gamestate = Play
      heart2.visible = false;
      life = life - 1
      ObsG.destroyEach();
      coinG.destroyEach();
      lifelostSound.play();
    }
    if (life === 1 && player.isTouching(ObsG)) {
      gamestate = Play
      heart1.visible = false;
      life = life - 1
      ObsG.destroyEach();
      coinG.destroyEach();
      lifelostSound.play();
    }
    if (player.isTouching(ObsG) && life === 0) {
      gamestate = End;
    }

    //coliide code for the player
    player.collide(roof);
    player.collide(lside);
    player.collide(rside);
    player.collide(bside);





    score = Math.round(frameCount / 15);



    //controls
    if (keyDown(RIGHT_ARROW)) {
      player.x = player.x + 5;
    }
    if (keyDown(LEFT_ARROW)) {
      player.x = player.x - 5;
    }
    if (keyDown(UP_ARROW)) {
      player.y = player.y - 5;
    }
    if (keyDown(DOWN_ARROW)) {
      player.y = player.y + 5;
    }
    road.velocityY = +(4 + 3* score/100)
    road2.velocityY = +(4 + 3* score/100)

  }
  if (gamestate === End) {
    over.visible = true;
    res.visible=true;
    ObsG.setVelocityEach(0);
    ObsG.destroyEach();
    coinG.destroyEach();
    road.velocityY = 0;
    road2.velocityY = 0;
    player.x = 300;
    player.y = 350;
   
  }

if(mousePressedOver(res)){
  restart();
}


  //console.log(player.depth)
  drawSprites();
  textSize(20)
  fill("white")
  text("Score:" + score, 510, 30)
}



function spawnvehicles() {
  if (frameCount % 200 === 0) {
    bike = createSprite(Math.round(random(20, 100)), 50);
    bike.addImage(bikei);
    bike.scale = 0.25;
    bike.velocityY = 3.5;
    console.log(bike.scale);
    ObsG.add(bike);
  }

  if (frameCount % 300 === 0) {
    carb = createSprite(Math.round(random(120, 180)), 50)
    carb.addImage(carbi);
    carb.scale = 0.19;
    carb.velocityY = 3;
    ObsG.add(carb);
  }


  if (frameCount % 250 === 0) {
    cary = createSprite(Math.round(random(200, 260)), 50)
    cary.addImage(caryi);
    cary.scale = 0.19;
    cary.velocityY = 4;
    ObsG.add(cary);
  }


  if (frameCount % 350 === 0) {
    truckb = createSprite(Math.round(random(280, 360)), 50)
    truckb.addImage(truckbi);
    truckb.scale = 0.19;
    truckb.velocityY = 2;
    ObsG.add(truckb);
  }


  if (frameCount % 400 === 0) {
    truckg = createSprite(Math.round(random(380, 460)), 50)
    truckg.addImage(truckgi);
    truckg.scale = 0.19;
    truckg.velocityY = 2.5;
    ObsG.add(truckg);
  }


  if (frameCount % 370 === 0) {
    truckw = createSprite(Math.round(random(480, 560)), 50)
    truckw.addImage(truckwi);
    truckw.scale = 0.19;
    truckw.velocityY = 3;
    ObsG.add(truckw);
  }



}

function coinp() {

  if (frameCount % 600 === 0) {
    coin = createSprite(Math.round(random(30, 570)), 50)
    coin.addImage(coini);
    coin.scale = 0.2;
    coin.velocityY = 4;
    coin.depth = 1;
    coinG.add(coin);

  }
}

function restart(){
  gamestate=Play;
  over.visible = false;
  res.visible=false;
  score = 0;
  frameCount=0;
  
}