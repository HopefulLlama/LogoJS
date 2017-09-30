import Command from './Command';
import Parameter from './Parameter';
import Repeat from './Repeat';
import Turtle from './Turtle';
import Position from './Position';

let turtle, currentRepeat, masterRepeat;

let forward = new Command([Parameter.FINITE_NUMBER], (distance) => {
  return turtle.move(distance);
});

let back = new Command([Parameter.FINITE_NUMBER], (distance) => {
  return turtle.move(0 - distance);
});

let left = new Command([Parameter.FINITE_NUMBER], (degree) => {
  return turtle.rotate(degree);
});

let right = new Command([Parameter.FINITE_NUMBER], (degree) => {
  return turtle.rotate(0 - degree);
});

let commands = {forward, back, left, right};

let repeat = new Command([Parameter.FINITE_NUMBER], (frequency) => {
  let newRepeat = new Repeat(currentRepeat, frequency);
  currentRepeat.executions.push(newRepeat);
  currentRepeat = newRepeat;
});

let endrepeat = new Command([], () => {
  if(currentRepeat.parent === null) {
    throw new Error('endrepeat called without matching repeat');
  }
  currentRepeat = currentRepeat.parent;
});

let controls = {repeat, endrepeat};

function instantiateLoops() {
  currentRepeat = new Repeat(null, 1);
  masterRepeat = currentRepeat; 
}

function tokenize(input) {
  return input.split("\n").join(" ").split(" ");
}

function generateTurtleExecutions(tokens) {
  while(tokens.length > 0) {
    let word = tokens.shift();

    let control = controls[word];
    let command = commands[word];

    if(control !== undefined) {
      let parameters = tokens.splice(0, control.parameterSchema.length);
      control.createExecution(parameters).execute();
    } else if(command !== undefined) {
      let parameters = tokens.splice(0, command.parameterSchema.length);
      currentRepeat.executions.push(command.createExecution(parameters));
    } else {
      throw new Error(`Control or Command not found: ${word}`);        
    }
  }
}

function reset() {
  turtle = undefined;
}

function setPosition(position) {
  turtle = new Turtle(new Position(
    position.x,
    position.y,
    position.angle
  ));
  return this;
}

function getPosition() {
	if(turtle !== undefined) {
		return turtle.position;
	} else {
		return null;
	}
}

function execute(input) {
  if(turtle === undefined) {
    turtle = new Turtle(new Position(0, 0, 180));
  }

  instantiateLoops();
  generateTurtleExecutions(tokenize(input));

  let journey = [turtle.position];

  if(currentRepeat === masterRepeat) {
    return journey.concat(masterRepeat.execute());
  } else {
    throw new Error('Unclosed repeat defined');
  }

  reset();
}

export default {reset, setPosition, getPosition, execute};