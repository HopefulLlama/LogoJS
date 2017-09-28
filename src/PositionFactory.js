angular.module('LogoApp').factory('PositionFactory', [function() {
  class Position {
    constructor(x, y, angle) {
      this.x = x;
      this.y = y;
      this.angle = angle;
    }
  }
  return Position;
}]);