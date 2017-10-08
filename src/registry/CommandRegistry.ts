import ParameterMap from '../parameter/ParameterMap';
import Instruction from '../instruction/Instruction';
import Turtle from '../turtle/Turtle';
import Registry from './Registry';

let registry: Registry = new Registry();

registry.setItem('forward', new Instruction([ParameterMap.FINITE_NUMBER], (distance: number): Object => {
  return Turtle.move(distance);
}));

registry.setItem('back', new Instruction([ParameterMap.FINITE_NUMBER], (distance: number): Object => {
  return Turtle.move(0 - distance);
}));

registry.setItem('left', new Instruction([ParameterMap.FINITE_NUMBER], (degree: number): Object => {
  return Turtle.rotate(degree);
}));

registry.setItem('right',new Instruction([ParameterMap.FINITE_NUMBER], (degree: number): Object => {
  return Turtle.rotate(0 - degree);
}));

registry.setItem('pen', new Instruction([ParameterMap.UP_DOWN], (pen: string): Object => {
  Turtle.penDown = (pen === 'down');
  return Turtle.getCopy();
}));

export default registry;