export default class Repeat {
  parent: Repeat;
  frequency: number;
  executions: Object[];

  constructor(parent: Repeat, frequency: number) {
    this.parent = parent;
    this.frequency = frequency;
    this.executions = [];
  }

  execute(): any {
    let journey: any = [];

    /* jshint ignore:start */
    for(let i = 0; i < this.frequency; i++) {
      journey = this.executions.reduce((accumulator: any, execution: any) => {
        let partial: any = execution.execute();

        if(Array.isArray(partial)) {
          accumulator = accumulator.concat(partial);
        } else {
          accumulator.push(partial);
        }

        return accumulator;
      }, journey);
    }

    return journey;
    /* jshint ignore:end */
  }
}