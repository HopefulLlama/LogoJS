import ExecutionStack from './ExecutionStack';
import Keywords from '../instruction/Keywords';
import ParseState from './ParseState';
import Tokenizer from './Tokenizer';
import MasterRegistry from '../registry/MasterRegistry';
import ParameterValueMap from '../parameter/ParameterValueMap';

let currentState: Function = ParseState.EXECUTING_COMMANDS;

function generateExecutions(tokens: string[], parameterValueMap: ParameterValueMap): void {
  while(tokens.length > 0) {
    currentState(tokens.shift(), tokens, parameterValueMap);
  }
}

function reset(): void {
  MasterRegistry.routine.reset();
  currentState = ParseState.EXECUTING_COMMANDS;
}

function parse(input: string): Function {
  ExecutionStack.instantiate();
  generateExecutions(Tokenizer.tokenize(input), new ParameterValueMap(new Map()));

  return () => {
    return ExecutionStack.execute();
  };
}

function setCurrentState(state: Function): void {
  currentState = state;
}

export default {reset, parse, setCurrentState, generateExecutions};