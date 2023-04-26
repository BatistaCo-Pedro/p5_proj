const amountOfFormPoints = 8;
const stepSize = 2;
const initRadius = 25;
const mouseAttraction = 0.25;
let centerX, centerY;
let x = [];
let y = [];

function setup(){
    createCanvas(windowWidth, windowHeight);

    //Initial Shape
    centerX = width / 2;
    centerY = height / 2;
    let angle = radians(360 / amountOfFormPoints);
    for (var i = 0; i < amountOfFormPoints; i++) {
        x.push(cos(angle * i) * initRadius);
        y.push(sin(angle * i) * initRadius);
    }

    //styling
    stroke(0,75);
    strokeWeight(0.5);
    background(255);
    noFill();
}

function draw(){
    //float towards mouse position
    centerX += (mouseX - centerX) *mouseAttraction;
    centerY += (mouseY - centerY) *mouseAttraction;

    //calculate new points
    for(var i = 0; i < amountOfFormPoints; i++){
        x[i] += random(-stepSize, stepSize);
        y[i] += random(-stepSize, stepSize);
        ellipse(x[i] + centerX, y[i] + centerY, 5,5); //show points
    }

    beginShape();
    //first controlpoint
    curveVertex(x[0] + centerX, y[0] + centerY);

    //only these points are drawn
    for (var i = 0; i < amountOfFormPoints; i++){
        curveVertex(x[i] + centerX, y[i] + centerY);
    }
    //Connect to the first point again
    //or use endShape(CLOSE); but result is different
    curveVertex(x[0] + centerX, y[0] + centerY);

    // end controllpoint
    curveVertex(
        x[amountOfFormPoints - 1] + centerX,
        y[amountOfFormPoints - 1] + centerY
    );
    endShape();
}