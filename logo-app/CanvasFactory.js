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
        if(journey.start.penDown === true && journey.start.penDown === true) {
          this.context.beginPath();
          this.context.moveTo(journey.start.position.x, journey.start.position.y);
          this.context.lineTo(journey.end.position.x, journey.end.position.y);
          this.context.stroke();
        }
      }
    }

    return Canvas;
  }
]);