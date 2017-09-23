angular.module('LogoApp').controller('LogoController', [
  '$scope', '$timeout', 'TurtleFactory', 'CanvasFactory', function($scope, $timeout, TurtleFactory, CanvasFactory) {
    var instatiateDefaultTurtle;
    instatiateDefaultTurtle = function(canvas) {
      var x, y;
      x = canvas.domElement.width / 2;
      y = canvas.domElement.height / 2;
      return $scope.turtle = new TurtleFactory(x, y);
    };
    angular.element(document).ready(function() {
      return $scope.canvas = new CanvasFactory("canvas");
    });
    $scope.commands = {
      forward: function(distance) {
        var journey;
        journey = $scope.turtle.move(distance);
        return $scope.canvas.drawLine(journey);
      },
      back: function(distance) {
        var journey;
        journey = $scope.turtle.move(0 - distance);
        return $scope.canvas.drawLine(journey);
      },
      left: function(degree) {
        return $scope.turtle.rotate(degree);
      },
      right: function(degree) {
        return $scope.turtle.rotate(0 - degree);
      }
    };
    return $scope.executeCommands = function(input) {
      var commands, i, j, lines, ref, results, words;
      instatiateDefaultTurtle($scope.canvas);
      $scope.canvas.context.clearRect(0, 0, $scope.canvas.domElement.width, $scope.canvas.domElement.height);
      if (input != null) {
        lines = input.split("\n");
        commands = lines.join(" ");
        words = commands.split(" ");
        results = [];
        for (i = j = 0, ref = words.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
          if ($scope.commands[words[i]] != null) {
            $scope.commands[words[i]](parseInt(words[i + 1], 10));
            results.push(i++);
          } else {
            results.push(void 0);
          }
        }
        return results;
      }
    };
  }
]);