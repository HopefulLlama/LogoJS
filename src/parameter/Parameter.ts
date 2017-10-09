export default class Parameter {
  validateAndTransform: Function;

  constructor(validateAndTransform: Function) {
    this.validateAndTransform = validateAndTransform;
  }
}