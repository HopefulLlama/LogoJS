angular.module('LogoApp').service('CommanderService', ['CommandFactory', 'CommandFactory', 'ParameterService', 'RepeatFactory', function(CommandFactory, ControlFactory, ParameterService, RepeatFactory) {
  let turtle, canvas, currentRepeat, masterRepeat;

  let forward = new CommandFactory([ParameterService.FINITE_NUMBER], (distance) => {
    let journey = turtle.move(distance);
    canvas.drawLine(journey);
  });

  let back = new CommandFactory([ParameterService.FINITE_NUMBER], (distance) => {
    let journey = turtle.move(0 - distance);
    canvas.drawLine(journey);
  });

  let left = new CommandFactory([ParameterService.FINITE_NUMBER], (degree) => {
    turtle.rotate(degree);
  });

  let right = new CommandFactory([ParameterService.FINITE_NUMBER], (degree) => {
    turtle.rotate(0 - degree);
  });

  let commands = {forward, back, left, right};

  let repeat = new CommandFactory([ParameterService.FINITE_NUMBER], (frequency) => {
    let newRepeat = new RepeatFactory(currentRepeat, frequency);
    currentRepeat.executions.push(newRepeat);
    currentRepeat = newRepeat;
  });

  let endrepeat = new CommandFactory([], () => {
    currentRepeat = currentRepeat.parent;
  });

  let controls = {repeat, endrepeat};

  function instantiateLoops() {
    currentRepeat = new RepeatFactory(null, 1);
    masterRepeat = currentRepeat; 
  }

  function tokenize(input) {
    return input.split("\n").join(" ").split(" ");
  }

  function generateTurtleExecutions(tokens) {
    while(tokens.length > 0) {
      let word = tokens.shift();

      let control = controls[word];
      let command = commands[word];

      if(control !== undefined) {
        let parameters = tokens.splice(0, control.parameterSchema.length);
        control.createExecution(parameters).execute();
      } else if(command !== undefined) {
        let parameters = tokens.splice(0, command.parameterSchema.length);
        currentRepeat.executions.push(command.createExecution(parameters));
      } else {
        throw new Error(`Control or Command not found: ${word}`);        
      }
    }
  }

  this.setTurtle = (t) => {
    turtle = t;
    return this;
  };

  this.setCanvas = (c) => {
    canvas = c;
    return this;
  };

  this.executeCommands = (input) => {
    instantiateLoops();
    generateTurtleExecutions(tokenize(input));

    if(currentRepeat === masterRepeat) {
      masterRepeat.execute();
    } else {
      throw new Error('Unclosed loop defined');
    }
  };
}]);