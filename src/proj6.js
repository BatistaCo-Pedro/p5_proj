// An array of lines from a text file
let lines;
// The Markov Generator object
let markov;
// An output element
let output;

// Preload some seed data
function preload() {
  lines = loadStrings('../shakespeare.txt');
}

function setup() {
  // Join everything together in one long string
  // Keep carriage returns so these will show up in the markov generator
  let text = lines.join('\n');

  // N-gram length and maximum length
  markov = new MarkovGenerator(8, 400);
  markov.feed(text);
  //console.log(markov);
  
  // Make the button
  let button = createButton('generate');
  button.mousePressed(generate);

  noCanvas();
}

Array.prototype.choice = function() {
  let i = floor(random(this.length));
  return this[i];
}

class MarkovGenerator {

  constructor(n, max) {
    // Order (or length) of each keyele
    this.n = n;
    // What is the maximum amount we will generate?
    this.max = max;

    // each keyele is the key, a list of possible next elements are the values
    this.keyele = {};
    // A separate array of possible beginnings to generated text
    this.beginnings = [];
  }

  //Feed in text to the markov chain
  feed(text) {

    // Discard the line if it's too short
    if (text.length < this.n) {
      return false;
    }

    // Store the first keyele of this line
    let beginning = text.substring(0, this.n);
    this.beginnings.push(beginning);

    // Go through everything and create the dictionary
    for (let i = 0; i < text.length - this.n; i++) {
      let key = text.substring(i, i + this.n);
      let next = text.charAt(i + this.n);
      // Is this a new one?
      if (!this.keyele.hasOwnProperty(key)) {
        this.keyele[key] = [];
      }
      // Add to the list
      this.keyele[key].push(next);
    }
  }

  // Generate a text from the information keyeles
  generate() {

    // Get a random  beginning
    let current = this.beginnings.choice();
    let output = current;

    // Generate a new token max number of times
    for (let i = 0; i < this.max; i++) {
      // If this is a valid keyele
      if (this.keyele.hasOwnProperty(current)) {
        // What are all the possible next tokens
        let possible_next = this.keyele[current];
        // Pick one randomly
        let next = possible_next.choice();
        // Add to the output
        output += next;
        // Get the last N entries of the output; we'll use this to look up
        // an keyele in the next iteration of the loop
        current = output.substring(output.length - this.n, output.length);
      } else {
        break;
      }
    }
    // Here's what we got!
    return output;
  }
}

function generate() {
  // Generate some text
  let result = markov.generate();
  // Put in HTML line breaks wherever there was a carriage return
  result = result.replace('\n','<br/><br/>');
  createP(result);
}