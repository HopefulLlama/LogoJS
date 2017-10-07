function createParameterValueMap(values, parameters) {
  if(values.length === parameters.length) {
    return parameters.reduce((accumulator, parameterName, index) => {
      accumulator[parameterName] = values[index];
      return accumulator;
    }, {});
  }
}

export default class Routine {
  constructor(name) {
    this.name = name;
    this.parameters = [];
    this.body = [];
  }  

  parseBody(values) {
    let parameterValues = createParameterValueMap(values, this.parameters);

    return this.body.map((word) => {
      if(parameterValues[word] !== undefined) {
        return parameterValues[word];
      } else {
        return word;
      }
    });
  }
}