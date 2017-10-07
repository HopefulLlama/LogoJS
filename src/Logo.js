import Turtle from './turtle/Turtle';
import Position from './turtle/Position';
import Parser from './parse/Parser';

function reset() {
  Turtle.reset();
  Parser.reset();
  return this;
}

function setPosition(position) {
  Turtle.position = new Position(position.x, position.y, position.angle);
  return this;
}

function getPosition() {
	return Turtle.position;
}

function execute(input) {
  try {
    let journey = [Turtle.getCopy()];

    let execution = Parser.parse(input);
    journey = journey.concat(execution());

    reset();

    return journey;
  } catch(error) {
    reset();

    throw error;
  }
}

export default {reset, setPosition, getPosition, execute};