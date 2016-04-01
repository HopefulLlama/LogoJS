// Generated by CoffeeScript 1.10.0
(function() {
  logoApp.factory('CanvasFactory', [
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

        return Canvas;

      })();
    }
  ]);

}).call(this);
