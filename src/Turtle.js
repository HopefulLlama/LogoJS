import Position from './Position';

export default class Turtle {
  constructor(position) {
    this.position = position;
  }

  move(distance) {
    let radians = Math.PI * this.position.angle / 180;

    this.position = new Position(
      this.position.x + (distance * Math.sin(radians)),
      this.position.y + (distance * Math.cos(radians)),
      this.position.angle
    );
    
    return this.position;
  }

  rotate(degree) {
    let angle = this.position.angle + degree;

    this.position = new Position(
      this.position.x,
      this.position.y,
      angle
    );

    return this.position;
  }
}
