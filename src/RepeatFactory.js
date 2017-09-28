angular.module('LogoApp').factory('RepeatFactory', [function() {
  class Repeat {
    constructor(parent, frequency) {
      this.parent = parent;
      this.frequency = frequency;
      this.executions = [];
    }

    execute() {
      let journey = [];

      /* jshint ignore:start */
      for(let i = 0; i < this.frequency; i++) {
        journey = this.executions.reduce((accumulator, execution) => {
          let partial = execution.execute();

          if(Array.isArray(partial)) {
            accumulator = accumulator.concat(partial);
          } else {
            accumulator.push(partial);
          }

          return accumulator;
        }, journey);
      }

      return journey;
      /* jshint ignore:end */
    }
  }

  return Repeat;
}]);