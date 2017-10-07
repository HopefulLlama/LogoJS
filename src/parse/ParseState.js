import MasterRegistry from '../instruction/registry/MasterRegistry';
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

let currentRoutineDefinition = null;

function getCurrentRoutineDefinition() {
  return currentRoutineDefinition;
}

function setCurrentRoutineDefinition(routine) {
  currentRoutineDefinition = routine;
}

export default {
  EXECUTING_COMMANDS: (word, tokens) => {
    if(MasterRegistry.control.getItem(word) !== undefined) {
      getControlExecution(MasterRegistry.control.getItem(word), tokens).execute();
    } else if(MasterRegistry.command.getItem(word) !== undefined) {
      ExecutionStack.pushExecution(getInstructionExecution(MasterRegistry.command.getItem(word), tokens));
    } else if(MasterRegistry.routine.getItem(word) !== undefined) {
      getRoutineExecution(MasterRegistry.routine.getItem(word), tokens);
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
      MasterRegistry.routine.setItem(currentRoutineDefinition.name, currentRoutineDefinition);
      currentRoutineDefinition = null;
    } else {
      currentRoutineDefinition.body.push(word);
    }
  }, 
  getCurrentRoutineDefinition,
  setCurrentRoutineDefinition
};