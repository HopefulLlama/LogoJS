angular.module('LogoApp').factory('CommandFactory', [function() {
  class Command {
    constructor(parameterSchema, execute) {
      this.parameterSchema = parameterSchema;
      this.execute = execute;
    }

    createExecution(parameters) {
      if(this.parameterSchema.every((item, index) => {
        return item(parameters[index]);
      })) {
        return {
          execute: () => {
            this.execute(...parameters);
          }
        };
      } else {
        throw new Error();
      }
    }
  }

  return Command;
}]);