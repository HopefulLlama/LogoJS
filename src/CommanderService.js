angular.module('LogoApp').service('CommanderService', [function() {
  let turtle, canvas;

  function forward(distance) {
    let journey = turtle.move(distance);
    canvas.drawLine(journey);
  }

  function back(distance) {
    let journey = turtle.move(0 - distance);
    canvas.drawLine(journey);
  }

  function left(degree) {
    turtle.rotate(degree);
  }

  function right(degree) {
    turtle.rotate(0 - degree);
  }

  let commands = {forward, back, left, right};

  this.setTurtle = (t) => {
    turtle = t;
    return this;
  };

  this.setCanvas = (c) => {
    canvas = c;
    return this;
  };

  this.executeCommands = (input) => {
    let words = input.split("\n").join(" ").split(" ");
    let results = [];

    for(let i = 0; i < words.length; i++) {
      if (commands[words[i]] !== undefined) {
        commands[words[i]](parseInt(words[i+1], 10));
        i++;
      } 
    }

    return this;
  };
}]);