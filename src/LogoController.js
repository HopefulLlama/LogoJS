angular.module('LogoApp').controller('LogoController', [
  '$scope', '$timeout', 'TurtleFactory', 'CanvasFactory', function($scope, $timeout, TurtleFactory, CanvasFactory) {
  	function instatiateDefaultTurtle(canvas) {
  		$scope.turtle = new TurtleFactory({
  			x: canvas.domElement.width / 2, 
  			y: canvas.domElement.height / 2
  		}, 180);
  	}

    angular.element(document).ready(function() {
      $scope.canvas = new CanvasFactory("canvas");
    });

    $scope.commands = {
      forward: (distance) => {
        let journey = $scope.turtle.move(distance);
        $scope.canvas.drawLine(journey);
      },
      back: (distance) => {
        let journey = $scope.turtle.move(0 - distance);
        $scope.canvas.drawLine(journey);
      },
      left: (degree) => {
        $scope.turtle.rotate(degree);
      },
      right: (degree) => {
        $scope.turtle.rotate(0 - degree);
      }
    };

    $scope.executeCommands = (input) => {
      instatiateDefaultTurtle($scope.canvas);
      $scope.canvas.context.clearRect(0, 0, $scope.canvas.domElement.width, $scope.canvas.domElement.height);
      if (input !== null) {
        let words = input.split("\n").join(" ").split(" ");
        let results = [];

        for(let i = 0; i < words.length; i++) {
        	if ($scope.commands[words[i]] !== undefined) {
        		$scope.commands[words[i]](parseInt(words[i+1], 10));
        		i++;
        	} 
        }
      }
    };
  }
]);