angular.module('LogoApp').controller('LogoController', [
  '$scope', 'CanvasFactory', function($scope, CanvasFactory) {

    angular.element(document).ready(function() {
      canvas = new CanvasFactory("canvas");
      $('#input').focus();
    });

    $scope.executeCommands = (input) => {
      canvas.clear();
      if (input !== null) {
        let journey = LogoJS.setPosition({
          x: canvas.domElement.width / 2,
          y: canvas.domElement.height / 2,
          angle: 180
        })
        .execute(input);

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