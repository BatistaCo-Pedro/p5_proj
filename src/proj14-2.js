let img;

function preload() {
  img = loadImage("../colors.webp");
  cImg = loadImage("../colors.webp");
}

function setup() {
  createCanvas(1000, 1000);

  img.resize(400, 400);
  noSmooth();
}

function draw() {
  image(cImg, 500, 0, 400, 400)  

  img.loadPixels();

  let colors = []

  for (let x = 0; x < img.width; x++) {
    for(let y = 0; y < img.height; y++) {
      let i = (y * img.width + x) * 4
      let c = color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3])
      colors.push(c)
    }
  }

  colors.sort((a, b) => hue(a) - hue(b))

  image(img, 0, 0, width, height);

  let i = 0;
  for (let x = 0; x < img.width; x++) {
    for(let y = 0; y < img.height; y++) {
      stroke(colors[i])
      point(x, y)
      i++
    }
  }
}