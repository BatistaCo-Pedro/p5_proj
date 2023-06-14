let img;

function preload() {
  img = loadImage('../kitten.jpg');
}

function setup() {
  createCanvas(1000, 800);
}

function draw() {

  image(img, 400, 0)

  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {

      // Gets the original color
      const imgColor = img.get(x, y);

      // Gets the filter color
      const filterColor = getFilterColor(red(imgColor), green(imgColor), blue(imgColor));

      // Draws a pixel with the filter color
      stroke(filterColor);
      point(x, y);
    }
  }
}

function getFilterColor(r, g, b, numb = 1) {
    const rFilter = 255 - r;
    const gFilter = b
    const bFilter = g;
    return color(rFilter, gFilter, bFilter);
  

  /*for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let index = (img.width * y + x) * 4;
      let r = index + 0;
      let g = index + 1;
      let b = index + 2;
      img.pixels[r] = 255 - img.pixels[r];
      img.pixels[g] = 255 - img.pixels[g];
      img.pixels[b] = 255 - img.pixels[b];
      let col = img.get(x,y);
      col[0] = col[0] - random(255);
      col[1] = col[1] - random(255);
      col[2] = col[2] - random(255);
      img.set(x,y, col);
    }
  }*/
}