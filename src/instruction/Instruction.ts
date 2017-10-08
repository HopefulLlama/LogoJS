import Parameter from '../parameter/Parameter';
import Executeable from './Executeable';

export default class Instruction {
  parameterSchema: Parameter[];
  execute: Function;

  constructor(parameterSchema: Parameter[], execute: Function) {
    this.parameterSchema = parameterSchema;
    this.execute = execute;
  }

  valid(parameters: any[]): boolean {
    return (this.parameterSchema.length === parameters.length && 
      this.parameterSchema.every((item, index) => {
        return item.validate(parameters[index]);
      })
    );
  }

  createExecution(parameters: any[]): Executeable {
    if(this.valid(parameters)) {

      return new Executeable(() => {
        parameters = parameters.map((parameter, index) => {
          return this.parameterSchema[index].transform(parameter);
        });
        return this.execute(...parameters);
      });
      
    } else {
      throw new Error(`Invalid parameters: ${parameters}`);
    }
  }
}
