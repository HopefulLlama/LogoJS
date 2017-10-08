import Turtle from './turtle/Turtle';
import Position from './turtle/Position';
import Parser from './parse/Parser';

function reset(): Object {
  Turtle.reset(new Position(0, 0, 180), true);
  Parser.reset();
  return this;
}

function setPosition(position: any): Object {
  Turtle.position = new Position(position.x, position.y, position.angle);
  return this;
}

function getPosition(): Position {
	return Turtle.position;
}

function execute(input: string): any[] {
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