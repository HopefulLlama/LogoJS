class Parameter {
  constructor(validate, transform) {
    this.validate = validate;
    this.transform = transform;
  }
}

const KEYWORDS = [
  'forward',
  'back',
  'left',
  'right',
  'routine',
  'startroutine',
  'endroutine',
  'repeat',
  'endrepeat',
  'up',
  'down'
];

export default {
  FINITE_NUMBER: new Parameter((parameter) => {
    return isFinite(parameter);
  }, (parameter) => {
    return parseFloat(parameter);
  }),
  UP_DOWN: new Parameter((parameter) => {
    return parameter === 'up' || parameter === 'down';
  }, (parameter) => {
    return parameter;
  }),
  NOT_KEYWORD: new Parameter((parameter) => {
    return /^[a-z].*/.test(parameter) && KEYWORDS.indexOf(parameter) === -1;
  }, (parameter) => {
    return parameter.toString();
  })
};