import Routine from './Routine';

let name, parameters, body;

class RoutineGenerator {
  constructor() {
    this.start();
  }

  start() {
    name = null;
    parameters = [];
    body = [];
    return this;
  }

  setName(n) {
    name = n;
    return this;
  }

  addParameter(p) {
    parameters.push(p);
    return this;
  }

  addToBody(b) {
    body.push(b);
    return this;
  }

  generateRoutine() {
    let routine = new Routine(name, parameters, body);
    this.start();
    return routine;
  }
}

export default new RoutineGenerator();