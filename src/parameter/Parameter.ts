export default class Parameter {
  validate: Function;
  transform: Function;

  constructor(validate: Function, transform: Function) {
    this.validate = validate;
    this.transform = transform;
  }
}