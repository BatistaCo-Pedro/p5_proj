let toggle = false

function palette(t){
	const a = { x:0.5, y:0.5, z:0.5 }
	const b = { x:0.5, y:0.5, z:0.5 }
	const c = { x:1.0, y:1.0, z:1.0 }
	const d = { x:0.0, y:0.1, z:0.2 }
  
	return {
    r: (a.x + b.x * cos(TWO_PI * (c.x * t + d.x))) * 255,
		g: (a.y + b.y * cos(TWO_PI * (c.y * t + d.y))) * 255,
		b: (a.z + b.z * cos(TWO_PI * (c.z * t + d.z))) * 255
  }
}

function setup() {
  createCanvas(600, 450)
  pixelDensity(1)
  background(0)
}

function draw() {
  let C = new Complex(map(mouseX, 0, width, -2.5, 1), map(mouseY, 0, height, 1, -1))

  loadPixels()
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let Z = new Complex(map(x, 0, width, -2.5, 1), map(y, 0, height, 1, -1))
      if (toggle) C = Z.copy()
      
      let bright = julia(Z, C)
      const c = palette(bright)

      const index = (x + y * width) * 4
      pixels[index] = c.r
      pixels[index + 1] = c.g
      pixels[index + 2] = c.b
      pixels[index + 3] = 255
    }
  }
  updatePixels()

  noLoop()
}

function mousePressed() {
  toggle = !toggle
  loop()
}

function mouseMoved() {
  loop()
}

function julia(Z, C) {
  let bright = 0
  const maxIterations = 50
  for (let n = 0; n <= maxIterations; n++) {
    Z.multSelf(Z.copy()).addSelf(C)

    if (Z.magSquared() > 16) break

    bright = n / maxIterations
  }
  return bright
}

class Complex {
  constructor(re, im) {
    this.re = re
    this.im = im
  }
  
  copy(){
  	return new Complex(this.re, this.im)
  }
  
  conjugate() {
  	return new Complex(this.re, -this.im)
  }

  add(c) {
    return new Complex(this.re + c.re, this.im + c.im)
  }

  addSelf(c) {
    this.re += c.re
    this.im += c.im
    return this
  }

  sub(c) {
    return new Complex(this.re - c.re, this.im - c.im)
  }

  subSelf(c) {
    this.re -= c.re
    this.im -= c.im
    return this
  }

  mult(c) {
    return new Complex(this.re * c.re - this.im * c.im, this.re * c.im + this.im * c.re)
  }

  multSelf(c) {
    let re = this.re * c.re - this.im * c.im
    let im = this.re * c.im + this.im * c.re
    this.re = re
    this.im = im
    return this
  }
  
  div(c) {
    // X/Y = X . Y* . 1/|Y|² where |Y|² = Y.re² + Y.im²
    let d = this.mult(c.conjugate())
    let cMag2 = c.magSquared()
    return new Complex(d.re/cMag2, d.im/cMag2)
  }

  divSelf(c) {
    let cMag2 = c.magSquared()
    this.multSelf(c.conjugate())
    this.re /= cMag2
    this.im /= cmag2
    return this

  }
  
  magnitude() {
    return sqrt(magSquared())
  }
  
  magSquared(){
  	return this.re ** 2 + this.im ** 2
  }
}