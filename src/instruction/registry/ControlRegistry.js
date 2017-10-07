import Parameter from '../Parameter';
import Instruction from '../Instruction';
import ParseState from '../../parse/ParseState';
import Parser from '../../parse/Parser';
import ExecutionStack from '../../parse/ExecutionStack';
import Registry from './Registry';
import RoutineGenerator from '../RoutineGenerator';

let registry = new Registry();

registry.setItem('routine', new Instruction([Parameter.NOT_KEYWORD], (name) => {
  RoutineGenerator.start();
  RoutineGenerator.setName(name);
  Parser.setCurrentState(ParseState.DEFINING_ROUTINE_PARAMETERS);
}));

registry.setItem('startroutine', new Instruction([], () => {
  throw new Error('startroutine called without routine');
}));

registry.setItem('endroutine', new Instruction([], () => {
  throw new Error('endroutine called without routine');
}));

registry.setItem('repeat', new Instruction([Parameter.FINITE_NUMBER], (frequency) => {
  ExecutionStack.pushNewRepeat(frequency);
}));

registry.setItem('endrepeat', new Instruction([], () => {
  ExecutionStack.closeCurrentRepeat();
}));

export default registry;