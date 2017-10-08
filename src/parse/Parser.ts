import ExecutionStack from './ExecutionStack';
import Keywords from '../instruction/Keywords';
import ParseState from './ParseState';
import Tokenizer from './Tokenizer';
import MasterRegistry from '../instruction/registry/MasterRegistry';

let currentState: Function = ParseState.EXECUTING_COMMANDS;

function generateExecutions(tokens: string[]): void {
  while(tokens.length > 0) {
    currentState(tokens.shift(), tokens);
  }
}

function reset(): void {
  MasterRegistry.routine.reset();
  currentState = ParseState.EXECUTING_COMMANDS;
}

function parse(input: string): Function {
  ExecutionStack.instantiate();
  generateExecutions(Tokenizer.tokenize(input));

  return () => {
    return ExecutionStack.execute();
  };
}

function setCurrentState(state: Function): void {
  currentState = state;
}

export default {reset, parse, setCurrentState, generateExecutions};