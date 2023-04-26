const numCircles = 10;
const maxRadius = 50;
const stepSize = 2;
const mouseAttraction = 0.10;
let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(0, 75);
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
}

function draw() {
  background(255);
  // float towards mouse position
  let centerX = mouseX * mouseAttraction + width / 2 * (1 - mouseAttraction);
  let centerY = mouseY * mouseAttraction + height / 2 * (1 - mouseAttraction);

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
