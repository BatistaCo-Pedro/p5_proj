const numCircles = 50;
const maxRadius = 50;
const stepSize = 2;
const mouseAttraction = 0.10;
let circles = [];
let timerValue = 4; // start time in seconds
let timerInterval;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(0, 250);
  strokeWeight(0.5);
  background(255);
  noFill();

  // generate initial circles
  for (let i = 0; i < numCircles; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(maxRadius);
    let vx = random(-stepSize, stepSize);
    let vy = random(-stepSize, stepSize);
    circles.push({ x, y, r, vx, vy });
  }

  startTimer()
}

function draw() {
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


function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
    
}

function updateTimer() {
    if (timerValue > 0) {
        timerValue--;
    } else {
        clearInterval(timerInterval);
        background(255)
    }
}