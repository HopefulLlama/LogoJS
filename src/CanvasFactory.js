angular.module('LogoApp').factory('CanvasFactory', [
  function() {
    class Canvas {
      constructor(id) {
        this.domElement = document.getElementById(id);
        this.context = this.domElement.getContext("2d");
        this.resize();        
      }

      clear() {
        this.context.clearRect(0, 0, this.domElement.width, this.domElement.height);
      }

      resize() {
        this.domElement.width = this.domElement.clientWidth;
        this.domElement.height = this.domElement.clientHeight;
      }

      drawLine(journey) {
        this.context.beginPath();
        this.context.moveTo(journey.start.x, journey.start.y);
        this.context.lineTo(journey.end.x, journey.end.y);
        this.context.stroke();
      }
    }

    return Canvas;
  }
]);