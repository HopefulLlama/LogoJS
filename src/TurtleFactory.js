angular.module('LogoApp').factory('TurtleFactory', [
  function() {
    class Turtle {
      constructor(position, angle) {
        this.position = position;
        this.angle = angle;
      }

      move(distance) {
        let start = angular.copy(this.position);

        let radians = Math.PI * this.angle / 180;

        this.position.x += (distance * Math.sin(radians));
        this.position.y += (distance * Math.cos(radians));
        
        return {start, end: this.position};
      }

      rotate(degree) {
        this.angle += degree;
        this.angle = this.angle % 360;
        if (this.angle < 0) {
          this.angle += 360;
        }
        return this;
      }
    }

    return Turtle;
  }
]);