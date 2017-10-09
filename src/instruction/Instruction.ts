import Parameter from '../parameter/Parameter';
import Executeable from './Executeable';

export default class Instruction {
  parameterSchema: Parameter[];
  execute: Function;

  constructor(parameterSchema: Parameter[], execute: Function) {
    this.parameterSchema = parameterSchema;
    this.execute = execute;
  }

  createExecution(parameters: any[]): Executeable {
    return new Executeable(() => {
      parameters = parameters.map((parameter, index) => {
        return this.parameterSchema[index].validateAndTransform(parameter);
      });
      return this.execute(...parameters);
    });
  }
}
