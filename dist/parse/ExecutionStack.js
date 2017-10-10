import Repeat from '../instruction/Repeat';
class ExecutionStack {
    constructor() {
        this.instantiate();
    }
    instantiate() {
        this.currentRepeat = new Repeat(null, 1);
        this.masterRepeat = this.currentRepeat;
    }
    pushExecution(execution) {
        this.currentRepeat.executions.push(execution);
    }
    pushNewRepeat(frequency) {
        let newRepeat = new Repeat(this.currentRepeat, frequency);
        this.pushExecution(newRepeat);
        this.currentRepeat = newRepeat;
    }
    closeCurrentRepeat() {
        if (this.currentRepeat.parent === null) {
            throw new Error('endrepeat called without matching repeat');
        }
        else {
            this.currentRepeat = this.currentRepeat.parent;
        }
    }
    execute() {
        if (this.currentRepeat === this.masterRepeat) {
            return this.masterRepeat.execute();
        }
        else {
            throw new Error('Unclosed repeat defined');
        }
    }
}
export default new ExecutionStack();
