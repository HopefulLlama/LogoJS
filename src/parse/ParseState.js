import CommandRegistry from '../instruction/CommandRegistry';
import ControlRegistry from '../instruction/ControlRegistry';
import Keywords from '../instruction/Keywords';
import ExecutionStack from './ExecutionStack';
import Parser from './Parser';
import ParseState from './ParseState';

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
  Parser.generateExecutions(routine.parseBody(parameters));
}

let routines = {};
let currentRoutineDefinition = null;

function getRoutines() {
  return routines;
}

function getCurrentRoutineDefinition() {
  return currentRoutineDefinition;
}

function setCurrentRoutineDefinition(routine) {
  currentRoutineDefinition = routine;
}

export default {
  EXECUTING_COMMANDS: (word, tokens) => {
    if(ControlRegistry[word] !== undefined) {
      getControlExecution(ControlRegistry[word], tokens).execute();
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
      Parser.setCurrentState(ParseState.DEFINING_ROUTINE_BODY);
    } else if(Object.values(Keywords).indexOf(word) !== -1) {
      throw new Error(`Keyword ${word} not allowed as routine parameter`);
    } else {
      currentRoutineDefinition.parameters.push(word);
    }
  },
  DEFINING_ROUTINE_BODY: (word, tokens) => {
    if(word === Keywords.ENDROUTINE) {
      Parser.setCurrentState(ParseState.EXECUTING_COMMANDS);
      routines[currentRoutineDefinition.name] = currentRoutineDefinition;
      currentRoutineDefinition = null;
    } else {
      currentRoutineDefinition.body.push(word);
    }
  }, 
  getRoutines,
  setCurrentRoutineDefinition
};