import ExecutionStack from './ExecutionStack';
import Keywords from '../instruction/Keywords';
import ParseState from './ParseState';

let currentState = ParseState.EXECUTING_COMMANDS;

function tokenize(input) {
  return input.split("\n").join(" ").split(" ");
}

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
  generateExecutions(tokenize(input));

  return () => {
    return ExecutionStack.execute();
  };
}

function setCurrentState(state) {
  currentState = state;
}

export default {reset, parse, setCurrentState, generateExecutions};