export default class Position {
  x: number;
  y: number;
  angle: number;
  
  constructor(x: number, y: number, angle: number) {
    this.x = x;
    this.y = y;
    
    angle = angle % 360;
    if (angle < 0) {
      angle += 360;
    }
    this.angle = angle;
  }
}