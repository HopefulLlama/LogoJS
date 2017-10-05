import Parameter from './Parameter';
import Command from './Command';
import Turtle from '../turtle/Turtle';

let forward = new Command([Parameter.FINITE_NUMBER], (distance) => {
  return Turtle.move(distance);
});

let back = new Command([Parameter.FINITE_NUMBER], (distance) => {
  return Turtle.move(0 - distance);
});

let left = new Command([Parameter.FINITE_NUMBER], (degree) => {
  return Turtle.rotate(degree);
});

let right = new Command([Parameter.FINITE_NUMBER], (degree) => {
  return Turtle.rotate(0 - degree);
});

let pen = new Command([Parameter.UP_DOWN], (pen) => {
  Turtle.penDown = (pen === 'down');
  return Turtle.getCopy();
});

export default {forward, back, left, right, pen};