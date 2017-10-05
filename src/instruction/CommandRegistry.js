import Parameter from './Parameter';
import Instruction from './Instruction';
import Turtle from '../turtle/Turtle';

let forward = new Instruction([Parameter.FINITE_NUMBER], (distance) => {
  return Turtle.move(distance);
});

let back = new Instruction([Parameter.FINITE_NUMBER], (distance) => {
  return Turtle.move(0 - distance);
});

let left = new Instruction([Parameter.FINITE_NUMBER], (degree) => {
  return Turtle.rotate(degree);
});

let right = new Instruction([Parameter.FINITE_NUMBER], (degree) => {
  return Turtle.rotate(0 - degree);
});

let pen = new Instruction([Parameter.UP_DOWN], (pen) => {
  Turtle.penDown = (pen === 'down');
  return Turtle.getCopy();
});

export default {forward, back, left, right, pen};