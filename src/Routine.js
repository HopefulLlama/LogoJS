export default class Routine {
  constructor(name) {
    this.name = name;
    this.parameters = [];
    this.body = [];
  }

  createParameterValueMap(values) {
    if(values.length === this.parameters.length) {
      return this.parameters.reduce((accumulator, parameterName, index) => {
        accumulator[parameterName] = values[index];
        return accumulator;
      }, {});
    }
  }

  parseBody(values) {
    let parameterValues = this.createParameterValueMap(values);

    return this.body.map((word) => {
      if(parameterValues[word] !== undefined) {
        return parameterValues[word];
      } else {
        return word;
      }
    });
  }
}