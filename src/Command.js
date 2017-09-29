export default class Command {
  constructor(parameterSchema, execute) {
    this.parameterSchema = parameterSchema;
    this.execute = execute;
  }

  valid(parameters) {
    return this.parameterSchema.every((item, index) => {
      return item(parameters[index]);
    });
  }

  createExecution(parameters) {
    if(this.valid(parameters)) {
      return {
        execute: () => {
          return this.execute(...parameters);
        }
      };
    } else {
      throw new Error();
    }
  }
}
