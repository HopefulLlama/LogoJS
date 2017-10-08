export default class Executeable {
  execute: Function;

  constructor(execute: Function) {
    this.execute = execute;
  }
}