angular.module('LogoApp').factory('TurtleFactory', [
  function() {
    var Turtle;
    return Turtle = (function() {
      function Turtle(x, y, angle) {
        if (x == null) {
          x = 0;
        }
        if (y == null) {
          y = 0;
        }
        this.angle = angle != null ? angle : 180;
        this.position = {
          x: x,
          y: y
        };
      }

      Turtle.prototype.move = function(distance) {
        var endPosition, radians, startPosition;
        startPosition = {
          x: this.position.x,
          y: this.position.y
        };
        radians = Math.PI * this.angle / 180;
        this.position.x = this.position.x + (distance * Math.sin(radians));
        this.position.y = this.position.y + (distance * Math.cos(radians));
        endPosition = {
          x: this.position.x,
          y: this.position.y
        };
        return {
          start: startPosition,
          end: endPosition
        };
      };

      Turtle.prototype.rotate = function(degree) {
        this.angle += degree;
        this.angle = this.angle % 360;
        if (this.angle < 0) {
          this.angle += 360;
        }
        return this;
      };

      return Turtle;

    })();
  }
]);