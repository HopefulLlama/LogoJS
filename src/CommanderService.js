angular.module('LogoApp').service('CommanderService', ['CommandFactory', 'CommandFactory', 'ParameterService', 'LoopFactory', function(CommandFactory, ControlFactory, ParameterService, LoopFactory) {
  let turtle, canvas, currentLoop, masterLoop;

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

  let loop = new CommandFactory([ParameterService.FINITE_NUMBER], (frequency) => {
    let newLoop = new LoopFactory(currentLoop, frequency);
    currentLoop.executions.push(newLoop);
    currentLoop = newLoop;
  });

  let endloop = new CommandFactory([], () => {
    currentLoop = currentLoop.parent;
  });

  let controls = {loop, endloop};

  function instantiateLoops() {
    currentLoop = new LoopFactory(null, 1);
    masterLoop = currentLoop; 
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
        currentLoop.executions.push(command.createExecution(parameters));
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

    if(currentLoop === masterLoop) {
      masterLoop.execute();
    } else {
      throw new Error('Unclosed loop defined');
    }
  };
}]);