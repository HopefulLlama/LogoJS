import Position from './Position';

class Turtle {
  position: Position;
  penDown: boolean;

  constructor(position: Position, penDown: boolean) {
    this.reset(position, penDown);
  }

  reset(position: Position, penDown: boolean): void {
    this.position = position;
    this.penDown = penDown;
  }

  getCopy(): Object {
    return {position: this.position, penDown: this.penDown};
  }

  move(distance: number): Object {
    let radians = Math.PI * this.position.angle / 180;

    this.position = new Position(
      this.position.x + (distance * Math.sin(radians)),
      this.position.y + (distance * Math.cos(radians)),
      this.position.angle
    );
    
    return this.getCopy();
  }

  rotate(degree: number): Object {
    let angle = this.position.angle + degree;

    this.position = new Position(
      this.position.x,
      this.position.y,
      angle
    );

    return this.getCopy();
  }
}

export default new Turtle(new Position(0, 0, 180), true);