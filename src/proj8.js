let flight;
let worldMap = [];

let enterButton;
let input;
let rows;

const  size = 1;
const ELLIPSESIZE = 3;

function setup() {
  createCanvas(1920, 1080);
  for (let i = 0; i < country.length; i++) {
    worldMap.push(convertPathToPolygons(
      country[i].vertexPoint
    ));
  }

  flight = loadTable("flights.csv", "csv", "header", process); //call back function
  input = createInput("Switzerland");
  input.position(width / 2 - 100, height - 30);
  enterButton = createButton("Enter");
  enterButton.position(width / 2 + 50, height - 30);
  rectMode(CENTER);
  textAlign(CENTER);
}

function process() {
  rows = flight.getRows();
  getInfo();
  intialFlights();
  fill(255);
  textSize(18);
  text(
    "Enter a country or city name to get the flights information",
    width / 2,
    height - 45
  );
}

function draw() {
  let collision = false;
  for (let i = 0; i < worldMap.length; i++) {
    fill(100);
    if (!collision && mouseIsPressed) {
      collision = worldMap[i].some(poly => detectCollision(poly, mouseX, mouseY));
      if (collision) {
        fill('green');
      }
    }
    
    for (const poly of worldMap[i]) {
      beginShape();
      for (const vert of poly) {
        vertex(...vert);
      }
      endShape();
    }
  }
  enterButton.mouseClicked(getflightDetails);
}

//default flights
function intialFlights() {
  noStroke();
  background(30, 30, 30);
  fill(150, 100, 255, 100);
  for (data = 0; data < rows.length; data++) {
    ellipse(rows[data].from_long, rows[data].from_lat, ELLIPSESIZE, ELLIPSESIZE);
  }
}

function getflightDetails() {
  intialFlights(); //refresh screen

  let flightCount = 0;

  for (data = 0; data < rows.length; data++) {
    if (rows[data].from_country.toUpperCase() == input.value().toUpperCase()) {

      push();
      strokeWeight(0.5)
      stroke(255, 117, 117, 500);
      line(
        rows[data].from_long,
        rows[data].from_lat,
        rows[data].to_long,
        rows[data].to_lat
      );
      pop();
      flightCount++;
    }
    
    if(rows[data].from_city.toUpperCase() == input.value().toUpperCase()) {
      push();
      strokeWeight(0.5)
      stroke(255, 117, 117, 500);
      line(
        rows[data].from_long,
        rows[data].from_lat,
        rows[data].to_long,
        rows[data].to_lat
      );
      pop();
      flightCount++;
    }
  }

  if (flightCount != 0) {
    fill(255);
    textSize(18);
    text(
      "There are " + flightCount + " flights from " + input.value(),
      width / 2,
      height - 45
    );
  } else {
    fill(255);
    textSize(18);
    text(
      "Invalid country or city name, please try again!",
      width / 2,
      height - 45
    );
  }
}

function getInfo() {
  for (data = 0; data < rows.length; data++) {
    var from_long = rows[data].getNum("from_long");
    var from_lat = rows[data].getNum("from_lat");
    var to_long = rows[data].getNum("to_long");
    var to_lat = rows[data].getNum("to_lat");

    rows[data].from_country = rows[data].getString("from_country");
    rows[data].from_city = rows[data].getString("from_city");
    rows[data].to_city = rows[data].getString("to_city");
    rows[data].to_country = rows[data].getString("to_country");
    rows[data].from_long = map(from_long, -180, 180, 0, width);
    rows[data].from_lat = map(from_lat, -90, 90, height, 0);
    rows[data].to_long = map(to_long, -180, 180, 0, width);
    rows[data].to_lat = map(to_lat, -90, 90, height, 0);
  }
}

function convertPathToPolygons(path) {
  let coord_point = [0, 0];
  let polygons = [];
  let currentPolygon = [];

  //For loop para calcular os pontos do vertex
  for (const node of path) {
    if (node[0] == "m") {
      coord_point[0] += node[1] * size;
      coord_point[1] += node[2] * size;
      currentPolygon = [];
    } else if (node == "z") {
      currentPolygon.push([...coord_point]);
      polygons.push(currentPolygon);
    } else {
      currentPolygon.push([...coord_point]);
      coord_point[0] += node[0] * size;
      coord_point[1] += node[1] * size;
    }
    console.log(coord_point)
  }
  
  return polygons;
}

function detectCollision(polygon, x, y) {
  let c = false;
  // for each edge of the polygon
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    // Compute the slope of the edge
    let slope = (polygon[j][1] - polygon[i][1]) / (polygon[j][0] - polygon[i][0]);
    
    // If the mouse is positioned within the vertical bounds of the edge
    if (((polygon[i][1] > y) != (polygon[j][1] > y)) &&
        // And it is far enough to the right that a horizontal line from the
        // left edge of the screen to the mouse would cross the edge
        (x > (y - polygon[i][1]) / slope + polygon[i][0])) {
      
      // Flip the flag
      c = !c;
    }
  }
  
  return c;
}