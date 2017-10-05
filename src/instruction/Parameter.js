import Keywords from './Keywords';

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
    return parseFloat(parameter);
  }),
  UP_DOWN: new Parameter((parameter) => {
    return parameter === Keywords.UP || parameter === Keywords.DOWN;
  }, (parameter) => {
    return parameter;
  }),
  NOT_KEYWORD: new Parameter((parameter) => {
    return /^[a-z].*/.test(parameter) && Object.values(Keywords).indexOf(parameter) === -1;
  }, (parameter) => {
    return parameter.toString();
  })
};