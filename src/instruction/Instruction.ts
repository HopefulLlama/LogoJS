import Parameter from './Parameter';

export default class Instruction {
  parameterSchema: any[];
  execute: Function;

  constructor(parameterSchema: any[], execute: Function) {
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

  createExecution(parameters: any[]): any {
    if(this.valid(parameters)) {
      return {
        execute: () => {
          parameters = parameters.map((parameter, index) => {
            return this.parameterSchema[index].transform(parameter);
          });
          return this.execute(...parameters);
        }
      };
    } else {
      throw new Error(`Invalid parameters: ${parameters}`);
    }
  }
}
