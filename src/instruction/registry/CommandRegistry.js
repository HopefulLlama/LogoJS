import Parameter from '../Parameter';
import Instruction from '../Instruction';
import Turtle from '../../turtle/Turtle';
import Registry from './Registry';

let registry = new Registry();

registry.setItem('forward', new Instruction([Parameter.FINITE_NUMBER], (distance) => {
  return Turtle.move(distance);
}));

registry.setItem('back', new Instruction([Parameter.FINITE_NUMBER], (distance) => {
  return Turtle.move(0 - distance);
}));

registry.setItem('left', new Instruction([Parameter.FINITE_NUMBER], (degree) => {
  return Turtle.rotate(degree);
}));

registry.setItem('right',new Instruction([Parameter.FINITE_NUMBER], (degree) => {
  return Turtle.rotate(0 - degree);
}));

registry.setItem('pen', new Instruction([Parameter.UP_DOWN], (pen) => {
  Turtle.penDown = (pen === 'down');
  return Turtle.getCopy();
}));

export default registry;