let numCircles = 10;
const maxRadius = 50;
const stepSize = 2;
const mouseAttraction = 0.10;
let circles = [];
let slider;
let lastNumCircles;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(0, 250);
  strokeWeight(0.5);
  background(255);
  noFill();

  slider = createSlider(10, 250, 10, 5)
  slider.position(20, 20)
  generateCircles()
}

function generateCircles() {
  // generate initial circles
  for (let i = 0; i < numCircles; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(maxRadius);
    let vx = random(-stepSize, stepSize);
    let vy = random(-stepSize, stepSize);
    circles.push({ x, y, r, vx, vy });
  }
}

function draw() {
  background(255);
  numCircles = slider.value();
  if(numCircles != lastNumCircles) {
    generateCircles();
  }


  lastNumCircles = numCircles;
  // update circle positions
  for (let i = 0; i < numCircles; i++) {
    let circle = circles[i];
    circle.x += circle.vx;
    circle.y += circle.vy;

    // check if circle is out of bounds
    if (circle.x < -maxRadius || circle.x > width + maxRadius ||
        circle.y < -maxRadius || circle.y > height + maxRadius) {
      // reset circle position and velocity
      circle.x = random(width);
      circle.y = random(height);
      circle.vx = random(-stepSize, stepSize);
      circle.vy = random(-stepSize, stepSize);
    }

    // draw circle
    ellipse(circle.x, circle.y, circle.r * 2);
  }
}