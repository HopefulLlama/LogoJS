import Instruction from '../instruction/Instruction';
import CommandRegistry from '../instruction/CommandRegistry';
import Parameter from '../instruction/Parameter';
import Repeat from '../instruction/Repeat';
import Routine from '../instruction/Routine';
import ExecutionStack from './ExecutionStack';
import Keywords from '../instruction/Keywords';

let currentRoutineDefinition;

let routines = {};

const STATE = {
  EXECUTING_COMMANDS: (word, tokens) => {
    if(controls[word] !== undefined) {
      getControlExecution(controls[word], tokens).execute();
    } else if(CommandRegistry[word] !== undefined) {
      ExecutionStack.pushExecution(getInstructionExecution(CommandRegistry[word], tokens));
    } else if(routines[word] !== undefined) {
      getRoutineExecution(routines[word], tokens);
    } else {
      throw new Error(`Control or Command not found: ${word}`);
    }
  },
  DEFINING_ROUTINE_PARAMETERS: (word, tokens) => {
    if(word === Keywords.STARTROUTINE) {
      currentState = STATE.DEFINING_ROUTINE_BODY;
    } else if(Object.values(Keywords).indexOf(word) !== -1) {
      throw new Error(`Keyword ${word} not allowed as routine parameter`);
    } else {
      currentRoutineDefinition.parameters.push(word);
    }
  },
  DEFINING_ROUTINE_BODY: (word, tokens) => {
    if(word === Keywords.ENDROUTINE) {
      currentState = STATE.EXECUTING_COMMANDS;
      routines[currentRoutineDefinition.name] = currentRoutineDefinition;
      currentRoutineDefinition = undefined;
    } else {
      currentRoutineDefinition.body.push(word);
    }
  }
};

let currentState = STATE.EXECUTING_COMMANDS;

let routine = new Instruction([Parameter.NOT_KEYWORD], (name) => {
  currentRoutineDefinition = new Routine(name);
  currentState = STATE.DEFINING_ROUTINE_PARAMETERS;
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

let controls = {repeat, endrepeat, routine, startroutine, endroutine};

function tokenize(input) {
  return input.split("\n").join(" ").split(" ");
}

function getControlExecution(control, tokens) {
  let parameters = tokens.splice(0, control.parameterSchema.length);
  return control.createExecution(parameters);
}

function getInstructionExecution(command, tokens) {
  let parameters = tokens.splice(0, command.parameterSchema.length);
  return command.createExecution(parameters);
}

function getRoutineExecution(routine, tokens) {
  let parameters = tokens.splice(0, routine.parameters.length);
  generateTurtleExecutions(routine.parseBody(parameters));
}

function generateTurtleExecutions(tokens) {
  while(tokens.length > 0) {
    currentState(tokens.shift(), tokens);
  }
}

function reset() {
  routines = {};
  currentState = STATE.EXECUTING_COMMANDS;
}

function parse(input) {
  ExecutionStack.instantiate();
  generateTurtleExecutions(tokenize(input));

  return () => {
    return ExecutionStack.execute();
  };
}

export default {reset, parse};