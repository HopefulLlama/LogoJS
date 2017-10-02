export default class Command {
  constructor(parameterSchema, execute) {
    this.parameterSchema = parameterSchema;
    this.execute = execute;
  }

  valid(parameters) {
    return (this.parameterSchema.length === parameters.length && 
      this.parameterSchema.every((item, index) => {
        return item.validate(parameters[index]);
      })
    );
  }

  createExecution(parameters) {
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
