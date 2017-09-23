angular.module('LogoApp').factory('CanvasFactory', [
  function() {
    var Canvas;
    return Canvas = (function() {
      function Canvas(canvasId) {
        this.domElement = document.getElementById(canvasId);
        this.context = this.domElement.getContext("2d");
        this.resize();
      }

      Canvas.prototype.resize = function() {
        this.domElement.width = this.domElement.clientWidth;
        return this.domElement.height = this.domElement.clientHeight;
      };

      Canvas.prototype.drawLine = function(journey) {
        this.context.beginPath();
        this.context.moveTo(journey.start.x, journey.start.y);
        this.context.lineTo(journey.end.x, journey.end.y);
        return this.context.stroke();
      };

      return Canvas;

    })();
  }
]);