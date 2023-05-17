
// P - Play/Pause
// R - Randomise all cells (also pauses)
// C - Clear all cells (also pauses)

// Left click - turn cell on

// Make sure you click on the canvas first
// for keypresses to register


var playmode = false;
var lastUpdate = 0;
var speed = 200; // Higher number == slower speed 

function setup() {
  createCanvas(600,  600);
   
  generateGridcells(25); // 20 is cellsize 
  //randomiseGridcells();
}

function draw() {
  background(220);
  drawGridcells();
  
  if (playmode && millis() > lastUpdate){
    lastUpdate = millis() + speed;
    updateGridcells();
  }
  
  if (mouseIsPressed){
    if (mouseButton === LEFT) {
      turnOnCell(mouseX, mouseY);
    }
    else{
      turnOffCell(mouseX, mouseY);
    }
  }
}

function keyPressed(){
  if(key == 'p'){
    playmode = !playmode;
  }
  
  if (key == 'r'){
    playmode = false;
    randomiseGridcells();
  }
  
  if (key == 'c'){
    playmode = false;
    clearGridcells();
  }
}


//grid -- logic

var gridcells = [];
var numCols, numRows, numCells

function generateGridcells(cellSize){
  numRows = height / cellSize;
  numCols = width / cellSize;
  numCells = numRows * numCols;
  
  for(let i = 0; i < numCells; i++){
    gridcells[i] = new Gridcell(i, cellSize);
  }
}

function drawGridcells(){
  for(let c of gridcells){
    c.display();
  }
}

function updateGridcells(){
  for (let c of gridcells){
    c.setNewState();
  }
  for (let c of gridcells){
    c.update();
  }
}

function randomiseGridcells(){
  for(let c of gridcells){
    c.randomise();
  }
}

function clearGridcells(){
  for(let c of gridcells){
    c.turnOff();
  }
}

function turnOnCell(x, y){
  if (x > 0 && x < width && y > 0 && y < height){
    let col = int(map(x, 0, width, 0, numCols));
    let row = int(map(y, 0, height, 0, numRows));
  
    let index = col + row * numCols;
  
    gridcells[index].turnOn();
  }
}

function turnOffCell(x, y){
  if (x > 0 && x < width && y > 0 && y < height){
    let col = int(map(x, 0, width, 0, numCols));
    let row = int(map(y, 0, height, 0, numRows));
  
    let index = col + row * numCols;
  
    gridcells[index].turnOff();
  }
}

//individual cells -- controller

class Gridcell{
  constructor(index, size){
    this.col = index % numCols;
    this.row = int(index / numCols);

    console.log(this.col + " : " + this.row);
    
    this.x = this.col * size;
    this.y = this.row * size;
    
    this.size = size;
    
    this.neighbours = [];
    
    this.currentState = false;
    this.newState = false;
    
    for(let c = -1; c <= 1; c++){
      for(let r = -1; r <= 1; r++){
        if (!(c == 0 && r == 0)){
          
          let nCol = (this.col + c) % numCols;
          let nRow = (this.row + r) % numRows;
          
        
          if (nCol < 0) nCol = numCols -1;
          if (nRow < 0) nRow = numRows -1;
          
          let nIndex = nCol + nRow * numCols;
          
          
          this.neighbours.push(nIndex)       
          
          console.log(this.neighbours)
        }
      }
    }
  }
  
  //check neighbours and apply logic
  setNewState(){
    // Any live cell with fewer than two live neighbours dies.
    // Any live cell with two or three live neighbours lives.
    // Any live cell with more than three live neighbours dies.
    // Any dead cell with exactly three live neighbours becomes a live cell.
    
    let liveCount = 0;
  
    for (let n of this.neighbours){
      if (gridcells[n].currentState) liveCount++;
    }
    
    if (this.currentState){
      if (liveCount < 2) this.newState = false;
      else if (liveCount <= 3) this.newState = true;
      else this.newState = false;
    }
    else {
      if (liveCount == 3) this.newState = true;
      else this.newState = false;
    }
    
  }
  
  update(){
    this.currentState = this.newState;
  }
  
  randomise(){
    let r = random();
    
    if (r < 0.5) this.currentState = true;
    else this.currentState = false; 
  }
  
  turnOff(){
    this.currentState = false;
  }
  
  turnOn(){
    this.currentState = true;
  }
  
  display(){
    if (this.currentState) fill(0,0,0);
    else fill(255, 255, 255);
    strokeWeight(0.5);
    
    rect(this.x, this.y, this.size, this.size);
  }
}