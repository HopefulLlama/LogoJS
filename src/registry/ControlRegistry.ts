import ParameterMap from '../parameter/ParameterMap';
import Instruction from '../instruction/Instruction';
import ParseState from '../parse/ParseState';
import Parser from '../parse/Parser';
import ExecutionStack from '../parse/ExecutionStack';
import Registry from './Registry';
import RoutineGenerator from '../instruction/RoutineGenerator';

let registry: Registry = new Registry();

registry.setItem('routine', new Instruction([ParameterMap.NOT_KEYWORD], (name: string): void => {
  RoutineGenerator.start();
  RoutineGenerator.setName(name);
  Parser.setCurrentState(ParseState.DEFINING_ROUTINE_PARAMETERS);
}));

registry.setItem('startroutine', new Instruction([], (): void => {
  throw new Error('startroutine called without routine');
}));

registry.setItem('endroutine', new Instruction([], (): void => {
  throw new Error('endroutine called without routine');
}));

registry.setItem('repeat', new Instruction([ParameterMap.POSITIVE_INTEGER], (frequency: number): void => {
  ExecutionStack.pushNewRepeat(frequency);
}));

registry.setItem('endrepeat', new Instruction([], (): void => {
  ExecutionStack.closeCurrentRepeat();
}));

export default registry;