var hypnoticBall, database;
var position;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";


  var hypnoticBallPosition = database.ref('ball/position');
  hypnoticBallPosition.on("value", readPosition, showError);
}
var wreckingBallPosition = database.ref('ball/position');
wreckingBallPosition.on("value",readPosition,showError);

function draw(){
  background("white");
  
   if (keyDown(LEFT_Arrow)){
       writePosition(-1,0)
   }
   else if (keyDown(RIGHT_Arrow)){
    writePosition(1,0)
}
   else if (keyDown(UP_Arrow)){
    writePosition(0,-1)
}
   else if (keyDown(DOWN_Arrow)){
    writePosition(0,1)
}

function writePosition(x,y){
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
}