class Parameter {
  constructor(validate, transform) {
    this.validate = validate;
    this.transform = transform;
  }
}

export default {
  FINITE_NUMBER: new Parameter((parameter) => {
    return isFinite(parameter);
  }, (parameter) => {
    return parseInt(parameter, 10);
  }),
  UP_DOWN: new Parameter((parameter) => {
    return parameter === 'up' || parameter === 'down';
  }, (parameter) => {
    return parameter;
  })
};