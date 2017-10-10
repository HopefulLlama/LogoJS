class RoutineStack {
  stack: string[];

  constructor() {
    this.stack = [];
  }

  push(routineName: string): void {
    let index: number = this.stack.indexOf(routineName);

    this.stack.push(routineName);

    if(index > -1) {
      let loop: string = this.stack.slice(index, this.stack.length).join(' -> ');
      this.stack = [];
      throw new Error(`Infinite call stack detected at: ${loop}`);
    }
  }

  pop(): void {
    this.stack.pop();
  }
}

export default new RoutineStack();