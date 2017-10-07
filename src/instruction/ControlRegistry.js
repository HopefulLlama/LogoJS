import Parameter from './Parameter';
import Instruction from './Instruction';
import ParseState from '../parse/ParseState';
import Parser from '../parse/Parser';
import Routine from './Routine';
import ExecutionStack from '../parse/ExecutionStack';

let routine = new Instruction([Parameter.NOT_KEYWORD], (name) => {
  ParseState.setCurrentRoutineDefinition(new Routine(name));
  Parser.setCurrentState(ParseState.DEFINING_ROUTINE_PARAMETERS);
});

let startroutine = new Instruction([], () => {
  throw new Error('startroutine called without routine');
});

let endroutine = new Instruction([], () => {
  throw new Error('endroutine called without routine');
});

let repeat = new Instruction([Parameter.FINITE_NUMBER], (frequency) => {
  ExecutionStack.pushNewRepeat(frequency);
});

let endrepeat = new Instruction([], () => {
  ExecutionStack.closeCurrentRepeat();
});

export default {repeat, endrepeat, routine, startroutine, endroutine};