let imgOne;
let imgTwo;

function preload() {
  imgOne = loadImage('../kitten.jpg');
  imgTwo = loadImage('../doggo.jpg');
}

function setup() {
  createCanvas(500, 500);

  // Resize the images so they fit on the screen
  imgOne.resize(width, height);
  imgTwo.resize(width, height);

  // other setup
  noLoop();
  noSmooth();
}

function draw() {

  // Look at each pixel in the images,
  // and average their R, G, and B values
  // to mix the colors together.
  imgOne.loadPixels();
  imgTwo.loadPixels();
  for (let y = 0; y < imgOne.height; y++) {
    for (let x = 0; x < imgOne.width; x++) {

      // Get the colors.
      const colorOne = imgOne.get(x, y);
      const colorTwo = imgTwo.get(x, y);

      // Compute average R, G, and B values.
      const avgRed = (red(colorOne) + red(colorTwo)) / 2;
      const avgGreen = (green(colorOne) + green(colorTwo)) / 2;
      const avgBlue = (blue(colorOne) + blue(colorTwo)) / 2;

      // Draw a point with the average color.
      stroke(avgRed, avgGreen, avgBlue);
      point(x, y);
    }
  }

}
