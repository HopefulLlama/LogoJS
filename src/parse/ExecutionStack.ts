import Repeat from '../instruction/Repeat';

class ExecutionStack {
  currentRepeat: Repeat;
  masterRepeat: Repeat;

  constructor() {
    this.instantiate();
  }

  instantiate(): void {
    this.currentRepeat = new Repeat(null, 1);
    this.masterRepeat = this.currentRepeat;
  }

  pushExecution(execution: any): void {
    this.currentRepeat.executions.push(execution);
  }

  pushNewRepeat(frequency: number): void {
    let newRepeat = new Repeat(this.currentRepeat, frequency);
    this.pushExecution(newRepeat);
    this.currentRepeat = newRepeat;
  }

  closeCurrentRepeat(): void {
    if(this.currentRepeat.parent === null) {
      throw new Error('endrepeat called without matching repeat');
    } else {
      this.currentRepeat = this.currentRepeat.parent;
    }
  }

  execute(): any {
    if(this.currentRepeat === this.masterRepeat) {
      return this.masterRepeat.execute();
    } else {
      throw new Error('Unclosed repeat defined');
    }
  }
}

export default new ExecutionStack();