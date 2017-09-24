angular.module('LogoApp').controller('LogoController', [
  '$scope', '$timeout', 'TurtleFactory', 'CanvasFactory', function($scope, $timeout, TurtleFactory, CanvasFactory) {
    let turtle, canvas;
  	function instatiateDefaultTurtle(canvas) {
  		turtle = new TurtleFactory({
  			x: canvas.domElement.width / 2, 
  			y: canvas.domElement.height / 2
  		}, 180);
  	}

    angular.element(document).ready(function() {
      canvas = new CanvasFactory("canvas");
      $('#input').focus();
    });

    let commands = {
      forward: (distance) => {
        let journey = turtle.move(distance);
        canvas.drawLine(journey);
      },
      back: (distance) => {
        let journey = turtle.move(0 - distance);
        canvas.drawLine(journey);
      },
      left: (degree) => {
        turtle.rotate(degree);
      },
      right: (degree) => {
        turtle.rotate(0 - degree);
      }
    };

    $scope.executeCommands = (input) => {
      instatiateDefaultTurtle(canvas);
      canvas.clear();
      if (input !== null) {
        let words = input.split("\n").join(" ").split(" ");
        let results = [];

        for(let i = 0; i < words.length; i++) {
        	if (commands[words[i]] !== undefined) {
        		commands[words[i]](parseInt(words[i+1], 10));
        		i++;
        	} 
        }
      }
    };
  }
]);