let angle;
let axiom = "F";
let sentence = axiom;
let len = 225;

let rules = [];
rules[0] = {
  a: "F",
  b: "FF-F+F-F-FF"
}


function setup() {
    createCanvas(800, 800);
    angle = radians(45);
    background(150);
    createP();
    frac_draw();
    let button = createButton("generate");
    button.mousePressed(generate);
  }

function generate() {
  len *= 0.5;
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  frac_draw();
}

function frac_draw() {
  background(230);
  resetMatrix();
  translate(width / 2, height);
  stroke(20, 250);
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);

    if (current == "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle)
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
}