angular.module('LogoApp').controller('LogoController', [
  '$scope', '$timeout', 'TurtleFactory', 'PositionFactory', 'CanvasFactory', 'CommanderService', function($scope, $timeout, TurtleFactory, PositionFactory, CanvasFactory, CommanderService) {
    let turtle, canvas, commander;
    function instatiateDefaultTurtle(canvas) {
      turtle = new TurtleFactory(new PositionFactory(
        canvas.domElement.width / 2,
        canvas.domElement.height / 2,
        180
      ));
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
        let journey = CommanderService.executeCommands(input);

        for(let i = 0; i < journey.length - 1; i++) {
          canvas.drawLine({
            start: journey[i],
            end: journey[i+1]
          });
        }
      }
    };
  }
]);