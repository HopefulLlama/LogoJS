// Generated by CoffeeScript 1.10.0
(function() {
  window.logoController = logoApp.controller('LogoController', [
    '$scope', '$timeout', 'TurtleFactory', 'CanvasFactory', function($scope, $timeout, TurtleFactory, CanvasFactory) {
      return angular.element(document).ready(function() {
        var x, y;
        $scope.canvas = new CanvasFactory("canvas");
        x = $scope.canvas.domElement.width / 2;
        y = $scope.canvas.domElement.height / 2;
        $scope.turtle = new TurtleFactory(x, y);
        return $timeout(function() {
          var journey;
          journey = $scope.turtle.move(40);
          $scope.canvas.context.beginPath();
          $scope.canvas.context.moveTo(journey.start.x, journey.start.y);
          $scope.canvas.context.lineTo(journey.end.x, journey.end.y);
          $scope.canvas.context.stroke();
          return $timeout(function() {
            $scope.turtle.rotate(-120);
            journey = $scope.turtle.move(40);
            $scope.canvas.context.beginPath();
            $scope.canvas.context.moveTo(journey.start.x, journey.start.y);
            $scope.canvas.context.lineTo(journey.end.x, journey.end.y);
            $scope.canvas.context.stroke();
            return $timeout(function() {
              $scope.turtle.rotate(-120);
              journey = $scope.turtle.move(40);
              $scope.canvas.context.beginPath();
              $scope.canvas.context.moveTo(journey.start.x, journey.start.y);
              $scope.canvas.context.lineTo(journey.end.x, journey.end.y);
              return $scope.canvas.context.stroke();
            }, 3000);
          }, 3000);
        }, 3000);
      });
    }
  ]);

}).call(this);
