angular.module('LogoApp').factory('CommandFactory', [function() {
  class Command {
    constructor(parameterSchema, execution) {
      this.parameterSchema = parameterSchema;
      this.execution = execution;
    }

    createFunction(parameters) {
      if(this.parameterSchema.every((item, index) => {
        return item(parameters[index]);
      })) {
        return () => {
          this.execution(...parameters);
        };
      } else {
        throw new Error();
      }
    }
  }

  return Command;
}]);