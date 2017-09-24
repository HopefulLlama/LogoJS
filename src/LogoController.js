angular.module('LogoApp').controller('LogoController', [
  '$scope', '$timeout', 'TurtleFactory', 'CanvasFactory', 'CommanderService', function($scope, $timeout, TurtleFactory, CanvasFactory, CommanderService) {
    let turtle, canvas, commander;
  	function instatiateDefaultTurtle(canvas) {
  		turtle = new TurtleFactory({
  			x: canvas.domElement.width / 2, 
  			y: canvas.domElement.height / 2
  		}, 180);
      CommanderService.setTurtle(turtle);
  	}

    angular.element(document).ready(function() {
      canvas = new CanvasFactory("canvas");
      CommanderService.setCanvas(canvas);
      $('#input').focus();
    });

    $scope.executeCommands = (input) => {
      instatiateDefaultTurtle(canvas);
      canvas.clear();
      if (input !== null) {
        CommanderService.executeCommands(input);
      }
    };
  }
]);