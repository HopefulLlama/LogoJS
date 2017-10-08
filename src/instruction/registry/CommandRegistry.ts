import Parameter from '../Parameter';
import Instruction from '../Instruction';
import Turtle from '../../turtle/Turtle';
import Registry from './Registry';

let registry: Registry = new Registry();

registry.setItem('forward', new Instruction([Parameter.FINITE_NUMBER], (distance: number): Object => {
  return Turtle.move(distance);
}));

registry.setItem('back', new Instruction([Parameter.FINITE_NUMBER], (distance: number): Object => {
  return Turtle.move(0 - distance);
}));

registry.setItem('left', new Instruction([Parameter.FINITE_NUMBER], (degree: number): Object => {
  return Turtle.rotate(degree);
}));

registry.setItem('right',new Instruction([Parameter.FINITE_NUMBER], (degree: number): Object => {
  return Turtle.rotate(0 - degree);
}));

registry.setItem('pen', new Instruction([Parameter.UP_DOWN], (pen: string): Object => {
  Turtle.penDown = (pen === 'down');
  return Turtle.getCopy();
}));

export default registry;