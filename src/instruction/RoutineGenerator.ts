import Routine from './Routine';

let name: string, parameters: string[], body: string[];

class RoutineGenerator {
  constructor() {
    this.start();
  }

  start(): RoutineGenerator {
    name = null;
    parameters = [];
    body = [];
    return this;
  }

  setName(n: string): RoutineGenerator {
    name = n;
    return this;
  }

  addParameter(p: string): RoutineGenerator {
    parameters.push(p);
    return this;
  }

  addToBody(b: string): RoutineGenerator {
    body.push(b);
    return this;
  }

  generateRoutine(): Routine {
    let routine = new Routine(name, parameters, body);
    this.start();
    return routine;
  }
}

export default new RoutineGenerator();