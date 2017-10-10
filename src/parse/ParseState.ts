import MasterRegistry from '../registry/MasterRegistry';
import RoutineGenerator from '../instruction/RoutineGenerator';
import Keywords from '../instruction/Keywords';
import ExecutionStack from './ExecutionStack';
import Parser from './Parser';
import ParseState from './ParseState';
import ParameterValueMap from '../parameter/ParameterValueMap';

function getControlExecution(control: any, tokens: string[], parameterValueMap: ParameterValueMap): any {
  let parameters = parameterValueMap.substituteParameters(tokens.splice(0, control.parameterSchema.length));
  return control.createExecution(parameters);
}

function getInstructionExecution(command: any, tokens: string[], parameterValueMap: ParameterValueMap): any {
  let parameters = parameterValueMap.substituteParameters(tokens.splice(0, command.parameterSchema.length));
  return command.createExecution(parameters);
}

function getRoutineExecution(routine: any, tokens: string[], parameterValueMap: ParameterValueMap): any {
  let parameters = tokens.splice(0, routine.parameters.length);
  let newParameterValueMap = routine.createParameterValueMap(parameters);
  Parser.generateExecutions(routine.getBody(), newParameterValueMap);
}

export default {
  EXECUTING_COMMANDS: (word: string, tokens: string[], parameterValueMap: ParameterValueMap) => {
    if(MasterRegistry.control.getItem(word) !== undefined) {
      getControlExecution(MasterRegistry.control.getItem(word), tokens, parameterValueMap).execute();
    } else if(MasterRegistry.command.getItem(word) !== undefined) {
      ExecutionStack.pushExecution(getInstructionExecution(MasterRegistry.command.getItem(word), tokens, parameterValueMap));
    } else if(MasterRegistry.routine.getItem(word) !== undefined) {
      getRoutineExecution(MasterRegistry.routine.getItem(word), tokens, parameterValueMap);
    } else {
      throw new Error(`Control or Command not found: ${word}`);
    }
  },
  DEFINING_ROUTINE_PARAMETERS: (word: string, tokens: string[], parameterValueMap: ParameterValueMap) => {
    if(word === Keywords.STARTROUTINE) {
      Parser.setCurrentState(ParseState.DEFINING_ROUTINE_BODY);
    } else if(Object.values(Keywords).indexOf(word) !== -1) {
      throw new Error(`Keyword ${word} not allowed as routine parameter`);
    } else {
      RoutineGenerator.addParameter(word);
    }
  },
  DEFINING_ROUTINE_BODY: (word: string, tokens: string[], parameterValueMap: ParameterValueMap) => {
    if(word === Keywords.ENDROUTINE) {
      Parser.setCurrentState(ParseState.EXECUTING_COMMANDS);
      let routine = RoutineGenerator.generateRoutine();
      MasterRegistry.routine.setItem(routine.name, routine);
    } else {
      RoutineGenerator.addToBody(word);
    }
  }
};