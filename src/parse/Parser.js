import Command from '../instruction/Command';
import CommandRegistry from '../instruction/CommandRegistry';
import Parameter from '../instruction/Parameter';
import Repeat from '../instruction/Repeat';
import Routine from '../instruction/Routine';
import ExecutionStack from './ExecutionStack';

let currentRoutineDefinition;

let routines = {};

const STATE = {
  EXECUTING_COMMANDS: (word, tokens) => {
    if(controls[word] !== undefined) {
      getControlExecution(controls[word], tokens).execute();
    } else if(CommandRegistry[word] !== undefined) {
      ExecutionStack.pushExecution(getCommandExecution(CommandRegistry[word], tokens));
    } else if(routines[word] !== undefined) {
      getRoutineExecution(routines[word], tokens);
    } else {
      throw new Error(`Control or Command not found: ${word}`);
    }
  },
  DEFINING_ROUTINE_PARAMETERS: (word, tokens) => {
    if(word !== 'startroutine') {
      currentRoutineDefinition.parameters.push(word);
    } else {
      currentState = STATE.DEFINING_ROUTINE_BODY;
    }
  },
  DEFINING_ROUTINE_BODY: (word, tokens) => {
    if(word !== 'endroutine') {
      currentRoutineDefinition.body.push(word);
    } else {
      currentState = STATE.EXECUTING_COMMANDS;
      routines[currentRoutineDefinition.name] = currentRoutineDefinition;
      currentRoutineDefinition = undefined;
    }
  }
};

let currentState = STATE.EXECUTING_COMMANDS;

let routine = new Command([Parameter.NOT_KEYWORD], (name) => {
  currentRoutineDefinition = new Routine(name);
  currentState = STATE.DEFINING_ROUTINE_PARAMETERS;
});

let startroutine = new Command([], () => {
  throw new Error('startroutine called without routine');
});

let endroutine = new Command([], () => {
  throw new Error('endroutine called without routine');
});

let repeat = new Command([Parameter.FINITE_NUMBER], (frequency) => {
  ExecutionStack.pushNewRepeat(frequency);
});

let endrepeat = new Command([], () => {
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

function getCommandExecution(command, tokens) {
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
}

function parse(input) {
  ExecutionStack.instantiate();
  generateTurtleExecutions(tokenize(input));

  return () => {
    return ExecutionStack.execute();
  };
}

export default {reset, parse};