angular.module('LogoApp').factory('TurtleFactory', ['PositionFactory', 
  function(PositionFactory) {
    class Turtle {
      constructor(position) {
        this.position = position;
      }

      move(distance) {
        let radians = Math.PI * this.position.angle / 180;

        this.position = new PositionFactory(
          this.position.x + (distance * Math.sin(radians)),
          this.position.y + (distance * Math.cos(radians)),
          this.position.angle
        );
        
        return this.position;
      }

      rotate(degree) {
        let angle = this.position.angle + degree;
        angle = angle % 360;
        if (angle < 0) {
          angle += 360;
        }

        this.position = new PositionFactory(
          this.position.x,
          this.position.y,
          angle
        );

        return this.position;
      }
    }

    return Turtle;
  }
]);