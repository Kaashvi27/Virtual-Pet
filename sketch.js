var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var feedTheDog;
var foodObj;


//create feed and lastFed variable here
var feed;
var lastFed;

function preload(){
sadDog=loadAnimation("Dog.png");
happyDog=loadAnimation("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addAnimation("Happy",happyDog);
  dog.addAnimation("Sad",sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedTheDog=createButton("Feed The Dog");
  feedTheDog.position(880,105);
  

  addFood=createButton("Add Food");
  addFood.position(800,105);
  
  

}

function draw() {
  background(46,139,87);
  foodObj.display();
  if(feedTheDog.mousePressed){
    feedTheDog.mousePressed(minusFoods);
    dog.changeAnimation("Happy",happyDog);    
  }
  if(addFood.mousePressed){
    addFood.mousePressed(addFoods);
    dog.changeAnimation("Sad",sadDog);    
  }
  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val *0);
  }else{
    foodObj.updateFoodStock(food_stock_val -1);
  }
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function minusFoods(){
  foodS--;
  database.ref('/').update({
    Food:foodS
  })
}
