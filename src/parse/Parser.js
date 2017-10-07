import ExecutionStack from './ExecutionStack';
import Keywords from '../instruction/Keywords';
import ParseState from './ParseState';
import Tokenizer from './Tokenizer';

let currentState = ParseState.EXECUTING_COMMANDS;

function generateExecutions(tokens) {
  while(tokens.length > 0) {
    currentState(tokens.shift(), tokens);
  }
}

function reset() {
  ParseState.routines = {};
  currentState = ParseState.EXECUTING_COMMANDS;
}

function parse(input) {
  ExecutionStack.instantiate();
  generateExecutions(Tokenizer.tokenize(input));

  return () => {
    return ExecutionStack.execute();
  };
}

function setCurrentState(state) {
  currentState = state;
}

export default {reset, parse, setCurrentState, generateExecutions};