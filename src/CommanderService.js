angular.module('LogoApp').service('CommanderService', ['CommandFactory', 'ParameterService', function(CommandFactory, ParameterService) {
  let turtle, canvas;

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

  function tokenize(input) {
    return input.split("\n").join(" ").split(" ");
  }

  function generateTurtleFunctions(tokens) {
    let functions = [];

    while(tokens.length > 0) {
      let command = commands[tokens.shift()];
      if(command !== undefined) {
        let parameters = tokens.splice(0, command.parameterSchema.length);
        functions.push(command.createFunction(parameters));
      } else {
        throw new Error();        
      }
    }

    return functions;
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
    generateTurtleFunctions(tokenize(input))
    .forEach((func) => {
      func();
    });

    return this;
  };
}]);