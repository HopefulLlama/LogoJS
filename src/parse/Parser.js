import Command from '../Command';
import CommandRegistry from '../CommandRegistry';
import Parameter from '../Parameter';
import Repeat from '../Repeat';
import Routine from '../Routine';

let currentRepeat, masterRepeat, currentRoutineDefinition;

let routines = {};

const STATE = {
  EXECUTING_COMMANDS: (word, tokens) => {
    if(controls[word] !== undefined) {
      getControlExecution(controls[word], tokens).execute();
    } else if(CommandRegistry[word] !== undefined) {
      currentRepeat.executions.push(getCommandExecution(CommandRegistry[word], tokens));
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
  let newRepeat = new Repeat(currentRepeat, frequency);
  currentRepeat.executions.push(newRepeat);
  currentRepeat = newRepeat;
});

let endrepeat = new Command([], () => {
  if(currentRepeat.parent === null) {
    throw new Error('endrepeat called without matching repeat');
  }
  currentRepeat = currentRepeat.parent;
});

let controls = {repeat, endrepeat, routine, startroutine, endroutine};

function instantiateLoops() {
  currentRepeat = new Repeat(null, 1);
  masterRepeat = currentRepeat; 
}

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
  instantiateLoops();
  generateTurtleExecutions(tokenize(input));

  if(currentRepeat === masterRepeat) {
    return () => {
      return masterRepeat.execute();
    };
  } else {
    throw new Error('Unclosed repeat defined');
  }
}

export default {reset, parse};